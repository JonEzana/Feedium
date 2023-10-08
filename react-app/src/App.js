import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import { LandingPage } from "./components/LandingPage";
import { CreateStory } from "./components/CreateStory";
import { StoryDisplay } from "./components/StoryDisplay";
import { EditStory } from "./components/EditStory";
import { AllStories } from "./components/AllStories";
import { Footer } from "./components/Footer";
import { StoriesByTopic } from "./components/StoriesByTopic";
import { QueryResults } from "./components/QueryResults";
import { ProfilePage } from "./components/ProfilePage";
import { LikedStories } from "./components/LikedStories";
import { Error } from "./components/Error";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path="/">
            <LandingPage />
          </Route>
          <Route exact path="/all">
            <AllStories />
          </Route>
          <ProtectedRoute exact path="/new-story">
            <CreateStory />
          </ProtectedRoute>
          <Route exact path="/stories/:storyId">
            <StoryDisplay />
          </Route>
          <ProtectedRoute exact path="/stories/:storyId/edit">
            <EditStory />
          </ProtectedRoute>
          <Route exact path="/topics/:topicId">
            <StoriesByTopic />
          </Route>
          <Route path="/search/:term">
            <QueryResults />
          </Route>
          <Route exact path="/users/:userId/stories">
            <ProfilePage />
          </Route>
          <Route exact path="/users/:userId/likes">
            <LikedStories />
          </Route>
          <Route>
            <Error />
          </Route>
        </Switch>
      )}
      <Footer />
    </>
  );
}

export default App;
