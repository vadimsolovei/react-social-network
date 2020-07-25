import React from 'react';
import userPhoto from '../../assets/images/user.png';
import { NavLink } from 'react-router-dom';
import Image from '../Image/Image';

let User = ({ user, followingInProgress, unfollow, follow }) => {
  return (
    <div>
      <div>
        <div>
          <NavLink to={'/profile/' + user.id}>
            <Image src={user.photos.small || userPhoto} alt="" />
          </NavLink>
          <div>
            {user.followed ? (
              <button
                disabled={followingInProgress.some((id) => id === user.id)}
                onClick={() => {
                  unfollow(user.id);
                }}
              >
                Unfollow
              </button>
            ) : (
              <button
                disabled={followingInProgress.some((id) => id === user.id)}
                onClick={() => {
                  follow(user.id);
                }}
              >
                Follow
              </button>
            )}
          </div>
        </div>
        <div>
          <p>{user.name}</p>
          <p>{user.status}</p>
        </div>
        <div>
          <p>{'user.location.city'}</p>
          <p>{'user.location.country'}</p>
        </div>
      </div>
    </div>
  );
};

export default User;
