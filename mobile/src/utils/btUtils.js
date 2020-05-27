import BluetoothSerial from 'react-native-bluetooth-serial-next';

export const enableBt = async () => {
  await BluetoothSerial.requestEnable();
  await connectToPlatform();
};

export const connectToPlatform = async () => {
  const devices = await BluetoothSerial.list();
  const hc = devices.find(d => d.name === 'HC-06');
  const device = await BluetoothSerial.connect(hc.id);
  console.log(device);
  readData();
};

export const readData = () => {
  BluetoothSerial.on('data', data => console.log(data));
};
