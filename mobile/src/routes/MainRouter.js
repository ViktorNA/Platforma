import React from 'react';
import DrawGraphView from '../containers/DrawGraphView';
import {connect} from 'react-redux';
import {Text} from 'react-native';
import MainMenu from '../containers/MainMenu';

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
    default:
      return <Text>error</Text>;
  }
};

const mapStateToProps = state => ({
  screen: state.router.screen,
});

export default connect(mapStateToProps)(MainRouter);
