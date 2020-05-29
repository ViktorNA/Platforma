import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import ImageGrid from '../components/ImageGrid/ImageGrid.jsx';
import SignIn from '../components/Authentication/SignIn.jsx';
import SignUp from '../components/Authentication/SignUp.jsx';
import ImageCard from '../components/ImageCard/ImageCard.jsx';
import NavBar from '../components/NavBar/NavBar.jsx';
import TestScreenContainer from '../containers/TestScreenContainer.jsx';
import DataView from '../components/DataView/DataView.js';

const MainRouter = () => {
  return (
    <Router>
      <NavBar />
      <Switch>
        <Route path={'/test'} exact>
          <TestScreenContainer />
        </Route>
        <Route path={'/'} exact>
          <SignIn />
        </Route>
        <Route path={'/signUp'} exact>
          <SignUp />
        </Route>
        <Route path={'/database'} exact>
          <DataView />
        </Route>
      </Switch>
    </Router>
  );
};

export default MainRouter;
