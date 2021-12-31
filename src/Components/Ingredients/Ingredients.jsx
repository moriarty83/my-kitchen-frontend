import React, { useEffect, useState } from "react";
import MyIngredients from "./MyIngredients";
import IngredientSearch from "./IngredientSearch";
import { useAppState } from "../../AppState";

function Ingredients(props){

    const token = JSON.parse(window.localStorage.getItem("auth")).token

    const {dispatch, state} = useAppState()

        // GET MYINGREDIENTS

    // useEffect(()=>{getMyIngredients()}, [])
    return(
    <div className="flex flex-row">
        {/* <MyIngredients getMyIngredinets={getMyIngredients} />
        <IngredientSearch getMyIngredinets={getMyIngredients} /> */}
    </div>)
}

export default Ingredients