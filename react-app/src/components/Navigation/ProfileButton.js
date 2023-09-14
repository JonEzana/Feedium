import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../store/session";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import { useHistory } from "react-router-dom";
import "./Navigation.css";

function ProfileButton({ user, style }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();
  const history = useHistory();

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
    history.push('/')
  };

  const obscureEmail = (email) => {
    const splitEmail = email.split('@');
    let pre = splitEmail[0].split('').slice(0, 2).join('');
    splitEmail[0].split('').slice(2).forEach(i => pre += "*");
    return `${pre}@${splitEmail[1]}`;
  }

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");
  const closeMenu = () => setShowMenu(false);

  return (
    <div className="profilepic-component">
      <span onClick={openMenu} className="pic-caret">
        <img src={user.profilePic} className="pro_pic_pro_btn"/>
				<i class="fas fa-caret-down"></i>
      </span>
      <ul className={ulClassName} ref={ulRef}>
        {/* <span className="top-buttons">
            <span className="PROFILE menuitem">
              <span class="material-symbols-outlined itemsymbol">person</span>
              <p className="item-description">Profile</p>
            </span>
            <span className="STORIES menuitem">
              <span class="material-symbols-outlined itemsymbol">list_alt</span>
              <p className="item-description">Stories</p>
            </span>
        </span> */}
        <span className="signout-span">
          <button onClick={handleLogout} className="signoutbutton">Sign Out</button>
          <li className="user-email">{obscureEmail(user.email)}</li>
        </span>
      </ul>
    </div>
  );
}

export default ProfileButton;
