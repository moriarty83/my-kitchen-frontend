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
import ShowRecipe from '../pages/ShowRecipe';



function App(props) {
  const {state, dispatch} = useAppState();

  
  const auth = JSON.parse(window.localStorage.getItem("auth"))
  const sessionRecipes = JSON.parse(window.sessionStorage.getItem("recipes"))


  useState(()=>{
    if (JSON.parse(window.localStorage.getItem("auth"))){
      dispatch({type: "auth", payload: auth})  
    }
    if (JSON.parse(window.sessionStorage.getItem("recipes"))){
      dispatch({type: "foundRecipes", payload: sessionRecipes})
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
      <Route path="/mykitchen/ingredients/:ingredient" element={<ShowIngredient />} />
      <Route path="/foundRecipes/:index" element={<ShowRecipe />} />
      <Route path="/dashboard" element={<Dashboard/>} />
    </Routes>
    </>

  );
}

export default App;
