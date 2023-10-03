import { convertDate } from "../../helpers";
import "./LandingPage.css"

export const TrendingStoryCard = ({story, stories, type}) => {
    return (
        <div className="individual_card_container">
            <div className={type === "hot" ? "individual_card" : "individual_card_all"}>
                { type === "hot" && <p style={{color: "#e8e6e1", fontSize: "40px", marginTop: "-2px"}}>0{stories.indexOf(story) + 1}</p> }
                <span style={{display: "flex", flexDirection: "column", gap: "-2px", marginTop: "-6px", width: "40%"}}>
                    <span style={{display: "flex", flexDirection: "row", gap: "10px", alignItems: "center"}}>
                        <img src={story.user.profilePic} style={{height: '30px', width: "30px", borderRadius: "25px"}}></img>
                        <p style={{fontSize: "18px", fontWeight: "400"}}>{story.user.firstName} {story.user.lastName}</p>
                    </span>
                    <b style={{fontSize: "18px", textWrap: "wrap", width: "300px"}}>{story.title}</b>
                    <p>{convertDate(story.createdAt)}</p>
                </span>
               { type === 'all' && story.imageUrl_1 && <img className="landing-page-story-img" src={story?.imageUrl_1} /> }
               { type === 'all' && !story.imageUrl_1 && <div className="no-photo"></div> }
            </div>
        </div>
    )
}
