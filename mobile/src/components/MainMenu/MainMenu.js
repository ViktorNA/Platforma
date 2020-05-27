import React from 'react';
import {Button} from 'react-native';

const MainMenu = ({setScreen}) => {
  return (
    <>
      <Button title={'Monitor'} onPress={() => setScreen('monitor')} />
    </>
  );
};

export default MainMenu;
