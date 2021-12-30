import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";

import { useAppState } from "../../AppState";

import Search from "../Search";

import Recipe from "./Recipe";

function RecipeSearch ({viewRecipe, listIngredients}) {
    const {dispatch, state} = useAppState();



    /////////////////////
    // EDEMAM API SECTION
    /////////////////////
    const id = process.env.REACT_APP_EDEMAM_RECIPE_APP_ID;
    const key = process.env.REACT_APP_EDEMAM_RECIPE_KEY;

    const [recipes, setRecipes] = useState(null);

    // Search Term that gets passed to URL. The set Search term is passed as props to Search.
    const [searchTerm, setSearchTerm] = useState()

    // URL For API Request
    const recipeURL = `https://api.edamam.com/api/recipes/v2?type=public&app_id=${id}&app_key=${key}&q=${searchTerm}`

    const searchRecipes = ()=>{
        fetch(recipeURL,{
            method: "get",
            headers: {
            },
            })
            .then( response => response.json()
                ). then( (data)=> dispatch({type: "foundRecipes", payload: data.hits}))}
    
    // let ingredinetsList = ingredients ? ingredients.map((ing, index)=>{return<p key={index}>{ing}</p>}) : "Loading...";
    
    /////////////////////
    // FUNTIONS
    /////////////////////
    const compareIngredients = (ingredient)=>{
        if (!state.myIngredients){return}
        state.myIngredients.includes(x => x.name === ingredient)
    }

    const checkIngredients = (recipe) =>{
        console.log("hello")
        let count = 0;
        for(let i in recipe.ingredients){
            if (state.myIngredients.some(item => item.edemam_id === recipe.ingredients[i].foodId)){
                console.log("ingredient match")
                count += 1
            }
        }
        return count
    }


    const loading = () =>{
        return(
            <h1>Search for a Recipe.</h1>
        )
    } 

    const loaded = ()=>{
        window.sessionStorage.setItem("recipes", JSON.stringify(state.foundRecipes))
        
        const recipeElements = state.foundRecipes.map((element, index)=>{

            return(<Recipe key={index} recipe={element.recipe} />

            )
        })
        return recipeElements
    }

    /////////////////////
    // USE EFFECT
    /////////////////////
    useEffect(()=>{if(searchTerm){searchRecipes()}}, [searchTerm])

    /////////////////////
    // RETURN
    /////////////////////
    return(
        <>
            <h1>Recipes</h1>
            <Search setSearchTerm={setSearchTerm} />
            { state.foundRecipes ? loaded() : loading() }
        </>
    )
}

export default RecipeSearch