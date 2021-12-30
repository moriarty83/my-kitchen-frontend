import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";

import { useAppState } from "../../AppState";

import Search from "../Search";

function RecipeSearch ({viewRecipe}) {
    const {dispatch, state} = useAppState();



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

    const searchRecipes = ()=>{
        fetch(recipeURL,{
            method: "get",
            headers: {
            },
            })
            .then( response => response.json()
                ). then( (data)=> dispatch({type: "foundRecipes", payload: data.hits}))}
    
    // let ingredinetsList = ingredients ? ingredients.map((ing, index)=>{return<p key={index}>{ing}</p>}) : "Loading...";
    
    /////////////////////
    // FUNTIONS
    /////////////////////
    const compareIngredients = (ingredient)=>{
        if (!state.myIngredients){return}
        state.myIngredients.includes(x => x.name === ingredient)
    }


    const loading = () =>{
        return(
            <h1>Search for a Recipe.</h1>
        )
    } 

    const loaded = ()=>{
        window.sessionStorage.setItem("recipes", JSON.stringify(state.foundRecipes))
        const recipeElements = state.foundRecipes.map((element, index)=>{
            return(<>
                <div key={index} className="recipe-element">
                    <h1>{element.recipe.label}</h1>
                    <img src={element.recipe.image} alt = {element.recipe.label + "image"} />
                    <button onClick={()=>{viewRecipe(element.recipe)}}>View Recipe</button>
                </div>
                <div id="whoobe-3fery" class="w-full md:w-64 justify-center items-center bg-white shadow-lg rounded-lg flex flex-col">
                <img src="https://res.cloudinary.com/moodgiver/image/upload/v1633344243/adventure_woman_rujic1.webp" alt="img" title="img" class="w-full h-auto object-cover rounded-t-lg" id="whoobe-ixxe5" />
                    <div id="whoobe-1okdg" class="w-full p-4 justify-start flex flex-col">
                        <h4 class="border-b-2 text-3xl" id="whoobe-3mr7n">Info Card</h4>
                        <p class="my-4" id="whoobe-950fw">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ac tortor dignissim convallis aenean. Imperdiet massa tincidunt nunc pulvinar.</p>
                        <button value="button" class="my-4 px-4 py-2 text-white hover:bg-blue-700 bg-blue-500" id="whoobe-jkkr2">Read more</button>
                    </div>
            </div>
            </>
            )
        })
        return recipeElements
    }

    /////////////////////
    // USE EFFECT
    /////////////////////
    useEffect(()=>{if(searchTerm){searchRecipes()}}, [searchTerm])

    /////////////////////
    // RETURN
    /////////////////////
    return(
        <>
            <h1>Recipes</h1>
            <Search setSearchTerm={setSearchTerm} />
            { state.foundRecipes ? loaded() : loading() }
        </>
    )
}

export default RecipeSearch