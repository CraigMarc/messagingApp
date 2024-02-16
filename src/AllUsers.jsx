import { Link } from "react-router-dom";
import Header from "./Header"
import Home from "./Home"

const AllUsers = (props) => {

  const {

    users,
    setUsers,
    messages,
    setMessages,
    handleLogout

  } = props;

  const token = sessionStorage.getItem("token");
  const sessionUser = sessionStorage.getItem("userName")
  const currentUser = JSON.parse(sessionUser)

  // if refresh and users empty navigate call home to get data

  if (users == true) {
    return (
      <Home
        handleLogout={handleLogout}
        token={token}
        messages={messages}
        setMessages={setMessages}
        users={users}
        setUsers={setUsers}
      />
    )
  }


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

            <Link key={index._id} to={`/newpost/${index._id}`} >
              <div key={index._id} className="userContainer">
                <div>
                  <img className="imgProfile" src={`https://messaging-app-api.fly.dev/uploads/${index.image}`} alt="x"></img>
                </div>


                <p className="allUsersName">{index.firstName} {index.lastName}</p>


              </div>
            </Link>

          )
        })}
      </div>
    </div>
  );
};

export default AllUsers;