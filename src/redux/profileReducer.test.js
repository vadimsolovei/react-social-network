import profileReducer, {
  addPostActionCreator,
  deletePostActionCreator,
} from './profileReducer';

let state = {
  posts: [
    { id: 1, message: 'Second post', likesCount: 13 },
    { id: 2, message: 'First post', likesCount: 23 },
  ],
};

it('length of post should increment', () => {
  let action = addPostActionCreator('Test message');
  let newState = profileReducer(state, action);
  expect(newState.posts.length).toBe(3);
});

it('new message post should be correct', () => {
  let action = addPostActionCreator('Test message');
  let newState = profileReducer(state, action);
  expect(newState.posts[2].message).toBe('Test message');
});

it('after deleting post length should decrement', () => {
  let action = deletePostActionCreator(1);
  let newState = profileReducer(state, action);
  expect(newState.posts.length).toBe(1);
});

it(`after deleting post length shouldn't mutate`, () => {
  let action = deletePostActionCreator(10);
  let newState = profileReducer(state, action);
  expect(newState.posts.length).toBe(2);
});
