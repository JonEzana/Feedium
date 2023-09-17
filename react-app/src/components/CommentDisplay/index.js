import { useState } from "react";
import { convertDate } from "../../helpers";
import OpenCommentModalButton from "../OpenCommentModalButton";
import { CreateComment } from "../CreateComment";
import { DeleteStoryOrComment } from "../DeleteStoryOrComment";
import "./CommentDisplay.css";

export const CommentDisplay = ({ comment, currentUser }) => {
    const [isUlHidden, setIsUlHidden] = useState(true);
    const [showEditComponent, setShowEditComponent] = useState(false);
    const [isUpdated, setIsUpdated] = useState(false);

    const handleHideUl = () => {
        isUlHidden ? setIsUlHidden(false) : setIsUlHidden(true);
    }

    const handleCommentEdit = (e) => {
        e.stopPropagation();
        setShowEditComponent(!showEditComponent)
    }

    return (
        <>
        { !showEditComponent &&
            (<div className="single-comment-container" onClick={() => {if (!isUlHidden) setIsUlHidden(true)}}>
                <span className="single-comment-header">
                    <span className="commenter-info">
                        <span className="img-name-date">
                                <img src={comment.user.profilePic} className="comment-proPic"/>
                                <span className="comment-name-date">
                                    <p className="comment-name">{comment.user.firstName} {comment.user.lastName}</p>
                                    <p className="comment-date">{convertDate(comment.createdAt)}</p>
                                </span>
                        </span>
                    {currentUser && currentUser.id === comment.userId &&
                        <span className="elip">
                            <button onClick={handleHideUl} className="ellipsis-button-comment">
                            <i className="fas fa-ellipsis-h"></i>
                            </button>
                            <span className={isUlHidden ? "hidden" : "comment-dropdown-span"}>
                                <button className="edit-comment-button" onClick={handleCommentEdit}>Edit this response</button>
                                <OpenCommentModalButton
                                    modalComponent={ <DeleteStoryOrComment comment={comment} /> }
                                    buttonText={"Delete"}
                                    className="delete-comment-button"
                                    />
                            </span>
                        </span>
                    }
                    </span>
                    <p className="comment-body">{comment.commentText}</p>
                </span>
            </div>)
        }
        { showEditComponent &&
            <CreateComment
                comment={comment}
                type={"Update"}
                showEditComponent={showEditComponent}
                setShowEditComponent={setShowEditComponent}
                setIsUpdated={setIsUpdated}
                />
        }
        </>
    )
}
