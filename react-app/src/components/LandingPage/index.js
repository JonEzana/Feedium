import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import * as storyActions from "../../store/stories";
import { thunkGetAllTopics } from "../../store/topics";
import {TrendingStoryCard} from "./TrendingStoryCard";
import OpenModalButton from "../OpenModalButton";
import SignupFormModal from "../SignupFormModal";
import { TopicCard } from "./TopicCard";
import { Loading } from "../Loading";
import "./LandingPage.css"

export const LandingPage = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();
    console.log('LOCATION!!!: ', location)
    const hotStories = useSelector(state => state.stories.hotStories);
    const topics = Object.values(useSelector(state => state.topics.allTopics))
    const allStories = Object.values(useSelector(state => state.stories.allStories));
    const [loading, setLoading] = useState(true);

    const foodImg = <img src="https://feedium-bucket.s3.amazonaws.com/favicon2.png" style={{height: '25px', width: '25px'}} />;
    const foodArr = new Array(200).fill(foodImg);

    const generateBlinkLag = (min, max) => {
        return Math.floor(Math.random() * (max - min) + min);
    }

    useEffect(() => {
        dispatch(storyActions.thunkGetMostPopularStories())
        .then(() => dispatch(storyActions.thunkGetAllStories()))
        .then(() => dispatch(thunkGetAllTopics()))
        .then(() => setLoading(false))
    }, [dispatch]);

    // if (!hotStories.length) return null;
    // if (!allStories.length) return null;

    return (
        <>
            { loading ? ( <Loading /> ) :
            (<div className="landing_page_container">
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
                        {hotStories.map(story =>
                            <div key={story.id} onClick={() => history.push(`/stories/${story.id}`)} className={`_${hotStories.indexOf(story)} story`}>
                                <TrendingStoryCard story={story} stories={hotStories} type={'hot'} />
                            </div>
                        )}
                    </div>
                </div>
                <hr className="hr"/>
                <div className="landing-bottom-half">
                    <div className="allStories-container">
                        {allStories.map(story =>
                            <div key={story.id} className="allstory-item" onClick={() => history.push(`/stories/${story.id}`)} >
                                <TrendingStoryCard story={story} type={'all'}/>
                            </div>
                        )}
                    </div>
                    <div className="topics-container">
                        <p className="discover-tag">Discover more of what matters to you</p>
                        <div className="topics">
                            {topics.map(topic =>
                                <div id={topic.id} onClick={() => history.push(`/topics/${topic.id}`)}>
                                    <TopicCard topic={topic} />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                </div>)}
        </>
    )
}
