import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams } from "react-router-dom";
import * as storyActions from '../../store/stories';

export const CreateStory = ({story, formType}) => {
    const history = useHistory();
    const dispatch = useDispatch();
    const {storyId} = useParams();
    let singleStory = Object.values(useSelector(state => state.stories.singleStory));
    let [title, setTitle] = useState(story ? story.title : '');
    let [storyText, setStoryText] = useState(story ? story.storyText : '');
    let [url, setUrl] = useState(story && story.url ? story.url : '');
    const [disabled, setDisabled] = useState(true);

    useEffect(() => {
        if (title && title.length >= 5 && storyText && storyText.length >= 5) {
            setDisabled(false)
        } else setDisabled(true);
    }, [title, storyText, disabled]);

    useEffect(() => {
        dispatch(storyActions.thunkGetSingleStory(storyId))
    }, [dispatch])

    const handleSubmit = async (e) => {
        e.preventDefault();

        const storyData = {title, story_text: storyText};
        if (url.length > 0) storyData["image_url"] = url;

        if (formType === "Update") {
            storyData["id"] = story.id;
            storyData["user"] = story.user;
            storyData["user_id"] = story.userId;
            const updatedStory = await dispatch(storyActions.thunkUpdateStory({...storyData}));

            if (updatedStory.id) {
                await dispatch(storyActions.thunkGetAllStories());
                history.push(`/stories/${updatedStory.id}`);
            }
        }

        const newStory = await dispatch(storyActions.thunkCreateStory(storyData));
        if (newStory.id) {
            await dispatch(storyActions.thunkGetAllStories());
            history.push(`/stories/${newStory.id}`);
        } else {
            console.log('Create failed in component')
        }
    }

    if (formType === "Update" && !Object.values(story)) return <></>;

    return (
        <div className='create_page_container'>
            <div className="create_page_header"></div>
            <div className="create_page_body">
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                    <input
                        type="text"
                        placeholder="Tell your story..."
                        value={storyText}
                        onChange={(e) => setStoryText(e.target.value)}
                        required
                    />
                    <input
                        type="url"
                        placeholder="Add a photo (optional)"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        accept="*./png, *./jpeg, *./jpg"
                    />
                <button type="submit" disabled={disabled}>Publish</button>
                </form>
            </div>
        </div>
    )
}
