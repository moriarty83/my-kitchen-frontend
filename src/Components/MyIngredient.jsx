import React from "react";
import { Link } from "react-router-dom";
import { useAppState } from "../AppState"

function MyIngredient (props){

    const {dispatch, state } = useAppState();

    

    // DELETE INGREDIENT //////
    const deleteMyIngredient = ()=>{
        console.log("Delete route")
        return fetch(state.url+ "/user_ingredients/"+props.ingredientID,{
            method: "delete",
            headers: {
                "Authorization": "Bearer " + state.token,
                "Content-Type": "application/json"
            },
            
        })
        .then( response => response.json()
            )}
    
    return(
    <div className="my-ingredient">
        <h3>{props.name}</h3>
        <button><Link to={"/mykitchen/ingredients/" + props.name}>Details</Link></button>
        <button onClick={deleteMyIngredient}>Delete</button>
    </div>
    )
}

export default MyIngredient