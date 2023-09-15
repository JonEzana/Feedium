import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, NavLink, Link } from "react-router-dom";
import { thunkGetMostPopularStories } from "../../store/stories";
import "./LandingPage.css"
import {TrendingStoryCard} from "./TrendingStoryCard";
import OpenModalButton from "../OpenModalButton";
import SignupFormModal from "../SignupFormModal";

export const LandingPage = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const stories = useSelector(state => state.stories.hotStories);

    const upcomingFeature = () => {
        window.alert('Feature Coming Soon...');
    };

    useEffect(() => {
        dispatch(thunkGetMostPopularStories())
    }, [dispatch]);

    if (!stories.length) return <></>;

    return (
        <div className="landing_page_container">
            <div className="lp_text_box lp">
                <div className="byline_and_button">
                    <div className="words_btn">
                        <h1>Stay hungry.</h1>
                        <h3>Discover recipies, restaurants, and dish ideas from writers who appreciate great cuisine.</h3>
                        <OpenModalButton
                            className="start_reading_button"
							buttonText="Start Reading"
							modalComponent={<SignupFormModal />}
							// style={{backgroundColor: "black", color: "white", height: "50px", width: "250px", fontSize: "20px", borderRadius: "30px", border: "none"}}
						/>
                    </div>
                </div>
                <div className="m-field">
                    <h1>figure out M thing</h1>
                </div>
            </div>
            <div className="trending_stories">
                <span style={{display: "flex", flexDirection: "row", alignItems: "center", gap: "10px"}}>
                    <span className="material-symbols-outlined trending">trending_up</span>
                    <p className="bottom_div_p">Trending on Feedium</p>
                </span>
                <div className="story_card_container">
                    {stories.map(story =>
                        <div key={story.id} onClick={() => history.push(`/stories/${story.id}`)} className={`_${stories.indexOf(story)} story`}>
                            <TrendingStoryCard story={story} stories={stories} />
                        </div>
                    )}
                </div>
            </div>
            <div style={{height: "600px"}}>
                <p style={{fontSize: "30px", textAlign: "center", marginTop: "20%"}}>Something else here</p>
            </div>
        </div>
    )
}
