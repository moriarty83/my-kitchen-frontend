import React from "react"
import {useAppState} from "../../AppState"

function Prefs(){
    const {state, dispatch} = useAppState()

    return(
        <>
        <h1>Preferences</h1>
        <div>
            <form action="">
                <label htmlFor="vegan">Vegan</label>
                <input type="checkbox" name="vegan" id="" />
                <label htmlFor="vegetarian">Vegetarian</label>
                <input type="checkbox" name="vegetarian" id="" />
                <label htmlFor="low-fat">Low-Fat</label>
                <input type="checkbox" name="low-fat" id="" />
                <label htmlFor="gluten-free">Gluten-Free</label>
                <input type="checkbox" name="gluten-free" id="" />
                <label htmlFor="dairy-free">Dairy-Free</label>
                <input type="checkbox" name="dairy-free" id="" />
                <label htmlFor="peanut-free">Peanut-Free</label>
                <input type="checkbox" name="peanut-free" id="" />
            </form>
        </div>
        </>
    )
}
export default Prefs