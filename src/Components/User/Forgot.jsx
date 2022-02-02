import React from "react"
import {useAppState} from "../../AppState"

function Forgot(){
    const {state, dispatch} = useAppState()

    return(
        <>
        <h1>Forgot Your Password</h1>
        <div>
            <form action="">
                <label htmlFor="peanut-free">Email</label>
                <input type="email" name="email" id="" />
            </form>
        </div>
        </>
    )
}
export default Forgot