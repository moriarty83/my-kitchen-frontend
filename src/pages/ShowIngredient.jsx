import React, {useState, useEffect} from "react";
import { useParams } from "react-router-dom";

function ShowIngredient (props){

    const params = useParams();
    /////////////////////
    // EDEMAM API SECTION
    /////////////////////
    const id = process.env.REACT_APP_EDEMAM_INGREDIENT_APP_ID;
    const key = process.env.REACT_APP_EDEMAM_INGREDIENT_KEY;
    const [ingredient, setIngredient] = useState();
    console.log(ingredient)

    // URL For API Request
    const ingredientURL = `https://api.edamam.com/api/food-database/v2/parser?app_id=${id}&app_key=${key}&ingr=${params.ingredient}&nutrition-type=cooking`
    console.log(ingredientURL)
    const getIngredient = ()=>{
        console.log("getting ingredients")
        fetch(ingredientURL,{
            method: "get",
            headers: {
            },
            })
            .then(async response => response.json()
                ). then(async (data)=>setIngredient(data))}

    useEffect(()=>{getIngredient()}, [])

    const loading = ()=>{return <h2>Loading</h2>}
    const loaded = ()=>{
        return(
            <div className="ingredientDiv">
                <h1>{ingredient.parsed[0].food.label}</h1>
                <img src={ingredient.parsed[0].food.image} />
            </div>
        )
    }
   
    return (
        <>
        <h1>Show Ingredient</h1>
            {ingredient ? loaded() : loading() }
        </>
    )
}
    
export default ShowIngredient