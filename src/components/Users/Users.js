import React from 'react';
import User from './User';
import Paginator from '../Paginator/Paginator';

let Users = (props) => {
  return (
    <div>
      <Paginator
        currentPage={props.currentPage}
        onPageChange={props.onPageChange}
        pageSize={props.pageSize}
        totalItemsCount={props.totalUsersCount}
      />
      {props.users.map((el) => (
        <User
          key={el.id}
          user={el}
          followingInProgress={props.followingInProgress}
          unfollow={props.unfollow}
          follow={props.follow}
          props={props}
        />
      ))}
    </div>
  );
};

export default Users;
