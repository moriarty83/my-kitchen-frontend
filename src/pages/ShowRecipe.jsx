import React, {useState, useEffect} from "react";
import { useParams, Link } from "react-router-dom";
import { useAppState } from "../AppState";

function ShowRecipe (props){
    const {state} = useAppState()
    const params = useParams();
    

    //////////////////////
    // FUNCTIONS
    /////////////////////

    const addRecipe = () =>{
        
    }


    const recipe = JSON.parse(window.sessionStorage.getItem("recipes"))[params.index];

    const loading = ()=>{
        return (
            <h1>Recipe Cannot be Found</h1>
        )
    }

    const loaded = ()=>{
        return(
            <div className="show-recipe">
            <h1>{recipe.recipe.label}</h1>
            <img src={recipe.recipe.image} alt={recipe.recipe.label + "image"} />
            <h4>Serves: {recipe.recipe.yield}</h4>
            <h4>Time: {recipe.recipe.totalTime}</h4>
            <h4>Calories: {recipe.recipe.calories}</h4>
            <h2>Ingredients</h2>
            {recipe.recipe.ingredientLines.map((element, index)=>{return(<p key={index}>{element}</p>)})}
            <h3>View Full Recipe on <Link to={recipe.recipe.url} >{recipe.recipe.source}</Link></h3>
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