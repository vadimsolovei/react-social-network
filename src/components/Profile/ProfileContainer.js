import React from 'react';
import './Profile.css';
import { connect } from 'react-redux';
import Profile from './Profile';
import {
  getUserProfile,
  getUserStatus,
  savePhoto,
  saveProfile,
  updateUserStatus,
} from '../../redux/profileReducer';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { withAuthRedirect } from '../../hoc/withAuthRedirect';

class ProfileContainer extends React.Component {
  refreshProfile() {
    let userId = this.props.match.params.userId;
    if (!userId) {
      userId = this.props.authorizeUserId;
      if (!userId) {
        userId = this.props.history.push('/login');
      }
    }
    this.props.getUserProfile(userId);
    this.props.getUserStatus(userId);
  }

  componentDidMount() {
    this.refreshProfile();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.match.params.userId !== prevProps.match.params.userId) {
      this.refreshProfile();
    }
  }

  render() {
    return (
      <>
        <Profile
          {...this.props}
          isOwner={!this.props.match.params.userId}
          profile={this.props.profile}
          status={this.props.status}
          updateUserStatus={this.props.updateUserStatus}
          savePhoto={this.props.savePhoto}
        />
      </>
    );
  }
}

let mapStateToProps = (state) => ({
  profile: state.profilePage.profile,
  status: state.profilePage.status,
  authorizeUserId: state.auth.userId,
  isAuth: state.auth.isAuth,
});

export default compose(
  connect(mapStateToProps, {
    getUserProfile,
    getUserStatus,
    updateUserStatus,
    saveProfile,
    savePhoto,
  }),
  withRouter,
  withAuthRedirect
)(ProfileContainer);
