import React from "react";
import { useEffect } from "react/cjs/react.development";
import { useAppState } from "../AppState";

import Ingredients from "../Components/Ingredients/Ingredients";
import Recipes from "../Components/Recipes/Recipes";

function Dashboard (props) {

    const { state } = useAppState();

    const checkIngredients = (recipe) =>{
        let count = 0;
        for(let ingredient in recipe.ingredients){
            if (state.myIngredients.includes(ingredient.food)){
                console.log("ingredient match")
                count += 1
            }
        }
        return count
    }
    const scrollTop = function () {
        window.scrollTo(0, 0);
      }

    useEffect(()=>{window.scrollTo(0, 0)}, [])
    return(
        <>
            <h1>Dashboard</h1>
            <Ingredients />
            <Recipes checkIngredients={checkIngredients}/>
        </>
    )
}

export default Dashboard