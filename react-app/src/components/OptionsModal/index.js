import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useOptionsModal } from "../../context/OptionsModal";
import { useHistory } from "react-router-dom";
import OpenModalButton from "../OpenModalButton";
import { DeleteStoryOrComment } from "../DeleteStoryOrComment";
import "./OptionsModalComponent.css";

export const OptionsModalComponent = ({ story }) => {
    const history = useHistory();
    const { closeModal } = useOptionsModal();

    const handleStoryEdit = () => {
        closeModal();
        history.push(`/stories/${story.id}/edit`)
    }

    return (
        <div className="options-modal">
            <span className="edit-span">
                <button onClick={handleStoryEdit} className="edit-story-button">Edit story</button>
            </span>
            <span className="delete-span">
                <OpenModalButton
                    modalComponent={ <DeleteStoryOrComment story={story} /> }
                    buttonText={"Delete story"}
                    className="delete-story-button"
                    />
            </span>
        </div>
    )
}
