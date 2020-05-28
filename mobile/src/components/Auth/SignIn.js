import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Button,
  TextInput,
  ToastAndroid,
  ActivityIndicator,
} from 'react-native';
import {signIn} from '../../utils/authService';
import {setScreenFunc} from '../../utils/routerService';
import {connectAndSubscribe} from '../../utils/socketService';

const SignIn = () => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const signInOnPress = async () => {
    setIsLoading(true);
    const res = await signIn(login, password);
    if (res.status === 200) {
      setLogin('');
      setPassword('');
      setIsLoading(false);
      setScreenFunc('menu');
    } else {
      ToastAndroid.showWithGravity(
        'Error',
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
      );

      setIsLoading(false);
    }
  };
  return (
    <View>
      <TextInput
        onChange={e => setLogin(e.nativeEvent.text)}
        style={styles.loginInput}
        placeholder={'username'}
        value={login}
      />
      <TextInput
        style={styles.passInput}
        placeholder={'password'}
        textContentType={'password'}
        secureTextEntry={true}
        value={password}
        onChange={e => setPassword(e.nativeEvent.text)}
      />

      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <Button
          title={'sign in'}
          onPress={signInOnPress}
          disabled={isLoading}
        />
      )}
    </View>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  loginInput: {
    borderBottomWidth: 1,
    padding: 2,
    fontSize: 30,
  },
  passInput: {
    borderBottomWidth: 1,
    padding: 2,
    fontSize: 30,
    marginBottom: 30,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
  },
});
