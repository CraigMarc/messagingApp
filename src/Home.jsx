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

  //const navigate = useNavigate();



  //dont need for this page but will for others *************
  /*
    if (!token) {
  
      return <Login setToken={setToken} />
    }*/

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
  
  

      const allUsers = await fetch('http://localhost:3000/users/users', {
          headers: { Authorization: tokenFetch },
          
        })


      const messageData = await allMessages.json();
      const userData = await allUsers.json();
      console.log(messageData)
      console.log(userData)
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

 

  //display error and loading for api call

  if (error) return (
    <div>

      <p>A network error was encountered</p>
    </div>
  )

  if (loading) return <p>Loading...</p>;

/*
const getUsers = async () => {
 
  

  await fetch("http://localhost:3000/users/users", {
    method: 'Get',

    headers: {
      Authorization: tokenFetch,
      'Content-type': 'application/json; charset=UTF-8',
    },
  })
    .then((response) => response.json())
    .then((data) => {

      setUsers(data)
      //maybe set state for a rerender
    })
    .catch((err) => {
      console.log(err.message);
    });
};*/




  return (
    <div>
      <Header

      />
      <h1>Home</h1>

    </div>
  );
};

export default Home;