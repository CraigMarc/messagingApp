//import { Link } from "react-router-dom";
import { useState } from 'react'
import Register from "./Register"

const Login = (props) => {

  const {

    setToken,



  } = props;

  async function loginUser(credentials) {


    try {
      return fetch('https://messaging-app-api.fly.dev/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },

        body: JSON.stringify(credentials)
      })
        .then(data => data.json())

    }
    catch (error) {

      console.log(err.message);

    }
  }


  //event listener
  const [userName, setUserName] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState()

  const handleSubmit = async e => {
    e.preventDefault();
    const token = await loginUser({
      userName,
      password
    });


    let errMessage = token.message
    setToken(token);
    sessionStorage.setItem('userName', JSON.stringify(token.user_id));
    if (token.message = "wrong username or password") {
      setError(errMessage)
    }
    else { setError() }

  }

  // show reg form

  const [showForm, setShowForm] = useState(false);

  function signUp() {

    setShowForm(true);

  }

  if (showForm == true)
    return (
      <div>
        <Register
          setShowForm={setShowForm}
        />
      </div>
    )

  // render sign in

  return (
    <div className="login-wrapper">
      <h1>MessagesApp</h1>
      <h2>Log In</h2>
      <form onSubmit={handleSubmit}>
        <label>
          <input className="loginInput" type="text" placeholder='Email' onChange={e => setUserName(e.target.value)} />
        </label>
        <label>
          <input className="loginInput" placeholder='Password' type="password" onChange={e => setPassword(e.target.value)} />
        </label>
        <div className="loginSubmit">
          <button className='loginButton' type="submit">Login</button>
        </div>
      </form>
      <p>{error}</p>
      <button className="signUp" onClick={signUp} >Sign Up</button>
    </div>
  )
}


export default Login;