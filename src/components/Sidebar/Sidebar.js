import React from 'react';
import { NavLink } from 'react-router-dom';
import Friends from '../Friends/Friends';
import './Sidebar.css';

const Sidebar = (props) => {
  return (
    <aside>
      <nav>
        <ul>
          <li>
            <NavLink to='/profile'>Profile</NavLink>
          </li>
          <li>
            <NavLink to='/dialogs'>Dialogs</NavLink>
          </li>
          <li>
            <NavLink to='/news'>News</NavLink>
          </li>
          <li>
            <NavLink to='/music'>Music</NavLink>
          </li>
          <li>
            <NavLink to='/settings'>Settings</NavLink>
          </li>
          <li>
            <NavLink to='/users'>Users</NavLink>
          </li>
        </ul>
      </nav>
      <Friends friends={props.sidebar.friends} />
    </aside>
  );
};

export default Sidebar;
