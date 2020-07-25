import { getAuthUserData } from './authReducer';

const INITIALIZING_SUCCESS = 'app/INITIALIZING_SUCCESS';

let initialState = {
  initialized: false
};

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case INITIALIZING_SUCCESS:
      return {
        ...state,
        initialized: true
      };

    default:
      return state;
  }
};

const initializingSuccess = () => {
  return { type: INITIALIZING_SUCCESS };
};

export const initializeApp = () => (dispatch) => {
  let promise = dispatch(getAuthUserData());
  promise.then(() => {
    dispatch(initializingSuccess());
  });
};

export default appReducer;
