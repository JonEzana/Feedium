import React from "react";
import { useHistory, NavLink, Link } from "react-router-dom";
import * as sessionActions from '../../store/session';
import { useDispatch } from "react-redux";
import "../../styles/LandingPage.css"

export const LandingPage = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const LoginTheDemoUserFunction = () => {
        const email = 'demo@aa.io';
        const password = 'password';
        return dispatch(sessionActions.login(email, password))
          .then (() => history.push('/all'))
          .catch(async (res) => {
            const data = await res.json();
          });
      }

    return (
        <div className="landing_page_container">
            <div className="lp_header lp">
                <div className="lp_logo">
                    <p>Logo</p>
                    <p className="site_name">Feedium</p>
                </div>
                <div className="lp_links">
                    <NavLink to="/about" className="lp_link">Our Story</NavLink>
                    <Link onClick={LoginTheDemoUserFunction} className="lp_link">Membership</Link>
                    <Link onClick={LoginTheDemoUserFunction} className="lp_link">Write</Link>
                    <Link onClick={LoginTheDemoUserFunction} className="lp_link">Sign In</Link>
                    <button className="get_started_button">Get Started</button>
                </div>
            </div>
            <div className="lp_text_box lp">
                <div className="byline_and_button">
                    <div className="words_btn">
                        <h1>Stay hungry.</h1>
                        <h3>Discover recipies, restaurants, and dish ideas from writers who appreciate great cuisine.</h3>
                        <button className="start_reading_button">Start Reading</button>
                    </div>
                </div>
                <div className="m-field">
                    <h1>figure out M thing</h1>
                </div>
            </div>
            <div className="lp_story_topics_container lp">
                <div className="trending_stories">
                    <p className="bottom_div_p">Trending on Feedium</p>
                    <div>STORIES HERE</div>
                </div>
                <div className="topics">
                    <p className="bottom_div_p">Discover more of what matters to you</p>
                </div>
            </div>
        </div>
    )
}
