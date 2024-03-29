import React from "react"
import { useAppState } from "../../AppState"
import {useNavigate} from "react-router-dom"


function Recipe({recipe}){

        const navigate = useNavigate();
        const {state, dispatch } = useAppState();

        const viewRecipe = (recipe)=>{
            const query = recipe.uri.split("#")[1]
            dispatch({type: "recipe", payload: recipe})
            window.sessionStorage.setItem("recipe", JSON.stringify(recipe))
            window.scrollTo(0, 0)
            navigate("/mykitchen/recipe?query="+query)
        }
        
        const handleDelete = (id) =>{    

            return fetch(state.url+ "/user_recipes/"+id,{
                method: "delete",
                headers: {
                    "Authorization": "Bearer " + state.token
                }
            })
            .then( (response) => {if(response.ok) {return response.json()}
                else{throw new Error("An error of type " + response.status + " occured")}})
            .then((data)=>{dispatch({type: "myRecipes", payload: data})})
            .catch((error) => {window.alert(error)})
            }


        const checkIngredients = ()=>{
            let count = 0;
            if (state.myIngredients){
                for(let i in recipe.ingredients){
                    if (state.myIngredients.length && state.myIngredients.some(item => item.edemam_id === recipe.ingredients[i].foodId)){
                        count += 1
                    }
                }
            }
            return count
        }
            //////////////////
        // RENDER
        //////////////////

        return(
            <div id="whoobe-3fery" className="w-full md:w-64 justify-center items-center bg-white shadow-lg rounded-lg flex flex-col m-4">
                <img src={recipe.image} alt="img" title="img" className="w-full h-auto object-cover rounded-t-lg" id="whoobe-ixxe5" />
                <div id="whoobe-1okdg" className="w-full p-4 justify-start flex flex-col">
                    <h4 className="border-b-2 text-3xl" id="whoobe-3mr7n">{recipe.label}</h4>
                    <p className="my-4" id="whoobe-950fw">You have {checkIngredients()} of {recipe.ingredients.length} ingredients.</p>
                    <button onClick={()=>{viewRecipe(recipe)}} value="button" className="my-4 px-4 py-2  text-white hover:bg-gray-700 bg-gray-800" id="whoobe-jkkr2">View Recipe</button>
                </div>
            </div>
        
        )
}

export default Recipe