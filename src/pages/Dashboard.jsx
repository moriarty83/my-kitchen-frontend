import React from "react";

import Ingredients from "../Components/Ingredients";
import Recipes from "../Components/Recipes";

function Dashboard (props) {
    return(
        <>
            <h1>Dashboard</h1>
            <Ingredients />
            <Recipes />
        </>
    )
}

export default Dashboard