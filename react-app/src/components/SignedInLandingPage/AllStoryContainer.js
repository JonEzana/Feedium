import "./SignedInLandingPage.css";

export const AllStoryContainer = ({ story }) => {

    const storyPreview = (str) => {
        let res;
        str.length > 200 ? res = str.substring(0, 200) + "..." : res = str;
        return res;
    }

    return  (
        <div className="allstory_card_container">
            <div className="card_top">
                <img src={story.user.profilePic}/>
                <p>{story.user.firstName} {story.user.firstName}</p>
                <p>{story.createdAt}</p>
            </div>
            <div className="card_title">
                <h3>{story.title}</h3>
            </div>
            <div className="card_preview">
                <p>{storyPreview(story.storyText)}</p>
            </div>
        </div>
    )
}
