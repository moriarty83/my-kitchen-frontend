import React, {useState, useEffect} from "react";
import { useParams, Link } from "react-router-dom";
import { useAppState } from "../AppState";

function ShowRecipe (props){
    const {state} = useAppState()
    const params = useParams();
    

    //////////////////////
    // FUNCTIONS
    /////////////////////

    // ADD TO MY RECIPES
    const addToMyRecipes = ()=>{
        return fetch(state.url+ "/recipes/",{
            method: "post",
            headers: {
                "Authorization": "Bearer " + state.token,
                "Content-Type": "application/json"
            },
            body: {name: recipe.label, json: JSON.stringify(recipe)}
        })
        .then( response => response.json()
            )}


    const recipe = state.recipe ? state.recipe : JSON.parse(window.sessionStorage.getItem("recipe"));

    const loading = ()=>{
        return (
            <h1>Recipe Cannot be Found</h1>
        )
    }

    const loaded = ()=>{
        return(
            <div className="show-recipe">
            <h1>{recipe.label}</h1>
            <img src={recipe.image} alt={recipe.label + "image"} />
            <h4>Serves: {recipe.yield}</h4>
            <h4>Time: {recipe.totalTime}</h4>
            <h4>Calories: {recipe.calories}</h4>
            <h2>Ingredients</h2>
            {recipe.ingredientLines.map((element, index)=>{return(<p key={index}>{element}</p>)})}
            <button onClick={addToMyRecipes}>Save to My Recipes</button>
            <h3>View Full Recipe on <a href={recipe.url} target="_blank">{recipe.source}</a></h3>
            
            </div>
        )
    }
   
    return (
        <>
        <h1>Show Recipe</h1>
            {recipe ? loaded() : loading() }
        </>
    )
}
    
export default ShowRecipe