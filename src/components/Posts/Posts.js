import React, {useEffect} from 'react';
import Post from './Post/Post';
import useStyles from './styles';
import {useDispatch, useSelector} from 'react-redux';
import {fetchPosts} from '../../features/posts/postsSlice';
import {CircularProgress, Grid} from '@material-ui/core';

const Posts = ({setCurrentId}) => {
  const classes = useStyles();

  const dispatch = useDispatch();
  const {posts, status, error} = useSelector(state => state.posts);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchPosts())
    }
  }, [dispatch, status]);

  const renderPosts = () => {
    if (status === 'loading') {
      return <CircularProgress />
    } else if (status === 'succeeded') {
      return (
        <Grid className={classes.mainContainer} container alignItems={'stretch'} spacing={3}>
          {posts.map(post => (
            <Grid item key={post._id} xs={12} sm={6}>
              <Post post={post} setCurrentId={setCurrentId} />
            </Grid>
          ))}
        </Grid>
      )
    } else if (status === 'failed') {
      return <div>{error}</div>
    }
  }

  return (
    <>
      {renderPosts()}
    </>
  );
};

export default Posts;
