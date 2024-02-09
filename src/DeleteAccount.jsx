import { Link, useNavigate } from "react-router-dom";

const DeleteAccount = () => {

    const token = sessionStorage.getItem("token");
    const tokenOb = JSON.parse(token)
    const tokenFetch = `Bearer ${tokenOb.token}`
    const sessionUser = sessionStorage.getItem("userName")
    const currentUser = JSON.parse(sessionUser)

    const navigate = useNavigate();

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
    
            if (err.message.includes("Unauthorized")) {
              sessionStorage.removeItem("token");
              sessionStorage.removeItem("userName");
              navigate('/login')
            }
    
          });
    
      }
    


  return (
    <div className="deleteAccount">
    <h3>Deleteing your account will permanently delete you profile and all your messages do you want to proceed?</h3>
      <button className="deleteProfileYes" onClick={deleteProfile}>Yes</button>
      <Link to="/profile">
      <button className="deleteProfileNo">No</button>
      </Link>
    </div>
  );
};

export default DeleteAccount;