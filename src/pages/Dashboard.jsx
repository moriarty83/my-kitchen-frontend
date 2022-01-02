import React from "react";
import { useEffect } from "react/cjs/react.development";
import { useAppState } from "../AppState";
import Discover from "../Components/Discover";

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
            <div className="my-8 relative z-20" >
                <Discover/>
            </div>

            <div className="my-8 relative z-10">
                <MyRecipes />
                <h1>View All of My Recipes</h1>
            </div>

            <div className="my-8">
                <MyIngredients />
                <h1>View All of My Ingredients</h1>
            </div>
        </>
    )
}

export default Dashboard