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
import MyIngredientsIndex from '../pages/MyIngredientsIndex';
import RecipeSearch from './Recipes/RecipeSearch';



function App(props) {
  const {state, dispatch} = useAppState();

  
  const auth = JSON.parse(window.localStorage.getItem("auth"))
  const sessionRecipes = JSON.parse(window.sessionStorage.getItem("recipes"))
  const token = JSON.parse(window.localStorage.getItem("auth")).token


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


  const getMyRecipes = ()=>{
    return fetch(state.url+ "/recipes/",{
        method: "get",
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json"
        },
    })
    .then( response => response.json()
        )
    .then ( data => 
        dispatch({type: "myRecipes", payload: data})
    )}

  const getMyIngredients = ()=>{
    console.log(state.token)
    return fetch(state.url+ "/ingredients/",{
        method: "get",
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json"
        },

    })
    .then( response => response.json()
        ). then ( data => dispatch({type: "myIngredients", payload: data}))}

  // ADD INGREDIENT
  const addToMyIngredients = (ingredient)=>{
    fetch(state.url+ "/ingredients/",{
        method: "post",
        headers: {
            "Authorization": "Bearer " + state.token,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({name: ingredient})
    })
    // Error Handler
    .then((response)=>{
        if(response.ok){
            return response.json()
        }
        else{
            if (response.status === 422){
            throw new Error("Could not add Ingredient. You may already have added this Ingredient")}
            else{
                throw new Error("An error of type " + response.status + " occured")
            };
        }
    })
    // If no error, add to state.myIngredients.
    .then((responseJson) => {
        dispatch({type:"myIngredients", payload: responseJson})
        window.alert(ingredient + " Has Been Successfully Added")
      })
      .catch((error) => {
        window.alert(error)
      });
}

// DELETE INGREDIENT //////
const deleteMyIngredient = (id)=>{
  console.log("Delete route")
  return fetch(state.url+ "/user_ingredients/"+id,{
      method: "delete",
      headers: { "Authorization": "Bearer " + state.token}
  })
  .then( (response) => {
      if(response.ok){
          return response.json()
      }
      else{
          throw new Error("An error of type " + response.status + " occured")
      };
  })
  .then((data)=>{window.alert("Data" + data) 
      dispatch({type: "myIngredients", payload: data})})
  .catch((error) => {window.alert(error)}
  );
}

  return (

    <>
    <Nav />
    <Routes>
      {auth ? <Route exact path="/" element={<Dashboard/>} /> : 
      <Route exact path="/" element={<Home/>} />}

      <Route path="/auth/:form" element={<Auth />} />
      <Route path="/mykitchen/account" element={<Profile />} />
      <Route path="/mykitchen/delete/:id" element={<Delete />} />

      <Route path="/mykitchen/ingredients" element={<Ingredients />} /> 
      <Route path="/mykitchen/ingredients/all" element={<MyIngredientsIndex getMyIngredients={getMyIngredients}  deleteMyIngredient={deleteMyIngredient} />} /> 
      <Route path="/mykitchen/ingredient" element={<ShowIngredient addToMyIngredients={addToMyIngredients} deleteMyIngredient={deleteMyIngredient}/>} />
      <Route path="/mykitchen/search/ingredients" element={<IngredientSearch addToMyIngredients={addToMyIngredients} />} /> 

      <Route path="/mykitchen/search/recipes" element={<RecipeSearch getMyIngredients={getMyIngredients} />} /> 

      <Route path="/mykitchen/recipe" element={<ShowRecipe getMyIngredients={getMyIngredients} getMyRecipes={getMyRecipes}/>} />
      <Route path="/dashboard" element={<Dashboard/>} />

    </Routes>
    </>

  );
}

export default App;
