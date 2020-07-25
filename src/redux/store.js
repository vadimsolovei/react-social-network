import profileReducer from './profileReducer';
import dialogsReducer from './dialogsReducer';
import sidebarReducer from './sidebarReducer';

let store = {
  _state: {
    profilePage: {
      posts: [
        { id: 1, message: 'Second post', likesCount: 13 },
        { id: 2, message: 'First post', likesCount: 23 },
      ],
      newPostText: '',
    },

    dialogPage: {
      dialogs: [
        { id: 1, name: 'Alex' },
        { id: 2, name: 'Gabe' },
        { id: 3, name: 'Mike' },
        { id: 4, name: 'Kano' },
      ],

      messages: [
        { id: 1, message: 'Hi' },
        { id: 2, message: 'Hello' },
        { id: 3, message: 'Bye' },
        { id: 4, message: 'Okay' },
      ],
      newMessageText: '',
    },

    sidebar: {
      friends: [
        { id: 1, name: 'Alex' },
        { id: 2, name: 'Gabe' },
        { id: 3, name: 'Mike' },
      ],
    },
  },

  _callSubscriber() {},

  getState() {
    return this._state;
  },

  subscribe(observer) {
    this._callSubscriber = observer;
  },

  // _addPost() {
  //   let newPost = {
  //     id: 5,
  //     message: this._state.profilePage.newPostText,
  //     likesCount: 0
  //   };
  //   this._state.profilePage.posts.push(newPost);
  //   this._state.profilePage.newPostText = '';
  //   this._callSubscriber(this._state);
  // },

  // _updatePostText(newText) {
  //   this._state.profilePage.newPostText = newText;
  //   this._callSubscriber(this._state);
  // },

  // _addMessage() {
  //   let newMessage = {
  //     id: 5,
  //     message: this._state.dialogPage.newMessageText
  //   };
  //   this._state.dialogPage.messages.push(newMessage);
  //   this._state.dialogPage.newMessageText = '';
  //   this._callSubscriber(this._state);
  // },

  // _updateMessageText(newText) {
  //   this._state.dialogPage.newMessageText = newText;
  //   this._callSubscriber(this._state);
  // },

  dispatch(action) {
    this._state.profilePage = profileReducer(this._state.profilePage, action);
    this._state.dialogPage = dialogsReducer(this._state.dialogPage, action);
    this._state.sidebar = sidebarReducer(this._state.sidebar, action);

    this._callSubscriber(this._state);
  },
};

export default store;
