import MoveBalls from '../components/Tests/MoveBalls.jsx';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
  const { positionX, positionY } = state.tests;
  return {
    positionX,
    positionY,
  };
};

export default connect(mapStateToProps)(MoveBalls);
