import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// worker Saga: will be fired on "FETCH_USER" actions
function* fetchUser() {
  try {
    const config = {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    };

    // the config includes credentials which
    // allow the server session to recognize the user
    // If a user is logged in, this will return their information
    // from the server session (req.user)
    const response = yield axios.get('/api/user', config);


    // now that the session has given us a user object
    // with an id and username set the client-side user object to let
    // the client-side code know the user is logged in
    yield put({ type: 'SET_USER', payload: response.data });

  } catch (error) {
    console.log('User get request failed', error);
  }
}


// Changing the users username
function* changeUsername(action) {

  // console.log('action.payload', action.payload);

  try {
      const response = yield axios({
          method: 'PUT',
          url: `/api/user/change`,
          data: {newName: action.payload}
      })
      yield put({
          type: 'FETCH_USER',
      })
  } catch (error) {
    alert('you cant do that')
      console.log('Unable to update username from server', error);
  }
}

//delete account of current user
function* deleteAccount() {
  // console.log('action.payload', action.payload);
  try {
      const response = yield axios({
          method: 'DELETE',
          url: `/api/user`
      })
      yield put({
          type: 'LOGOUT',
      })
  } catch (error) {
      console.log('Unable to delete account from server', error);
  }
}



function* userSaga() {
  yield takeLatest('FETCH_USER', fetchUser);
  yield takeLatest('SAGA_CHANGE_USERNAME', changeUsername);
  yield takeLatest('SAGA_DELETE_ACCOUNT', deleteAccount);
}

export default userSaga;
