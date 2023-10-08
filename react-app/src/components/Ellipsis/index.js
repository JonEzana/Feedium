import { useHistory } from 'react-router-dom';
import OpenModalButton from "../OpenModalButton";
import { DeleteStoryOrComment } from "../DeleteStoryOrComment";

export const Ellipsis = ({ isUlHidden, setIsUlHidden, story}) => {
    const history = useHistory();

    const handleHideUl = () => {
        isUlHidden ? setIsUlHidden(false) : setIsUlHidden(true);
    }

    return (
        <span>
            <button onClick={handleHideUl} className="ellipsis-button"><i className="fas fa-ellipsis-h"></i></button>
            { !isUlHidden && <span className="options-span">
                <button className="edit-story-button" onClick={(e) => {
                    e.preventDefault();
                    history.push(`/stories/${story.id}/edit`)
                }}>Edit Story</button>
                <OpenModalButton
                    modalComponent={ <DeleteStoryOrComment story={story} /> }
                    buttonText={"Delete story"}
                    className="delete-story-button"
                />
            </span>}
        </span>
    )
}
