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

    const avatars = [
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

    const [selected, setSelected] = useState(avatars[2])

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
                            <Avatars selected={selected} setSelected={setSelected} avatars={avatars}/>
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