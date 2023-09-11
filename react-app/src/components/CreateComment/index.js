import { useEffect, useState } from "react";
import * as commentActions from "../../store/comments";
import * as storyActions from "../../store/stories";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { thunkGetSingleStory } from "../../store/stories";

export const CreateComment = ({ story, comment, clicked, setClicked, type }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const comments = Object.values(useSelector(state => state.comments.storyComments));
    const {storyId} = useParams();
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
            // comment['comment_text'] = commentTxt;
            // console.log('COMMENT', comment)
            const updatedComment = await dispatch(commentActions.thunkUpdateComment({comment_text: commentTxt, user_id: user.id, story_id: +storyId, id: comment.id}));
            if (updatedComment.id) {
                await storyActions.thunkGetSingleStory(storyId);
                await commentActions.thunkCommentsByStoryId(storyId);
                setClicked(!clicked)
                history.push(`/stories/${storyId}`)
            }
        } else {
            const commentData = {comment_text: commentTxt, user_id: user.id, story_id: +storyId};
            const newComment = await dispatch(commentActions.thunkCreateComment(commentData, storyId));
                if (newComment.id) {
                    await storyActions.thunkGetSingleStory(storyId);
                    await commentActions.thunkCommentsByStoryId(storyId);
                    setCommentTxt('');
                    setClicked(false)
                    history.push(`/stories/${storyId}`)
                }
        }
            // .then(() => dispatch(commentActions.thunkCommentsByStoryId(storyId)))
            // .then(() => dispatch(storyActions.thunkGetSingleStory(storyId)))
            // .then(() => history.push(`/stories/${storyId}`))
            // .catch((e) => console.log(e));
    }

    const handleCancel = () => {
        setCommentTxt(comment ? comment.commentText : "");
        setClicked(!clicked)
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <textarea
                    placeholder="What are your thoughs?"
                    value={commentTxt}
                    onChange={(e) => setCommentTxt(e.target.value)}
                    type="textarea"
                    required
                />
                {valObj.commentTxt && <p style={{color: "red"}}>{valObj.commentTxt}</p>}
                <button type="submit" disabled={disabled} id={buttonId}>{comment ? "Update" : "Respond"}</button>
                <button onClick={handleCancel}>Cancel</button>
            </form>
        </div>
    )
}
