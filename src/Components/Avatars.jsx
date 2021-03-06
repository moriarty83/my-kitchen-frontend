import React, {Fragment, useEffect} from "react";
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid'
import { useAppState } from "../AppState";

function Avatars({selected, setSelected, avatars}){

    const {state} = useAppState();

    // const [selected, setSelected] = useState(avatars[2]);

    const handleSelect = (index)=>{
        setSelected(index)
    }

    function classNames(...classes) {
        return classes.filter(Boolean).join(' ')
        }

    

    // useEffect(()=>{state.avatars.some((item, index) => {if(item.file === state.icon){
    //     setSelected(state.avatars[index])}})}, [])

    return(
        <>

        <Listbox value={selected} onChange={setSelected}>
      {({ open }) => (
        <>
          <Listbox.Label className="block text-sm font-medium text-gray-700"></Listbox.Label>
          <div className="mt-1 relative">
            <Listbox.Button className="relative w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
              <span className="flex items-center">
                <img src={"/images/avatars/" + selected.file} alt="" className="flex-shrink-0 h-6 w-6 rounded-full" />
                <span className="ml-3 block truncate">{"By " + selected.artist}</span>
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
              <Listbox.Options className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-56 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                {state.avatars.map((item, index) => (
                  <Listbox.Option
                    key={index}
                    className={({ active }) =>
                      classNames(
                        active ? 'text-white bg-indigo-600' : 'text-gray-900',
                        'cursor-default select-none relative py-2 pl-3 pr-9'
                      )
                    }
                    value={item}
                  >
                    {({ selected, active }) => (
                      <>
                        <div className="flex items-center">
                          <img src={"/images/avatars/" + item.file} alt="" className="scale-150 flex-shrink-0 h-6 w-6 rounded-full object-cover" />
                          <span
                            className={classNames(selected === index ? 'font-semibold' : 'font-normal', 'ml-3 block truncate')}
                          >
                            {"By " + item.artist}
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
        </>
    )
}

export default Avatars