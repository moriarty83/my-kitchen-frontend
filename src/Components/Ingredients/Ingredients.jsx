import React, { useEffect, useState } from "react";
import MyIngredients from "./MyIngredients";
import IngredientSearch from "../../pages/IngredientSearch";
import { useAppState } from "../../AppState";

function Ingredients(props){

    const token = JSON.parse(window.localStorage.getItem("auth")).token

    const {dispatch, state} = useAppState()

        // GET MYINGREDIENTS
        const getMyIngredients = ()=>{
            return fetch(state.url+ "/ingredients/",{
                method: "get",
                headers: {
                    "Authorization": "Bearer " + token,
                    "Content-Type": "application/json"
                },
    
            })
            .then( response => response.json()
                ). then ( data => dispatch({type: "myIngredients", payload: data}))}


    useEffect(()=>{getMyIngredients()}, [])
    return(
    <div className="flex flex-row">
        {/* <MyIngredients getMyIngredinets={getMyIngredients} />
        <IngredientSearch getMyIngredinets={getMyIngredients} /> */}
    </div>)
}

export default Ingredients