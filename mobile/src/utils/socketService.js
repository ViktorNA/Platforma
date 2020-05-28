import {Stomp} from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import {getToken, getUsername} from './storageService';

let stompClient = null;

const headers = async () => ({
  'Access-Control-Allow-Origin': '*',
  Authorization: `Bearer ${await getToken()}`,
});

const socket = '/app/userSocket';

export const connectAndSubscribe = async callback => {
  const username = await getUsername();
  const socket = new SockJS(
    'https://stormy-waters-38982.herokuapp.com/gs-guide-websocket',
  );
  stompClient = Stomp.over(socket);
  stompClient.debug = () => {};
  stompClient.connect({}, function(frame) {
    console.log('Connected: ' + frame);
    stompClient.subscribe('/topic/socket' + username, function(message) {
      console.log('Data');
      const data = JSON.parse(message.body);
      console.log(data);
    });
    callback();
  });
};

export const startTestMock = async () => {
  const username = await getUsername();
  stompClient.send(
    socket,
    {},
    JSON.stringify({socket: username, type: 'START_TEST'}),
  );
};
