import Header from "./Header"


const Home = (props) => {

  const {

    setRerender,
    setToken

  } = props;

  return (
    <div>
      <Header
        setRerender={setRerender}
        setToken={setToken}
      />
      <h1>Home</h1>

    </div>
  );
};

export default Home;