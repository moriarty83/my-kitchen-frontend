import React, {useState, useEffect} from "react";
import { useAppState } from "../AppState"

import Search from "./Search";

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
    const recipeURL = `https://api.edamam.com/api/recipes/v2?type=public&app_id=${id}&app_key=${key}&q=${searchTerm}`

    const getRecipes = ()=>{
        fetch(recipeURL,{
            method: "get",
            headers: {
            },
            })
            .then( response => response.json()
                ). then( (data)=>
                setRecipes(data))}
    
    // let ingredinetsList = ingredients ? ingredients.map((ing, index)=>{return<p key={index}>{ing}</p>}) : "Loading...";

    useEffect(()=>{if(searchTerm){getRecipes()}}, [searchTerm])

    return(
        <>
            <h1>Recipes</h1>
            <p>{JSON.stringify(recipes)}</p>
            <Search setSearchTerm={setSearchTerm}/>
        </>
    )
}

export default Recipes