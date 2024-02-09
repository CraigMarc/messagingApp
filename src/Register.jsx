import { Link } from "react-router-dom";
import { useState, useEffect } from 'react'


const Register = (props) => {

  const {

    setShowForm
   
    
  } = props;

  
//event listener
  const [userName, setUserName] = useState();
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [password, setPassword] = useState();
  const [confirm, setConfirm] = useState();
 
  
  const[error, setError] = useState()

  const handleSubmit = async e => {
    e.preventDefault();
  
   if (password !== confirm) {
    alert("Passwords don't match");
   }
   else {
    try {
      return fetch('http://localhost:3000/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },

        body: JSON.stringify({
          firstName: firstName,
          lastName: lastName,
          userName: userName,
          password: password,
          confirm: confirm
      })
    })
        .then(data => data.json())
        .then(setShowForm(false))
    }
    catch (error) {

      console.log(error.message);

    }


   setShowForm(false)
   }
   
  }

  // return to log in

  

  function login () {

    setShowForm(false);

  }


/// render sign up
  return(
    <div className="signup-wrapper">
      <div className="signUpContainer">
      <h1>Sign Up</h1>
      <button className="returnLogin" onClick={login} >Return to Login</button>
      </div>
      <form onSubmit={handleSubmit}>
        <label>
         
          <input className="loginInput" type="text" placeholder="First Name" minLength={2} required name='firstName' onChange={e => setFirstName(e.target.value)} />
        </label>
        <label>
         
          <input className="loginInput" type="text" placeholder="Last Name" minLength={2} required name='lastName' onChange={e => setLastName(e.target.value)} />
        </label>
        <label>
        
          <input className="loginInput" type="email" placeholder="Email" minLength={4} required name='userName' onChange={e => setUserName(e.target.value)} />
        </label>
        <label>
          
          <input className="loginInput" type="password" placeholder="Password" minLength={6} required name="password" onChange={e => setPassword(e.target.value)} />
        </label>
        <label>
         
          <input className="loginInput" type="password" placeholder="Confirm Password" minLength={6} required name='confirm'  onChange={e => setConfirm(e.target.value)} />
        </label>
        <div className="loginSubmit">
          <button type="submit">Register</button>
        </div>
      </form>
      <p>{error}</p>
    </div>
  )
}


export default Register;