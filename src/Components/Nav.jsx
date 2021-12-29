import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {useAppState} from "../AppState"

function Nav (props){
    const {state, dispatch} = useAppState()
    let navigate = useNavigate();

    const handleLogout = ()=>{
        
        dispatch({type: "logout"})
        navigate("/")
        
    }
    return(
        <header>
            <h1>My Kitchen</h1>
            
            <nav>
                <Link to="/"><div>Home</div></Link>
                
                {!state.token ?
                <><Link to="/auth/signup"><div>Sign Up</div></Link>
                <Link to="/auth/login"><div>Login</div></Link></> : <>
                <div onClick={handleLogout}>Logout</div>
                <Link to="/mykitchen/account"><div>Account</div></Link>
                </>
                }
            </nav>
        </header>
    )
}

export default Nav