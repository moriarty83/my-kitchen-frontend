import React, { useState } from "react";
import {useParams, useNavigate, Navigate } from "react-router-dom"
import { useAppState } from "../AppState"
import Avatars from "../Components/Avatars";
import Modal from "../Components/WelcomeModal";

function Auth (props) {

    const params = useParams()
    const type = params.form
    const navigate = useNavigate();

    const queryParams = new URLSearchParams(window.location.search)
    const query = queryParams.get("query")

    const [userData, setUserData] = useState(null)
    const {state, dispatch} = useAppState()

    const [selected, setSelected] = useState(state.avatars[2])

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })





    React.useEffect(()=>{
        if (userData){
            console.log(userData);
            console.log(Date.now())
            const {token, user, exp} = userData;
            dispatch({type: "auth", payload: { token, email: user.email, icon: user.icon, exp}})
            window.localStorage.setItem("auth", JSON.stringify({ token, email: user.email, nickname: user.nickname, icon: user.icon, exp: exp}))   
        }
    }, [userData])    

    const actions = {
        signup: () =>{
            if(formData.password !== formData.confirm_password){
                window.alert("Passwords Do Not Match")
                return
            }
            else{
                console.log(state.url+ "/users/")
                return fetch(state.url+ "/users/",{
                    
                    method: "post",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({email: formData.email, password:formData.password, nickname: formData.nickname})
                })
                .then( response => response.json()
                )
            }
        },
        
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
        actions[query]().then((data) => {setUserData(data)
        });
    }


    const loaded = ()=>{
        console.log(query)
        if(query === "signup")
            return(
            <div className="bg-grey-lighter min-h-screen flex flex-col my-16">
                <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
                    <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
                        <h1 className="mb-8 text-3xl text-center">Sign up</h1>
                        <form onSubmit={handleSubmit}>
                            <input 
                                onChange={handleChange}
                                type="text"
                                className="block border border-grey-light w-full p-3 rounded mb-4"
                                name="email"
                                placeholder="Email" />
                            <input 
                                onChange={handleChange}
                                type="text"
                                className="block border border-grey-light w-full p-3 rounded mb-4"
                                name="nickname"
                                placeholder="Nickname" />

                            <input 
                                onChange={handleChange}
                                type="password"
                                className="block border border-grey-light w-full p-3 rounded mb-4"
                                name="password"
                                placeholder="Password" />
                            <input 
                                onChange={handleChange}
                                type="password"
                                className="block border border-grey-light w-full p-3 rounded mb-4"
                                name="confirm_password"
                                placeholder="Confirm Password" />
                            <Avatars selected={selected} setSelected={setSelected} avatars={state.avatars}/>
                            <button
                                type="submit"
                                className="w-full text-center py-3 rounded bg-green-600 text-white hover:bg-green-dark focus:outline-none my-1"
                            >Create Account</button>
                        </form>
                        <div className="text-center text-sm text-grey-dark mt-4">
                            By signing up, you agree to the 
                            <a className="no-underline border-b border-grey-dark text-grey-dark" href="#">
                                Terms of Service
                            </a> and 
                            <a className="no-underline border-b border-grey-dark text-grey-dark" href="#">
                                Privacy Policy
                            </a>
                        </div>
                    </div>

                    <div className="text-white mt-6">
                        Already have an account? 
                        <a className="no-underline border-b border-blue text-blue" href="/auth?query=login">
                            Log in
                        </a>.
                    </div>
                </div>
            </div>)
        else
        {
            return(
            <div className="bg-grey-lighter min-h-screen flex flex-col my-16">
            <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
                <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
                    <h1 className="mb-8 text-3xl text-center">Login</h1>
                    <form onSubmit={handleSubmit}>
                    <input 
                        onChange={handleChange}
                        type="text"
                        className="block border border-grey-light w-full p-3 rounded mb-4"
                        name="email"
                        placeholder="Email" />

                    <input 
                        onChange={handleChange}
                        type="password"
                        className="block border border-grey-light w-full p-3 rounded mb-4"
                        name="password"
                        placeholder="Password" />

                    <button
                        type="submit"
                        className="w-full text-center py-3 rounded bg-green-600 text-white hover:bg-green-dark focus:outline-none my-1"
                    >Login</button>
                    </form>


                </div>

                <div className="text-white mt-6">
                    {"Don't have an account? "}
                    <a className="no-underline border-b border-blue text-blue" href="/auth?query=signup">
                        Sign up
                    </a>.
                </div>
            </div>
        </div>)
        }
    }


    return(
        <div>
            { userData ? <Navigate to="/" replace={true} /> : ""}
            {loaded()}

            {/* <form onSubmit={handleSubmit}>
                <label htmlFor="email">Email</label>
                <input type="email" name="email" onChange={handleChange}/>
                <label htmlFor="password">Password</label>
                <input type="password" name="password" onChange={handleChange}/>
                <label htmlFor="nickname">Nickname</label>
                <input type="text" name="nickname" onChange={handleChange}/>
                <input type="submit" value={type} />
            </form> */}
            <Modal formData={formData} setUserData={setUserData} selected={selected}/>
        </div>
    )
}

export default Auth