import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkGetAllStories } from "../../store/stories";
import { AllStoryContainer } from "./AllStoryContainer";
import { useHistory } from "react-router-dom";
import "./SignedInLandingPage.css";

export const SignedInLandingPage = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const stories = Object.values(useSelector(state => state.stories.allStories));

    useEffect(() => {
        dispatch(thunkGetAllStories())
    }, [dispatch])

    if (!stories.length) return <></>;

    return (
        <div>
            {stories.map(story =>
                <div className="story_container" key={story.id} onClick={() => history.push(`/stories/${story.id}`)}>
                    <AllStoryContainer story={story} />
                </div>
            )}
        </div>
    )
}
