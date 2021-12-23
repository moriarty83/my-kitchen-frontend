import React, { useEffect } from "react";
import { useAppState } from "../../AppState";

function MyRecipes ({viewRecipe}) {
    const {dispatch, state} = useAppState()
    const token = JSON.parse(window.localStorage.getItem("auth")).token

    console.log(state.myRecipes)

    // GET MYRECIPES
    const getMyRecipes = ()=>{
        console.log(state.token)
        return fetch(state.url+ "/recipes/",{
            method: "get",
            headers: {
                "Authorization": "Bearer " + token,
                "Content-Type": "application/json"
            },

        })
        .then( response => response.json()
            ). then ( data => dispatch({type: "myRecipes", payload: data}))}


    useEffect(()=>{getMyRecipes()}, [])

    const loading = ()=>{
        <h1>Loading...</h1>
    }

    const loaded = () =>{
        const elements = state.myRecipes.map((element, index)=>{
        return(        
            <div key={index} className="recipe-element">
                <h1>{element.label}</h1>
                <img src={element.image} alt = {element.label + "image"} />
                <button onClick={()=>{viewRecipe(element)}}>View Recipe</button>
            </div>)
        })
        return elements
    }

    return(
        <>
        <h1>My Recipes</h1>
        {state.myRecipes ? loaded() : loading()}
        </>
    )
}

export default MyRecipes