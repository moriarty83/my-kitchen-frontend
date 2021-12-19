import React, {useState, useEffect} from "react";
import { useAppState } from "../AppState"
import MyIngredient from "./MyIngredient";


import Search from "./Search";


function Ingredients(){

    const {state} = useAppState()

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
        console.log("getting ingredients")
        fetch(ingredientURL,{
            method: "get",
            headers: {
                "Authorization": "Bearer " + state.token,
                "Content-Type": "application/json"
            },
            })
            .then( response => response.json()
                ). then( (data)=>setIngredients(data))}
    
    let ingredinetsList = ingredients ? ingredients.map((ing, index)=>{return<p key={index}>{ing}</p>}) : "Loading...";

    useEffect(getIngredients, [searchTerm])

    /////////////////////
    // MY-KITCHEN BACKEND
    /////////////////////

    const [myIngredients, setMyIngredients] = useState()


    // GET MYINGREDIENTS
    const getMyIngredients = ()=>{
        return fetch(state.url+ "/ingredients/",{
            method: "get",
            headers: {
                "Authorization": "Bearer " + state.token,
                "Content-Type": "application/json"
            },

        })
        .then( response => response.json()
            ). then ( data => setMyIngredients(data))}
    

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
    for(const element in myIngredients){
        
        myIngredientsList.push(<MyIngredient key={element} name={myIngredients[element].name } ingredientID={myIngredients[element].id} />)
    }}

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
        </>
    )    
}

export default Ingredients