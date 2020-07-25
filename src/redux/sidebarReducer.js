let initialState = {
  friends: [
    { id: 1, name: 'Alex' },
    { id: 2, name: 'Gabe' },
    { id: 3, name: 'Mike' }
  ]
};

const sidebarReducer = (state = initialState, action) => {
  return state;
};

export default sidebarReducer;
