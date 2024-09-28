import { combineReducers } from 'redux';


const userReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SET_USER':
      return action.payload;
    case 'UNSET_USER':
      return {};
    default:
      return state;
  }
};

const editUsername = (state = {}, action) => {
  if (action.type === 'SET_USER') {
    return action.payload
  } else if (action.type === 'CHANGE_USERNAME') {
    const newName = action.payload
    return {...state, username: newName}
  } else if (action.type === 'RESET_USERNAME') {
    return action.payload
  }
  return state;
}


// user will be on the redux state at:
// state.user

export default combineReducers({
  userReducer,
  editUsername,
});
