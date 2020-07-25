import { userApi, profileApi, profileApi as profileAPI } from '../api/api';
import { stopSubmit } from 'redux-form';

const ADD_POST = 'profile/ADD_POST';
const SET_USER_PROFILE = 'profile/SET_USER_PROFILE';
const SET_USER_STATUS = 'profile/SET_USER_STATUS';
const DELETE_POST = 'profile/DELETE_POST';
const SAVE_PHOTO_SUCCESS = 'SAVE_PHOTO_SUCCESS';

let initialState = {
  posts: [
    { id: 1, message: 'Second post', likesCount: 13 },
    { id: 2, message: 'First post', likesCount: 23 },
  ],
  profile: null,
  status: '',
};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST: {
      let newPost = {
        id: 5,
        message: action.newPostText,
        likesCount: 0,
      };
      return {
        ...state,
        posts: [...state.posts, newPost],
        newPostText: '',
      };
    }

    case DELETE_POST: {
      return {
        ...state,
        posts: state.posts.filter((p) => p.id !== action.postId),
      };
    }

    case SET_USER_PROFILE: {
      return {
        ...state,
        profile: action.profile,
      };
    }

    case SET_USER_STATUS: {
      return {
        ...state,
        status: action.status,
      };
    }
    case SAVE_PHOTO_SUCCESS:
      debugger;
      return { ...state, profile: { ...state.profile, photos: action.photos } };

    default:
      return state;
  }
};

export const addPostActionCreator = (newPostText) => {
  return { type: ADD_POST, newPostText };
};

export const deletePostActionCreator = (postId) => {
  return { type: DELETE_POST, postId };
};

const setUserProfile = (profile) => {
  return { type: SET_USER_PROFILE, profile };
};

const setUserStatus = (status) => {
  return { type: SET_USER_STATUS, status };
};

export const savePhotoSuccess = (photos) => ({
  type: SAVE_PHOTO_SUCCESS,
  photos,
});

export const getUserProfile = (userId) => async (dispatch) => {
  let data = await userApi.getProfile(userId);
  dispatch(setUserProfile(data));
};

export const getUserStatus = (userId) => async (dispatch) => {
  let data = await profileApi.getStatus(userId);
  dispatch(setUserStatus(data));
};

export const updateUserStatus = (status) => async (dispatch) => {
  let data = await profileApi.updateStatus(status);
  if (data.resultCode === 0) {
    dispatch(setUserStatus(status));
  }
};

export const saveProfile = (profile) => async (dispatch, getState) => {
  const userId = getState().auth.userId;
  const data = await profileAPI.saveProfile(profile);

  if (data.resultCode === 0) {
    dispatch(getUserProfile(userId));
  } else {
    dispatch(stopSubmit('editProfile', { _error: data.messages[0] }));
    return Promise.reject(data.messages[0]);
  }
};

export const savePhoto = (file) => async (dispatch) => {
  let data = await profileAPI.savePhoto(file);

  if (data.resultCode === 0) {
    dispatch(savePhotoSuccess(data.data.photos));
  }
};

export default profileReducer;
