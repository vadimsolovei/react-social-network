import React from 'react';
import './Profile.css';
import { createField, Input, Textarea } from '../FormControls/FormControls';
import { reduxForm } from 'redux-form';
import styles from '../FormControls/FormControls.module.css';

const ProfileDataForm = ({ handleSubmit, profile, error }) => {
  return (
    <form onSubmit={handleSubmit}>
      <button>Save</button>
      {error && <div className={styles.formControlsError}>{error}</div>}
      <div>
        <b>Name</b>: {createField('name', 'fullName', null, Input, null)}
      </div>
      <div>
        <b>About me</b>: {createField('aboutMe', 'aboutMe', null, Input, null)}
      </div>
      <div>
        <p>Contacts</p>
        <ul>
          {Object.keys(profile.contacts).map((key) => {
            return (
              <>
                <li key={key}>
                  <b>{key}</b>
                  {createField(key, 'contacts.' + key, null, Input, null)}
                </li>
              </>
            );
          })}
        </ul>
      </div>
      <div>
        <b>Open for a job</b>:
        {createField('jobOpen', 'lookingForAJob', null, Input, null, {
          type: 'checkbox',
        })}
      </div>
      <p>
        <b>Job desc</b>:
        {createField(
          'jobDesc',
          'lookingForAJobDescription',
          null,
          Textarea,
          null
        )}
      </p>
    </form>
  );
};

const ProfileDataReduxForm = reduxForm({
  form: 'editProfile',
})(ProfileDataForm);

export default ProfileDataReduxForm;
