import React, {useState, useEffect} from 'react';
import {Button, View} from 'react-native';
import {connectAndSubscribe, startTestMock} from '../../utils/socketService';
import {saveTestMock} from '../../utils/testService';

const AimTest = () => {
  const [isConnected, setIsConnected] = useState(false);
  const startOnPress = async () => {
    await connectAndSubscribe(() => setIsConnected(true));
  };
  const sendMessage = async () => {
    const times = [];
    const actions = [];
    for (let i = 0; i < 10; i++) {
      times.push(1000 * Math.random() + 300);
      actions.push({
        positionX: Math.random() * 90 + 10,
        positionY: Math.random() * 90 + 10,
      });
    }
    await startTestMock({times, actions});
  };
  return (
    <View>
      <Button title={'start test'} onPress={startOnPress} />
      <Button title={'send'} onPress={sendMessage} />
    </View>
  );
};

export default AimTest;
