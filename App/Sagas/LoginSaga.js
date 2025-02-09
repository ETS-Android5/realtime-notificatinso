import { put, call } from 'redux-saga/effects';
import LoginActions from 'App/Stores/Login/Actions';
import { userService } from 'App/Services/UserService';

export function* fetchUser() {
  // Dispatch a redux action using `put()`
  // @see https://redux-saga.js.org/docs/basics/DispatchingActions.html
  yield put(LoginActions.fetchUserLoading());

  // Fetch user informations from an API
  const user = yield call(userService.fetchUser);
  if (user) {
    yield put(LoginActions.fetchUserSuccess(user));
  } else {
    yield put(
      LoginActions.fetchUserFailure('There was an error while fetching user informations.'),
    );
  }
}
