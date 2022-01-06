import React, { useReducer } from 'react';


/////////////////////////
// INITIAL STATE
/////////////////////////

const initialState = {
    url: process.env.REACT_APP_MYKITCHEN_URL,
    token: null,
    email: null,
    icon: null,
    nickname: null,
    myIngredients: null,
    myRecipes: null,
    foundRecipes: null,
    recipe: null,
    current: [false, false, false],
    avatars: [
        {file: "alex-lvrs-On2VseHUDXw-unsplash.jpg" , artist: "Alex Lvrs"},
        {file: "alice-pasqual-ticuPP5l2qg-unsplash.jpg" , artist: "Alice Pasqual"},
        {file: "allec-gomes-xnRg3xDcNnE-unsplash.jpg" , artist: "Allec Gomes"},
        {file: "bon-vivant-qom5MPOER-I-unsplash.jpg" , artist: "Bon Vivant"},
        {file: "brooke-lark-M4E7X3z80PQ-unsplash.jpg" , artist: "Brook Lark"},
        {file: "calum-lewis-8Nc_oQsc2qQ-unsplash.jpg" , artist: "Calum Lewis"},
        {file: "calum-lewis-vA1L1jRTM70-unsplash.jpg" , artist: "Calum Lewis"},
        {file: "chad-montano--GFCYhoRe48-unsplash.jpg" , artist: "Chad Montano"},
        {file: "chad-montano-M0lUxgLnlfk-unsplash.jpg" , artist: "Chad Montano"},
        {file: "charles-deluvio-D-vDQMTfAAU-unsplash.jpg" , artist: "Charles DeLuvio"},
        {file: "dose-juice-sTPy-oeA3h0-unsplash.jpg" , artist: "Dose Juice"},
        {file: "emile-mbunzama-cLpdEA23Z44-unsplash.jpg" , artist: "Emile Mbunzama"},
        {file: "joseph-gonzalez-QaGDmf5tMiE-unsplash.jpg" , artist: "Joseph Gonzalez"},
        {file: "karly-gomez-lK1Q5RyD6tc-unsplash.jpg" , artist: "Karly Gomez"},
        {file: "nadeykina-evgeniya-epeLqDQh2PE-unsplash.jpg" , artist: "Nadekina Evgeniya"},
        {file: "olayinka-babalola-r01ZopTiEV8-unsplash.jpg" , artist: "Olayinka Babalola"},
        {file: "rumman-amin-LNn6O_Mt730-unsplash.jpg" , artist: "Rumman Amin"},
        {file: "sheri-silver-5A0O12BIsjY-unsplash.jpg" , artist: "Sheri Silver"},
        {file: "slashio-photography-ZG9ggI_pjFw-unsplash.jpg" , artist: "Slashio Photography"},
        {file: "thought-catalog-9aOswReDKPo-unsplash.jpg" , artist: "Thought Catalog"},
    ]
}

/////////////////////////
// REDUCER
/////////////////////////
// action = {type: "", payload: ---}
const reducer = (state, action)=>{
    let newState;
    
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
        case "navigation":
            newState = {...state, current: action.payload}
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
        <AppContext.Provider value={{state, dispatch}}>
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
