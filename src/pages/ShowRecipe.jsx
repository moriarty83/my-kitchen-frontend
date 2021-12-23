import React, {useState, useEffect} from "react";
import { useParams, Link } from "react-router-dom";
import { useAppState } from "../AppState";
import { checkIngredients } from "../AppState";

function ShowRecipe (props){
    const {state} = useAppState()
    const params = useParams();
    

    //////////////////////
    // FUNCTIONS
    /////////////////////

    // ADD TO MY RECIPES
    const addToMyRecipes = ()=>{
        console.log(recipe.label)
        const recipeJson = JSON.stringify(recipe)
        return fetch(state.url+ "/recipes/",{
            method: "post",
            headers: {
                "Authorization": "Bearer " + state.token,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({name: recipe.label, json: recipeJson})
        })
        .then( response => response.json()
            )}

    const recipe = state.recipe ? state.recipe : JSON.parse(window.sessionStorage.getItem("recipe"));


    const checkIngredients = (recipe) =>{
        console.log("hello")
        let count = 0;
        for(let i in recipe.ingredients){
            console.log(recipe.ingredients[i]["foodId"])
            if (state.myIngredients.some(item => item.edemam_id === recipe.ingredients[i].foodId)){
                console.log("ingredient match")
                count += 1
            }
        }
        return count
    }

    //////////////////////
    // LOADING/LOADED
    /////////////////////
    const loading = ()=>{
        return (
            <h1>Recipe Cannot be Found</h1>
        )
    }

    const loaded = ()=>{
        const inStock = checkIngredients(recipe)

        return(
            <div className="show-recipe">
            <h1>{recipe.label}</h1>
            <h2>You have {inStock} items in stock.</h2>
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
   
    //////////////////////
    // RETURN
    /////////////////////
    return (
        <>
        <h1>Show Recipe</h1>
            {recipe ? loaded() : loading() }
        </>
    )
}
    
export default ShowRecipe