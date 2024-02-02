import { useState, useEffect } from 'react'
import './App.css'
import Router from './Router'
import Login from './Login';

function App() {


  function useToken() {

    const getToken = () => {
      
      const tokenString = sessionStorage.getItem('token');
      const userToken = JSON.parse(tokenString);
      return userToken?.token
    };

    const [token, setToken] = useState(getToken());

    const saveToken = userToken => {
      sessionStorage.setItem('token', JSON.stringify(userToken));
      setToken(userToken.token);
      
    };

    return {
      setToken: saveToken,
      token
    }

  }

  const [messages, setMessages] = useState([])
  const [comments, setComments] = useState()
  const [rerender, setRerender] = useState()
 

  const { token, setToken } = useToken();

  if (!token) {

    return <Login setToken={setToken} />
  }


  return (
    <div>

      <Router
        rerender={rerender}
        setRerender={setRerender}
        setToken={setToken}

      />
    </div>
  )

  }

  export default App