import React from "react";
import { useAppState } from "../../AppState";
import MyRecipes from "./MyRecipes";
import RecipeSearch from "./RecipeSearch";
import {useNavigate} from "react-router-dom"

function Recipes () {

    let navigate = useNavigate();

    const viewRecipe = (recipe)=>{
        dispatch({type: "recipe", payload: recipe})
        window.sessionStorage.setItem("recipe", JSON.stringify(recipe))
        window.scrollTo(0, 0)
        navigate("/foundRecipes/recipe")
    }

    const token = JSON.parse(window.localStorage.getItem("auth")).token

    const {dispatch, state} = useAppState()

    return(
        <>
        <MyRecipes viewRecipe={viewRecipe}/>
        <RecipeSearch viewRecipe={viewRecipe} />
        </>
    )
}

export default Recipes