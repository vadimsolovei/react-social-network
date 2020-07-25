import React from 'react';
import FriendItem from '../FriendItem/FriendItem';
import './Friends.css';

const Friends = (props) => {
  let friendsElements = props.friends.map((el) => (
    <FriendItem name={el.name} id={el.id} key={el.id} />
  ));

  return (
    <div className='friends'>
      <h2>Friends</h2>
      <div className='friends__item'>{friendsElements}</div>
    </div>
  );
};

export default Friends;
