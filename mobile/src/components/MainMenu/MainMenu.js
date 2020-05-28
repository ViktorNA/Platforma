import React, {useState, useEffect} from 'react';
import {Button, Text} from 'react-native';
import {clearStorage, getToken, getUsername} from '../../utils/storageService';

const MainMenu = ({setScreen}) => {
  const [isLogged, setIsLogged] = useState();
  const [userName, setUserName] = useState('');
  useEffect(() => {
    const fetchName = async () => {
      const name = await getUsername();
      setUserName(name);
      setIsLogged(await getToken());
    };
    fetchName();
  }, []);

  const logOutOnPress = async () => {
    await clearStorage();
    setIsLogged(false);
  };
  return (
    <>
      {isLogged && <Text>{`Signed as ${userName}`}</Text>}
      <Button title={'Monitor'} onPress={() => setScreen('monitor')} />
      {isLogged ? (
        <Button title={'Log Out'} onPress={logOutOnPress} />
      ) : (
        <Button title={'Login'} onPress={() => setScreen('signin')} />
      )}
    </>
  );
};

export default MainMenu;
