import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { thunkGetSingleStory } from "../../store/stories";
import OpenModalButton from "../OpenModalButton";
import { DeleteStoryOrComment } from "../DeleteStoryOrComment";
import { CreateComment } from "../CreateComment";
import { thunkCommentsByStoryId } from "../../store/comments";
import "./StoryDisplay.css";

export const StoryDisplay = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const {storyId} = useParams();
    const singleStory = useSelector(state => state.stories.singleStory);
    const currUser = useSelector(state => state.session.user);
    const comments = Object.values(useSelector(state => state.comments.storyComments));
    const [clicked, setClicked] = useState(false);
    const [shown, setShown] = useState(true)

    useEffect(() => {
        dispatch(thunkGetSingleStory(storyId))
        dispatch(thunkCommentsByStoryId(storyId))
    }, [dispatch]);

    useEffect(() => {
        clicked ? setShown(false) : setShown(true)
    }, [clicked])

    const handleStoryEdit = () => {
        history.push(`/stories/${singleStory.id}/edit`)
    }

    const handleClicked = () => {
        clicked ? setClicked(false) : setClicked(true)
    }

    if (!Object.values(singleStory).length) return <></>;

    // const imgArr = [];
    // if (singleStory && singleStory.imageUrl1 !== null) imgArr.push(imageUrl1);
    // if (singleStory && singleStory.imageUrl2 !== null) imgArr.push(imageUrl2);
    // if (singleStory && singleStory.imageUrl3 !== null) imgArr.push(imageUrl3);
    // if (singleStory && singleStory.imageUrl4 !== null) imgArr.push(imageUrl4);

    return (
        <div style={{display: "flex", flexDirection:"row"}}>
            <div className="story_display_body">
                <div className="sd_header"></div>
                <div className="sd_container">
                    <h1>{singleStory?.title}</h1>
                    <div className="sd_author_block">
                        <div style={{display: "flex", flexDirection: "row", gap: "20px"}}>
                            <img src={singleStory?.user?.profilePic} style={{height: "60px", width: "60px", borderRadius: "30px"}} />
                            <p>By: {singleStory?.user?.firstName} {singleStory?.user?.lastName}</p>
                            <p>{singleStory?.createdAt}</p>
                        </div>
                        <div className="story_images">
                            {singleStory.imageUrl1 && <img className="story_img1 image" src={singleStory?.imageUrl1}/>}
                            {singleStory.imageUrl2 && <img className="story_img2 image" src={singleStory?.imageUrl2}/>}
                            {singleStory.imageUrl3 && <img className="story_img3 image" src={singleStory?.imageUrl3}/>}
                            {singleStory.imageUrl4 && <img className="story_img4 image" src={singleStory?.imageUrl4}/>}
                        </div>
                    </div>
                    <h3 className="sd_reaction_block"> COMMENT BUTTON GOES HERE</h3>
                    <div className="sd_story_body">
                        <p>{singleStory?.storyText}</p>
                    </div>
                    {currUser && currUser.id === singleStory.userId &&
                        <>
                            <button onClick={handleStoryEdit}>Edit story</button>
                            <OpenModalButton
                                modalComponent={ <DeleteStoryOrComment story={singleStory} /> }
                                buttonText={"Delete story"}
                            />
                        </>
                    }
                    {comments.toReversed().map(comment =>
                        <div style={{display: "flex", flexDirection: "row", gap: "20px"}} key={comment.id}>
                            {currUser.id !== comment.userId &&
                            <>
                                <img src={comment?.user?.profilePic} style={{height: "50px", width: "50px", borderRadius: "26px"}}/>
                                <p>{comment?.user?.username}</p>
                                <p>{comment?.commentText}</p>
                            </>
                            }
                            {currUser.id === comment.userId &&
                                <>
                                    { clicked ?
                                        (
                                            <div className={!shown}>
                                                <CreateComment comment={comment} clicked={clicked} setClicked={setClicked} type={"Update"}/>
                                            </div>
                                        ) : (
                                            <div className={shown} style={{display: "flex", flexDirection: "row", gap: "20px"}}>
                                                <img src={comment?.user?.profilePic} style={{height: "50px", width: "50px", borderRadius: "26px"}}/>
                                                <p>{comment?.user?.username}</p>
                                                <p>{comment?.commentText}</p>
                                                <button onClick={handleClicked}>Edit Comment</button>
                                                <OpenModalButton
                                                    modalComponent={ <DeleteStoryOrComment story={singleStory} comment={comment} /> }
                                                    buttonText={"Delete comment"}
                                                />
                                            </div>
                                        )
                                    }
                                </>
                            }
                        </div>
                    )}
                </div>
            </div>
            <div>
                 <CreateComment story={singleStory} clicked={clicked} setClicked={setClicked} />
            </div>
        </div>
    )
}








// <>
//     {clicked && <div><CreateComment story={singleStory} comment={comment} clicked={clicked} setClicked={setClicked}/></div>}
//     {!clicked &&
//         <>
//             <button onClick={handleCommentEdit}>Edit Comment</button>
//             <OpenModalButton
//             modalComponent={ <DeleteStoryOrComment story={singleStory} comment={comment} /> }
//             buttonText={"Delete comment"}
//             />
//         </>}
// </>
