import Header from "./Header"
import { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";

const Home = (props) => {

  const {



  } = props;



  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState(true);
  const [users, setUsers] = useState(true);

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


      const allMessages = await fetch('http://localhost:3000/users/allmessages', {
        method: 'POST',
        body: JSON.stringify({
          userName: currentUser,



        }),
        headers: {
          Authorization: tokenFetch,
          'Content-type': 'application/json; charset=UTF-8',
        },
      })

      // return to login when token expires

      if (allMessages.statusText == "Unauthorized") {
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("userName");
        navigate('/login')

      }



      const allUsers = await fetch('http://localhost:3000/users/users', {
        headers: { Authorization: tokenFetch },

      })

      // return to login when token expires

      if (allUsers.statusText == "Unauthorized") {
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("userName");
        navigate('/login')

      }


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
messageArray  = allPostsBy.concat(allPostsSent)
}

messageArray.sort(function(x, y){
  return new Date(x.timestamp) - new Date(y.timestamp);
})

console.log(messageArray)

  //display error and loading for api call

  if (error) return (
    <div>

      <p>A network error was encountered</p>
    </div>
  )

  if (loading) return <p>Loading...</p>;

  

  return (
    <div>
      <Header

      />
     {messageArray.map((index) => {
           
            let date = new Date(index.timestamp).toLocaleString()
            

            return (

              <div key={index._id} className="post">

                <div id={index._id} className="card" >


                  <p className='sentBy'>Sent By:{index.sentBy}</p>
                  <p className='sentTo'>Sent To:{index.sentTo}</p>
                  <p className='text'>{index.text}</p>
                  <p className='date'>{date}</p>
                  
                </div>
              </div>

            )
          })}


    </div>
  );
};

export default Home;