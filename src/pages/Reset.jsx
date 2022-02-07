import React, {useState} from "react"
import { Link, useNavigate } from "react-router-dom";
import { useParams,  } from "react-router-dom";
import {useAppState} from "../AppState"

function Reset(props){
    const {state, dispatch} = useAppState();
    let params = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState();

    const handleSubmit = () =>{
        if(formData.password !== formData.confirm){
            window.alert("Passwords Do Not Match")
            navigate("/auth?query=login")
            return
        }
        else{

        return fetch(state.url+ "/users/reset",{
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({token: params.token, password: formData.password})
        })
        .then( (response) => {
            if(response.ok){
                window.alert("Password Reset. Return to Login")
            }
            else{
                console.log(response)
                window.alert("Error: " + response.json().body)
            }
            })
            .catch((error) => {
                console.log(error)
              });
        }
    }

    const handleChange = (event) =>{
        setFormData({...formData, [event.target.name]: event.target.value})
    }

    return(
        <>
        <div className="bg-grey-lighter min-h-screen flex flex-col my-16">
                <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
                    <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
                        <h1 className="mb-8 text-3xl text-center">Reset Password</h1>
                        <form onSubmit={handleSubmit}>
                            <input 
                                onChange={handleChange}
                                type="password"
                                className="block border border-grey-light w-full p-3 rounded mb-4"
                                name="password"
                                placeholder="New Password" />
                                                            <input 
                                onChange={handleChange}
                                type="password"
                                className="block border border-grey-light w-full p-3 rounded mb-4"
                                name="confirm"
                                placeholder="Re-Enter New Password" />
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
export default Reset