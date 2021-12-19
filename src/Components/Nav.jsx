import React from "react";
import { Link } from "react-router-dom";
import {useAppState} from "../AppState"

function Nav (props){
    const {state, dispatch} = useAppState()

    return(
        <header>
            <h1>My Kitchen</h1>
            
            <nav>
                <Link to="/"><div>Home</div></Link>
                <Link to="/auth/signup"><div>Sign Up</div></Link>
                {!state.token ?
                <Link to="/auth/login"><div>Login</div></Link> :
                <div onClick={()=>{dispatch({type: "logout"})}}>Logout</div>
                }
            </nav>
        </header>
    )
}

export default Nav