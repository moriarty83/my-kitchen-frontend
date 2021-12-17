import React, { useState } from "react";
import {useParams } from "react-router-dom"
import { useAppState } from "../AppState"

function Auth (props) {

    const params = useParams()
    const type = params.form

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })

    

    const actions = {
        signup: {
            action: "signup",
            payload: formData
        },
        login: {
            action: "login",
            payload: formData
        }
    }

    const handleChange = (event) =>{
        setFormData({...formData, [event.target.name]: event.target.value})
    }

    const {dispatch} = useAppState()
    
    const handleSubmit = (event) =>{
        event.preventDefault()
        dispatch(actions[type])
    }

    return(
        <div>
            <form onSubmit={handleSubmit}>
                <input type="email" name="email" onChange={handleChange}/>
                <input type="password" name="password" onChange={handleChange}/>
                <input type="submit" value={type} />
            </form>
        </div>
    )
}

export default Auth