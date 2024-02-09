import { Link } from "react-router-dom";
import Header from "./Header"

const AllUsers = (props) => {

  const {

    users,

  } = props;

  const sessionUser = sessionStorage.getItem("userName")
  const currentUser = JSON.parse(sessionUser)


  let filteredArray = []

  if (users != true) {

    filteredArray = users.filter((user) => user._id != currentUser)

  }


  return (
    <div>
      <Header />
      <div className="allUserContainer">
        {filteredArray.map((index) => {

          return (
            
            <Link key={index._id}  to={`/newpost/${index._id}`} >
               <div key={index._id} className="userContainer">
                  <div>
                    <img className="imgProfile" src={`http://localhost:3000/uploads/${index.image}`} alt="x"></img>
                  </div>

                  
                  <p>{index.firstName} {index.lastName}</p>
                 

                  <div id={index._id} className="card" >
                 
                  </div>
                 
                  </div>
                  </Link>
              
          )
        })}
      </div>
    </div>
  );
};

export default AllUsers;