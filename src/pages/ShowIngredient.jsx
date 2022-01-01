import React, {useState, useEffect} from "react";
import { useParams } from "react-router-dom";

function ShowIngredient (props){

    const queryParams = new URLSearchParams(window.location.search)
    const query = queryParams.get("query")


    /////////////////////
    // EDEMAM API SECTION
    /////////////////////
    const appId = process.env.REACT_APP_EDEMAM_INGREDIENT_APP_ID;
    const key = process.env.REACT_APP_EDEMAM_INGREDIENT_KEY;
    const [ingredient, setIngredient] = useState();
    console.log(ingredient)

    // URL For API Request
    const ingredientURL = `https://api.edamam.com/api/food-database/v2/parser?app_id=${appId}&app_key=${key}&ingr=${query}&nutrition-type=cooking`
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
            
            <div class="m-8 flex justify-around">
                
            <div class="bg-gray-900 shadow-md border border-gray-200 rounded-lg max-w-sm dark:bg-gray-800 dark:border-gray-700 opacity-90">
                <a href="#">
                    <img class="rounded-t-lg w-full" src={ingredient.hints[0].food.image} alt="" />
                </a>
                <div class="p-5">
                    
                    <h5 class="text-white font-bold text-2xl tracking-tight mb-2 dark:text-white underline">{ingredient.hints[0].food.label}</h5>
                    
                    <p class="font-normal text-gray-100 mb-3 dark:text-gray-400">
                        Calories: {ingredient.hints[0].food.nutrients.ENERC_KCAL}
                    </p>
                    <p class="font-normal text-gray-100 mb-3 dark:text-gray-400">
                        Fat: {ingredient.hints[0].food.nutrients.FAT}
                    </p>
                    <p class="font-normal text-gray-100 mb-3 dark:text-gray-400">
                        Protein: {ingredient.hints[0].food.nutrients.PROCNT}
                    </p>
                    <p class="font-normal text-gray-100 mb-3 dark:text-gray-400">
                        Carbohydrates: {ingredient.hints[0].food.nutrients.CHOCDF}
                    </p>
                    <a href="#" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-2 text-center inline-flex items-center  dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        Read more
                        <svg class="-mr-1 ml-2 h-4 w-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                    </a>
                </div>
            </div>

            </div>

        )
    }
   
    return (
        <>
            {ingredient ? loaded() : loading() }
        </>
    )
}
    
export default ShowIngredient