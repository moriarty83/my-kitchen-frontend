import React, { useEffect } from "react";
import { useAppState } from "../../AppState";
import Recipe from "./Recipe";
import ItemSlider from "../Slider";

function MyRecipes ({viewRecipe}) {
    const {dispatch, state} = useAppState()
    const token = JSON.parse(window.localStorage.getItem("auth")).token


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
        if(state.myRecipes.length > 0){
        const items = state.myRecipes.map((element, index)=>{
            const recipe = JSON.parse(element.json)
            const id = recipe.uri.split("#")[1]
            return({name: element.name, image: recipe.image, id: id
            })
        })
        return <ItemSlider type="recipe" items={items} />}
        else{
            return <h1 className="text-3xl text-white text-center bg-gray-800 opacity-75">You do not have any saved Recipes</h1>
        }
    }
    
  

    return(

        <div className="my-8">
        <div className="bg-gray-800 bg-opacity-75 border-t-2">
        <h4 className="text-white underline text-3xl mx-4 copperplate" id="whoobe-3mr7n">MyRecipes</h4>
        </div>

        {state.myRecipes ? loaded() : loading()}
        <div className="bg-gray-800 bg-opacity-75 border-b-2">
        <h4 className="text-white text-right text-xl mx-4" id="whoobe-3mr7n"><a href="/mykitchen/recipes/all">View All</a></h4>
        </div>

        </div>
    )
}

export default MyRecipes