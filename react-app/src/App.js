import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import "./app.css"
import LandingPage from "./components/LandingPage";
import JournalPage from "./components/Journals";
import JournalInfo from "./components/JournalInfo";
import EntryPage from "./components/Entry";
import EntryCreate from "./components/EntryCreate";
import EntryEdit from "./components/EntryEdit";
import EntryDelete from "./components/EntryDelete";
import VirtualPet from "./components/VirtualPet";
import Friend from "./components/Friend";
import Info from "./components/Info";
import EntryImage from "./components/EntryImage";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <div className="entire-app">
        <Navigation isLoaded={isLoaded} />
        {isLoaded && (
          <Switch>
            <Route path="/login" >
              <LoginFormPage />
            </Route>
            <Route path="/signup">
              <SignupFormPage />
            </Route>
            <Route path="/info">
              <Info />
            </Route>
            <Route path="/friends">
              <Friend />
            </Route>
            <Route path="/pet">
              <VirtualPet />
            </Route>
            <Route path="/entries/image-create/:id">
              <EntryImage />
            </Route>
            <Route path="/entries/:id/edit">
              <EntryEdit />
            </Route>
            <Route path="/entries/:id">
              <EntryPage />
            </Route>
            <Route path="/journals/:id/entries/create">
              <EntryCreate />
            </Route>
            <Route path="/journals/:id">
              <JournalInfo />
            </Route>
            <Route path="/journals">
              <JournalPage />
            </Route>
            <Route path="/">
              <LandingPage />
            </Route>
          </Switch>
        )}
      </div>
    </>
  );
}

export default App;
