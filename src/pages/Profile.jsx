import React, { useEffect } from "react";
import Account from "../Components/User/Account";
import {useAppState} from "../AppState"


function Profile(){
    const {dispatch} = useAppState();

    useEffect(()=>{dispatch({type: "navigation", payload: [false, false, false]})}, [])

    return(
        <div>
            <Account />
        </div>
    )

}

export default Profile