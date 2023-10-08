import React from 'react';
import { NavLink } from 'react-router-dom';
import "./ProfilePage.css";

export const ProfileNavBar = ({ user }) => {
    const userStoryUrl = (id) => {
        return `/users/${id}/stories`
    }
    const userSnapsUrl = (id) => {
        return `/users/${id}/likes`
    }

    return (
        <div className='profile-nav-div'>
            <div className='profile-nav-span-container'>
                <span className='profile-nav-span'>
                    <NavLink to={userStoryUrl(user?.id)} className="navlink" activeClassName="profile-navlink">Stories</NavLink>
                    <NavLink to={userSnapsUrl(user?.id)} className="navlink" activeClassName="profile-navlink">Likes</NavLink>
                </span>
            </div>
        </div>
    )
}
