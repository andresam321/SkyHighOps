import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaUserCircle } from 'react-icons/fa';
import { thunkLogout } from "../../redux/session";
import OpenModalMenuItem from "./OpenModalMenuItem";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import { NavLink, useNavigate } from "react-router-dom";


import "./ProfileButton.css"

function ProfileButton() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const user = useSelector((store) => store.session.user);
  console.log("line 14 user", user)
  const ulRef = useRef();

  const toggleMenu = (e) => {
    e.stopPropagation(); // Keep from bubbling up to document and triggering closeMenu
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (ulRef.current && !ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const closeMenu = () => setShowMenu(false);

  const logout = async (e) => {
    e.preventDefault();
    await dispatch(thunkLogout());
    closeMenu();
    navigate("/")
  };
  
  if (location.pathname === '/') {
    return null;
  }


  return (
  <div className="profile-button-container">
    <button className="profile-button" onClick={toggleMenu}>
      <FaUserCircle className="profile-icon" />
    </button>
    {showMenu && (
      <ul className={"profile-dropdown"} ref={ulRef}>
        {user ? (
          <>
            <li>Username: {user.username}</li>
            <li>Emai: {user.email}</li>
            <li>Employee ID: {user.employee_id.slice(0, 4)}</li>
            <li>
              <button className="logout-button" onClick={logout}>Log Out</button>
            </li>
          </>
        ) : (
          <>
            <>
          <NavLink className="btn-log" to="/">Log In</NavLink>
          </>
          </>
        )}
      </ul>
    )}
  </div>
);
}


export default ProfileButton;
