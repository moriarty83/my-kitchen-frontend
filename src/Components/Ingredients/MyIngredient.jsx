import React from "react";
import { Link } from "react-router-dom";
import { useEffect } from "react/cjs/react.development";
import { useAppState } from "../../AppState";

function MyIngredient ({ingredient}){
    
    const token = JSON.parse(window.localStorage.getItem("auth")).token

    const {dispatch, state } = useAppState();

    // DELETE INGREDIENT //////
    const deleteMyIngredient = ()=>{
        console.log("Delete route")
        return fetch(state.url+ "/user_ingredients/"+ingredient.id,{
            method: "delete",
            headers: {
                "Authorization": "Bearer " + state.token,
            }
            
        })
        .then( response => response.json()
            )}

    
    
    return(
        <>    
            <div className="my-ingredient">
                <h3>{ingredient.name}</h3>
                <img src= {ingredient.image_url} alt={ingredient.name + " image"} />
                <button><Link to={"/mykitchen/ingredients/" + ingredient.name}>Details</Link></button>
                <button onClick={deleteMyIngredient}>Delete</button>
            </div>
        </>

    )
}

export default MyIngredient