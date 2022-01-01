import React, { useEffect } from "react";
import { useAppState } from "../../AppState";
import Recipe from "./Recipe";
import ItemSlider from "../Slider";

function MyRecipes ({viewRecipe}) {
    const {dispatch, state} = useAppState()
    const token = JSON.parse(window.localStorage.getItem("auth")).token

    console.log(state.myRecipes)

    // GET MYRECIPES
    const getMyRecipes = ()=>{
        return fetch(state.url+ "/recipes/",{
            method: "get",
            headers: {
                "Authorization": "Bearer " + token,
                "Content-Type": "application/json"
            },
        })
        .then( response => response.json()
            )
        .then ( data => 
            dispatch({type: "myRecipes", payload: data})
        )}


    useEffect(()=>{getMyRecipes()}, [])

    const loading = ()=>{return <h1>Loading...</h1>}
        
    const loaded = ()=>{
        
        const items = state.myRecipes.map((element, index)=>{
            const recipe = JSON.parse(element.json)
            return({name: element.name, image: recipe.image, id: element.edemam_id
            })
        })
        return <ItemSlider type="ingredient" items={items} />
    }
    
  

    return(
        <>
        <h1>My Recipes</h1>
        {state.myRecipes ? loaded() : loading()}
        </>
    )
}

export default MyRecipes