import React, { useEffect} from "react";
import { useAppState } from "../AppState"


function MyRecipesIndex({getMyRecipes, deleteMyRecipe}){
    const {state, dispatch} = useAppState();

    ////////////////////
    // FUNCTIONS
    ////////////////////
    const loading = () =>{
        <h4 className="text-white text-xl mx-4" id="whoobe-3mr7n">Loading...</h4>
    }

    const loaded = ()=>{
        const elements = state.myRecipes.map((element, index)=>{
            const recipe = JSON.parse(element.json)
            const id = recipe.uri.split("#")[1]
            return (
                <div key={index} className="flex flex-col items-center bg-gray-900 shadow-md border border-gray-200 rounded-lg w-56 dark:bg-gray-800 dark:border-gray-700 opacity-90 m-4"> 
                    <img className="rounded-t-lg w-full" src={recipe.image} alt="" />
                    <div className="">
                        <h5 className="text-white font-bold text-2xl tracking-tight mb-2 dark:text-white underline">{element.name}</h5>
                    </div>
                    <div className="flex flex-row justify-around w-full my-2">
                        <a href={"/mykitchen/recipe?query="+id}><button className="w-16 text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-3 py-2 text-center inline-flex items-center  dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        Details
                        </button>
                        </a>
                        <button onClick={()=>{deleteMyRecipe(element.id)}} className="w-16 text-white bg-red-700 hover:bg-red-800 font-medium rounded-lg text-sm px-3 py-2 text-center inline-flex items-center  dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        Delete
                        </button>
                    </div>
                </div>
            )
        })
        return elements
    }

    useEffect(()=>{getMyRecipes()}, [])

    return(
        <>
        <h4 className="text-white underline text-3xl mx-4" id="whoobe-3mr7n">All MyRecipes</h4>
        <div className="flex flex-row flex-wrap justify-around">
        {state.myRecipes ? loaded() : loading()}
        </div>
        </>
    )
}

export default MyRecipesIndex