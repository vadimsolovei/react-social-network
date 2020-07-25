import React, { useState, useEffect } from 'react';
import './Profile.css';

const ProfileStatus = ({ status, updateUserStatus }) => {
  let [editMode, setEditMode] = useState(false);
  let [newStatus, setStatus] = useState(status);

  useEffect(() => {
    setStatus(status);
  }, [status]);

  const activateEditMode = () => {
    setEditMode(true);
  };

  const deactivateEditMode = () => {
    setEditMode(false);
    updateUserStatus(newStatus);
  };

  const onStatusChange = (e) => {
    setStatus(e.currentTarget.value);
  };

  return (
    <div>
      {!editMode && (
        <div>
          <span onDoubleClick={activateEditMode}>{status || 'No status'}</span>
        </div>
      )}
      {editMode && (
        <div>
          <input
            onChange={onStatusChange}
            autoFocus={true}
            onBlur={deactivateEditMode}
            value={newStatus}
          />
        </div>
      )}
    </div>
  );
};

export default ProfileStatus;
