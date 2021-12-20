import React, { useState,useEffect } from 'react'

import {Routes, Route} from 'react-router-dom'
import {useAppState} from "../AppState"

import Nav from './Nav';
import Home from '../pages/Home';
import Auth from '../pages/Auth';
import Dashboard from '../pages/Dashboard';
import Ingredients from './Ingredients';
import Recipes from './Recipes';
import ShowIngredient from '../pages/ShowIngredient';



function App(props) {
  const {state, dispatch} = useAppState();

  
  const auth = JSON.parse(window.localStorage.getItem("auth"))


  useState(()=>{
    if (JSON.parse(window.localStorage.getItem("auth"))){
      dispatch({type: "auth", payload: auth})  
    }
  }, [])

  return (

    <>
    <Nav />
    <Routes>
      {auth ? <Route exact path="/" element={<Dashboard/>} /> : 
      <Route exact path="/" element={<Home/>} />}
      <Route path="/auth/:form" element={<Auth />} />
      <Route path="/mykitchen/ingredients" element={<Ingredients />} /> 
      <Route path="/mykitchen/recipes" element={<Recipes />} /> 
      <Route path="/mykitchen/ingredients/:ingredient" element={<ShowIngredient />} /> 
      <Route path="/dashboard" element={<Dashboard/>} />
    </Routes>
    </>

  );
}

export default App;
