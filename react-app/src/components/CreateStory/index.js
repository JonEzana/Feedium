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
    let [urlArr, setUrlArr] = useState(story && story.urlArr ? story.urlArr : []);
    // let [url2, setUrl2] = useState(story && story.url2 ? story.url2 : null);
    // let [url3, setUrl3] = useState(story && story.url3 ? story.url3 : null);
    // let [url4, setUrl4] = useState(story && story.url4 ? story.url4 : null);
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

        const formData = new FormData();
        const imgFormData = new FormData();

        formData.append("title", title);
        formData.append("story_text", storyText);

        if (urlArr.length) {
            urlArr.forEach((url, i )=> {
                imgFormData.append(`image_url${i + 1}`, url)
            })
        }

        if (formType === "Update") {
            formData.append('id', story.id);
            formData.append('user_id', story.userId);
            formData.append('snap_count', story.snapCount);
            formData.append('user', story.user);

            const updatedStory = await dispatch(storyActions.thunkUpdateStory(formData, imgFormData, story.id));

            if (updatedStory.id) {
                await dispatch(storyActions.thunkGetAllStories());
                history.push(`/stories/${updatedStory.id}`);
            }
        } else {
            const newStory = await dispatch(storyActions.thunkCreateStory(formData, imgFormData));
            if (newStory.id) {
                await dispatch(storyActions.thunkGetAllStories());
                history.push(`/stories/${newStory.id}`);
            } else {
                console.log('Create story failed in component')
            }
        }
    }

    if (formType === "Update" && !Object.values(story)) return <></>;

    return (
        <div className='create_page_container'>
            <div className="create_page_header"></div>
            <div className="create_page_body">
                <form onSubmit={handleSubmit} encType="multipart/form-data">
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
                    <label>
                        Upload up to 4 images
                        <input
                            className=""
                            type="file"
                            onChange={(e) => setUrlArr(Array.prototype.slice.call(e.target.files))}
                            accept="image/png, image/jpeg, image/jpg, image/gif, image/pdf"
                            multiple={true}
                            />
                    </label>
                    {/* <input
						className=""
						type="file"
						onChange={(e) => setUrl2(e.target.files[0])}
						accept="image/png, image/jpeg, image/jpg, image/gif, image/pdf"
					/>
                    <input
						className=""
						type="file"
						onChange={(e) => setUrl3(e.target.files[0])}
						accept="image/png, image/jpeg, image/jpg, image/gif, image/pdf"
					/>
                    <input
						className=""
						type="file"
						onChange={(e) => setUrl4(e.target.files[0])}
						accept="image/png, image/jpeg, image/jpg, image/gif, image/pdf"
					/> */}
                <button type="submit" disabled={disabled}>Publish</button>
                </form>
            </div>
        </div>
    )
}
