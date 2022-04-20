import { configureStore } from '@reduxjs/toolkit';
import postsSlice from '../features/posts/postsSlice';
import authSlice from '../features/posts/authSlice';

const store = configureStore({
  reducer: {
    posts: postsSlice,
    auth: authSlice,
  },
});

export default store;
