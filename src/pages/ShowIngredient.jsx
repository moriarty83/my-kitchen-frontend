import React, {useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import { useAppState } from "../AppState"

function ShowIngredient ({deleteMyIngredient, addToMyIngredients}){

    const {dispatch, state} = useAppState()

    const queryParams = new URLSearchParams(window.location.search)
    const query = queryParams.get("query")
    const token = JSON.parse(window.localStorage.getItem("auth")).token


    /////////////////////
    // EDEMAM API SECTION
    /////////////////////
    const appId = process.env.REACT_APP_EDEMAM_INGREDIENT_APP_ID;
    const key = process.env.REACT_APP_EDEMAM_INGREDIENT_KEY;
    const [ingredient, setIngredient] = useState();

    // URL For API Request
    const ingredientURL = `https://api.edamam.com/api/food-database/v2/parser?app_id=${appId}&app_key=${key}&ingr=${query}&nutrition-type=cooking`
    const getIngredient = ()=>{
        fetch(ingredientURL,{
            method: "get",
            headers: {
            },
            })
            .then(async response => response.json()
                ). then(async (data)=>setIngredient(data))}


    /////////////////////
    // FUNCTIONS
    /////////////////////

    const canAdd = (ingredientId, ingredientName)=>{
        let element = null
        if(state.myIngredients){
            state.myIngredients.some((x, i) => {
                if(x.edemam_id === ingredientId){
                element = 
                (<button onClick={()=>{deleteMyIngredient(state.myIngredients[i].id)}} className="text-white bg-red-700 hover:bg-red-800 font-medium rounded-lg text-sm px-3 py-2 text-center inline-flex items-center  dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    Delete from MyIngredients
                </button>)
                return element
                }
                else{
                    element =     
                    (<button onClick={()=>{addToMyIngredients(ingredientName)}} className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-3 py-2 text-center inline-flex items-center  dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    Add to MyIngredients
                    </button>)
                }
            })
        }
        else{
            element =     
            (<button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-2 text-center inline-flex items-center  dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            Add to MyIngredients
            <svg className="-mr-1 ml-2 h-4 w-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
            </button>)
        }
        return element
    }
    
    // GET MYINGREDIENTS
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


    const loading = ()=>{return <h2>Loading</h2>}
    const loaded = ()=>{
        return(
            
            <div className="m-8 flex justify-around">
                
            <div className="bg-gray-900 shadow-md border border-gray-200 rounded-lg max-w-sm dark:bg-gray-800 dark:border-gray-700 opacity-90">
                
                <img className="rounded-t-lg w-full" src={ingredient.hints[0].food.image} alt="" />
                
                <div className="p-5">
                    
                    <h5 className="text-white font-bold text-2xl tracking-tight mb-2 dark:text-white underline">{ingredient.hints[0].food.label}</h5>
                    
                    <p className="font-normal text-gray-100 mb-3 dark:text-gray-400">
                        Calories: {ingredient.hints[0].food.nutrients.ENERC_KCAL}
                    </p>
                    <p className="font-normal text-gray-100 mb-3 dark:text-gray-400">
                        Fat: {ingredient.hints[0].food.nutrients.FAT}
                    </p>
                    <p className="font-normal text-gray-100 mb-3 dark:text-gray-400">
                        Protein: {ingredient.hints[0].food.nutrients.PROCNT}
                    </p>
                    <p className="font-normal text-gray-100 mb-3 dark:text-gray-400">
                        Carbohydrates: {ingredient.hints[0].food.nutrients.CHOCDF}
                    </p>


                    {canAdd(ingredient.hints[0].food.foodId, ingredient.hints[0].food.label)}

                </div>
            </div>

            </div>

        )
    }


    /////////////////////
    // USE EFFECT
    /////////////////////
    useEffect(()=>{
        getMyIngredients().then(()=>{getIngredient()});
        dispatch({type: "navigation", payload: [false, true, false]})
    }, [])
   

    /////////////////////
    // RENDER
    /////////////////////
    return (
        <>
            {ingredient ? loaded() : loading() }
        </>
    )
}
    
export default ShowIngredient