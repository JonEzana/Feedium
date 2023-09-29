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
import { SignedInLandingPage } from "./components/SignedInLandingPage";
import { Footer } from "./components/Footer";

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
          <ProtectedRoute exact path="/all">
            <SignedInLandingPage />
          </ProtectedRoute>
          <ProtectedRoute exact path="/new-story">
            <CreateStory />
          </ProtectedRoute>
          <Route exact path="/stories/:storyId">
            <StoryDisplay />
          </Route>
          <ProtectedRoute exact path="/stories/:storyId/edit">
            <EditStory />
          </ProtectedRoute>
          {/* <Route path="/login" >
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route> */}
        </Switch>
      )}
      <Footer />
    </>
  );
}

export default App;
