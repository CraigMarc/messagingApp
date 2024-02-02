import { Link } from "react-router-dom";
import { useState, useEffect } from 'react'


const Register = (props) => {

  const {

    setShowForm
   
    
  } = props;

  async function loginUser(credentials) {

  
    try {
    return fetch('https://blogapi1200.fly.dev/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      
      body: JSON.stringify(credentials)
    })
      .then(data => data.json())
    
    }
      catch(error)  {
       
        console.log(err.message);
      
      }
   }

  
//event listener
  const [userName, setUserName] = useState();
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [password, setPassword] = useState();
  const [confirm, setConfirm] = useState();
 
  
  const[error, setError] = useState()

  const handleSubmit = async e => {
    e.preventDefault();
   // const data = Object.fromEntries(new FormData(e.target).entries());
   // console.log(data)
   console.log(userName)
   console.log(firstName)
   setShowForm(false)
    /*
    const token = await loginUser({
      email,
      password
    });
    let errMessage = token.message
    setToken(token);
    if (token.message = "wrong username or password" ){
      setError(errMessage)
      }
      else{setError()}
    */
  }

  


  return(
    <div className="login-wrapper">
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <p>First Name</p>
          <input type="text" name='firstName' onChange={e => setFirstName(e.target.value)} />
        </label>
        <label>
          <p>Last Name</p>
          <input type="text" name='lastName' onChange={e => setLastName(e.target.value)} />
        </label>
        <label>
          <p>Email</p>
          <input type="text" name='userName' onChange={e => setUserName(e.target.value)} />
        </label>
        <label>
          <p>Password</p>
          <input type="text" name="password" onChange={e => setPassword(e.target.value)} />
        </label>
        <label>
          <p>Retype Password</p>
          <input type="password" name='confirm' onChange={e => setConfirm(e.target.value)} />
        </label>
        <div className="loginSubmit">
          <button type="submit">Submit</button>
        </div>
      </form>
      <p>{error}</p>
    </div>
  )
}


export default Register;