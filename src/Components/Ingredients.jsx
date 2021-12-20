import React, {useState, useEffect} from "react";
import { useAppState } from "../AppState"
import MyIngredient from "./MyIngredient";


import Search from "./Search";


function Ingredients(){

    const token = JSON.parse(window.localStorage.getItem("auth")).token

    const {dispatch, state} = useAppState()

    /////////////////////
    // EDEMAM API SECTION
    /////////////////////
    const id = process.env.REACT_APP_EDEMAM_INGREDIENT_APP_ID;
    const key = process.env.REACT_APP_EDEMAM_INGREDIENT_KEY;

    const [ingredients, setIngredients] = useState(null);

    // Search Term that gets passed to URL. The set Search term is passed as props to Search.
    const [searchTerm, setSearchTerm] = useState()

    // URL For API Request
    const ingredientURL = `https://api.edamam.com/auto-complete?app_id=${id}&app_key=${key}&q=${searchTerm}&limit=20`

    const getIngredients = ()=>{
        fetch(ingredientURL,{
            method: "get",
            headers: {
                "Content-Type": "application/json"
            },
            })
            .then( response => response.json()
                ). then( (data)=>
                setIngredients(data))}
    
    let ingredinetsList = ingredients ? ingredients.map((ing, index)=>{return<p key={index}>{ing}</p>}) : "Loading...";

    useEffect(getIngredients, [searchTerm])

    /////////////////////
    // MY-KITCHEN BACKEND
    /////////////////////

    const [myIngredients, setMyIngredients] = useState()


    // GET MYINGREDIENTS
    const getMyIngredients = ()=>{
        console.log(state.token)
        return fetch(state.url+ "/ingredients/",{
            method: "get",
            headers: {
                "Authorization": "Bearer " + token,
                "Content-Type": "application/json"
            },

        })
        .then( response => response.json()
            ). then ( data => dispatch({type: "myIngredients", payload: data}))}
    

    // ADD INGREDIENT //////
    const addToMyIngredients = ()=>{
        return fetch(state.url+ "/ingredients/",{
            method: "post",
            headers: {
                "Authorization": "Bearer " + state.token,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({name: "unsalted butter"})
        })
        .then( response => response.json()
            )}

    /////////////////////
    // FUNCTIONS
    /////////////////////
    const myIngredientsList = [];

    if (ingredients){
        
    for(const element in state.myIngredients){
        myIngredientsList.push(<MyIngredient key={element} name={state.myIngredients[element].name } ingredientID={state.myIngredients[element].id} />)
    }}
        
    const dispatchIngredients = ()=>{
        dispatch({type: "myIngredients", payload: myIngredients})
    }

    /////////////////////
    // USE EFFECT
    /////////////////////
    useEffect(getMyIngredients, [])
    /////////////////////
    // PAGE RENDER
    /////////////////////
    return(
        <>
        <h1>Ingredinets</h1>
        <Search setSearchTerm={setSearchTerm}/>
        {ingredinetsList}
        {myIngredientsList}
        <button onClick={addToMyIngredients}>Add Butter</button>
        <button onClick={dispatchIngredients}>Dispatch</button>

        </>
    )    
}

export default Ingredients