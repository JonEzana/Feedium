import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { thunkGetSingleStory } from "../../store/stories";
import OpenCommentModalButton from "../OpenCommentModalButton";
import OpenModalButton from "../OpenModalButton";
import { DeleteStoryOrComment } from "../DeleteStoryOrComment";
import { thunkCommentsByStoryId } from "../../store/comments";
import {CommentsModalComponent} from "../CommentsModalComponent";
import { convertDate } from "../../helpers";

import "./StoryDisplay.css";

export const StoryDisplay = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const {storyId} = useParams();
    const singleStory = useSelector(state => state.stories.singleStory);
    const currUser = useSelector(state => state.session.user);
    const comments = Object.values(useSelector(state => state.comments.storyComments));
    const [clicked, setClicked] = useState(false);
    const [shown, setShown] = useState(true);
    const [isUlHidden, setIsUlHidden] = useState(true);

    useEffect(() => {
        dispatch(thunkGetSingleStory(storyId))
        dispatch(thunkCommentsByStoryId(storyId))
    }, [dispatch]);

    useEffect(() => {
        clicked ? setShown(false) : setShown(true)
    }, [clicked])

    const handleStoryEdit = () => {
        history.push(`/stories/${singleStory.id}/edit`)
    }

    const handleHideUl = () => {
        isUlHidden ? setIsUlHidden(false) : setIsUlHidden(true);
    }

    let storyContainerClassname;
    currUser ? storyContainerClassname = "sd_container" : storyContainerClassname = "sd_container add-more-margin"

    if (!Object.values(singleStory).length) return <></>;

    return (
        <div style={{display: "flex", flexDirection:"row"}} onClick={() => {if (!isUlHidden) handleHideUl()}}>
            <div className="story_display_body">
                <div className={storyContainerClassname}>
                    <h1>{singleStory?.title}</h1>
                    <div className="sd_author_block">
                        <div style={{display: "flex", flexDirection: "row", gap: "20px", alignItems: "center", marginLeft: "4px", marginTop: "-20px"}}>
                            <img src={singleStory?.user?.profilePic} style={{height: "30px", width: "30px", borderRadius: "15px"}} />
                            <span style={{display: "flex", flexDirection: "column", justifyContent: "center"}}>
                                <p>By: {singleStory?.user?.firstName} {singleStory?.user?.lastName}</p>
                                <p style={{marginTop: "-12%", fontSize: "15px"}}>{convertDate(singleStory?.createdAt)}</p>
                            </span>
                        </div>

                    </div>
                    <div style={{display: "flex", margin: "15px 0 20px 0", flexDirection: "row", gap: "20px", borderTop: "1px solid rgb(231, 231, 231)", borderBottom: "1px solid rgb(231, 231, 231)", height: "47px", width: "720px"}}>
                        <span style={{display: "flex", flexDirection: "row", alignItems: "center", gap: "6px"}} className="snap-count">
                            <p>👏</p>
                            <p style={{color: "rgb(149, 149, 149)"}}>{singleStory?.snapCount}</p>
                        </span>
                        <span style={{display: "flex", flexDirection: "row", alignItems: "center", gap: '5px'}} className="comment-count">
                            <OpenCommentModalButton
                                modalComponent={ <CommentsModalComponent story={singleStory} currentUser={currUser}/>}
                                buttonText={<i className="far fa-comment fa-flip-horizontal" style={{color: "rgb(149, 149, 149)"}}></i>}
                                style={{backgroundColor: "transparent", border: "none"}}
                                className="comment-icon"
                            />
                            <p style={{color: "rgb(149, 149, 149)"}}>{comments.length}</p>
                        </span>
                       {currUser && currUser.id === singleStory?.userId &&
                            <>
                                <button onClick={handleHideUl} className="ellipsis-button"><i className="fas fa-ellipsis-h"></i></button>
                                <span className="pointed-border"></span>
                                <span className={isUlHidden ? "hidden" : "options-span"}>
                                    <button className="edit-story-button" onClick={handleStoryEdit}>Edit Story</button>
                                    <OpenModalButton
                                        modalComponent={ <DeleteStoryOrComment story={singleStory} /> }
                                        buttonText={"Delete story"}
                                        className="delete-story-button"
                                    />
                                </span>
                            </>
                       }
                    </div>
                    <div className="story_images">
                            {singleStory.imageUrl_1 && <img className="story_img1 image" src={singleStory?.imageUrl_1}/>}
                            {singleStory.imageUrl_2 && <img className="story_img2 image" src={singleStory?.imageUrl_2}/>}
                            {singleStory.imageUrl_3 && <img className="story_img3 image" src={singleStory?.imageUrl_3}/>}
                            {singleStory.imageUrl_4 && <img className="story_img4 image" src={singleStory?.imageUrl_4}/>}
                        </div>
                    <div className="sd_story_body">
                        <p>{singleStory?.storyText}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
