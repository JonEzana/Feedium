import React, { useState, useEffect } from 'react';
import { Link, userHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import './Navigation.css';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import ProfileButton from "./ProfileButton";

function Navigation({ isLoaded }){
	const sessionUser = useSelector(state => state.session.user);
	const history = useHistory();
	const [transition, setTransition] = useState(false);

	const goHome = () => {
		sessionUser ? history.push("/all") : history.push("/");
	}

	const upcomingFeature = () => {
        window.alert('Feature Coming Soon...');
    }

	const bgColor = () => {
		window.scrollY >= 500 ? setTransition(true) : setTransition(false);
	}

	useEffect(() => {
		bgColor();
		window.addEventListener("scroll", bgColor)
	}, [window.scrollY, transition])

	return (
		// <ul>
		// 	<li>
		// 		<NavLink exact to={homeUrl(sessionUser)}>Home</NavLink>
		// 	</li>
		// 	{isLoaded && (
		// 		<li>
		// 		</li>
		// 	)}
		// </ul>
		<div>
			{ sessionUser ? (
				<div className="loggedin_navbar">
					<div className="loggedin_left" style={{display: "flex", flexDirection: "row", alignContent: "center"}}>
						<p>Logo</p>
						<span>
							<i className="fas fa-search"></i>
							<input type="text" placeholder="Search Feedium"></input>
						</span>
					</div>
					<div className="loggedin_right">
						<ProfileButton user={sessionUser} />
					</div>
				</div>
			) : (
				<div className={transition ? "lp_header active" : "lp_header"}>
					<div className="lp_logo">
						<p>Logo</p>
						<p className="site_name" onClick={goHome}>Feedium</p>
					</div>
					<div className="lp_links">
						<Link onClick={upcomingFeature} className="lp_link">Our Story</Link>
						<Link onClick={upcomingFeature} className="lp_link">Membership</Link>
						<Link onClick={upcomingFeature} className="lp_link">Write</Link>
						<OpenModalButton
							className = "modal_btn"
							buttonText="Sign In"
							modalComponent={<LoginFormModal />}
							style={{border: "none", backgroundColor: "transparent", fontSize: "18px"}}
						/>
						<OpenModalButton
							className = "modal_btn"
							buttonText="Get Started"
							modalComponent={<SignupFormModal />}
							style={{backgroundColor: "black", color: "white", height: "45px", width: "130px", fontSize: "17px", borderRadius: "30px", border: "none"}}
						/>
					</div>
            	</div>
			)}
		</div>
	);
}

export default Navigation;
