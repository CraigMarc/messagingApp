import { useParams } from "react-router-dom";

const NewPost = (props) => {

  const {

    messages,
    setMessages


  } = props;

  const urlParams = useParams();
  const currentUser = urlParams.id


  let allPostsBy = messages.allPostsBy
let allPostsSent = messages.allPostsSent
let messageArray = []

if (allPostsBy || allPostsSent) {
messageArray  = allPostsBy.concat(allPostsSent)
}

messageArray.sort(function(x, y){
  return new Date(x.timestamp) - new Date(y.timestamp);
})

let filteredArray = messageArray.filter((user) => user.sentBy == currentUser || user.sentTo == currentUser)

    return (
      <div className="error">
      {filteredArray.map((index) => {
           
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
  
  export default NewPost;