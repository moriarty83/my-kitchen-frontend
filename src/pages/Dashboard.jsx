import React from "react";
import { useEffect } from "react/cjs/react.development";
import { useAppState } from "../AppState";

import MyIngredients from "../Components/Ingredients/MyIngredients";
import MyRecipes from "../Components/Recipes/MyRecipes";
import Search from "../Components/Search";

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

                <div>
                    <MyRecipes />
                    <h1>View All of My Recipes</h1>
                    <h1>Search for New Recipes</h1>
                    <Search />
                </div>

                <div>
                    <MyIngredients />
                    <h1>View All of My Ingredients</h1>
                    <h1>Search for New Ingredients</h1>
                    <Search />
                </div>
        </>
    )
}

export default Dashboard