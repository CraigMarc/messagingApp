import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Home"
import ErrorPage from "./ErrorPage";
import Login2 from "./Login2"
import Register from "./Register"
import NewPost from "./NewPost"
import AllUsers from "./AllUsers"
import Profile from "./Profile";

const Router = (props) => {

  const {
   
    handleLogout,
    messages,
    setMessages,
    token,
    setToken,
    users,
    setUsers,
    


  } = props;

  const router = createBrowserRouter([

    {
      path: "/",
      element:
        <Home
          
          handleLogout={handleLogout}
          token={token}
          messages={messages}
          setMessages={setMessages}
          users={users}
          setUsers={setUsers}

        />,

      errorElement: <ErrorPage />,
    },

    {
      path: "/login",
      element:
        <Login2

          setToken={setToken}
          


        />,
      errorElement: <ErrorPage />,
    },

    {
      path: "/register",
      element:
        <Register


        />,

      errorElement: <ErrorPage />,
    },
    {
      path: "/newpost/:id",
      element:
        <NewPost
          messages={messages}
          setMessages={setMessages}
          

        />,

      errorElement: <ErrorPage />,
    },
    {
      path: "/allusers",
      element:
        <AllUsers
         users={users}
          

        />,

      errorElement: <ErrorPage />,
    },
    {
      path: "/profile",
      element:
        <Profile
        
          

        />,

      errorElement: <ErrorPage />,
    },
  ]);

  return <RouterProvider router={router} />;
};

export default Router;