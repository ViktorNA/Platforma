import React from 'react';
import DrawGraphView from '../containers/DrawGraphView';
import {connect} from 'react-redux';
import {Text} from 'react-native';
import MainMenu from '../containers/MainMenu';
import SignIn from '../components/Auth/SignIn';

const MainRouter = ({screen}) => {
  switch (screen) {
    case 'monitor':
      {
        return <DrawGraphView />;
      }
      break;
    case 'menu':
      {
        return <MainMenu />;
      }
      break;
    case 'signin': {
      return <SignIn />;
    }
    default:
      return <Text>error</Text>;
  }
};

const mapStateToProps = state => ({
  screen: state.router.screen,
});

export default connect(mapStateToProps)(MainRouter);
