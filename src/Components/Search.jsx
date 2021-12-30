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
        // <form onSubmit={handleSubmit}>
        //     <input type="search" name="search" id="" onChange={handleChange}/>
        //     <input type="submit" value="Search" />
        // </form>
<div className="w-64 h-10 pl-3 pr-2 bg-white border rounded-full flex justify-between items-center relative">
  <input type="search" name="search" id="search" placeholder="Search"
         className="appearance-none w-full outline-none focus:outline-none active:outline-none"/>
  <button type="submit" className="ml-1 outline-none focus:outline-none active:outline-none">
    <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
         viewBox="0 0 24 24" className="w-6 h-6">
      <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
    </svg>
  </button>
</div>
        
    )
}

export default Search;