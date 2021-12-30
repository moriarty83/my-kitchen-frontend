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
        <>
        <h1>Ingredinets</h1>
            {myIngredientsList}
        </>
    )    
}

export default MyIngredients