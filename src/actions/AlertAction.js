import { ADD_ALERT, REMOVE_ALERT } from './Types'

export const addAlert = (text, style) => {
  return {
    type: ADD_ALERT,
    text,
    style
  };
};
  
export const removeAlert = (id) => {
  return {
    type: REMOVE_ALERT,
    id
  };
};