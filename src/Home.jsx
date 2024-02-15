import Header from "./Header"
import { useState, useEffect } from 'react'
import { useNavigate, Link } from "react-router-dom";

const Home = (props) => {

  const {

    messages,
    setMessages,
    users,
    setUsers


  } = props;



  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);



  const token = sessionStorage.getItem("token");
  const tokenOb = JSON.parse(token)
  const tokenFetch = `Bearer ${tokenOb.token}`
  const sessionUser = sessionStorage.getItem("userName")
  const currentUser = JSON.parse(sessionUser)


  const navigate = useNavigate();



  // get user messages and users

  const fetchInfo = async () => {
    //setLoading(true)


    try {

      const [allMessages, allUsers] = await Promise.all([
        fetch('https://messaging-app-api.fly.dev/users/allmessages', {
          method: 'POST',
          body: JSON.stringify({
            userName: currentUser,

          }),
          headers: {
            Authorization: tokenFetch,
            'Content-type': 'application/json; charset=UTF-8',
          },
        }),
        fetch('https://messaging-app-api.fly.dev/users/users', {
              headers: { Authorization: tokenFetch }
      })
      ]);
    

     // return to login when token expires

      if (allMessages.statusText == "Unauthorized") {
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("userName");
        navigate('/login')

      }

      if (allUsers.statusText == "Unauthorized") {
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("userName");
        navigate('/login')

      }

      //get info if token ok

  
      const messageData = await allMessages.json();
      const userData = await allUsers.json();
      
      setMessages(messageData)
      setUsers(userData)
     
    }
    catch (error) {
      console.error("There has been a problem with your fetch operation:", error);
      //add error message to dom
      setError("true")
      //navigate('/login')
    }
    setLoading(false)

  }


  useEffect(() => {
    fetchInfo();
  }, [])

  

  let allPostsBy = messages.allPostsBy
  let allPostsSent = messages.allPostsSent
  let messageArray = []



  if (allPostsBy || allPostsSent) {
    messageArray = allPostsBy.concat(allPostsSent)
  }

  messageArray.sort(function (x, y) {
    return new Date(x.timestamp) - new Date(y.timestamp);
  })

  let usersArray = []
  let usersList = []
 

  for (let i = 0; i < messageArray.length; i++) {
    
    if (!usersArray.includes(messageArray[i].sentBy.userName)) {
      usersArray.push(messageArray[i].sentBy.userName)
      usersList.push(messageArray[i].sentBy)

    }
    if (!usersArray.includes(messageArray[i].sentTo.userName)) {
      usersArray.push(messageArray[i].sentTo.userName)
      usersList.push(messageArray[i].sentTo)
    }

  }

 
  //display error and loading for api call

  if (error) return (
    <div>

      <p>A network error was encountered</p>
    </div>
  )

  if (loading) return <p>Loading...</p>;

  //selective render if no user posts

  const DisplayUsers = (props) => {
    if (usersList.length == 0) {
      return (
        <div>
          <h3>You have no conversations.</h3>
        </div>
      )
    }
    else {
return (

  <div className="homeContainer">
  {usersList.map((index) => {

    //if (index.)

    if (index._id != currentUser) {

    return (

      <div key={index._id} className="post">

        <Link to={`newpost/${index._id}`} state={index}>
        <div key={index._id} className="userContainer">
          <div>
        <img className="imgProfile" src={`https://messaging-app-api.fly.dev/uploads/${index.image}`} alt="x"></img>
        </div>
          <p>{index.firstName} {index.lastName}</p>
          </div>
        </Link>
        
      </div>
   ) }
    
  })}
</div>
)
    }
  }

// render

  return (
    <div>
      <Header/>
      <DisplayUsers/>

    </div>
  );
};

export default Home;