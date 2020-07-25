const ADD_MESSAGE = 'dialogs/ADD_MESSAGE';

let initialState = {
  dialogs: [
    { id: 1, name: 'Alex' },
    { id: 2, name: 'Gabe' },
    { id: 3, name: 'Mike' },
    { id: 4, name: 'Kano' }
  ],

  messages: [
    { id: 1, message: 'Hi' },
    { id: 2, message: 'Hello' },
    { id: 3, message: 'Bye' },
    { id: 4, message: 'Okay' }
  ]
};

const dialogsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_MESSAGE: {
      let newMessage = {
        id: 5,
        message: action.newMessageText
      };
      return {
        ...state,
        messages: [...state.messages, newMessage]
      };
    }
    default:
      return state;
  }
};

export const addMessageActionCreator = (newMessageText) => {
  return { type: ADD_MESSAGE, newMessageText };
};

export default dialogsReducer;
