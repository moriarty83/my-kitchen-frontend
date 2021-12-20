import React, {useState, useEffect} from "react";
import { useAppState } from "../AppState"

function Recipes () {
/////////////////////
    // EDEMAM API SECTION
    /////////////////////
    const id = process.env.REACT_APP_EDEMAM_RECIPE_APP_ID;
    const key = process.env.REACT_APP_EDEMAM_RECIPE_KEY;

    const [recipes, setRecipes] = useState(null);

    // Search Term that gets passed to URL. The set Search term is passed as props to Search.
    const [searchTerm, setSearchTerm] = useState()

    // URL For API Request
    const ingredientURL = `https://api.edamam.com/api/recipes/v2/app_id=${id}&app_key=${key}&q=${searchTerm}&limit=20`

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

}

export default Recipes