import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }){
	const sessionUser = useSelector(state => state.session.user);

	const homeUrl = (user) => {
		let url;
		user ? url = "/all" : url = "/";
		return url;
	}

	return (
		<ul>
			<li>
				<NavLink exact to={homeUrl(sessionUser)}>Home</NavLink>
			</li>
			{isLoaded && (
				<li>
					<ProfileButton user={sessionUser} />
				</li>
			)}
		</ul>
	);
}

export default Navigation;
