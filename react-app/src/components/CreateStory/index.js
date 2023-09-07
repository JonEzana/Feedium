import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";
import * as storyActions from '../../store/stories';

export const CreateStory = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const stories = Object.values(useSelector(state => state.stories.allStories));
    const currUser = useSelector(state => state.session.user)
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [url, setUrl] = useState('');
    const [disabled, setDisabled] = useState(true);

    useEffect(() => {
        if (title && title.length >= 5 && body && body.length >= 5) {
            setDisabled(false)
        } else setDisabled(true);
    }, [title, body, disabled]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const storyData = {title, story_text: body};
        if (url.length > 0) storyData["image_url"] = url;
        const newStory = await dispatch(storyActions.thunkCreateStory(storyData));
        if (newStory.id) {
            await dispatch(storyActions.thunkGetSingleStory(newStory.id));
            history.push(`/users/${currUser.id}/stories/${newStory.id}`);
        } else {
            console.log('Create failed in component')
        }
    }

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
                        value={body}
                        onChange={(e) => setBody(e.target.value)}
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
