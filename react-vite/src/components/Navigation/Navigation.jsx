import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import { useSelector } from 'react-redux'; 
import "./Navigation.css";

function Navigation() {

const user = useSelector((state) => state.session.user); 

  return (
    <nav className="navbar">
      <ul className="nav-menu">
        <li className="nav-item">
          <div className="nav-text-container">
            <NavLink to="/home" className="nav-link">Home</NavLink>
          </div>
        </li>

        {user && (
          <>
            <li className="nav-item">
              <div className="nav-text-container">
                <NavLink to="/parking_spots/new" className="nav-link">Create a New Parking Spot</NavLink>
              </div>
            </li>

            <li className="nav-item">
              <div className="nav-text-container">
                <NavLink to="/aircraft/new" className="nav-link">Create an Aircraft</NavLink>
              </div>
            </li>

            <li className="nav-item">
              <div className="nav-text-container">
                <NavLink to="/aircraft/list" className="nav-link">Look at Aircraft List</NavLink>
              </div>
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
