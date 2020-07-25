import React from 'react';
import { connect } from 'react-redux';
import Users from './Users';
import {
  follow,
  unfollow,
  setCurrentPage,
  requestUsers,
} from '../../redux/usersReducer';
import Preloader from '../Preloader/Preloader';
import {
  getUsers,
  getPageSize,
  getTotalUsersCount,
  getCurrentPage,
  getIsFetching,
  getFollowingInProgress,
} from '../../redux/usersSelectors';

class UsersContainer extends React.Component {
  componentDidMount() {
    const { currentPage, pageSize, requestUsers } = this.props;
    requestUsers(currentPage, pageSize);
  }

  onPageChange = (pageNumber) => {
    const { setCurrentPage, pageSize, requestUsers } = this.props;
    requestUsers(pageNumber, pageSize);
    setCurrentPage(pageNumber);
  };

  render() {
    return (
      <div style={{ backgroundColor: 'cadetblue' }}>
        {this.props.isFetching === true && <Preloader />}
        <Users
          totalUsersCount={this.props.totalUsersCount}
          pageSize={this.props.pageSize}
          currentPage={this.props.currentPage}
          onPageChange={this.onPageChange}
          users={this.props.users}
          follow={this.props.follow}
          unfollow={this.props.unfollow}
          followingInProgress={this.props.followingInProgress}
        />
      </div>
    );
  }
}

let mapStateToProps = (state) => {
  return {
    users: getUsers(state),
    pageSize: getPageSize(state),
    totalUsersCount: getTotalUsersCount(state),
    currentPage: getCurrentPage(state),
    isFetching: getIsFetching(state),
    followingInProgress: getFollowingInProgress(state),
  };
};

export default connect(mapStateToProps, {
  follow,
  unfollow,
  setCurrentPage,
  requestUsers,
})(UsersContainer);
