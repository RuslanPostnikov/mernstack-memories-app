import React from 'react';
import { Card, CardContent, CardMedia, Button, Typography, CardActions } from '@material-ui/core';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import moment from 'moment';
import useStyles from './styles';
import { useDispatch, useSelector } from 'react-redux';
import { deletePost, likePost } from '../../../features/posts/postsSlice';
import { selectUser } from '../../../features/posts/authSlice';

const Post = ({ post, setCurrentId }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  const handleLikePost = () => dispatch(likePost(post._id));

  const handleDeletePost = () => dispatch(deletePost(post._id));

  const properUser = user?.result?._id === post?.creator;

  return (
    <Card className={classes.card}>
      <CardMedia className={classes.media}
                 image={post.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'}
                 title={post.title}/>
      <div className={classes.overlay}>
        <Typography variant="h6">{post.name}</Typography>
        <Typography variant="body2">{moment(post.createdAt).fromNow()}</Typography>
      </div>
      <div className={classes.overlay2}>
        {properUser && (
          <Button
            style={{ color: 'white' }}
            size="small"
            onClick={() => setCurrentId(post._id)}
          ><MoreHorizIcon fontSize="medium"/></Button>
        )}
      </div>
      <div className={classes.details}>
        <Typography variant="body2" color="textSecondary" component="h2">{post.tags.map((tag) => `#${tag} `)}</Typography>
      </div>
      <Typography className={classes.title} gutterBottom variant="h5" component="h2">{post.title}</Typography>
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">{post.message}</Typography>
      </CardContent>
      <CardActions className={classes.cardActions}>
        <Button
          size="small"
          color="primary"
          onClick={handleLikePost}
          disabled={!user?.result}
        >
          <ThumbUpAltIcon fontSize="small"/> &nbsp; Likes {post.likes.length}
        </Button>
        {properUser && (
          <Button size="small" color="primary" onClick={handleDeletePost}>
            <DeleteIcon fontSize="small"/> Delete
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

export default Post;
