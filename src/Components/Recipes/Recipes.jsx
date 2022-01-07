import React from "react";
import { useAppState } from "../../AppState";
import MyRecipes from "./MyRecipes";
import {useNavigate} from "react-router-dom"


function Recipes () {

    let navigate = useNavigate();

    const {dispatch, state} = useAppState();

    const viewRecipe = (recipe)=>{
        dispatch({type: "recipe", payload: recipe})
        window.sessionStorage.setItem("recipe", JSON.stringify(recipe))
        window.scrollTo(0, 0)
        navigate("/foundRecipes/recipe")
    }

    const checkIngredients = (recipe) =>{
        let count = 0;
        for(let i in recipe.ingredients){
            if (state.myIngredients.some(item => item.edemam_id === recipe.ingredients[i].foodId)){
                console.log("ingredient match")
                count += 1
            }
        }
        return count
    }

    const listIngredients = (ingredients) =>{
        const list = ingredients.map((element)=>{
            return(
                <p className="my-4" id="whoobe-950fw">{element.food}</p>

            )
        })
        return list
    }

    const token = JSON.parse(window.localStorage.getItem("auth")).token



    return(
        <div className="flex-row">
        <MyRecipes viewRecipe={viewRecipe} checkIngredients={checkIngredients} listIngredients={listIngredients}/>
        </div>
    )
}

export default Recipes