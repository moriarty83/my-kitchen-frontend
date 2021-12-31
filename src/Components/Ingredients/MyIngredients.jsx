import React, {useState, useEffect} from "react";
import { useAppState } from "../../AppState";
import ItemSlider from "../Slider";
import MyIngredient from "./MyIngredient";



function MyIngredients(props){

    const token = JSON.parse(window.localStorage.getItem("auth")).token

    const {state, dispatch} = useAppState()



    /////////////////////
    // FUNCTIONS
    /////////////////////
    const getMyIngredients = ()=>{
        console.log(state.token)
        return fetch(state.url+ "/ingredients/",{
            method: "get",
            headers: {
                "Authorization": "Bearer " + token,
                "Content-Type": "application/json"
            },

        })
        .then( response => response.json()
            ). then ( data => dispatch({type: "myIngredients", payload: data}))}

    const loading = ()=>{return <h1>Loading...</h1>}
        
    const loaded = ()=>{
        
        const items = state.myIngredients.map((element, index)=>{
            return({name: element.name, image: element.image_url, id: element.edemam_id
            })
        })
        return <ItemSlider type="ingredient" items={items} />
    }
    /////////////////////
    // USE EFFECT
    /////////////////////
    useEffect(()=>{getMyIngredients()}, [])
    /////////////////////
    // PAGE RENDER
    /////////////////////
    return(
        <div>
            <h1>My Ingredinets</h1>
            {state.myIngredients ? loaded() : loading()}
        </div>
    )    
}

export default MyIngredients