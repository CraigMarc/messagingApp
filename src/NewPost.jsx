import { useParams } from "react-router-dom";
import Header from "./Header"
import { useState } from 'react'

const NewPost = (props) => {

  const {

    messages,
    setMessages


  } = props;

  const urlParams = useParams();
  const currentUser = urlParams.id
  const sessionUser = sessionStorage.getItem("userName")
  const sessionUserParse = JSON.parse(sessionUser)
  const token = sessionStorage.getItem("token");
  const tokenOb = JSON.parse(token)
  const tokenFetch = `Bearer ${tokenOb.token}`


let allPostsBy = messages.allPostsBy
  let allPostsSent = messages.allPostsSent
  let messageArray = []

  


  if (allPostsBy || allPostsSent) {
    messageArray = allPostsBy.concat(allPostsSent)
  }

  messageArray.sort(function (x, y) {
    return new Date(x.timestamp) - new Date(y.timestamp);
  })

  let filteredArray = messageArray.filter((user) => user.sentBy._id == currentUser || user.sentTo._id == currentUser)
  

  //event listener
  const [newMessage, setNewMessage] = useState();
  const [error, setError] = useState()

 
  
  const handleSubmit = async e => {
    e.preventDefault();
   
    

    //send form data
    await fetch("http://localhost:3000/users/messages", {
      method: 'POST',
      body: JSON.stringify({
        sentBy: sessionUserParse,
        sentTo: currentUser,
        text: newMessage


      }),
      headers: {
        Authorization: tokenFetch,
        'Content-type': 'application/json; charset=UTF-8',
      },
    })



      .then((response) => response.json())
      .then((data) => {
        setMessages(data)
        

      })


      .catch((err) => {
        console.log(err.message);
      });


  }

  return (
    <div className="newPost">
      <Header />

      {filteredArray.map((index) => {

        let date = new Date(index.timestamp).toLocaleString()


        return (

          <div key={index._id} className="post">

            <div id={index._id} className="card" >


              <p className='sentBy'>Sent By:{index.sentBy.firstName} {index.sentBy.lastName}</p>
              <p className='sentTo'>Sent To:{index.sentTo.firstName} {index.sentTo.lastName}</p>
              <p className='text'>{index.text}</p>
              <p className='date'>{date}</p>

            </div>

          </div>

        )
      })}
      <form onSubmit={handleSubmit}>
        <label>
          <p>Message</p>
          <input type="text" onChange={e => setNewMessage(e.target.value)} />
        </label>

        <div className="submitMessage">
          <button type="submit">Make submit symbol</button>
        </div>
      </form>

    

    </div>

  );
};

export default NewPost;