import React, { useState } from "react";
import {useParams, Navigate } from "react-router-dom"
import { useAppState } from "../AppState"

function Auth (props) {

    const params = useParams()
    const type = params.form

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })

    const [userData, setUserData] = useState(null)


    const {state, dispatch} = useAppState()

    React.useEffect(()=>{
        if (userData){
            console.log(userData);
            const {token, user} = userData;
            dispatch({type: "auth", payload: { token, email: user.email}})
            window.localStorage.setItem("auth", JSON.stringify({ token, email: user.email}))
           
        }
    }, [userData])    

    const actions = {
        signup: () =>{
            console.log(formData)
            return fetch(state.url+ "/users/",{
                method: "post",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            })
            .then( response => response.json()
                )},
        
        login: ()=>{
            return fetch(state.url+ "/login/",{
                method: "post",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            })
            .then( response => response.json())}
        
    }


    const handleChange = (event) =>{
        setFormData({...formData, [event.target.name]: event.target.value})
    }



    const handleSubmit = (event) =>{
        event.preventDefault();
        actions[type]().then((data) => {setUserData(data)});
    }


    return(
        <div>
            { userData ? <Navigate to="/dashboard" replace={true} /> : ""}
            <form onSubmit={handleSubmit}>
                <input type="email" name="email" onChange={handleChange}/>
                <input type="password" name="password" onChange={handleChange}/>
                <input type="submit" value={type} />
            </form>
        </div>
    )
}

export default Auth