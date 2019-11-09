export const ADD_PATH = 'ADD_PATH';
export const ADD_USG = 'ADD_USG';
export const ADD_XRAY = 'ADD_XRAY';
export const ADD_ECG = 'ADD_ECG';
export const ADD_PFT = 'ADD_PFT';

export function addPath() {
  return { type: ADD_PATH };
}

export function addUSG() {
  return { type: ADD_USG };
}

export function addXRay() {
  return { type: ADD_XRAY };
}

export function addECG() {
  return { type: ADD_ECG };
}

export function addPFT() {
  return { type: ADD_PFT };
}
