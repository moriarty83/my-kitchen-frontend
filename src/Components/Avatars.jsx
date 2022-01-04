import React, {Fragment, useState} from "react";
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid'

function Avatars(){

    

    const avatars = [
        {file: "alex-lvrs-On2VseHUDXw-unsplash.jpg" , artist: "Alex Lvrs"},
        {file: "alice-pasqual-ticuPP5l2qg-unsplash.jpg" , artist: "Alice Pasqual"},
        {file: "allec-gomes-xnRg3xDcNnE-unsplash.jpg" , artist: "Allec Gomes"},
        {file: "bon-vivant-qom5MPOER-I-unsplash.jpg" , artist: "Bon Vivant"},
        {file: "brooke-lark-M4E7X3z80PQ-unsplash.jpg" , artist: "Brook Lark"},
        {file: "calum-lewis-8Nc_oQsc2qQ-unsplash.jpg" , artist: "Calum Lewis"},
        {file: "calum-lewis-vA1L1jRTM70-unsplash.jpg" , artist: "Calum Lewis"},
        {file: "chad-montano--GFCYhoRe48-unsplash.jpg" , artist: "Chad Montano"},
        {file: "chad-montano-M0lUxgLnlfk-unsplash.jpg" , artist: "Chad Montano"},
        {file: "charles-deluvio-D-vDQMTfAAU-unsplash.jpg" , artist: "Charles DeLuvio"},
        {file: "dose-juice-sTPy-oeA3h0-unsplash.jpg" , artist: "Dose Juice"},
        {file: "emile-mbunzama-cLpdEA23Z44-unsplash.jpg" , artist: "Emile Mbunzama"},
        {file: "joseph-gonzalez-QaGDmf5tMiE-unsplash.jpg" , artist: "Joseph Gonzalez"},
        {file: "karly-gomez-lK1Q5RyD6tc-unsplash.jpg" , artist: "Karly Gomez"},
        {file: "nadeykina-evgeniya-epeLqDQh2PE-unsplash.jpg" , artist: "Nadekina Evgeniya"},
        {file: "olayinka-babalola-r01ZopTiEV8-unsplash.jpg" , artist: "Olayinka Babalola"},
        {file: "rumman-amin-LNn6O_Mt730-unsplash.jpg" , artist: "Rumman Amin"},
        {file: "sheri-silver-5A0O12BIsjY-unsplash.jpg" , artist: "Sheri Silver"},
        {file: "slashio-photography-ZG9ggI_pjFw-unsplash.jpg" , artist: "Slashio Photography"},
        {file: "thought-catalog-9aOswReDKPo-unsplash.jpg" , artist: "Thought Catalog"},
    ]

    const [selected, setSelected] = useState(avatars[2]);

    const handleSelect = (index)=>{
        setSelected(index)
    }

    function classNames(...classes) {
        return classes.filter(Boolean).join(' ')
        }


    return(
        <>

        <Listbox value={selected} onChange={setSelected}>
      {({ open }) => (
        <>
          <Listbox.Label className="block text-sm font-medium text-gray-700">Icon</Listbox.Label>
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
                {avatars.map((item, index) => (
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