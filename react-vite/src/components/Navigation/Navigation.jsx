import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import { useSelector } from 'react-redux'; 
import "./Navigation.css";

function Navigation() {

const user = useSelector((state) => state.session.user); 

if (location.pathname === '/') {
  return null;
}

  return (
    <nav className="navbar">
      <ul className="nav-menu">
        <li className="nav-item">
          <NavLink to="/home" className="nav-link">Home</NavLink>
        </li>

        {user && (
          <>
            <li className="nav-item">
              <NavLink to="/parking_spots/new" className="nav-link">Create New Parking Spot</NavLink>
            </li>

            <li className="nav-item">
              <NavLink to="/aircraft/new" className="nav-link">Create New Aircraft</NavLink>
            </li>

            <li className="nav-item">
              <NavLink to="/aircraft/list" className="nav-link">Aircraft List</NavLink>
            </li>
          </>
        )}

        <li className="nav-item nav-item-right">
          <ProfileButton />
        </li>
      </ul>
    </nav>
  );
}


export default Navigation;
