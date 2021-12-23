import React, {useState, useEffect} from "react";
import { useAppState } from "../../AppState";

import Search from "../Search";

function IngredientSearch (props){
    const token = JSON.parse(window.localStorage.getItem("auth")).token

    const {dispatch, state} = useAppState()

    /////////////////////
    // EDEMAM API SECTION
    /////////////////////
    const id = process.env.REACT_APP_EDEMAM_INGREDIENT_APP_ID;
    const key = process.env.REACT_APP_EDEMAM_INGREDIENT_KEY;

    const [foundIngredients, setFoundIngredients] = useState(null);

    // Search Term that gets passed to URL. The set Search term is passed as props to Search.
    const [searchTerm, setSearchTerm] = useState()

    // URL For API Request
    const ingredientURL = `https://api.edamam.com/auto-complete?app_id=${id}&app_key=${key}&q=${searchTerm}&limit=20`

    const searchIngredients = ()=>{
        console.log("Searching")
        fetch(ingredientURL,{
            method: "get",
            headers: {
                "Content-Type": "application/json"
            },
            })
            .then( response => response.json()
                ). then( (data)=>
                setFoundIngredients(data))}
    
    let foundIngredientsList = foundIngredients ? foundIngredients.map((ing, index)=>{
        return<div key={index}>
        <p>{ing}</p>
        <button onClick={()=>{addToMyIngredients(ing)}}>Add to MyIngredients</button>
        </div>}) : "";

    useEffect(searchIngredients, [searchTerm])

    /////////////////////
    // MYKITCHEN BACKEND SECTION
    /////////////////////

    // ADD INGREDIENT
    const addToMyIngredients = (ingredient)=>{
        console.log(ingredient)
        return fetch(state.url+ "/ingredients/",{
            method: "post",
            headers: {
                "Authorization": "Bearer " + state.token,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({name: ingredient})
        })
        .then( response => response.json()
            ).then((data)=>{dispatch({type:"addIngredient", payload: data})})}
    /////////////////////
    // USE EFFECT
    /////////////////////


    return(
        <>
            <Search setSearchTerm={setSearchTerm}/>
            {foundIngredientsList}
        </>

    )
}

export default IngredientSearch