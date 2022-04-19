import React from 'react';
import {AppBar, Avatar, Button, Toolbar, Typography} from '@material-ui/core';
import memories from '../../images/memories.png';
import useStyles from './styles';
import {Link} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate} from 'react-router';
import {logoutAction} from '../../features/posts/authSlice';

const Navbar = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(state => state.auth.authData);

  const logout = () => {
    dispatch(logoutAction());
    navigate('/auth');
  };

  return (
    <AppBar className={classes.appBar} position={'static'} color={'inherit'}>
      <div className={classes.brandContainer}>
        <Typography className={classes.heading} variant={'h2'} align={'center'}>Memories</Typography>
        <img className={classes.image} src={memories} alt="memories" height={'60'}/>
      </div>
      <Toolbar className={classes.toolbar}>
        {user ? (
          <div className={classes.profile}>
            <Avatar className={classes.purple} alt={user.result.name} src={user.result.imageUrl}>
              {user.result.name.charAt(0)}
            </Avatar>
            <Typography className={classes.userName} variant={'h6'}>{user.result.name}</Typography>
            <Button variant={'contained'} className={classes.logout} color={'secondary'}
                    onClick={logout}
            >Log out</Button>
          </div>
        ) : (
            <Button component={Link} to={'/auth'} variant={'contained'} color={'primary'}>
              Sign in
            </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
