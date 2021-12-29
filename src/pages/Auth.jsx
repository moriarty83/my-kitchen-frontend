import React, { useState } from "react";
import {useParams, useNavigate, Navigate } from "react-router-dom"
import { useAppState } from "../AppState"

function Auth (props) {

    const params = useParams()
    const type = params.form
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })

    const [userData, setUserData] = useState(null)
    const {state, dispatch} = useAppState()

    React.useEffect(()=>{
        if (userData){
            console.log(userData);
            console.log(Date.now())
            const {token, user, exp} = userData;
            dispatch({type: "auth", payload: { token, email: user.email, exp}})
            window.localStorage.setItem("auth", JSON.stringify({ token, email: user.email, exp: exp}))   
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
            .then( response => {
                console.log(response)
                if(response.ok){
                    console.log("okay")
                    return response.json()}
                else{
                    throw new Error("Invalid Username/Password")
                }}
                )
            .then(data => data)
            .catch(error=> alert(error))
            
        }
        
    }


    const handleChange = (event) =>{
        setFormData({...formData, [event.target.name]: event.target.value})
    }



    const handleSubmit = (event) =>{
        event.preventDefault();
        actions[type]().then((data) => {setUserData(data)
        });
    }


    return(
        <div>
            { userData ? <Navigate to="/dashboard" replace={true} /> : ""}
            <form onSubmit={handleSubmit}>
                <label htmlFor="email">Email</label>
                <input type="email" name="email" onChange={handleChange}/>
                <label htmlFor="password">Password</label>
                <input type="password" name="password" onChange={handleChange}/>
                <label htmlFor="nickname">Nickname</label>
                <input type="text" name="nickname" onChange={handleChange}/>
                <input type="submit" value={type} />
            </form>
        </div>
    )
}

export default Auth