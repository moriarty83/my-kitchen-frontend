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

    const {state, dispatch} = useAppState()

    React.useEffect(()=>{
        if (userData){
            console.log(userData);
            const {token, user} = userData;
            dispatch({type: "auth", payload: { token, email: user.email}})
        }
    })    

    const actions = {
        signup: () =>{
            fetch(state.url+ "/users/",{
                method: "post",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            })
            .then( response => console.log(response.json())
                )},
        
        login: ()=>{
            fetch(state.url+ "/login/",{
                method: "post",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            })
            .then( response => response.json())}
    }

    const [userData, setUserData] = useState(null)

    const handleChange = (event) =>{
        setFormData({...formData, [event.target.name]: event.target.value})
    }



    const handleSubmit = (event) =>{
        event.preventDefault();
        actions[type].then((data) => console.log(data));
    }

    console.log(actions[type])

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