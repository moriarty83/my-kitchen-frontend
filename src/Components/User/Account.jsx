import React, {useState, useEffect} from "react"

import {useAppState} from "../../AppState"

function Account(){
    const {state, dispatch} = useAppState();

    const localEmail = JSON.parse(window.localStorage.getItem("auth")).email

    /////////////////////
    // STATES
    ///////////////////////
    const [emailVisible, setEmailVisible] = useState(false)
    const [emailText, setEmailText] = useState(`${localEmail.substr(0, 1)}* * * * * ${localEmail.substr(-1+localEmail.indexOf('@'))}`)
    const [buttonText, setButtonText] = useState("Show")
    const [deleteRequested, setDeleteRequested] = useState(false)

    const [formData, setFormData] = useState({
        nickname: ""
    })
    /////////////////////
    // FUNCTIONS
    ///////////////////////

    const handleChange = (event) =>{
        setFormData({...formData, [event.target.name]: event.target.value})
    }

    const handleShowHide = ()=>{
        if(emailVisible){
            setEmailText(`${state.email.substr(0, 1)}* * * * * ${state.email.substr(-1+state.email.indexOf('@'))}`)
            setEmailVisible(false)
            setButtonText("Show")
            return
        }
        if(!emailVisible){
            setEmailText(state.email)
            setEmailVisible(true)
            setButtonText("Hide")
            return
        }
    }

    const updateNickname = (event)=>{
        event.preventDefault()
        const newName = event.target.value
        console.log(event.target)
        const token = state.token
        return fetch(state.url+ "/users",{
            method: "put",
            headers: {
                "Authorization": "Bearer " + token,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)

        })
        .then( (response) => response.ok 
            ). then ( data => console.log (data))}

    const requestDelete = ()=>{
        fetch(state.url+ "/users/delete-request",{
            method: "get",
            headers: {
                "Authorization": "Bearer " + state.token,
                "Content-Type": "application/json"
            },
        })
        // Error Handler
        .then((response)=>{
            if(response.ok){
                setDeleteRequested(true)
            }
            else{
                if (response.status === 422){
                throw new Error("Could not add Ingredient. You may already have added this Ingredient")}
                else{
                    throw new Error("An error of type " + response.status + " occured")
                };
            }
        })
        

    }
    /////////////////////
    // USE EFFECT
    ///////////////////////


    /////////////////////
    // RENDER
    ///////////////////////
    return(
        <div>
            <h1>Account</h1>
            <div>
                <h3>Email</h3>
                <h4>{emailText}</h4>
                <button onClick={handleShowHide}>{buttonText}</button>
            </div>

            
            <h3>Nickname</h3>
            <h2>{state.nickname}</h2>
            <form onSubmit={updateNickname}>
                <input onChange={handleChange} type="text" name="nickname" id="" placeholder={state.nickname} />
                <input type="submit" value="Change Nickname" />
            </form>

            {deleteRequested ? <h3>Please Check your Email to Confirm Delete</h3> : <button onClick={requestDelete}>Delete Account</button>}
            
        </div>
    )
}
export default Account