import React from "react";
import {useAppState} from "../../AppState";
import {useNavigate} from "react-router-dom"

function Delete(props){
    let navigate = useNavigate();
    
    const {state, dispatch} = useAppState()


    const handleConfirm = ()=>{
        fetch(state.url+ "/users/delete/",{
            method: "post",
            headers: {
                "Authorization": "Bearer " + state.token,
                "Content-Type": "application/json"
            },
            
        })
        // Error Handler
        .then((response)=>{
            if(response.ok){
                window.alert("Your Account has Been Deleted")
                dispatch({type: "logout"})
                navigate("/")
            }
            else{
                throw new Error("An error of type " + response.status + " occured")
            }
        })
        // If no error, add to state.myIngredients.
        .then((responseJson) => {
            
          })
          .catch((error) => {
            window.alert(error)
          });

    }

    const handleCancel = ()=>{
        navigate("/")
    }

    const canDelete = ()=>{
            return(        
            <>

<div className="m-8 flex justify-around">
                
                <div className="bg-gray-900 shadow-md border border-gray-200 rounded-lg max-w-sm dark:bg-gray-800 dark:border-gray-700 opacity-90">
                    
                    
                    
                </div>
    
                </div>
                <h1 className="text-white text-2xl">Are you Sure You Want to Delete Your Account</h1>
                    <button onClick={handleConfirm} className="text-white bg-red-700 hover:bg-red-800 font-medium rounded-lg text-sm px-3 py-1 text-center inline-flex items-center  dark:bg-red-600 dark:hover:bg-red-700">Confirm</button>
                    <button onClick={handleCancel}  className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-3 py-1 text-center inline-flex items-center  dark:bg-blue-600 dark:hover:bg-blue-700 ">Cancel</button>
            </>)
        
    }


    return (
        <>
        {state.token ? canDelete() : 
        <h1>You do not have access to this page. Please login and try again.</h1>}
        </>
    )
}

export default Delete