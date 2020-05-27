import {connect} from 'react-redux';
import {setRoterScreen} from '../store/RouterActioins';
import MainMenu from '../components/MainMenu/MainMenu';

const mapDispatchToProps = dispatch => ({
  setScreen: screen => dispatch(setRoterScreen(screen)),
});

export default connect(
  () => ({}),
  mapDispatchToProps,
)(MainMenu);
