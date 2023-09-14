import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import * as storyActions from '../../store/stories';
import { thunkCommentsByStoryId, thunkDeleteComment } from '../../store/comments'
import { useCommentModal } from '../../context/CommentModal';
import { useHistory, useParams } from 'react-router-dom';
import { DeleteStoryOrComment } from "../DeleteStoryOrComment";
import { CreateComment } from "../CreateComment";
import { CommentDisplay } from '../CommentDisplay';
import "./CommentsModalComponent.css";

export const CommentsModalComponent = ({ story, currentUser }) => {
    const { closeCommentModal } = useCommentModal();
    const latestComments = Object.values(useSelector(state => state.comments.storyComments));
    const dispatch = useDispatch();
    const [isUlHidden, setIsUlHidden] = useState(true);

    useEffect(() => {
        dispatch(thunkCommentsByStoryId(story.id))
    }, [dispatch]);

    return (
        <div className='comment-modal' onClick={() => {if (!isUlHidden) setIsUlHidden(true)}}>
            <span className="comment-modal-heading">
                <p>Responses {latestComments.length > 0 && `(${latestComments.length})`}</p>
                <i className="fas fa-times" onClick={closeCommentModal}></i>
            </span>
            <span className="create-comment-container">
                <CreateComment story={story} />
            </span>
            <div className="comment-section">
                {/* <CommentDisplay comments={comments}/> */}
                {latestComments.length > 0 ? (
                    <>
                        {latestComments.toReversed().map(comment =>
                            <span key={comment.id}>
                                <CommentDisplay comment={comment} currentUser={currentUser}/>
                            </span>
                        )}
                    </>
                ) : (
                    <em className="no-comment-message">There are currently no responses for this story. Be the first to respond.</em>
                )}
            </div>
        </div>
    )
}