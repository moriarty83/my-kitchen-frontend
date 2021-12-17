import React from 'react'
import ReactDom from 'react-dom'
import {Routes, Route, useParams} from 'react-router-dom'

import Nav from './Nav';
import Home from '../pages/Home';
import Auth from '../pages/Auth';
import Dashboard from '../pages/Dashboard';



function App() {
  return (

    <>
    <Nav />
    <Routes>
      <Route exact path="/" element={<Home/>} />
      <Route path="/auth/:form" element={<Auth />} />
      <Route path="/dashboard" element={<Dashboard/>} />
    </Routes>
    </>

  );
}

export default App;
