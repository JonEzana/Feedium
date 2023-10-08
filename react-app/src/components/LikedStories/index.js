import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { ProfilePage } from "../ProfilePage";

export const LikedStories = () => {
    const {userId} = useParams();
    const likedStories = useSelector(state => state.snaps.allSnaps[userId])
    return (
        <ProfilePage
            likedStories={likedStories}
            userid={userId}
        />
    )
}
