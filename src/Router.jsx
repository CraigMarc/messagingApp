import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Home"
import ErrorPage from "./ErrorPage";
import Login from "./Login"
import Login2 from "./Login2"
import Register from "./Register"

const Router = (props) => {

  const {
   
    handleLogout,
    messages,
    setMessages,
    comments,
    setComments,
    token,
    setToken,


  } = props;

  const router = createBrowserRouter([

    {
      path: "/",
      element:
        <Home
          
          handleLogout={handleLogout}
          setToken={setToken}

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
    /*
        {
          path: "/newpost",
          element:
            <NewPost
              messages={messages}
              comments={comments}
              setComments={setComments}
    
            />,
    
          errorElement: <ErrorPage />,
        },
    */

  ]);

  return <RouterProvider router={router} />;
};

export default Router;