'use client'

import { useState } from "react"
import { ICodeMin } from "@/interfaces/Code";

export default function ContainerCodes({codes}: {codes:ICodeMin[]}) {

  const [search, setSearch]=useState<string>('');

  const filteredCodes = search==''? codes: codes.filter((p) => p.code.toString().toLowerCase().includes(search.toLowerCase()));

  return (
    // <div className={`grid ${widthPage < 500? 'grid-cols-1': 'grid-cols-2'} gap-x-3 p-5`}>
    <div className="w-full max-w-lg" >
      <div>
        <div className="flex items-center gap-x-2">
          <div className="relative w-full p-2">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
              </svg>
            </div>
            <input 
              type="search" 
              id="default-search"
              value={search}
              autoFocus
              onChange={(e) => setSearch(e.target.value)} 
              className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 
                rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500
                outline-0 outline-none 
                dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={'Buscar codigo'} required ></input>
          </div>
        </div>
        <div className="relative flex flex-col text-gray-700 bg-white shadow-md w-full rounded-xl bg-clip-border">
          <nav className="flex w-full flex-col gap-1 p-2 font-sans text-base font-normal text-blue-gray-700 h-96
              overflow-scroll overflow-x-hidden" style={{scrollbarColor: '#ada8a8 white', scrollbarWidth: 'thin'}}>
            {filteredCodes.map((code) => (
              <div role="button"
                key={code._id}
                className={`flex items-center justify-between w-full p-3 leading-tight transition-all rounded-lg 
                  outline-none text-start hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 
                  focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 
                  active:bg-opacity-80 active:text-blue-gray-900 border-b border-slate-300 
                  bg-white`}
                // onClick={() => handleProjectSel(prj._id, prj.title)}
              >
                <div className="flex items-center w-full ">
                  <div className="grid mr-4 place-items-center">
                    <img alt="responsable" src={ '/img/projects/default.svg'}
                      className="relative inline-block h-12 w-12 !rounded-full  object-cover object-center" />
                  </div>
                  <div className="w-full">
                    <div className="flex gap-x-3 w-full justify-between items-center p-3">
                      <h6
                        className="block font-sans text-sm antialiased font-semibold leading-relaxed tracking-normal text-gray-600 ">
                        {code.project.title}
                      </h6>
                      <div className="text-right">
                        <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-600">
                          {code.code}
                        </p>
                        <p className="block font-sans text-sm antialiased font-normal leading-normal text-gray-600">
                          {code.date.substring(0, 10)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </nav>
        </div>
      </div>

    </div>
  )
}
