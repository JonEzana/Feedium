export const TrendingStoryCard = ({story, stories}) => {
    return (
        <>
            <p>0{stories.indexOf(story) + 1} --- 🫰{story.snapCount}</p>
            <p>{story.title}</p>
            <img src={story.user.profilePic} style={{height: '50px', width: "50px", borderRadius: "25px"}}></img>
            <p>{story.user.username}</p>
            <p>{story.createdAt}</p>
        </>
    )
}
