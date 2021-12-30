import React, {useState, useEffect} from "react";
import { useAppState } from "../../AppState";
import MyIngredient from "./MyIngredient";


function MyIngredients(props){


    const {state, dispatch} = useAppState()

    /////////////////////
    // FUNCTIONS
    /////////////////////
    const myIngredientsList = [];

    if (state.myIngredients){
        
    for(const element in state.myIngredients){
        myIngredientsList.push(<MyIngredient key={element} ingredient={state.myIngredients[element]}  />)
    }}
        

    /////////////////////
    // USE EFFECT
    /////////////////////
    
    /////////////////////
    // PAGE RENDER
    /////////////////////
    return(
        <div>
        <h1>My Ingredinets</h1>
            {myIngredientsList}
        </div>
    )    
}

export default MyIngredients