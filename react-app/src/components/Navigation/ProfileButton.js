import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../store/session";
import { useHistory } from "react-router-dom";
import "./Navigation.css";

function ProfileButton({ user }) {
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
      if (ulRef.current && !ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout())
    history.push('/');
  };

  const obscureEmail = (email) => {
    const splitEmail = email.split('@');
    let pre = `${splitEmail[0].split('').slice(0, 2).join('')}**...@${splitEmail[1]}`;
    // splitEmail[0].split('').slice(2).forEach(i => pre += "*");
    // return `${pre}@${splitEmail[1]}`;
    return pre;
  }

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

  return (
    <div className="profilepic-component">
      <span onClick={openMenu} className="pic-caret">
        <img src={user.profilePic} className="pro_pic_pro_btn"/>
				<i class="fas fa-caret-down"></i>
      </span>
      <ul className={ulClassName} ref={ulRef}>
        <span className="top-buttons">
            <span className="PROFILE menuitem" onClick={(e) => {
              e.preventDefault();
              history.push(`/users/${user.id}/stories`)
            }}>
              <span class="material-symbols-outlined itemsymbol">person</span>
              <p className="item-description">Profile</p>
            </span>
        </span>
        <span className="signout-span">
          <button onClick={handleLogout} className="signoutbutton">Sign Out</button>
          <li className="user-email">{obscureEmail(user.email)}</li>
        </span>
      </ul>
    </div>
  );
}

export default ProfileButton;
