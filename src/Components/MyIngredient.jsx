import React from "react";
import { useAppState } from "../AppState"

function MyIngredient (props){

    const { state } = useAppState();

    // DELETE INGREDIENT //////
    const deleteMyIngredient = ()=>{
        console.log("Delete route")
        return fetch(state.url+ "/user_ingredients/"+props.
        ingredientID
        ,{
            method: "delete",
            headers: {
                "Authorization": "Bearer " + state.token,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({name: "unsalted butter"})
        })
        .then( response => response.json()
            )}
    
    return(
    <div className="my-ingredient">
        <h3>{props.name}</h3>
        <button onClick={deleteMyIngredient}>Delete</button>
    </div>
    )
}

export default MyIngredient