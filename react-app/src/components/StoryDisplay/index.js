import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { thunkGetSingleStory } from "../../store/stories";
import OpenModalButton from "../OpenModalButton";
import { DeleteStory } from "../DeleteStory";

export const StoryDisplay = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const {storyId} = useParams();
    const singleStory = useSelector(state => state.stories.singleStory);
    const currUser = useSelector(state => state.session.user);

    useEffect(() => {
        dispatch(thunkGetSingleStory(storyId))
    }, [dispatch])

    const handleEdit = () => {
        history.push(`/stories/${singleStory.id}/edit`)
    }

    if (!Object.values(singleStory).length) return <></>;

    return (
        <div className="story_display_body">
            <div className="sd_header"></div>
            <div className="sd_container">
                <h1>{singleStory?.title}</h1>
                <div className="sd_author_block">
                    <img src={singleStory?.user?.profilePic} />
                    <p>{singleStory?.user?.firstName} {singleStory?.user?.lastName}</p>
                    <p>{singleStory?.createdAt}</p>
                </div>
                <div className="sd_reaction_block"></div>
                <div className="sd_story_body">
                    <p>{singleStory?.storyText}</p>
                </div>
                {currUser.id === singleStory.userId &&
                <>
                    <button onClick={handleEdit}>Edit story</button>
                    <OpenModalButton
                        modalComponent={ <DeleteStory story={singleStory}/> }
                        buttonText={"Delete story"}
                    />
                </>
                }
            </div>
        </div>

    )
}
