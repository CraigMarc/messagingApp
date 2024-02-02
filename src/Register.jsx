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

 


  return(
    <div className="login-wrapper">
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <p>First Name</p>
          <input type="text" minLength={2} required name='firstName' onChange={e => setFirstName(e.target.value)} />
        </label>
        <label>
          <p>Last Name</p>
          <input type="text" minLength={2} required name='lastName' onChange={e => setLastName(e.target.value)} />
        </label>
        <label>
          <p>Email</p>
          <input type="email" minLength={4} required name='userName' onChange={e => setUserName(e.target.value)} />
        </label>
        <label>
          <p>Password</p>
          <input type="password" minLength={6} required name="password" onChange={e => setPassword(e.target.value)} />
        </label>
        <label>
          <p>Retype Password</p>
          <input type="password" minLength={6} required name='confirm'  onChange={e => setConfirm(e.target.value)} />
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