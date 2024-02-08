import { Link, useNavigate } from "react-router-dom";
import Header from "./Header"

const Profile = (props) => {

  const {
    users,
    setUsers
  } = props;


  const token = sessionStorage.getItem("token");
  const tokenOb = JSON.parse(token)
  const tokenFetch = `Bearer ${tokenOb.token}`
  const sessionUser = sessionStorage.getItem("userName")
  const currentUser = JSON.parse(sessionUser)
  const userData = users.filter((user) => user._id == currentUser)

  const navigate = useNavigate();

  //change to https later

  let image = userData[0].image
  let url = ""
  if (image) {
    url = `http://localhost:3000/uploads/${image}`
  }

  // add pic

  const newImage = async e => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target).entries());
    const formData = new FormData();


    formData.append("id", currentUser);
    formData.append("image", data.image);



    await fetch('http://localhost:3000/users/image', {

      method: 'Post',
      body: formData,

      headers: {
        Authorization: tokenFetch,
        //'Content-type': 'application/json; charset=UTF-8',

      },
    })
      .then((response) => response.json())
      .then((data) => {

        setUsers(data)

      })
      .catch((err) => {
        console.log(err.message);
      });

  }

  const deleteProfile = async e => {
    //e.preventDefault();

    await fetch('http://localhost:3000/users/user', {
      method: 'Delete',
      body: JSON.stringify({
        id: currentUser
      }),

      headers: {
        Authorization: tokenFetch,
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((response) => response.json())
      .then((data) => {

        sessionStorage.removeItem("message");
        sessionStorage.removeItem("token");
        navigate('/login')
        
      })
      .catch((err) => {
        console.log(err.message);
      });

  }

  return (

    <div className="profileContainer">
      <Header />
      <h1>Profile</h1>
      <img className="imgProfile" src={url}></img>
      <div className="addImageContainer">
        <form encType="multipart/form-data" onSubmit={newImage}>
          <label>
            <div className="form-group">
              <label>Image (file must be .jpeg .jpg or .png):</label>
              <input required type="file" className="form-control-file" id="image" name="image" accept=".jpeg, .jpg, .png" />
            </div>
          </label>
          <div className="addImage">
            <button type="submit">Add New Picture</button>
          </div>
        </form>
        <button className="deleteProfile" onClick={deleteProfile}>Delete Profile</button>
      </div>



    </div>
  );
};

export default Profile;