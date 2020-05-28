import React from 'react';
import DrawGraphView from '../containers/DrawGraphView';
import {connect} from 'react-redux';
import {Text} from 'react-native';
import MainMenu from '../containers/MainMenu';
import SignIn from '../components/Auth/SignIn';
import AimTest from '../components/Tests/AimTest';

const MainRouter = ({screen}) => {
  switch (screen) {
    case 'monitor': {
      return <DrawGraphView />;
    }
    case 'menu': {
      return <MainMenu />;
    }
    case 'signin': {
      return <SignIn />;
    }
    case 'aimTest': {
      return <AimTest />;
    }
    default:
      return <Text>error</Text>;
  }
};

const mapStateToProps = state => ({
  screen: state.router.screen,
});

export default connect(mapStateToProps)(MainRouter);
