import { setPositions } from '../actions/Tests.jsx';
import { connect } from 'react-redux';
import TestScreen from '../components/Tests/TestScreen.jsx';

const mapDispatchToProps = (dispatch) => {
  return {
    setPosition: (positionX, positionY) =>
      dispatch(setPositions(positionX, positionY)),
  };
};

const mapStateToProps = (state) => {
  return {
    isTestStarted: state.tests.isTestStarted,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TestScreen);
