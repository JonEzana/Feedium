import React from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { AllStories } from '../AllStories';

export const QueryResults = () => {
    const location = useLocation();
    const query = location.pathname.split('/').slice(-1)[0];
    const queriedStories = [];
    Object.values(useSelector(state => state.stories.allStories)).forEach(story => {
        if (story.title.toLowerCase().includes(query.toLowerCase()) || story.storyText.toLowerCase().includes(query.toLowerCase())) queriedStories.push(story);
    });

    return (
        <AllStories queriedStories={queriedStories} query={query} />
    )
}
