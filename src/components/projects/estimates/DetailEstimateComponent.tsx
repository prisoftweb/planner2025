import { useState, useEffect } from "react"
import { OneProjectMin } from "@/interfaces/Projects"
import { CurrencyFormatter } from "@/app/functions/Globals"
import Chip from "@/components/providers/Chip"

export default function DetailEstimateComponent({project, numEstimate, nomEstimate}: 
  {project:OneProjectMin, numEstimate:number, nomEstimate:string}) {

  return (
    <div className="z-10 top-16 absolute w-full space-y-5 p-3 right-0">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-5">
        <div className="bg-white p-3">
          <img src={project.client.logo} 
            alt={project.client.name} className="w-full h-auto" />
          {/* <img src={project.client.logo} alt={project.client.name} /> */}
          <div className="flex justify-center gap-x-2">
          <img src={project.photo} alt={project.title} className="rounded-full w-14 h-14" />
            <div>
              <p className="text-blue-500">{project.title}</p>
              <p className="text-blue-300">{CurrencyFormatter({
                currency: 'MXN',
                value: project.amount
              })}</p>
              <Chip label={project.category.name} color={project.category.color} />
            </div>
          </div>
        </div>

        <div className="bg-white p-3 flex flex-col items-center">
          <img src="/Logotipo_principal.png" alt="logo" />
          <p className="text-blue-500">Samuel Palacios Hernandez</p>
        </div>

        <div className="bg-white p-3">
          <div className=" border border-gray-700">
            <div className="flex items-center border border-gray-700">
              <p className="bg-green-600 text-white p-2 w-40 text-center">{numEstimate}</p>
              <p className="w-full text-blue-500 text-right p-2">{nomEstimate}</p>
            </div>
            <div className="text-center border border-slate-700 p-2">
              <p className="text-slate-600 text-right">{CurrencyFormatter({
                currency: 'MXN',
                value: 0
              })}</p>
            </div>

          </div>
        </div>

      </div>
    </div>
  )
}
