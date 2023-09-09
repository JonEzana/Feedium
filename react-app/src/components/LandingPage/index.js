import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, NavLink, Link } from "react-router-dom";
import { thunkGetMostPopularStories } from "../../store/stories";
import "../../styles/LandingPage.css"
import {TrendingStoryCard} from "./TrendingStoryCard";

export const LandingPage = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const stories = useSelector(state => state.stories.hotStories);

    // const LoginTheDemoUserFunction = () => {
    //     const email = 'demo@aa.io';
    //     const password = 'password';
    //     return dispatch(sessionActions.login(email, password))
    //       .then (() => history.push('/all'))
    //       .catch(async (res) => {
    //         const data = await res.json();
    //       });
    //   }

    const upcomingFeature = () => {
        window.alert('Feature Coming Soon...');
    };

    useEffect(() => {
        dispatch(thunkGetMostPopularStories())
    }, [dispatch]);

    if (!stories.length) return <></>;

    return (
        <div className="landing_page_container">
            <div className="lp_header lp">
                <div className="lp_logo">
                    <p>Logo</p>
                    <p className="site_name">Feedium</p>
                </div>
                <div className="lp_links">
                    <Link onClick={upcomingFeature} className="lp_link">Our Story</Link>
                    <Link onClick={upcomingFeature} className="lp_link">Membership</Link>
                    <Link onClick={upcomingFeature} className="lp_link">Write</Link>
                    <Link onClick={upcomingFeature} className="lp_link">Sign In</Link>
                    <button className="get_started_button" onClick={upcomingFeature}>Get Started</button>
                </div>
            </div>
            <div className="lp_text_box lp">
                <div className="byline_and_button">
                    <div className="words_btn">
                        <h1>Stay hungry.</h1>
                        <h3>Discover recipies, restaurants, and dish ideas from writers who appreciate great cuisine.</h3>
                        <button className="start_reading_button" onClick={upcomingFeature}>Start Reading</button>
                    </div>
                </div>
                <div className="m-field">
                    <h1>figure out M thing</h1>
                </div>
            </div>
            <div className="lp_story_topics_container lp">
                <div className="trending_stories">
                    <>
                        <p className="bottom_div_p">Trending on Feedium</p>
                        {stories.map(story =>
                            <div key={story.id} className="story_card" onClick={() => history.push(`/stories/${story.id}`)}>
                                <TrendingStoryCard story={story} stories={stories} />
                            </div>
                        )}
                    </>
                </div>
                <div className="topics">
                    <p className="bottom_div_p">Discover more of what matters to you</p>
                </div>
            </div>
        </div>
    )
}
