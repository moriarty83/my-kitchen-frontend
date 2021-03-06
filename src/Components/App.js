import React, { useState,useEffect } from 'react'
import { useNavigate } from 'react-router-dom';


import {Routes, Route} from 'react-router-dom'
import {useAppState} from "../AppState"

import Nav from './Nav';
import Home from '../pages/Home';
import Auth from '../pages/Auth';
import Dashboard from '../pages/Dashboard';
import ShowIngredient from '../pages/ShowIngredient';
import IngredientSearch from '../pages/IngredientSearch';
import ShowRecipe from '../pages/ShowRecipe';
import Profile from '../pages/Profile';
import Delete from './User/Delete';
import MyIngredientsIndex from '../pages/MyIngredientsIndex';
import MyRecipesIndex from '../pages/MyRecipesIndex';
import RecipeSearch from '../pages/RecipeSearch';
import Forgot from '../pages/Forgot';
import Reset from '../pages/Reset';



function App(props) {
  const {state, dispatch} = useAppState();
  const navigate = useNavigate()
  
  const auth = JSON.parse(window.localStorage.getItem("auth"))
  const sessionRecipes = JSON.parse(window.sessionStorage.getItem("recipes"))
  const token = window.localStorage.getItem("auth") ? JSON.parse(window.localStorage.getItem("auth")).token : ""



  useEffect(()=>{
    if (JSON.parse(window.localStorage.getItem("auth"))){
      // IF EXPIRATIN TIME NOT MET
      if(Date.now()<auth.exp*1000){
        dispatch({type: "auth", payload: auth})
      }
      else{
        dispatch({type: "logout"})
        navigate("/")
      }
        
    }
    else{
      // navigate("/")
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
  .then((data)=>{
      dispatch({type: "myIngredients", payload: data})})
  .catch((error) => {window.alert(error)}
  );
}

  // DELETE RECIPE
  const deleteMyRecipe = (id) =>{    

    return fetch(state.url+ "/user_recipes/"+id,{
        method: "delete",
        headers: {
            "Authorization": "Bearer " + state.token
        }
    })
    .then( (response) => {if(response.ok) {return response.json()}
        else{throw new Error("An error of type " + response.status + " occured")}})
    .then((data)=>{dispatch({type: "myRecipes", payload: data})})
    .catch((error) => {window.alert(error)})
    } 

  

  return (

    <>

    {auth ? <Nav /> : ""}
    <Routes>
      {auth ? <Route exact path="/" element={<Dashboard/>} /> : 
      <Route exact path="/" element={<Home/>} />}

      <Route path="/auth" element={<Auth />} />
      <Route path="/mykitchen/forgot" element={<Forgot />} />
      <Route path="/mykitchen/reset/:token" element={<Reset />} />

      
      { auth ? <>
      <Route path="/mykitchen/account" element={<Profile />} />
      <Route path="/mykitchen/delete/:id" element={<Delete />} />
      

      <Route path="/mykitchen/ingredients/all" element={<MyIngredientsIndex getMyIngredients={getMyIngredients}  deleteMyIngredient={deleteMyIngredient} />} /> 
      <Route path="/mykitchen/ingredient" element={<ShowIngredient addToMyIngredients={addToMyIngredients} deleteMyIngredient={deleteMyIngredient}/>} />
      <Route path="/mykitchen/search/ingredients" element={<IngredientSearch addToMyIngredients={addToMyIngredients} menuOption={1}/>} /> 
      
      <Route path="/mykitchen/recipes/all" element={<MyRecipesIndex getMyRecipes={getMyRecipes} deleteMyRecipe={deleteMyRecipe} />} /> 
      <Route path="/mykitchen/search/recipes" element={<RecipeSearch getMyIngredients={getMyIngredients} />} /> 
      <Route path="/mykitchen/recipe" element={<ShowRecipe getMyIngredients={getMyIngredients} getMyRecipes={getMyRecipes} deleteMyRecipe={deleteMyRecipe}/>} />
      </> : <>      
      <Route path="*" element={<Home />} />
      </>}
    </Routes>
    </>

  );
}

export default App;
