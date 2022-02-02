import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";

import { useAppState } from "../AppState";

import Search from "../Components/Search";

import Recipe from "../Components/Recipes/Recipe";

function RecipeSearch ({viewRecipe, listIngredients}) {
    const {dispatch, state} = useAppState();

    const queryParams = new URLSearchParams(window.location.search)
    const [query, setQuery] = useState(queryParams.get("query"))


    /////////////////////
    // EDEMAM API SECTION
    /////////////////////
    const id = process.env.REACT_APP_EDEMAM_RECIPE_APP_ID;
    const key = process.env.REACT_APP_EDEMAM_RECIPE_KEY;

    const [recipes, setRecipes] = useState(null);

    // Search Term that gets passed to URL. The set Search term is passed as props to Search.
    const [searchTerm, setSearchTerm] = useState()

    // URL For API Request
    const recipeURL = `https://api.edamam.com/api/recipes/v2?type=public&app_id=${id}&app_key=${key}&q=${query}`

    const searchRecipes = ()=>{
        fetch(recipeURL,{
            method: "get",
            headers: {
            },
            })
            .then( response => response.json())
            .then( (data)=> setRecipes(data.hits))
    }
    
    // let ingredinetsList = ingredients ? ingredients.map((ing, index)=>{return<p key={index}>{ing}</p>}) : "Loading...";
    
    /////////////////////
    // FUNTIONS
    /////////////////////
    const compareIngredients = (ingredient)=>{
        if (!state.myIngredients){return}
        state.myIngredients.includes(x => x.name === ingredient)
    }

    const checkIngredients = (recipe) =>{
        let count = 0;
        for(let i in recipe.ingredients){
            if (state.myIngredients.some(item => item.edemam_id === recipe.ingredients[i].foodId)){
                count += 1
            }
        }
        return count
    }


    const loading = () =>{
        return(
            <h1>Search for a Recipe.</h1>
        )
    } 

    const loaded = ()=>{
        const recipeElements = recipes.map((element, index)=>{
            
            return(<Recipe key={index} recipe={element.recipe} />

            )
        })
        return recipeElements
    }

    /////////////////////
    // USE EFFECT
    /////////////////////
    useEffect(()=>{searchRecipes();
        dispatch({type: "navigation", payload: [false, false, true]})
    }, [query])

    /////////////////////
    // RETURN
    /////////////////////
    return(
        <>
            <Search menuOption={0} setQuery={setQuery}/>
            <h4 className="text-white underline text-3xl mx-4" id="whoobe-3mr7n">Results for "{query.replace("%20", " ")}"</h4>
            <div className="flex flex-row flex-wrap justify-around">
            { recipes ? loaded() : loading() }
            </div>
        </>
    )
}

export default RecipeSearch