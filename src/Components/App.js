import React, { useState} from 'react'

import {Routes, Route} from 'react-router-dom'
import {useAppState} from "../AppState"

import Nav from './Nav';
import Home from '../pages/Home';
import Auth from '../pages/Auth';
import Dashboard from '../pages/Dashboard';
import Ingredients from './Ingredients';



function App(props) {
  const {dispatch} = useAppState();

  const auth = JSON.parse(window.localStorage.getItem("auth"))


  useState(()=>{
    
    if (auth){
      dispatch({type: "auth", payload: auth})  
    }
  })

  return (

    <>
    <Nav />
    <Routes>
      {auth ? <Route exact path="/" element={<Dashboard/>} /> : 
      <Route exact path="/" element={<Home/>} />}
      <Route path="/auth/:form" element={<Auth />} />
      <Route path="/mykitchen/ingredients" element={<Ingredients />} /> 
      <Route path="/dashboard" element={<Dashboard/>} />
    </Routes>
    </>

  );
}

export default App;
