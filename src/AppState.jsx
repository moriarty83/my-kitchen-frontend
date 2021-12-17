import React, { useContext, useReducer } from 'react';


/////////////////////////
// INITIAL STATE
/////////////////////////

const initialState = {
    url: "http://localhost:3000",
    token: null,
    email: null
}

/////////////////////////
// REDUCER
/////////////////////////
// action = {type: "", payload: ---}
const reducer = (state, action)=>{
    switch(action.type){
        case "signup":
            fetch(state.url+ "/users/",{
                method: "post",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(action.payload)
            })
            .then( response => response.json())
            .then( user => {return {...state, token: user.token, email: user.email}})
        case "login":
            fetch(state.url+ "/login",{
                method: "post",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(action.payload)
            })
            .then( response => response.json())
            .then( user => {return {...state, token: user.token, email: user.email}})
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
        <AppContext.Provider value={state, dispatch}>
            {props.children}
        </AppContext.Provider>
    )
}


/////////////////////////
// USE APPSTSTE HOOK
/////////////////////////
// Create a custom hook for app state

export const useAppState = ()=>{
    return React.useContext(AppContext)
}

