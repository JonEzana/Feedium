import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkGetAllStories } from "../../store/stories";
import { AllStoryContainer } from "./AllStoryContainer";
import { useHistory } from "react-router-dom";
import "./SignedInLandingPage.css";
import { thunkGetAllUsers } from "../../store/users";
import { thunkGetSnaps } from "../../store/snaps";

export const AllStories = ({ topicStories, queriedStories, query }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const currUser = useSelector(state => state.session.user);
    const users = useSelector(state => state.users.allUsers);
    let stories = Object.values(useSelector(state => state.stories.allStories));
    const snaps = useSelector(state => state.snaps.allSnaps);

    useEffect(() => {
        dispatch(thunkGetAllUsers())
        .then(() => dispatch(thunkGetAllStories()))
        .then(() => dispatch(thunkGetSnaps()))
    }, [dispatch]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const storyContainerClassname = currUser
        ? "signedin-landingpage-container"
        : "signedin-landingpage-container add-margin"

    if (!stories.length) return <></>;
    if (topicStories) stories = topicStories;
    if (queriedStories) stories = queriedStories;

    return (
        <>
       {stories.length > 0 ?
            (<div className={storyContainerClassname}>
                {query && <p className="query-display-message">Displaying {stories.length} {stories.length > 1 ? "results" : "result"} for "{query}"</p>}
                <div className="every-story-container">
                    {stories.toReversed().map(story =>
                        <div className="story_container" key={story.id} onClick={() => history.push(`/stories/${story.id}`)}>
                            <AllStoryContainer story={story} />
                        </div>
                    )}
                </div>
            </div>)
            :
            (<p className="query-display-message">No results found for "{query}"</p>)
        }
        </>
    )
}
