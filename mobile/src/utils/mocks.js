import store from '../store/store';
import {addPoint} from '../store/PointsActions';

export const addPointsMock = () => {
  setInterval(() => {
    store.dispatch(addPoint(Math.random() * 10, Math.random() * 10));
  }, 100);
};
