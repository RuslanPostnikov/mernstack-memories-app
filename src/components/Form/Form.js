import React, {useEffect, useState} from 'react';
import useStyles from './styles';
import {Button, Paper, TextField, Typography} from '@material-ui/core';
import FileBase from 'react-file-base64';
import {useDispatch, useSelector} from 'react-redux';
import {addPost, updatePost} from '../../features/posts/postsSlice';

const postInitialState = {
  title: '',
  message: '',
  tags: '',
  selectedFile: ''
};

const Form = ({currentId, setCurrentId}) => {
  const classes = useStyles();
  const [postData, setPostData] = useState(postInitialState);
  const [addRequestStatus, setAddRequestStatus] = useState('idle')
  const dispatch = useDispatch();
  const post = useSelector(state => currentId ? state.posts.posts.find(p => p._id === currentId) : null);
  const user = useSelector(state => state.auth.authData);
  const name = user?.result?.name;

  const canSave = Object.values(postData).every(Boolean) && addRequestStatus === 'idle';

  useEffect(() => {
    if(post) {
      const data = {};
      Object.keys(postInitialState).map(key => data[key] = post[key]);
      setPostData(data);
    }
  }, [post]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setAddRequestStatus('pending');


      if(currentId) {
        await dispatch(updatePost({id: currentId, post: {...postData, name}}));
      } else {
        await dispatch(addPost({...postData, name})).unwrap();
      }
      clear();
    } catch (e) {
      console.log(e);
    } finally {
      setAddRequestStatus('idle')
    }
  }

  const clear = () => {
    setCurrentId(null);
    setPostData(postInitialState);
  }

  const handleChange = e => {
    const {name, value} = e.target;
    if(name === 'tags') {
      let newValue = [...value.split(',')].map(item => item.trim())
      setPostData({
        ...postData, [name]: newValue,
      });
    } else {
      setPostData({
        ...postData, [name]: value,
      });
    }
  }

  const capitalizeFirstLetter = string => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  if(!name) {
    return (
      <Paper className={classes.paper}>
        <Typography variant={'h6'} align={'center'}>
          Please Sign In to create your own memories and like other memoires
        </Typography>
      </Paper>
    )
  }

  return (
    <Paper className={classes.paper}>
      <form
        autoComplete={'off'}
        noValidate
        className={classes.root && classes.form}
        onSubmit={handleSubmit}
      >
        <Typography variant={'h6'}>{currentId ? 'Editing' : 'Creating'} a Memory</Typography>
        {
          Object.keys(postData)
            .filter(key => key !== 'selectedFile')
            .map(key => {
              return (
                <TextField
                  key={key}
                  name={key}
                  variant={'outlined'}
                  label={capitalizeFirstLetter(key)}
                  fullWidth
                  value={postData[key]}
                  onChange={handleChange}
                />
              )
            })
        }
        <div className={classes.fileInput}>
          <FileBase
            type={'file'}
            multiple={false}
            onDone={({base64}) => setPostData({...postData, selectedFile: base64})}
          />
        </div>
        <Button
          className={classes.buttonSubmit}
          variant={'contained'}
          color={'primary'}
          size={'large'}
          type={'submit'}
          fullWidth
          disabled={!canSave}
        >Submit</Button>
        <Button
          variant={'contained'}
          color={'secondary'}
          size={'small'}
          onClick={clear}
          fullWidth
        >Clear</Button>
      </form>
    </Paper>
  );
};

export default Form;
