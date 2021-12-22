import React, { useReducer } from 'react';


/////////////////////////
// INITIAL STATE
/////////////////////////

const initialState = {
    url: "http://localhost:3000",
    token: null,
    email: null,
    myIngredients: null,
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
            return newState
            
        case "myIngredients":
            newState = {...state, myIngredients: action.payload}
            return newState
        case "foundRecipes":
            newState = {...state, foundRecipes: action.payload}
            return newState
        case "recipe":
            newState = {...state, recipe: action.payload}
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
    return fetch(state.url+ "/ingredients/",{
        method: "get",
        headers: {
            "Authorization": "Bearer " + state.token,
            "Content-Type": "application/json"
        },

    })
    .then( response => response.json()
        ). then ( data => dispatch({type: "myIngredients", payload: data}))}
