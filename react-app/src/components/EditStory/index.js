import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from "react-router-dom";
import * as storyActions from '../../store/stories';
import { CreateStory } from "../CreateStory";

export const EditStory = () => {
    const dispatch = useDispatch();
    const {storyId} = useParams();
    const singleStory = useSelector(state => state.stories.singleStory);

    useEffect(() => {
        dispatch(storyActions.thunkGetSingleStory(storyId))
    }, [dispatch]);

    return (
        <CreateStory story={singleStory} formType={"Update"}/>
    )
}
