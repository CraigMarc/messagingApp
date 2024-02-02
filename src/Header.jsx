import { Link, useParams } from "react-router-dom";
import Login from './Login';

function Header(props) {

  const {

    setRerender,
    setToken

  } = props;


  const handleLogout = (event) => {
    sessionStorage.removeItem("message");
    sessionStorage.removeItem("token");

  }

  return (
    <div>
      <header>

        <Link className="heading" to="/">
          <h2>Messenger</h2>
        </Link>
        <div className="editButtonContainer" >
        <Link  to="/login">
            <button className="logout" onClick={handleLogout} >logout</button>
          </Link>
        </div>
      </header>
    </div>
  )
}


export default Header