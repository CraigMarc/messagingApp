import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Home"
import ErrorPage from "./ErrorPage";
import Login2 from "./Login2"
import Register from "./Register"
import NewPost from "./NewPost"

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
          token={token}
          messages={messages}
          setMessages={setMessages}

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

  ]);

  return <RouterProvider router={router} />;
};

export default Router;