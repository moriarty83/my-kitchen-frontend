import React from "react";
import { Link } from "react-router-dom";
import { useEffect } from "react/cjs/react.development";
import { useAppState } from "../../AppState";

function MyIngredient ({name, image, id, ingredient}){
    
    const token = JSON.parse(window.localStorage.getItem("auth")).token

    const {dispatch, state } = useAppState();
    

    // DELETE INGREDIENT //////
    const deleteMyIngredient = (id)=>{
        console.log("Delete route")
        return fetch(state.url+ "/user_ingredients/"+id,{
            method: "delete",
            headers: { "Authorization": "Bearer " + state.token}
        })
        .then( (response) => {
            if(response.ok){
                return response.json()
            }
            else{
                throw new Error("An error of type " + response.status + " occured")
            };
        })
        .then((data)=>{
            dispatch({type: "myIngredients", payload: data})})
        .catch((error) => {window.alert(error)}
        );
    }

    
    
    return(
        <>    
            <div className="my-ingredient">
                <h3>{name}</h3>
                <img src= {image} alt={name + " image"} />
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"><Link to={"/mykitchen/ingredients/" + ingredient.name}>Details</Link></button>
                <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"onClick={()=>{deleteMyIngredient(id)}}>Delete</button>
            </div>
        </>

    )
}

export default MyIngredient