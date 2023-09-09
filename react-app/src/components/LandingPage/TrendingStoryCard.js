import "./LandingPage.css"

export const TrendingStoryCard = ({story, stories}) => {

    const convertDate = (date) => {
        const dateArr = date.split(' ');
        return `${dateArr[2]} ${dateArr[1]}`
    }

    return (
        <div className="individual_card_container">
            <div className="individual_card">
                <p style={{color: "#e8e6e1", fontSize: "40px", marginTop: "-6px"}}>0{stories.indexOf(story) + 1}</p>
                <span style={{display: "flex", flexDirection: "column", gap: "-2px", marginTop: "-6px"}}>
                    <span style={{display: "flex", flexDirection: "row", gap: "10px", alignItems: "center"}}>
                        <img src={story.user.profilePic} style={{height: '30px', width: "30px", borderRadius: "25px"}}></img>
                        <p style={{fontSize: "18px", fontWeight: "400"}}>{story.user.firstName} {story.user.lastName}</p>
                    </span>
                    <b style={{fontSize: "20px"}}>{story.title}</b>
                    <p>{convertDate(story.createdAt)}</p>
                </span>
            </div>
        </div>
    )
}
