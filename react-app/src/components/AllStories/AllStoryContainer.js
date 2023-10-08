import { useHistory } from "react-router-dom";
import { convertDate, shortenString, shortenBody } from "../../helpers";
import "./SignedInLandingPage.css";

export const AllStoryContainer = ({ story, page }) => {
    const history = useHistory();

    if (page) {
        return (
            <div className="page-story_and_img" onClick={(e) => {
                e.preventDefault();
                history.push(`/stories/${story.id}`)
            }}>
                <div className="page-story_cards_container">
                    <div className="page-card_top">
                        <p>{convertDate(story.createdAt)}</p>
                    </div>
                    <div className="page-card_title">
                        <h3>{story.title}</h3>
                    </div>
                    <div className="page-card_preview">
                        <p>{shortenBody(story.storyText)}</p>
                    </div>
                </div>
                <div className="page-story_image">
                    { story.imageUrl_1 && <img className="preview_img" src={story.imageUrl_1}/>}
                </div>
            </div>
        )
    }

    return  (
        <div className="story_and_img">
            <div className="story_cards_container">
                <div className="card_top">
                    <img className="author_pro_pic" src={story.user.profilePic}/>
                    <span>{story.user.firstName} {story.user.lastName}</span>
                    <span>·</span>
                    <span>{convertDate(story.createdAt)}</span>
                </div>
                    <span className="card_title">{story.title}</span>
                <div className="card_preview">
                    <span>{shortenString(story.storyText)}</span>
                </div>
            </div>
            <div className="story_image">
                { story.imageUrl_1 && <img className="preview_img" src={story.imageUrl_1}/>}
            </div>
        </div>
    )
}
