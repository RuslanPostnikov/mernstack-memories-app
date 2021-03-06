import React from 'react';
import { Container } from '@material-ui/core';
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import { BrowserRouter, Route } from 'react-router-dom';
import { Routes } from 'react-router';
import Auth from './components/Auth/Auth';
 
const App = () => {

  return (
    <BrowserRouter>
      <Container maxWidth={'lg'}>
        <Navbar/>
      </Container>
      <Routes>
        <Route index element={<Home/>}/>
        <Route path={'/auth'} element={<Auth/>}/>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
