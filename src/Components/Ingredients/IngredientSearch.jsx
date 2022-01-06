import React, {useState, useEffect} from "react";
import { useAppState } from "../../AppState";
import { Link, useLocation } from "react-router-dom";

import Search from "../Search";

function IngredientSearch ({addToMyIngredients}){

    const queryParams = new URLSearchParams(window.location.search)
    const query = queryParams.get("query")

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
    <div className="flex flex-col m-4 ">
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
                  Ingredient
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  My Kitchen
                </th>
                
              </tr>
            </thead>
            <tbody className=" divide-y divide-gray-200">
              {foundIngredients.map((ing, index) => (
                <tr key={index} className={index%2===0 ? "bg-gray-100 opacity-80 hover:opacity-100" : "bg-gray-200 opacity-80 hover:opacity-100"}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{ing}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"><Link to={"/mykitchen/ingredient?query="+ing.replace(" ", "%20")}>Details</Link></button>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <button onClick={()=>{addToMyIngredients(ing)}} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Add</button>

                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div> : "";


    useEffect(searchIngredients, [foundIngredients])

    /////////////////////
    // MYKITCHEN BACKEND SECTION
    /////////////////////



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