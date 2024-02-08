import { Link } from "react-router-dom";
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

  // delete pic

  const deleteImage = async (event) => {


    await fetch('http://localhost:3000/users/image', {
      method: 'Delete',
      body: JSON.stringify({
        user_id: currentUser
      }),
      headers: {
        Authorization: tokenFetch,
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((response) => response.json())
      .then((data) => {

        setUsers(data)
        
      })
      .catch((err) => {
        console.log(err.message);
      });
  };


  //render if pic on no pic

  const AddPic = () => {

    //if no pic render add pic button

    if (!image) {
      return (
        <div className="addImageContainer">
          <form encType="multipart/form-data" onSubmit={newImage}>
            <label>
              <div className="form-group">
                <label>Image (file must be .jpeg .jpg or .png):</label>
                <input type="file" className="form-control-file" id="image" name="image" accept=".jpeg, .jpg, .png" />
              </div>
            </label>
            <div className="addImage">
              <button type="submit">Add New Picture</button>
            </div>
          </form>

        </div>
      )
    }
    //render pic and delete button
    else {
      return (
        <div>
          <img className="imgProfile" src={url}></img>
          <div className="addImage">
            <button onClick={deleteImage} type="submit">Delete Picture</button>
          </div>
        </div>
      )
    }


  }

  return (

    <div className="profileContainer">
      <Header />
      <h1>Profile</h1>



      <AddPic />
    </div>
  );
};

export default Profile;