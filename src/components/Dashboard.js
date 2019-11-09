import React from 'react';
const { useReducer } = React;
import { GET_LIST, GET_MANY, Responsive, withDataProvider } from 'react-admin';
import { addPath, addUSG, addXRay, addECG, addPFT } from './referral-actions';
import { ADD_PATH, ADD_USG, ADD_XRAY, ADD_ECG, ADD_PFT } from './referral-actions';

const initialState = {
  PATH: 0,
  USG: 0,
  'X-RAY': 0,
  ECG: 0,
  PFT: 0
};

const ReferralReducer = (state, action) => {
  console.log(state);
  switch (action.type) {
    case ADD_PATH:
      return { ...state, PATH: state.PATH + 1 };
    case ADD_USG:
      return { ...state, USG: state.USG + 1 };
    case ADD_XRAY:
      return { ...state, 'X-RAY': state['X-RAY'] + 1 };
    case ADD_ECG:
      return { ...state, ECG: state.ECG + 1 };
    case ADD_PFT:
      return { ...state, PFT: state.PFT + 1 };
    default:
      return initialState;
  }
};

const styles = {
  flex: { display: 'flex' },
  flexColumn: { display: 'flex', flexDirection: 'column' },
  leftCol: { flex: 1, marginRight: '1em' },
  rightCol: { flex: 1, marginLeft: '1em' },
  singleCol: { marginTop: '2em', marginBottom: '2em' }
};

function Dashboard() {}
