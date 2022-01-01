import React, { useState,useEffect } from 'react'

import {Routes, Route} from 'react-router-dom'
import {useAppState} from "../AppState"

import Nav from './Nav';
import Home from '../pages/Home';
import Auth from '../pages/Auth';
import Dashboard from '../pages/Dashboard';
import Ingredients from './Ingredients/Ingredients';
import Recipes from './Recipes/RecipeSearch';
import ShowIngredient from '../pages/ShowIngredient';
import IngredientSearch from './Ingredients/IngredientSearch';
import ShowRecipe from '../pages/ShowRecipe';
import Profile from '../pages/Profile';
import Delete from './User/Delete';
import Slider from './Slider';



function App(props) {
  const {state, dispatch} = useAppState();

  
  const auth = JSON.parse(window.localStorage.getItem("auth"))
  const sessionRecipes = JSON.parse(window.sessionStorage.getItem("recipes"))


  useState(()=>{
    if (JSON.parse(window.localStorage.getItem("auth"))){
      // IF EXPIRATIN TIME NOT MET
      if(Date.now()<auth.exp*1000){
        dispatch({type: "auth", payload: auth})
      }
      else{
        dispatch({type: "logout"})
      }
        
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
      <Route path="/mykitchen/ingredient" element={<ShowIngredient />} />
      <Route path="/mykitchen/account" element={<Profile />} />
      <Route path="/mykitchen/delete/:id" element={<Delete />} />
      <Route path="/mykitchen/search/ingredients" element={<IngredientSearch />} /> 

      <Route path="/foundRecipes/recipe" element={<ShowRecipe />} />
      <Route path="/dashboard" element={<Dashboard/>} />

    </Routes>
    </>

  );
}

export default App;
