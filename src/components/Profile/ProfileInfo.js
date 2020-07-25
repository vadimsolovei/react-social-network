import React, { useState } from 'react';
import './Profile.css';
import Preloader from '../Preloader/Preloader';
import ProfileStatus from './ProfileStatus';
import Image from '../Image/Image';
import userPhoto from '../../assets/images/user.png';
import ProfileDataReduxForm from './ProfileDataForm';

const ProfileInfo = ({
  profile,
  status,
  updateUserStatus,
  isOwner,
  saveProfile,
  savePhoto,
}) => {
  let [editMode, setEditMode] = useState(false);

  const activateEditMode = () => {
    setEditMode(true);
  };

  const onSubmit = (formData) => {
    saveProfile(formData).then(() => {
      setEditMode(false);
    });
  };

  if (!profile) {
    return <Preloader />;
  }

  const onMainPhotoSelected = (e) => {
    if (e.target.files.length) {
      savePhoto(e.target.files[0]);
    }
  };

  return (
    <div>
      <Image src={profile.photos.large || userPhoto} alt="User photo" />
      {isOwner && <input type={'file'} onChange={onMainPhotoSelected} />}
      <ProfileStatus status={status} updateUserStatus={updateUserStatus} />
      {editMode ? (
        <ProfileDataReduxForm
          initialValues={profile}
          profile={profile}
          onSubmit={onSubmit}
        />
      ) : (
        <ProfileData
          activateEditMode={activateEditMode}
          profile={profile}
          isOwner={isOwner}
        />
      )}
    </div>
  );
};

const Contact = ({ contactTitle, contactValue }) => {
  return (
    <li>
      <b>{contactTitle}</b>: <div>{contactValue}</div>
    </li>
  );
};

const ProfileData = ({ profile, activateEditMode, isOwner }) => {
  return (
    <>
      {isOwner && <button onClick={activateEditMode}>Edit</button>}
      <p>
        <b>Name</b>: {profile.fullName}
      </p>
      <p>
        <b>About me</b>: {profile.aboutMe}
      </p>
      <div>
        <p>Contacts</p>
        <ul>
          {Object.keys(profile.contacts).map((key) => {
            return (
              <Contact
                key={key}
                contactTitle={key}
                contactValue={profile.contacts[key]}
              />
            );
          })}
        </ul>
      </div>
      <p>
        <b>Open for a job</b>: {profile.lookingForAJob ? 'Yes' : 'No'}
      </p>
      {profile.lookingForAJob && (
        <p>
          <b>Job desc</b>: {profile.lookingForAJobDescription}
        </p>
      )}
    </>
  );
};

export default ProfileInfo;
