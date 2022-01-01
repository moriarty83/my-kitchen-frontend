import React, {useState, useEffect} from "react";
import { useAppState } from "../../AppState";
import { Link, useLocation } from "react-router-dom";

import Search from "../Search";

function IngredientSearch (props){

    const queryParams = new URLSearchParams(window.location.search)
    const query = queryParams.get("query")
    console.log(query) //pizza

    // const token = JSON.parse(window.localStorage.getItem("auth")).token

    const {dispatch, state} = useAppState()

    /////////////////////
    // EDEMAM API SECTION
    /////////////////////
    const id = process.env.REACT_APP_EDEMAM_INGREDIENT_APP_ID;
    const key = process.env.REACT_APP_EDEMAM_INGREDIENT_KEY;

    const [foundIngredients, setFoundIngredients] = useState(null);

    // Search Term that gets passed to URL. The set Search term is passed as props to Search.
    const [searchTerm, setSearchTerm] = useState()

    // URL For API Request
    const ingredientURL = `https://api.edamam.com/auto-complete?app_id=${id}&app_key=${key}&q=${query}&limit=20`

    const searchIngredients = ()=>{
        console.log("Searching")
        fetch(ingredientURL,{
            method: "get",
            headers: {
                "Content-Type": "application/json"
            },
            })
            .then( response => response.json()
                ). then( (data)=>
                setFoundIngredients(data))}
    

    
    let foundIngredientsList = foundIngredients ? 
    <div className="flex flex-col">
    <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
      <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
        <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Name
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Details
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Add
                </th>
                
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {foundIngredients.map((ing, index) => (
                <tr key={index}>
                  {/* <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <img className="h-10 w-10 rounded-full" src={person.image} alt="" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{person.name}</div>
                        <div className="text-sm text-gray-500">{person.email}</div>
                      </div>
                    </div>
                  </td> */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{ing}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      Active
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"><Link to={"/mykitchen/ingredients/"}>Details</Link></button>

                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div> : "";


    useEffect(searchIngredients, [])

    /////////////////////
    // MYKITCHEN BACKEND SECTION
    /////////////////////

    // ADD INGREDIENT
    const addToMyIngredients = (ingredient)=>{
        console.log(ingredient)
        fetch(state.url+ "/ingredients/",{
            method: "post",
            headers: {
                "Authorization": "Bearer " + state.token,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({name: ingredient})
        })
        // Error Handler
        .then((response)=>{
            if(response.ok){
                return response.json()
            }
            else{
                if (response.status === 422){
                throw new Error("Could not add Ingredient. You may already have added this Ingredient")}
                else{
                    throw new Error("An error of type " + response.status + " occured")
                };
            }
        })
        // If no error, add to state.myIngredients.
        .then((responseJson) => {
            dispatch({type:"myIngredients", payload: responseJson})
          })
          .catch((error) => {
            window.alert(error)
          });
    
    }


    /////////////////////
    // USE EFFECT
    /////////////////////


    return(
        <>
            <Search setSearchTerm={setSearchTerm}/>
            {foundIngredientsList}
        </>

    )
}

export default IngredientSearch