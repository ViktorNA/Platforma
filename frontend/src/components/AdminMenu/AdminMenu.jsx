import React from 'react';
import {
  connectAndSubscribe,
  deviceAnswered,
  requestDevice,
  requestMonitorMock,
  sendMessage,
  startTestMock,
  stopTestMock,
} from '../../utils/SocketService.jsx';
import instance from '../../utils/AxiosInstance.jsx';
import {
  getTests,
  saveFullTestMock,
  saveTestMock,
} from '../../utils/TestService.jsx';

const AdminMenu = () => {
  const sendViaGet = () => {
    instance.get('socketGet');
  };

  const getTestsAM = async () => {
    const res = await getTests();
    console.log(res);
  };
  return (
    <div>
      <button onClick={connectAndSubscribe}>Connect and sub</button>
      <button onClick={sendMessage}>Send via Socket</button>
      <button onClick={sendViaGet}>Send via Get</button>
      <button onClick={requestDevice}>Request device</button>
      <button onClick={requestMonitorMock}>Request monitor</button>
      <button onClick={deviceAnswered}>Answer device</button>
      <button onClick={startTestMock}>Start test</button>
      <button onClick={stopTestMock}>Stop test</button>
      <button onClick={saveTestMock}>Save test</button>
      <button onClick={saveFullTestMock}>Save full test</button>
      <button onClick={getTestsAM}>Get test</button>
    </div>
  );
};

export default AdminMenu;
