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
    <div className="allUserContainer">
      <Header/>

      {filteredArray.map((index) => {
           
           return (

             <div key={index._id} className="post">

              <Link to={`/newpost/${index._id}`} > 
               <p>{index.firstName} {index.lastName}</p>
               </Link>
               
               <div id={index._id} className="card" >
 
               </div>
             </div>

           )
         })}
    </div>
  );
};

export default AllUsers;