import { useEffect, useState } from "react";
import * as commentActions from "../../store/comments";
import * as storyActions from "../../store/stories";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import "./CreateComment.css";

export const CreateComment = ({ story, comment, type, showEditComponent, setShowEditComponent, setIsUpdated }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const comments = Object.values(useSelector(state => state.comments.storyComments));
    const user = useSelector(state => state.session.user);
    const [commentTxt, setCommentTxt] = useState(comment ? comment.commentText: '');
    const [valObj, setValObj] = useState({});
    const [disabled, setDisabled] = useState(true);
    const [buttonId, setButtonId] = useState('disabled-comment-button');

    useEffect(() => {
        const errObj = {};
        if (commentTxt && (commentTxt.length < 3 || commentTxt.length > 100)) errObj.commentTxt = "Comments must be between 3 and 100 characters";
        if (commentTxt.length > 3 && commentTxt.length < 100) {
            setDisabled(false);
            setButtonId('enabled-comment-button')
        } else {
            setDisabled(true);
        }
        setValObj(errObj);
    }, [commentTxt, dispatch]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (type && type === "Update") {
            const updatedComment = await dispatch(commentActions.thunkUpdateComment({comment_text: commentTxt, user_id: user.id, story_id: comment.storyId, id: comment.id}));
            if (updatedComment.id) {
                await storyActions.thunkGetSingleStory(updatedComment.storyId);
                await commentActions.thunkCommentsByStoryId(updatedComment.storyId);
                setShowEditComponent(!showEditComponent);
                setIsUpdated(true)
                history.push(`/stories/${updatedComment.storyId}`)
            }
        } else {
            const commentData = {comment_text: commentTxt, user_id: user.id, story_id: story.id};
            const newComment = await dispatch(commentActions.thunkCreateComment(commentData, story.id));
                if (newComment.id) {
                    await storyActions.thunkGetSingleStory(story.id);
                    await commentActions.thunkCommentsByStoryId(story.id);
                    setCommentTxt('');
                    history.push(`/stories/${story.id}`);
                }
        }
    }

    const handleCancel = () => {
        setCommentTxt(comment ? comment.commentText : "");
        if (type && type === "Update") {
            setShowEditComponent(!showEditComponent)
        }
    }

    if (type && type === "Update") {
        return (
            <div className="comment-creation-container _update-container">
                <span className="commenter-details _upate-details">
                    <img className="commenter-prof-pic" src={user.profilePic}/>
                    <p className="commenter-name">{user.firstName} {user.lastName}</p>
                </span>
                <form onSubmit={handleSubmit} className="comment-creation-form _update-form">
                    <textarea
                        placeholder="What are your thoughts?"
                        value={commentTxt}
                        onChange={(e) => setCommentTxt(e.target.value)}
                        type="textarea"
                        required
                        rows="30"
                    />
                    <span className="comment-buttons-span">
                        <button onClick={handleCancel} className="comment-cancel-button">Cancel</button>
                        <button type="submit" disabled={disabled} id={buttonId} className={disabled ? "comment-submit-button-disabled" : "comment-submit-button"}>Update</button>
                    </span>
                </form>
            </div>
        )
    }

    return (
        <div className="comment-creation-container">
            {user &&
            <span className="commenter-details">
                <img className="commenter-prof-pic" src={user.profilePic}/>
                <p className="commenter-name">{user.firstName} {user.lastName}</p>
            </span>
            }
            <form onSubmit={handleSubmit} className="comment-creation-form">
                <textarea
                    placeholder="What are your thoughts?"
                    value={commentTxt}
                    onChange={(e) => setCommentTxt(e.target.value)}
                    type="textarea"
                    required
                    rows="30"
                />
                <span className="comment-buttons-span">
                    <button onClick={handleCancel} className="comment-cancel-button">Cancel</button>
                    <button type="submit" disabled={disabled} id={buttonId} className={disabled ? "comment-submit-button-disabled" : "comment-submit-button"}>Respond</button>
                </span>
            </form>
        </div>
    )
}
