import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import { Link } from 'react-router-dom';
import "./Navigation.css";

function Navigation() {
  return (
    <ul>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>

      <li>
        <ProfileButton />
        <button><Link to="/parking_spots/new">Create a New Parking Spot</Link></button>
        <button><Link to="/aircraft/new">Create a Aircraft</Link></button>
      </li>
    </ul>
  );
}

export default Navigation;
