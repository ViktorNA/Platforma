import { hot } from 'react-hot-loader/root';
import React from 'react';
import MainRouter from '../routes/MainRouter.jsx';
import { Provider } from 'react-redux';
import store from '../reducers/store.jsx';
import styles from './App.css';
import AdminMenu from './AdminMenu/AdminMenu.jsx';

const App = () => {
  return (
    <Provider store={store}>
      <div className={styles.Container}>
        <AdminMenu />
        <MainRouter />
      </div>
    </Provider>
  );
};

export default hot(App);
