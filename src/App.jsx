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

  const [messages, setMessages] = useState(true);
  const [users, setUsers] = useState(true);




  const { token, setToken } = useToken();

  if (!token) {

    return <Login
      setToken={setToken}

    />
  }


  return (
    <div>

      <Router

        setToken={setToken}
        token={token}
        messages={messages}
        setMessages={setMessages}
        users={users}
        setUsers={setUsers}

      />
    </div>
  )

}

export default App