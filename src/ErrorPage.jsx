import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="error">
      <h1>Oh no, this route doesn't exist!</h1>
      <Link to="/login">
        You can go back to the home page by clicking here, though!
      </Link>
    </div>
  );
};

export default ErrorPage;