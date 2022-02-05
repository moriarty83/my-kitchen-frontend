import React, {useState} from "react"

import {useAppState} from "../AppState"

function Forgot(){
    const {state, dispatch} = useAppState();
    const [formData, setFormData] = useState();


    const handleSubmit = () =>{
        return fetch(state.url+ "/password/forgot",{
            
            method: "post",
            headers: {
                "Authorization": "Bearer " + state.token,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({email: formData.email})
        })
        .then( response => response.json()
        
        ).then(json => console.log(json))
        
    }

    const handleChange = (event) =>{
        setFormData({...formData, [event.target.name]: event.target.value})
        console.log(formData)
    }

    return(
        <>
        <div className="bg-grey-lighter min-h-screen flex flex-col my-16">
                <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
                    <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
                        <h1 className="mb-8 text-3xl text-center">Enter Your Email</h1>
                        <form onSubmit={handleSubmit}>
                            <input 
                                onChange={handleChange}
                                type="text"
                                className="block border border-grey-light w-full p-3 rounded mb-4"
                                name="email"
                                placeholder="Email" />
                        </form>
                        <button
                        type="submit"
                        onClick={handleSubmit}
                        className="w-full text-center py-3 rounded bg-green-600 text-white hover:bg-green-dark focus:outline-none my-1">
                            Submit</button>
                        
                    </div>

                    <div className="text-white mt-6">
                        {"Return to "}
                        <a className="no-underline border-b border-blue text-blue" href="/auth?query=login">
                            Log in
                        </a>.
                    </div>
                </div>
            </div>)
        </>
    )
}
export default Forgot