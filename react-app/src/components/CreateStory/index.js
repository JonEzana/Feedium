import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams } from "react-router-dom";
import * as storyActions from '../../store/stories';
import  Navigation  from '../Navigation';
import "./CreateStory.css";

export const CreateStory = ({story, storyUrl, setStoryUrl, uploadSize, setUploadSize, formType}) => {
    const history = useHistory();
    const dispatch = useDispatch();
    const {storyId} = useParams();
    let singleStory = Object.values(useSelector(state => state.stories.singleStory));
    let [title, setTitle] = useState(story ? story.title : '');
    let [storyText, setStoryText] = useState(story ? story.storyText : '');
    let [urlArr, setUrlArr] = useState(story && story.urlArr ? story.urlArr : []);
    const [disabled, setDisabled] = useState(true);
    const [valObj, setValObj] = useState({});
    const [isTitle2Short, setIsTitle2Short] = useState(true);
    const [isStory2Short, setIsStory2Short] = useState(true);
    const [titlecolor, setTitlecolor] = useState('red');
    const [storycolor, setStoryColor] = useState('red');

    const backgroundImageStyle = (imageUrl) => {
        return {
            backgroundImage: `url(${imageUrl})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            height: "100px",
            width: "100px",
            borderRadius: "10px"
        }
    }

    const changeTextColor = (e, val) => {
        if (val) {
            return e.target.style.color = "red"
        } else {
            return e.target.style.color = "black"
        }
    }

    useEffect(() => {
        const errObj = {};
        if (title && title.length >= 5 && storyText && storyText.length >= 5) {
            setDisabled(false)
        } else setDisabled(true);

        if (title && title.length >= 5) {
            setTitlecolor('black')
        } else setTitlecolor('red');

        if (storyText && storyText.length >= 5) {
            setStoryColor('black')
        } else setStoryColor('red')

        setValObj(errObj)
    }, [title.length, storyText.length, disabled]);

    useEffect(() => {
        dispatch(storyActions.thunkGetSingleStory(storyId))
    }, [dispatch])

    // const handleTitleFocus = () => {
    //     let style;
    //     title && title.length < 5 ? style = "1px solid red" : style = "none"
    //     return style;
    // }

    // const handleStoryTextFocus = () => {
    //     let style;
    //     storyText && storyText.length < 5 ? style = "1px solid red" : style = "none"
    //     return style;
    // }

    const handleSubmit = async (e) => {
        e.preventDefault();

        let offset;

        const formData = new FormData();
        const imgFormData = new FormData();
        formData.append("title", title);
        formData.append("story_text", storyText);

        if (formType === "Update") {
            delete formData.delete('image_url_1')
            delete formData.delete('image_url_2')
            delete formData.delete('image_url_3')
            delete formData.delete('image_url_4')

            if (storyUrl.length > 0) {
                storyUrl.forEach((url, i) => {
                    formData.append(`image_url_${i + 1}`, url)
                });
            }

            if (urlArr.length) {
                let remainingSlots;
                if (storyUrl && storyUrl.length > 0) {
                    remainingSlots = 4 - storyUrl.length;
                } else {
                    remainingSlots = 0;
                }
                urlArr.forEach((url)=> {
                    console.log('URL!!!!!', url)
                    while (remainingSlots < 4) {
                        remainingSlots += 1;
                        imgFormData.append(`image_url${remainingSlots}`, url)
                    }
                })
            }
            formData.append('id', story.id);
            formData.append('user_id', story.userId);
            formData.append('snap_count', story.snapCount);
            formData.append('user', story.user);

            offset = storyUrl.length;
            const updatedStory = await dispatch(storyActions.thunkUpdateStory(formData, imgFormData, story.id, offset));
            if (updatedStory.id) {
                await dispatch(storyActions.thunkGetAllStories());
                history.push(`/stories/${updatedStory.id}`);
            } else {
                console.log('update failed')
            }
        } else {
            if (urlArr.length) {
                urlArr.forEach((url, i )=> {
                    imgFormData.append(`image_url${i + 1}`, url)
                })
            }
            offset = 0;
            const newStory = await dispatch(storyActions.thunkCreateStory(formData, imgFormData, offset));
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
            {/* <Navigation pageType="create" type="submit" form="story-form" disabled={disabled} /> */}
            {/* <button type="submit" form="story-form" disabled={disabled}>Publish</button> */}
            <div className="create_page_body" style={{width: "90vw"}}>
                <form onSubmit={handleSubmit} encType="multipart/form-data" className="create-story-form" id='story-form'>
                    { !formType &&
                        <span className="add-img-span">
                            <label
                                className='add-images-label'
                                for='images-upload'
                            >
                                <span className="material-symbols-outlined plus">add_circle</span>
                            </label>
                                <input
                                    id="images-upload"
                                    className=""
                                    type="file"
                                    onChange={(e) => setUrlArr(Array.prototype.slice.call(e.target.files))}
                                    accept="image/png, image/jpeg, image/jpg, image/gif, image/pdf"
                                    multiple={true}
                                    hidden
                                    />
                        </span>
                    }
                    <span className="input-fields-span">
                        <textarea
                            type="textarea"
                            placeholder="Title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                            className="input-field_ _1"
                            rows="5"
                            // onFocus={ e => changeTextColor(e, isTitle2Short)}
                            style={{height: "60px", color: `${titlecolor}`}}
                            />
                            {urlArr.length > 0 && <em style={{marginBottom: "10px"}}>{urlArr.length} attachments.</em>}
                        <textarea
                            type="textarea"
                            placeholder="Tell your story..."
                            value={storyText}
                            onChange={(e) => setStoryText(e.target.value)}
                            required
                            className="input-field_ _2"
                            rows="50"
                            // onFocus={(e) => {
                            //     if (isStory2Short) {
                            //         e.target.style.border = "1px solid red"
                            //     } else {
                            //         e.target.style.border = '1px solid black'
                            //     }
                            // }}
                            style={{color: `${storycolor}`}}
                            />
                    </span>
                    {valObj.urlArr && <p className="errors">{valObj.urlArr}</p>}
                    <div className={story ? "old-photos" : "hidden"}>
                        {storyUrl && storyUrl.length > 0 && storyUrl.map(pic =>
                            <span key={pic} style={backgroundImageStyle(pic)}>
                                <input
                                    type="checkbox"
                                    checked={storyUrl.includes(pic)}
                                    value={pic}
                                    onChange={(e) => {
                                        storyUrl.splice(storyUrl.indexOf(e.target.value), 1);
                                        setStoryUrl([...storyUrl]);
                                        setUploadSize((prev) => prev += 1)
                                    }}
                                />
                            </span>
                        )}
                    </div>
                </form>
            </div>
        </div>
    )
}
