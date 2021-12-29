import React, { useReducer } from 'react';


/////////////////////////
// INITIAL STATE
/////////////////////////

const initialState = {
    url: "http://localhost:3000",
    token: null,
    email: null,
    nickname: null,
    myIngredients: null,
    myRecipes: null,
    foundRecipes: null,
    recipe: null,

}

/////////////////////////
// REDUCER
/////////////////////////
// action = {type: "", payload: ---}
const reducer = (state, action)=>{
    let newState;
    console.log("Payload: " + action.payload)
    switch(action.type){
        case  "auth":
            newState = {...state, ...action.payload}
            return newState
        case "logout":
            newState = {...state, token: null, email: null}
            window.localStorage.removeItem("auth")
            window.sessionStorage.removeItem("recipe")
            return newState
        case "myIngredients":
            newState = {...state, myIngredients: action.payload}
            return newState
        case "foundRecipes":
            newState = {...state, foundRecipes: action.payload}
            return newState
        case "myRecipes":
            let recipes = action.payload
            newState = {...state, myRecipes: recipes}
            return newState
        case "addIngredient":
            newState = {...state, myIngredients: [...state.myIngredients, action.payload]}
            return newState
        case "recipe":
            window.alert(action.payload)
            newState = {...state, recipe: action.payload}
            return newState
        case "addRecipe":
            window.alert("addRecipe dispatch")
            newState = {...state, myRecipes: [...state.myIngredients, action.payload]}
            return newState
        default:
            return state
            
            
    }
}

/////////////////////////
// APPCONTEXT
/////////////////////////

// Provides state to everything
const AppContext = React.createContext(null)


/////////////////////////
// APP STATE COMPONENET
/////////////////////////
export function AppState (props){
    const [state, dispatch] = useReducer(reducer, initialState)

    return(
        <AppContext.Provider value={{state, dispatch, GetMyIngredients}}>
            {props.children}
        </AppContext.Provider>
    )
}


/////////////////////////
// USE APPSTATE HOOK
/////////////////////////
// Create a custom hook for app state

export const useAppState = ()=>{
    return React.useContext(AppContext)
}

/////////////////////////
// MY INGREDIENTS
/////////////////////////
const GetMyIngredients = ()=>{
    const {state, dispatch} = useAppState()
    return fetch(state.url+ "/ingredients",{
        method: "get",
        headers: {
            "Authorization": "Bearer " + state.token,
            "Content-Type": "application/json"
        },

    })
    .then( response => response.json()
        ). then ( data => dispatch({type: "myIngredients", payload: data}))}


/////////////////////////
// CHECK INGREDIENTS
/////////////////////////

export const checkIngredients = (recipe, state) =>{
    console.log("hello")
    let count = 0;
    for(let ingredient in recipe.ingredients){
        console.log(ingredient)
        if (state.myIngredients.includes(ingredient.food)){
            console.log("ingredient match")
            count += 1
        }
    }
    return count
}