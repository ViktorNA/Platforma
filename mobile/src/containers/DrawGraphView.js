import DGV from '../components/DrawGraphView/DrawGraphView';

import React from 'react';
import {Button} from 'react-native';

import {connect} from 'react-redux';

const DrawGraphView = ({points}) => {
  return (
    <>
      <DGV
        style={{width: 400, height: 400}}
        points={points}
        sry={5}
        srx={5}
        scale={1}
      />
      <Button title={'Back'} />
    </>
  );
};

const mapStateToProps = state => ({
  points: state.points.points,
});

export default connect(mapStateToProps)(DrawGraphView);
