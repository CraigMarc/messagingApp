import { useNavigate } from "react-router-dom";
import { useState } from 'react'
import Register from "./Register"

const Login = (props) => {

    const navigate = useNavigate();

  const {

    setToken,
    
   
    
  } = props;

  async function loginUser(credentials) {

  
    try {
    return fetch('http://localhost:3000/login', {
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
  const [password, setPassword] = useState();
  const[error, setError] = useState()

  const handleSubmit = async e => {
    e.preventDefault();
    const token = await loginUser({
      userName,
      password
    });
    let errMessage = token.message
    setToken(token);
    sessionStorage.setItem('userName', JSON.stringify(token.user_id));
    navigate('/')
    if (token.message = "wrong username or password" ){
      setError(errMessage)
      }
      else{setError()}
    
  }

  const [showForm, setShowForm] = useState(false);

  function signUp () {

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


  


  return(
    <div className="login-wrapper">
      <h1>Blog Log In</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <p>Email</p>
          <input type="text" onChange={e => setUserName(e.target.value)} />
        </label>
        <label>
          <p>Password</p>
          <input type="password" onChange={e => setPassword(e.target.value)} />
        </label>
        <div className="loginSubmit">
          <button type="submit">Submit</button>
        </div>
      </form>
      <p>{error}</p>
      <button className="signUp" onClick={signUp} >Sign Up</button>
    </div>
  )
}


export default Login;