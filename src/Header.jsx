import { Link } from "react-router-dom";


function Header() {


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
          <Link  to="/allusers">
            <button className="allUsers" >All Users</button>
          </Link>
        </div>
      </header>
    </div>
  )
}


export default Header