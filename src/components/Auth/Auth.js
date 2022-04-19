import React, {useState} from 'react';
import {Avatar, Button, Container, Grid, Paper, Typography} from '@material-ui/core';
import useStyles from './styles';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Input from './Input';
import {useDispatch} from 'react-redux';
import {useNavigate} from 'react-router';
import {signIn, signUp} from '../../features/posts/authSlice';

const initialState = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
}

const Auth = () => {
  const classes = useStyles();
  const [showPassword, setShowPassword] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = e => {
    e.preventDefault();

    if(isSignUp) {
      dispatch(signUp({formData, navigate}));
    } else {
      dispatch(signIn({formData, navigate}));
    }
  }

  const handleChange = (e) => setFormData({...formData, [e.target.name]: e.target.value});

  const handleShowPassword = () => setShowPassword(prevState => !prevState);

  const switchMode = () => {
    setIsSignUp(prevState => !prevState);
    setShowPassword(false);
  };

  return (
    <div>
      <Container component={'main'} maxWidth={'xs'}>
        <Paper className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon/>
          </Avatar>
          <Typography variant={'h5'}>{isSignUp ? 'Sign up' : 'Sign in'}</Typography>
          <form className={classes.form} onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              {isSignUp && (
                <>
                  <Input name={'firstName'} label={'First Name'} handleChange={handleChange} half />
                  <Input name={'lastName'} label={'Last Name'} handleChange={handleChange} half />
                </>
              )}
              <Input name={'email'} label={'Email Address'} type={'email'} handleChange={handleChange}/>
              <Input
                name={'password'}
                label={'Password'}
                type={showPassword ? 'text' : 'password'}
                handleChange={handleChange}
                handleShowPassword={handleShowPassword}
              />
              {isSignUp && (
                <Input
                  name={'confirmPassword'}
                  label={'Repeat Password'}
                  type={'password'}
                  handleChange={handleChange}
                />
              )}
            </Grid>
            <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
              { isSignUp ? 'Sign Up' : 'Sign In' }
            </Button>
            <Grid container justifyContent={'flex-end'}>
              <Grid item>
                <Button onClick={switchMode}>
                  { isSignUp ? 'Already have an account? Sign in' : "Don't have an account? Sign Up" }
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Container>
    </div>
  );
};

export default Auth;
