import React from 'react';
import './Message.css';

const Message = props => {
  return (
    <div>
      <p>{props.message}</p>
    </div>
  );
};

export default Message;
