import React from 'react';
import DialogItem from '../DialogItem/DialogItem';
import Message from '../Message/Message';
import './Dialogs.css';
import { reduxForm } from 'redux-form';
import { createField, Textarea } from '../FormControls/FormControls';
import { required, maxLength } from '../../utils/validators';

const maxLength10 = maxLength(10);

const MessageForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      {createField(null, 'newMessageText', 'Enter message', Textarea, [
        required,
        maxLength10,
      ])}
      <button>Send message</button>
    </form>
  );
};

const MessageReduxForm = reduxForm({
  form: 'addNewMessageForm',
})(MessageForm);

const Dialogs = ({ dialogPage, addMessage }) => {
  let state = dialogPage;

  let dialogsElements = state.dialogs.map((el) => (
    <DialogItem name={el.name} id={el.id} key={el.id} />
  ));

  let messageElements = state.messages.map((message) => (
    <Message message={message.message} key={message.id} />
  ));

  const addNewMessage = (values) => {
    addMessage(values.newMessageText);
  };

  return (
    <div className="dialogs">
      <div className="dialogs__item">{dialogsElements}</div>
      <div className="messages">{messageElements}</div>
      <MessageReduxForm onSubmit={addNewMessage} />
    </div>
  );
};

export default Dialogs;
