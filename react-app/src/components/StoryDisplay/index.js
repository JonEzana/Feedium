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
import { TopicsBanner } from "../TopicsBanner";
import * as snapActions from "../../store/snaps";
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import "./StoryDisplay.css";

export const StoryDisplay = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const {storyId} = useParams();
    const singleStory = useSelector(state => state.stories.singleStory);
    const currUser = useSelector(state => state.session.user);
    const comments = Object.values(useSelector(state => state.comments.storyComments));
    const allSnaps = useSelector(state => state.snaps.allSnaps);
    let userSnaps = [];
    if (currUser) userSnaps = [...[allSnaps[currUser.id]]];
    const [liked, setLiked] = useState(userSnaps?.filter(story => story.id == storyId).length === 1 ? true : false);
    const [isUlHidden, setIsUlHidden] = useState(true);

    useEffect(() => {
        dispatch(thunkGetSingleStory(storyId))
        dispatch(thunkCommentsByStoryId(storyId))
        dispatch(snapActions.thunkGetSnaps());
    }, [dispatch]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleHideUl = () => {
        isUlHidden ? setIsUlHidden(false) : setIsUlHidden(true);
    }
    const handleVisitStory = (e, singleStory) => {
        e.preventDefault();
        if (currUser) history.push(`/users/${singleStory.user.id}/stories`)
    }
    const handleStoryEdit = () => {
        history.push(`/stories/${singleStory.id}/edit`)
    }
    const mustBeLoggedIn = () => {
        window.alert('Must be logged in to like stories');
    }
    const handleLikes = (e) => {
        e.stopPropagation();
        if (!currUser) return mustBeLoggedIn();
        dispatch(snapActions.thunkChangeSnap(storyId, currUser.id))
        .then(() => dispatch(snapActions.thunkGetSnaps()))
        .then(() => dispatch(thunkGetSingleStory(storyId)))
        .then(() => setLiked(!liked))
    }

    const storyContainerClassname = currUser
        ? "sd_container"
        : "sd_container add-more-margin";

    const hoverClassName = currUser
        ? "author-info block"
        : "author-info";

    if (!Object.values(singleStory).length) return <></>;

    return (
        <div className="single-story-container" onClick={() => {if (!isUlHidden) handleHideUl()}}>
            <div className="story_display_body">
                <div className={storyContainerClassname}>
                    <p>{singleStory?.title}</p>
                    <div className="sd_author_block">
                        <div className={hoverClassName} onClick={(e) => handleVisitStory(e, singleStory)}>
                            <img src={singleStory?.user?.profilePic}/>
                            <span className="author-name-date">
                                <p>By: {singleStory?.user?.firstName} {singleStory?.user?.lastName}</p>
                                <p>{convertDate(singleStory?.createdAt)}</p>
                            </span>
                        </div>
                        <div className="story-topics">
                            {singleStory.topics &&
                                <TopicsBanner topics={singleStory.topics} history={history} />
                            }
                        </div>
                    </div>
                    <div className="single-story-banner">
                        <span className="snap-and-comment">
                            <span className="snap-count" onClick={handleLikes}>
                                {liked ? <ThumbUpAltIcon /> : <ThumbUpOffAltIcon />}
                                <p>{singleStory?.snapCount}</p>
                            </span>
                            <span className="comment-count" >
                                <OpenCommentModalButton
                                    modalComponent={
                                        <CommentsModalComponent
                                        story={singleStory}
                                        currentUser={currUser}
                                        />}
                                        buttonText={<i className="far fa-comment fa-flip-horizontal" style={{color: "rgb(149, 149, 149)", fontSize: "18px"}}></i>}
                                        style={{backgroundColor: "transparent", border: "none"}}
                                        className="comment-icon"
                                        />
                                <p>{comments.length}</p>
                            </span>
                        </span>
                       {currUser && currUser.id === singleStory?.userId &&
                            <span className="ellipsis-span">
                                <button className="ellipsis-button" onClick={handleHideUl}><i className="fas fa-ellipsis-h"></i></button>
                                {!isUlHidden &&
                                    <div className="options-span">
                                        <button className="edit-story-button" onClick={handleStoryEdit}>Edit Story</button>
                                        <OpenModalButton
                                            modalComponent={ <DeleteStoryOrComment story={singleStory} /> }
                                            buttonText={"Delete story"}
                                            className="delete-story-button"
                                            />
                                    </div>}
                            </span>
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
