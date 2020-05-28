import { Stomp } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { getToken, getUsername } from './LocalStorageService.jsx';
import store from '../reducers/store.jsx';
import { setDeviceAnswer } from '../actions/GlobalActions.jsx';
import { setMatrix, startTest, stopTest } from '../actions/Tests.jsx';

let stompClient = null;

const headers = {
  'Access-Control-Allow-Origin': '*',
  Authorization: `Bearer ${getToken()}`,
};

const socket = '/app/userSocket';

export const connectAndSubscribe = () => {
  const socket = new SockJS(
    'https://stormy-waters-38982.herokuapp.com/gs-guide-websocket'
  );
  stompClient = Stomp.over(socket);
  stompClient.debug = () => {};
  stompClient.connect(headers, function (frame) {
    console.log('Connected: ' + frame);
    stompClient.subscribe('/topic/socket' + getUsername(), function (message) {
      console.log('Data');
      const data = JSON.parse(message.body);
      console.log(data);

      switch (data.type) {
        case 'MONITOR_REQUEST':
          {
            stompClient.send(
              socket,
              {},
              JSON.stringify({ socket: getUsername(), type: 'MONITOR_ANSWER' })
            );
          }
          break;
        case 'DEVICE_ANSWER':
          {
            store.dispatch(setDeviceAnswer(true));
          }
          break;
        case 'START_TEST':
          {
            store.dispatch(startTest());
            store.dispatch(setMatrix(data.matrix));
          }
          break;
        case 'STOP_TEST': {
          store.dispatch(stopTest());
        }
        default:
          return;
      }
    });
  });
};

export const sendMessage = () => {
  stompClient.send(
    socket,
    {},
    JSON.stringify({ socket: getUsername(), type: 'START_TEST' })
  );
};

export const requestDevice = () => {
  stompClient.send(
    socket,
    {},
    JSON.stringify({ socket: getUsername(), type: 'DEVICE_REQUEST' })
  );
};

export const requestMonitorMock = () => {
  stompClient.send(
    socket,
    {},
    JSON.stringify({ socket: getUsername(), type: 'MONITOR_REQUEST' })
  );
};

export const deviceAnswered = () => {
  stompClient.send(
    socket,
    {},
    JSON.stringify({ socket: getUsername(), type: 'DEVICE_ANSWER' })
  );
};

export const startTestMock = () => {
  stompClient.send(
    socket,
    {},
    JSON.stringify({ socket: getUsername(), type: 'START_TEST' })
  );
};

export const stopTestMock = () => {
  stompClient.send(
    socket,
    {},
    JSON.stringify({ socket: getUsername(), type: 'STOP_TEST' })
  );
};
