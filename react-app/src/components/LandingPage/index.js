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

    const foodImg = <img src="https://feedium-bucket.s3.amazonaws.com/favicon2.png" style={{height: '25px', width: '25px'}} />;
    const foodArr = new Array(200).fill(foodImg);

    const generateBlinkLag = (min, max) => {
        return Math.floor(Math.random() * (max - min) + min);
    }

    useEffect(() => {
        dispatch(thunkGetMostPopularStories())
    }, [dispatch]);

    if (!stories.length) return <></>;

    return (
        <div className="landing_page_container">
            <div className="lp_text_box lp">
                <div className="byline_and_button">
                    <div className="words_btn">
                        <p>Stay hungry.</p>
                        <p>Discover recipies, restaurants, and thought pieces from writers who appreciate great cuisine.</p>
                        <OpenModalButton
                            className="start_reading_button"
							buttonText="Start Reading"
							modalComponent={<SignupFormModal />}
						/>
                    </div>
                </div>
                <span className="food-field">
                    {foodArr.map((x, i) =>
                        <p key={i} className="food-icon" style={{animation: `${generateBlinkLag(3,30)}s infinite blinking steps(5, start)`}}>{x}</p>
                    )}
                </span>
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
                <p style={{fontSize: "30px", textAlign: "center", marginTop: "20%"}}>Topics coming soon!</p>
            </div>
        </div>
    )
}
