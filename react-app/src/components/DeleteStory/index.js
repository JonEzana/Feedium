import { useDispatch } from 'react-redux';
import * as storyActions from '../../store/stories';
import { useModal } from '../../context/Modal';
import { useHistory } from 'react-router-dom';

export const DeleteStory = ({ story }) => {
    const {closeModal} = useModal();
    const history = useHistory();
    const dispatch = useDispatch();

    const handleDelete = async () => {
        await dispatch(storyActions.thunkDeleteStory(story.id));
        await dispatch(storyActions.thunkGetAllStories());
        closeModal();
        history.push('/')
    }

    return (
        <div className='modal delete-modal'>
            <h3>Delete Story</h3>
            <h6>Deletion is not reversible, and the story will be completely deleted.</h6>
            <div className='yes-no-buttons'>
                <button onClick={closeModal} className='no-button'>Cancel</button>
                <button onClick={handleDelete} className='yes-button' style={{backgroundColor: "rgb(201, 74, 74)", color: "white"}}>Delete</button>
            </div>
        </div>
    )
}
