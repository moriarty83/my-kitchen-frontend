import React, {useState} from "react";

function Search (props){

    console.log(props)

    const [formData, setFormData] = useState()

    const handleChange = (event)=>{
        setFormData({...formData, [event.target.name]: event.target.value})
    }

    const handleSubmit = (event)=>{
        event.preventDefault();
        props.setSearchTerm(formData.search)
    }

    return (
        <form onSubmit={handleSubmit}>
            <input type="search" name="search" id="" onChange={handleChange}/>
            <input type="submit" value="Search" />
        </form>
    )
}

export default Search;