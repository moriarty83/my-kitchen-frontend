import React, { useEffect } from "react";
import { useAppState } from "../../AppState";

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

    const handleDelete = (id) =>{    

        console.log("Delete route")
        return fetch(state.url+ "/user_recipes/"+id,{
            method: "delete",
            headers: {
                "Authorization": "Bearer " + state.token
            }
        })
        .then( (response) => {if(response.ok) {response.json()}
            else{throw new Error("An error of type " + response.status + " occured")}})
        .then((data)=>{dispatch({type: "myRecipes", payload: data})})
        .catch((error) => {window.alert(error)})
        }
    useEffect(()=>{getMyRecipes()}, [])

    const loading = ()=>{
        <h1>Loading...</h1>
    }

    const loaded = () =>{
        const elements = state.myRecipes.map((element, index)=>{
        const recipe = JSON.parse(element.json)
        return(        
            <div key={index} className="recipe-element" id={element.id}>
                <h1>{element.name} {element.id}</h1>
                <img src={recipe.image} alt = {element.name + "image"} />
                <button onClick={()=>{viewRecipe(element)}}>View Recipe</button>
                <button onClick={()=>{handleDelete(element.id)}}>Delete</button>
            </div>)
        })
        return(elements)
    }

    return(
        <>
        <h1>My Recipes</h1>
        {state.myRecipes ? loaded() : loading()}
        </>
    )
}

export default MyRecipes