import React from "react";
import { useSelector } from "react-redux";

export const StoryDisplay = () => {
    const singleStory = useSelector(state => state.stories.singleStory);

    return (
        <div className="story_display_body">
            <div className="sd_header"></div>
            <div className="sd_container">
                <h1>{singleStory?.title}</h1>
                <div className="sd_author_block">
                    <img src={singleStory?.user?.profilePic} />
                    <p>{singleStory?.user?.firstName} {singleStory?.user?.lastName}</p>
                    <p>{singleStory?.createdAt}</p>
                </div>
                <div className="sd_reaction_block"></div>
                <div className="sd_story_body">
                    <p>{singleStory?.storyText}</p>
                </div>
            </div>
        </div>

    )
}
