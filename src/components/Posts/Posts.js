import React from 'react';
import Post from '../Post/Post';
import './Posts.css';
import { reduxForm } from 'redux-form';
import { required, maxLength } from '../../utils/validators';
import { createField, Textarea } from '../FormControls/FormControls';

const maxLength15 = maxLength(15);

const PostForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      {createField(null, 'newPostText', 'Enter text', Textarea, [
        required,
        maxLength15,
      ])}
      <button>Add post</button>
    </form>
  );
};

const PostReduxForm = reduxForm({
  form: 'addNewPostForm',
})(PostForm);

const Posts = (props) => {
  let postsElements = props.posts.map((post) => (
    <Post message={post.message} likesCount={post.likesCount} key={post.id} />
  ));

  const addNewPost = (values) => {
    props.addPost(values.newPostText);
  };

  return (
    <>
      <PostReduxForm onSubmit={addNewPost} />
      <div className="posts">{postsElements}</div>
    </>
  );
};

export default Posts;
