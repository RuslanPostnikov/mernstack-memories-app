import React from 'react';
import {Grid, IconButton, InputAdornment, TextField} from '@material-ui/core';
import {Visibility, VisibilityOff} from '@material-ui/icons';

const Input = ({half, name, label, type, handleChange, handleShowPassword}) => {

  return (
    <Grid item xs={12} sm={half ? 6 : 12}>
      <TextField
        name={name}
        label={label}
        onChange={handleChange}
        variant={'outlined'}
        required
        fullWidth
        autoFocus
        type={type}
        InputProps={name === 'password' ? {
          endAdornment: (
            <InputAdornment position={'end'}>
              <IconButton onClick={handleShowPassword}>
                {type === 'password' ? <Visibility/> : <VisibilityOff/>}
              </IconButton>
            </InputAdornment>
          )
        } : null}
      />
    </Grid>
  );
};

export default Input;
