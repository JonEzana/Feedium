import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from "react-router-dom";
import * as storyActions from '../../store/stories';
import { CreateStory } from "../CreateStory";

export const EditStory = () => {
    const dispatch = useDispatch();
    const {storyId} = useParams();
    const singleStory = useSelector(state => state.stories.allStories[storyId]);

    const storyimgs = [];
    if (singleStory) {
        if (singleStory.imageUrl_1) storyimgs.push(singleStory.imageUrl_1)
        if (singleStory.imageUrl_2) storyimgs.push(singleStory.imageUrl_2)
        if (singleStory.imageUrl_3) storyimgs.push(singleStory.imageUrl_3)
        if (singleStory.imageUrl_4) storyimgs.push(singleStory.imageUrl_4)
    }
    let [storyUrl, setStoryUrl] = useState(storyimgs)
    const [uploadSize, setUploadSize] = useState(storyUrl.length > 0 ? (4 - storyUrl.length) : 4);

    useEffect(() => {
        dispatch(storyActions.thunkGetSingleStory(storyId))
    }, [dispatch]);

   return (
        <CreateStory
            story={singleStory}
            storyUrl={storyUrl}
            setStoryUrl={setStoryUrl}
            formType={"Update"}
            uploadSize={uploadSize}
            setUploadSize={setUploadSize}
        />
    )
}
