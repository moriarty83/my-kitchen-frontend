import React, {useState, useEffect} from "react";
import { useParams, Link } from "react-router-dom";
import { useAppState } from "../AppState";
import { checkIngredients } from "../AppState";

function ShowRecipe ({getMyIngredients, getMyRecipes}){
    const {state, dispatch} = useAppState()

    const [recipe, setRecipe] = useState()
    
    const queryParams = new URLSearchParams(window.location.search)
    const query = queryParams.get("query")
    

    //////////////////////
    // FUNCTIONS
    /////////////////////

     /////////////////////
    // EDEMAM API SECTION
    /////////////////////
    const id = process.env.REACT_APP_EDEMAM_RECIPE_APP_ID;
    const key = process.env.REACT_APP_EDEMAM_RECIPE_KEY;

    const [recipes, setRecipes] = useState(null);

    // URL For API Request
    const recipeURL = `https://api.edamam.com/api/recipes/v2/${query}?type=public&app_id=${id}&app_key=${key}`
    console.log(recipeURL)
    const requestRecipe = ()=>{
        fetch(recipeURL,{
            method: "get",
            headers: {
            },
            })
            .then( response => response.json()
                ). then( (data)=> setRecipe(data.recipe))}

    // ADD TO MY RECIPES
    const addToMyRecipes = ()=>{
        const recipeJson = JSON.stringify(recipe)
        fetch(state.url+ "/recipes/",{
            method: "post",
            headers: {
                "Authorization": "Bearer " + state.token,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({name: recipe.label, json: recipeJson})
        })
        .then( (response) => {
            alert(response)
            if (response.ok){
                return response.json()}
            else {
                throw new Error("An error of type " + response.status + " occured")
            }
            })
        .then((data)=>{
            window.alert("adding")
            dispatch({type:"myRecipes", payload: data})
        })
        .catch((error) => { window.alert(error)})}

    //////////////////////
    // LOADING/LOADED
    /////////////////////
    const loading = ()=>{
        return (
            <h1>Recipe Cannot be Found</h1>
        )
    }

    const loaded = ()=>{

        return(
        <div className="m-8 flex justify-around">
            <div className="bg-gray-900 shadow-md border border-gray-200 rounded-lg max-w-sm dark:bg-gray-800 dark:border-gray-700 opacity-90">
                
                <img className="rounded-t-lg w-full" src={recipe.image} alt="" />
                
                <div className="p-5">
                    
                    <h5 className="text-white font-bold text-2xl tracking-tight mb-2 dark:text-white underline">{recipe.label}</h5>
                    
                    {recipe.ingredientLines.map((element, index)=>{
                        const hasItem = state.myIngredients.some(item => item.edemam_id === recipe.ingredients[index].foodId)
                        const hasImg = hasItem ? <img className="h-5 inline" src="/green_check.png" alt="green check mark" /> : ""
                        return(
                        <p key={index} className="text-white">{element} {hasImg}</p>
                        )
                    })}
                    <br />
                    <h5 className="text-blue-500 font-bold text-xl tracking-tight mb-2 dark:text-white underline"><a target="_blank" href={recipe.url}>View on {recipe.source}</a></h5>

                </div>
            </div>
        </div>
        )
    }

    ////////////////////////
    // USE EFFECT
    ////////////////////////
   
    useEffect(()=>{
        getMyIngredients()
        .then(()=>requestRecipe()).then(()=>{getMyRecipes()})
    }, [])
    //////////////////////
    // RETURN
    /////////////////////
    return (
        <>
        <h1>Show Recipe</h1>
            {recipe ? loaded() : loading() }
        </>
    )
}
    
export default ShowRecipe