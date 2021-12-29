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

    }

    const canDelete = ()=>{
            return(        
            <>
                <h1>Are you Sure You Want to Delete Your Account</h1>
                    <button onClick={handleConfirm}>Confirm</button>
                    <button>Cancel</button>
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