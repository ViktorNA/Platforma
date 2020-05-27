import React from 'react';
import {SET_ROUTER_SCREEN} from './RouterActioins';

const initialState = {
  screen: 'menu',
};
const RouterReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ROUTER_SCREEN:
      {
        const {screen} = action;
        return {
          ...state,
          screen,
        };
      }
      break;
    default:
      return state;
  }
};

export default RouterReducer;
