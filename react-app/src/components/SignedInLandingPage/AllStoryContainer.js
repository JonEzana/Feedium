import { convertDate } from "../../helpers";
import "./SignedInLandingPage.css";

export const AllStoryContainer = ({ story }) => {

    const storyPreview = (str) => {
        let res;
        str.length > 200 ? res = `${str.substring(0, 200)}...` : res = str;
        return res;
    }

    return  (
        <div className="story_and_img">
            <div className="story_cards_container">
                <div className="card_top">
                    <img className="author_pro_pic" src={story.user.profilePic}/>
                    <p>{story.user.firstName} {story.user.firstName}</p>
                    <p>·</p>
                    <p>{convertDate(story.createdAt)}</p>
                </div>
                <div className="card_title">
                    <h3>{story.title}</h3>
                </div>
                <div className="card_preview">
                    <p>{storyPreview(story.storyText)}</p>
                </div>
            </div>
            <div className="story_image">
                { story.imageUrl_1 && <img className="preview_img" src={story.imageUrl_1}/>}
            </div>
    </div>
    )
}
