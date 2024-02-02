import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Home"
import ErrorPage from "./ErrorPage";
import Login from "./Login"


const Router = (props) => {

  const {

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
          messages={messages}
          setMessages={setMessages}
          comments={comments}
          setComments={setComments}

        />,

      errorElement: <ErrorPage />,
    },

    {
      path: "/login",
      element: <Login
        
        setToken={setToken}
        
      />,
      errorElement: <ErrorPage />,
    },
/*
    {
      path: "/post/:id",
      element:
        <Edit
          messages={messages}
          setMessages={setMessages}
          comments={comments}
          setComments={setComments}

        />,

      errorElement: <ErrorPage />,
    },

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