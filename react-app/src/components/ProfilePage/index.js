import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { thunkGetCurrentUserStories } from "../../store/stories";
import { thunkGetSnaps } from "../../store/snaps";
import { thunkGetAllUsers } from "../../store/users";
import { useHistory, useParams } from 'react-router-dom';
import "./ProfilePage.css"
import { AllStoryContainer } from '../AllStories/AllStoryContainer';
import OpenModalButton from "../OpenModalButton";
import { DeleteStoryOrComment } from "../DeleteStoryOrComment";
import { ProfileNavBar } from './ProfileNavBar';

export const ProfilePage = ({ likedStories }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const {userId} = useParams()
    const user = useSelector(state => state.users.allUsers[userId]);
    let userStories = Object.values(useSelector(state => state.stories.usersStories));
    const userSnaps = useSelector(state => state.snaps.allSnaps[userId]);
    const [loading, setLoading] = useState(true);
    const [isUlHidden, setIsUlHidden] = useState(true);

    useEffect(() => {
        dispatch(thunkGetCurrentUserStories(userId))
        dispatch(thunkGetAllUsers())
        dispatch(thunkGetSnaps())
        setLoading(false)
    }, [dispatch]);

    if (likedStories) userStories = likedStories;

    return (
        <div className="profile-container">
            <div className="profile-left-column">
                <p>{user?.firstName} {user?.lastName}</p>
                <ProfileNavBar user={user} />
                {loading === false && userStories.map(story =>
                    <div key={story.id} className="profile-story-container">
                        <AllStoryContainer
                            story={story}
                            page={'profile'}
                            isUlHidden={isUlHidden}
                            setIsUlHidden={setIsUlHidden}
                        />
                        <span className="story-footer">
                            <p>2 min read</p>
                        </span>
                    </div>
                )}
            </div>
            <div className="profile-right-column">
                <img src={user?.profilePic}/>
                <p>{user?.firstName} {user?.lastName}</p>
            </div>
        </div>
    )
}
