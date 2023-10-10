import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import * as storyActions from "../../store/stories";
import { thunkGetAllTopics } from "../../store/topics";
import {TrendingStoryCard} from "./TrendingStoryCard";
import OpenModalButton from "../OpenModalButton";
import SignupFormModal from "../SignupFormModal";
import { TopicCard } from "./TopicCard";
import { thunkGetAllUsers } from "../../store/users";
import "./LandingPage.css"

export const LandingPage = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const hotStories = useSelector(state => state.stories.hotStories);
    let topics = Object.values(useSelector(state => state.topics.allTopics))
    const allStories = Object.values(useSelector(state => state.stories.allStories));
    const users = Object.values(useSelector(state => state.users.allUsers))
    const [loading, setLoading] = useState(true);
    const currUser = useSelector(state => state.session.user)

    const [showAllTopics, setShowAllTopics] = useState(false);
    if (!showAllTopics) topics = topics.slice(0, 9);

    const foodImg = <img src="https://feedium-bucket.s3.amazonaws.com/favicon2.png" style={{height: '25px', width: '25px'}} />;
    const foodArr = new Array(200).fill(foodImg);

    const generateBlinkLag = (min, max) => {
        return Math.floor(Math.random() * (max - min) + min);
    }


    useEffect(() => {
        dispatch(storyActions.thunkGetMostPopularStories())
        .then(() => dispatch(storyActions.thunkGetAllStories()))
        .then(() => dispatch(thunkGetAllTopics()))
        .then(() => dispatch(thunkGetAllUsers()))
        .then(() => setLoading(false))
    }, [dispatch]);

    return (
        <>
            { loading ? ( <></> ) :
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
                        {foodArr.map((x, idx) =>
                            <p key={idx} className="food-icon" style={{animation: `${generateBlinkLag(3,30)}s infinite blinking steps(5, start)`}}>{x}</p>
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
                                <TrendingStoryCard story={story} stories={hotStories} user={story.User} type={'hot'} />
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
                            {showAllTopics ?
                                (<span className="show-topics" onClick={() => setShowAllTopics(false)}>Collapse topics ^</span>)
                                :
                                (<span className="show-topics" onClick={() => setShowAllTopics(true)}>Show all topics ⌄</span>)
                            }
                        </div>
                    </div>
                </div>
            </div>)}
        </>
    )
}
