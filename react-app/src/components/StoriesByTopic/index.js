import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import * as storyActions from "../../store/stories";
import { AllStories } from "../AllStories";

export const StoriesByTopic = () => {
    const dispatch = useDispatch();
    const {topicId} = useParams();
    const storiesByTopic = Object.values(useSelector(state => state.stories.topicStories));

    useEffect(() => {
        dispatch(storyActions.thunkGetStoriesByTopic(topicId));
    }, [dispatch]);


    if (!storiesByTopic.length) return <h1>HMMMMMM</h1>
    return (
        <AllStories topicStories={storiesByTopic} />
    )
}
