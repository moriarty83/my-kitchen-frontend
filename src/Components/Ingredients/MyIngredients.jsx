import React, {useState, useEffect} from "react";
import { useAppState } from "../../AppState";
import ItemSlider from "../Slider";

function MyIngredients(props){

    const token = JSON.parse(window.localStorage.getItem("auth")).token

    const {state, dispatch} = useAppState()



    /////////////////////
    // FUNCTIONS
    /////////////////////
    const getMyIngredients = ()=>{
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
        if (state.myIngredients.length > 0){
        const items = state.myIngredients.map((element, index)=>{
            return({name: element.name, image: element.image_url, id: element.edemam_id
            })
        })
        return <ItemSlider type="ingredient" items={items} />}
        else{
            return <h1 className="text-3xl text-white text-center bg-gray-800 opacity-75">You do not have any saved Ingredients</h1>
        }
    }
    /////////////////////
    // USE EFFECT
    /////////////////////
    useEffect(()=>{getMyIngredients()}, [])
    /////////////////////
    // PAGE RENDER
    /////////////////////
    return(
        <div className="my-8">
            <div className="bg-gray-800 bg-opacity-75 border-t-2">
            <h4 className="text-white underline text-3xl mx-4 copperplate" id="whoobe-3mr7n">MyIngredients</h4>
            </div>

            {state.myIngredients ? loaded() : loading()}
            <div className="bg-gray-800 bg-opacity-75 border-b-2">
            <h4 className="text-white text-right text-xl mx-4" id="whoobe-3mr7n"><a href="/mykitchen/ingredients/all">View All</a></h4>
            </div>

        </div>
    )    
}

export default MyIngredients