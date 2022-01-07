import React, {useState, Fragment} from "react";
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid'
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react/cjs/react.development";

function Search ({menuOption, setQuery}){

    const navigate = useNavigate();

    const menuOptions = [
        {
            id: 0,
            name: 'Recipes',
            avatar:
              'https://images.unsplash.com/photo-1572424117831-005b5e9b3ae4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
          },
        {
        id: 1,
        name: 'Ingredients',
        avatar:
          'https://images.unsplash.com/photo-1589927986089-35812388d1f4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80',
        },

    ]

    const [formData, setFormData] = useState();

    const [searchType, setSearchType] = useState("Show");

    const [selected, setSelected] = useState(menuOptions[menuOption]);

    const [search, setSearch] = useState();

    const handleChange = (event)=>{
        setFormData({...formData, [event.target.name]: event.target.value})
    }

    const handleType = (type)=>{
        setSearchType(type)
    }

    const handleSubmit = (event)=>{
        const type = selected.name.toLowerCase()
        console.log(type)
        if(formData.search === ""){
            return
        }
        setQuery(formData.search.replace(" ", "%20"))
        if(type === 'ingredients'){
            navigate("/mykitchen/search/ingredients?query="+formData.search.replace(" ", "%20"))
            setSearch(search+1)
        }
        if(type === 'recipes'){
            navigate("/mykitchen/search/recipes?query="+formData.search.replace(" ", "%20"))
            setSearch(search+1)
        }
    }

    function classNames(...classes) {
        return classes.filter(Boolean).join(' ')
    }

    useEffect(()=>{},[search])
      
    
    return (

    <div className="flex flex-row flex-wrap items-center relative z-20">
    <Listbox value={selected} onChange={setSelected}>
        {({ open }) => (
            <>
            <Listbox.Label className="block text-sm font-medium text-gray-700"></Listbox.Label>
            <div className="w-40 mt-1 relative">
                <Listbox.Button className="relative w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                <span className="flex items-center">
                    <img src={selected.avatar} alt="" className="flex-shrink-0 h-6 w-6 rounded-full" />
                    <span className="ml-3 block truncate">{selected.name}</span>
                </span>
                <span className="ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                    <SelectorIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </span>
                </Listbox.Button>

                <Transition
                show={open}
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
                >
                <Listbox.Options className="absolute mt-1 w-full bg-white shadow-lg max-h-56 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm m-4">
                    {menuOptions.map((option) => (
                    <Listbox.Option
                        key={option.id}
                        className={({ active }) =>
                        classNames(
                            active ? 'text-white bg-indigo-600' : 'text-gray-900',
                            'cursor-default select-none relative py-2 pl-3 pr-9'
                        )
                        }
                        value={option}
                    >
                        {({ selected, active }) => (
                        <>
                            <div className="flex items-center">
                            <img src={option.avatar} alt="" className="flex-shrink-0 h-6 w-6 rounded-full" />
                            <span
                                className={classNames(selected ? 'font-semibold' : 'font-normal', 'ml-3 block truncate')}
                            >
                                {option.name}
                            </span>
                            </div>

                            {selected ? (
                            <span
                                className={classNames(
                                active ? 'text-white' : 'text-indigo-600',
                                'absolute inset-y-0 right-0 flex items-center pr-4'
                                )}
                            >
                                <CheckIcon className="h-5 w-5" aria-hidden="true" />
                            </span>
                            ) : null}
                        </>
                        )}
                    </Listbox.Option>
                    ))}
                </Listbox.Options>
                </Transition>
            </div>
            </>
        )}
        </Listbox>

    <div className="w-64 h-10 pl-3 pr-2 bg-white border rounded-full flex justify-between items-center relative m-4">
    <input type="search" onChange={handleChange} name="search" id="search" placeholder="Search" required
            className="appearance-none w-full outline-none focus:outline-none active:outline-none"/>
    <button type="submit" onClick={()=>{handleSubmit()}} className="ml-1 outline-none focus:outline-none active:outline-none">
        <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
            viewBox="0 0 24 24" className="w-6 h-6">
        <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
        </svg>
    </button>
    </div>



    </div>
        
    )
}

export default Search;