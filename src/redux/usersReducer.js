import { userApi } from '../api/api';
import { updateObjectInArray } from '../utils/object-helpers';

const FOLLOW = 'user/FOLLOW';
const UNFOLLOW = 'user/UNFOLLOW';
const SET_USERS = 'user/SET_USERS';
const SET_CURRENT_PAGE = 'user/SET_CURRENT_PAGE';
const SET_TOTAL_USERS_COUNT = 'user/SET_TOTAL_USERS_COUNT';
const TOGGLE_IS_FETCHING = 'user/TOGGLE_IS_FETCHING';
const TOGGLE_FOLLOWING_PROGRESS = 'user/TOGGLE_FOLLOWING_PROGRESS';

let initialState = {
  users: [],
  pageSize: 5,
  totalUsersCount: 0,
  currentPage: 1,
  isFetching: false,
  followingInProgress: [],
};

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case FOLLOW:
      return {
        ...state,
        users: updateObjectInArray(state.users, action.userId, ['id'], {
          followed: true,
        }),
      };

    case UNFOLLOW:
      return {
        ...state,
        users: updateObjectInArray(state.users, action.userId, ['id'], {
          followed: false,
        }),
      };

    case SET_USERS:
      return {
        ...state,
        users: action.users,
      };

    case SET_CURRENT_PAGE:
      return {
        ...state,
        currentPage: action.currentPage,
      };

    case SET_TOTAL_USERS_COUNT:
      return {
        ...state,
        totalUsersCount: action.totalUsersCount,
      };

    case TOGGLE_IS_FETCHING:
      return {
        ...state,
        isFetching: action.isFetching,
      };

    case TOGGLE_FOLLOWING_PROGRESS:
      return {
        ...state,
        followingInProgress: action.isFetching
          ? [...state.followingInProgress, action.userId]
          : state.followingInProgress.filter((id) => id !== action.userId),
      };

    default:
      return state;
  }
};

const followSuccess = (userId) => {
  return { type: FOLLOW, userId };
};

const unfollowSuccess = (userId) => {
  return { type: UNFOLLOW, userId };
};

const setUsers = (users) => {
  return { type: SET_USERS, users };
};

export const setCurrentPage = (currentPage) => {
  return { type: SET_CURRENT_PAGE, currentPage };
};

const setTotalUsersCount = (totalUsersCount) => {
  return { type: SET_TOTAL_USERS_COUNT, totalUsersCount };
};

const toggleIsFetching = (isFetching) => {
  return { type: TOGGLE_IS_FETCHING, isFetching };
};

const toggleFollowingProgress = (isFetching, userId) => {
  return { type: TOGGLE_FOLLOWING_PROGRESS, isFetching, userId };
};

export const requestUsers = (currentPage, pageSize) => async (dispatch) => {
  dispatch(toggleIsFetching(true));
  let data = await userApi.requestUsers(currentPage, pageSize);
  dispatch(setUsers(data.items));
  dispatch(toggleIsFetching(false));
  dispatch(setTotalUsersCount(data.totalCount));
};

const followUnfollow = async (userId, dispatch, APIMethod, actionCreator) => {
  dispatch(toggleFollowingProgress(true, userId));
  let data = await APIMethod(userId);
  if (data.resultCode === 0) {
    dispatch(actionCreator(userId));
  }
  dispatch(toggleFollowingProgress(false, userId));
};

export const unfollow = (userId) => (dispatch) => {
  followUnfollow(
    userId,
    dispatch,
    userApi.unfollow.bind(userApi),
    unfollowSuccess
  );
};

export const follow = (userId) => (dispatch) => {
  followUnfollow(userId, dispatch, userApi.follow.bind(userApi), followSuccess);
};

export default usersReducer;
