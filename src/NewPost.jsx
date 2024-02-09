import { useParams, useNavigate } from "react-router-dom";
import Header from "./Header"
import { useState } from 'react'
import send from './assets/send.png';
import trashCan from './assets/trashCan.png';

const NewPost = (props) => {

  const {

    messages,
    setMessages


  } = props;

  const navigate = useNavigate();

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

        if (err.message.includes("Unauthorized")) {
          sessionStorage.removeItem("token");
          sessionStorage.removeItem("userName");
          navigate('/login')
        }

      });


  }

  // delete posts

  const deleteMessage = async (event) => {
    let id = event.target.id

    await fetch('http://localhost:3000/users/message', {
      method: 'Delete',
      body: JSON.stringify({
        id: id,
        userName: sessionUserParse
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

        if (err.message.includes("Unauthorized")) {
          sessionStorage.removeItem("token");
          sessionStorage.removeItem("userName");
          navigate('/login')
        }
      });

  };



  const DisplayMessages = () => {

    if (filteredArray.length == 0) {
      return (
        <div>
          <h2>No Messages</h2>
        </div>
      )
    }
    else {
      return (
        <div>
          {filteredArray.map((index) => {

            let date = new Date(index.timestamp).toLocaleString()


            return (

              <div key={index._id} className="post">

                <div id={index._id} className="card" >

                  <img className="imgProfile" src={`http://localhost:3000/uploads/${index.sentBy.image}`} alt="x"></img>
                  <p className='sentBy'>Sent By:{index.sentBy.firstName} {index.sentBy.lastName}</p>
                  <p className='sentTo'>Sent To:{index.sentTo.firstName} {index.sentTo.lastName}</p>
                  <p className='text'>{index.text}</p>
                  <p className='date'>{date}</p>
                  <div className="deleteMessage" onClick={deleteMessage}> <img id={index._id} className="imgDelete" onClick={deleteMessage} src={trashCan} alt="x"></img></div>
                </div>

              </div>

            )
          })
          }
        </div>
      )
    }

  }

  return (
    <div className="newPost">
      <Header />

      <DisplayMessages />

      <form onSubmit={handleSubmit}>
        <label>
          <p>Message</p>
          <input required type="text" onChange={e => setNewMessage(e.target.value)} />
        </label>

        <div className="submitMessage">
          <input className="imgSend" type="image" src={send} alt="New Message" />

        </div>
      </form>



    </div>

  );
};

export default NewPost;