import { useDispatch } from 'react-redux';
import * as storyActions from '../../store/stories';
import { thunkDeleteComment } from '../../store/comments'
import { useModal } from '../../context/Modal';
import { useCommentModal } from '../../context/CommentModal';
import { useHistory } from 'react-router-dom';
import "./DeleteStoryOrComment.css";

export const DeleteStoryOrComment = ({ story, comment }) => {
    const {closeModal} = useModal();
    const { closeCommentModal } = useCommentModal();
    const history = useHistory();
    const dispatch = useDispatch();

    const handleDelete = async () => {
        if (comment) {
            await dispatch(thunkDeleteComment(comment.id));
            await dispatch(storyActions.thunkGetSingleStory(comment.storyId));
            closeCommentModal();
            history.push(`/stories/${comment.storyId}`)
        } else {
            await dispatch(storyActions.thunkDeleteStory(story.id));
            await dispatch(storyActions.thunkGetAllStories());
            closeModal();
            history.push('/all');
        }
    }

    if (comment) {
        return (
            <div className='delete-modal _comment_modal'>
                <p className="heading">Delete</p>
                <span className="caution">
                    <p className="disclaimer _comment">Deleted responses are gone forever.</p>
                    <p>Are you sure?</p>
                </span>
                <div className='yes-no-buttons _comment_butons'>
                    <button onClick={closeCommentModal} className='no-button _comment_no'>Cancel</button>
                    <button onClick={handleDelete} className='yes-button _comment_yes'>Delete Response</button>
                </div>
            </div>
        )
    }
    return (
        <div className='delete-modal'>
            <p className="heading">Delete story</p>
            <p className="disclaimer">Deletion is not reversible, and the story will be completely deleted.</p>
            <div className='yes-no-buttons'>
                <button onClick={closeModal} className='no-button'>Cancel</button>
                <button onClick={handleDelete} className='yes-button'>Delete</button>
            </div>
        </div>
    )
}
