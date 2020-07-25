import React from 'react';
import { NavLink } from 'react-router-dom';
import './FriendItem.css';

const FriendItem = (props) => {
  let path = '/Friends/' + props.id;

  return (
    <div>
      <span role='img' aria-label=''>
        &#129322;
      </span>
      <NavLink to={path}>{props.name}</NavLink>
    </div>
  );
};

export default FriendItem;
