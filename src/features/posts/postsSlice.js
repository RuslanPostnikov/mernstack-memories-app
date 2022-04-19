import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import * as api from '../../api';

const initialState = {
  posts: [],
  status: 'idle',
  error: null,
}

export const fetchPosts = createAsyncThunk(
  'posts/fetchPosts',
  async () => {
  const {data} = await api.fetchPosts();
  return data;
});

export const addPost = createAsyncThunk(
  'posts/addPost',
  async post => {
    const {data} = await api.createPost(post);
    return data;
  }
);

export const updatePost = createAsyncThunk(
  'posts/updatePost',
  async ({id, post}) => {
    try {
      const {data} = await api.updatePost(id, post);
      return data;
    } catch (e) {
      console.log(e);
    }
  }
);

export const likePost = createAsyncThunk(
  'posts/likePost',
  async id => {
    try {
      const {data} = await api.likePost(id);
      return data;
    } catch (e) {
      console.log(e);
    }
  }
);

export const deletePost = createAsyncThunk(
  'posts/deletePost',
  async id => {
    try {
      await api.deletePost(id);
      return id;
    } catch (e) {
      console.log(e);
    }
  }
);

export const PostsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {

  },
  extraReducers(builder) {
    builder
      .addCase(fetchPosts.pending, state => {
        state.status = 'loading'
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = 'succeeded'
        // Add any fetched posts to the array
        state.posts = state.posts.concat(action.payload)
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      });
    builder.addCase(addPost.fulfilled, (state, action) => {
      state.posts.push(action.payload)
    });
    builder.addCase(updatePost.fulfilled, (state, action) => {
      state.posts[state.posts.findIndex(post => post._id === action.payload._id)] = action.payload;
    });
    builder.addCase(likePost.fulfilled, (state, action) => {
      state.posts[state.posts.findIndex(post => post._id === action.payload._id)] = action.payload;
    });
    builder.addCase(deletePost.fulfilled, (state, action) => {
      state.posts = state.posts.filter(post => post._id !== action.payload);
    });
  }
});

export default PostsSlice.reducer;
