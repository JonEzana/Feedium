import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory, useLocation, Link } from 'react-router-dom';
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import ProfileButton from "./ProfileButton";
import './Navigation.css';

function Navigation({ isLoaded }){
	const sessionUser = useSelector(state => state.session.user);
	const history = useHistory();
	const location = useLocation();
	const [transition, setTransition] = useState(false);
	const [query, setQuery] = useState('');

	const goHome = () => {
		sessionUser ? history.push("/all") : history.push("/");
	}
	const bgColor = () => {
		window.scrollY >= 500 ? setTransition(true) : setTransition(false);
	}
	const handleeSearch = (e) => {
		e.preventDefault();
		setQuery('');
		history.push(`/search/${query}`)
	}

	useEffect(() => {
		bgColor();
		window.addEventListener("scroll", bgColor);
	}, [window.scrollY, transition]);

	if (sessionUser && (location.pathname === '/new-story' || location.pathname.includes('/edit'))) {
		return (
			<div className="loggedin_navbar" style={{justifyContent: "center"}}>
					<div className="loggedin_left">
						<span class="material-symbols-outlined logo" onClick={goHome} >lunch_dining</span>
						<p>Draft in {sessionUser.firstName} {sessionUser.lastName}</p>
					</div>
					<div className="loggedin_right">
						<button type="submit" form="story-form" className="submit-story-button">Publish</button>
						{/* <OpenModalButton
							className = "modal_btn"
							buttonText="Publish"
							modalComponent={<SignupFormModal />}
							style={{border: "none", backgroundColor: "rgb(26, 137, 23)", color: "white", height: "30px", width: "70px", borderRadius: "20px"}}
						/> */}
						<div className="pro-pic-container">
							<ProfileButton user={sessionUser} style={{border: "none", backgroundColor: "transparent", marginLeft:"0px", width: "fit-content"}}/>
						</div>
					</div>
				</div>
		)
	}

	return (
		<div>
			{ sessionUser ? (
				<div className="loggedin_navbar">
					<div className="loggedin_left">
					<span class="material-symbols-outlined logo" onClick={goHome} >lunch_dining</span>
						<span className="searchbar">
							<i className="fas fa-search" style={{color: "#828282", alignSelf: "center", position: "absolute", marginLeft: "0.6%", zIndex: "2", marginTop: "13px"}}></i>
							<form onSubmit={handleeSearch}>
								<input
									type="text"
									placeholder="Search Feedium"
									value={query}
									onKeyDown={(e) => {
										if (e.key === "Enter") history.push(`/search/${query}`)
									}}
									onChange={(e) => setQuery(e.target.value)}
								/>
							</form>
							{/* <input type="text" style={{border: "none", borderRadius: "20px", backgroundColor: "#f4f4f4", height: "40px", width: "192px"}}></input>
							<label style={{position: "relative", zIndex: "2", marginLeft: "-52%", color: "#828282"}}>Search Feedium</label> */}
						</span>
					</div>
					<div className="loggedin_right">
						<div className="new_story_button" onClick={() => history.push('/new-story')}>
							<span  class="material-symbols-outlined write">edit_square</span>
							<p style={{marginTop: "15px"}}>Write</p>
						</div>
						{/* <i className="far fa-bell" onClick={upcomingFeature} style={{fontSize: "25px", color: "#828282"}}></i> */}
						<div className="pro-pic-container">
							<ProfileButton user={sessionUser} style={{border: "none", backgroundColor: "transparent"}}/>
						</div>
					</div>
				</div>
			) : (
				<div className={transition ? "lp_header active" : "lp_header"}>
					<div className="lp_logo" onClick={goHome}>
						<img className="logo-img" src="https://feedium-bucket.s3.amazonaws.com/LOGO.png" />
						<p className="site_name">Feedium</p>
					</div>
					<div className="lp_links">
						<OpenModalButton
							className = "modal_btn"
							buttonText="Write"
							modalComponent={<SignupFormModal />}
							style={{border: "none", backgroundColor: "transparent", fontSize: "20px"}}
						/>
						<OpenModalButton
							className = "modal_btn"
							buttonText="Sign In"
							modalComponent={<LoginFormModal />}
							style={{border: "none", backgroundColor: "transparent", fontSize: "20px"}}
						/>
						<OpenModalButton
							className = {transition ? "active-button modal_btn get-started" : "modal_btn get-started"}
							buttonText="Get Started"
							modalComponent={<SignupFormModal />}
						/>
					</div>
            	</div>
			)}
		</div>
	);
}

export default Navigation;
