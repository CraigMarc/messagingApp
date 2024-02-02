import Header from "./Header"


const Home = (props) => {

  const {

  token

  } = props;

  //dont need for this page but will for others *************
/*
  if (!token) {

    return <Login setToken={setToken} />
  }*/

  return (
    <div>
      <Header
      
      />
      <h1>Home</h1>

    </div>
  );
};

export default Home;