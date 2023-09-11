import { useDispatch } from 'react-redux';
import * as storyActions from '../../store/stories';
import { thunkDeleteComment } from '../../store/comments'
import { useModal } from '../../context/Modal';
import { useHistory } from 'react-router-dom';

export const DeleteStoryOrComment = ({ story, comment }) => {
    const {closeModal} = useModal();
    const history = useHistory();
    const dispatch = useDispatch();

    const handleDelete = async () => {
        if (comment) {
            await dispatch(thunkDeleteComment(comment.id));
            await dispatch(storyActions.thunkGetSingleStory(story.id));
            closeModal();
            history.push(`/stories/${comment.storyId}`)
        } else {
            await dispatch(storyActions.thunkDeleteStory(story.id));
            await dispatch(storyActions.thunkGetAllStories());
            closeModal();
            history.push('/all');
        }
    }

    const storyOrComment = () => {
        if (comment) return "comment";
        return "story";
    }

    return (
        <div className='modal delete-modal'>
            <h3>Delete {storyOrComment()}</h3>
            <h6>Deletion is not reversible, and the {storyOrComment()} will be completely deleted.</h6>
            <div className='yes-no-buttons'>
                <button onClick={closeModal} className='no-button'>Cancel</button>
                <button onClick={handleDelete} className='yes-button' style={{backgroundColor: "rgb(201, 74, 74)", color: "white"}}>Delete</button>
            </div>
        </div>
    )
}
