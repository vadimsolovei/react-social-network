import React from 'react';
import './Profile.css';
import PostsContainer from '../Posts/PostsContainer';
import ProfileInfo from './ProfileInfo';

const Profile = ({
  profile,
  status,
  updateUserStatus,
  isOwner,
  saveProfile,
  savePhoto,
}) => {
  return (
    <main>
      <div className="content">
        <ProfileInfo
          isOwner={isOwner}
          profile={profile}
          status={status}
          updateUserStatus={updateUserStatus}
          saveProfile={saveProfile}
          savePhoto={savePhoto}
        />
        <PostsContainer />
      </div>
    </main>
  );
};

export default Profile;
