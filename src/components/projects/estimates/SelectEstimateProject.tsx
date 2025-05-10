import { ProjectMin } from "@/interfaces/Projects"
import { useState } from "react"
import Select, {components} from 'react-select'
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid'
import { Options } from "@/interfaces/Common";
import { MoneyFormatter } from "@/app/functions/Globals";

export default function SelectEstimateProject({projects, token, updateProject}:
  {projects:ProjectMin[], token:string, updateProject:Function}) {
  const [selectedProjects, setSelectedProjects] = useState<ProjectMin[]>(projects);

  const optProjects: Options[] = [];
  projects.map( p => 
    optProjects.push({
      label: p.title,
      value: p._id
    })
  );

  const DropdownIndicator = (props: any) => {
    return (
      components.DropdownIndicator && (
        <components.DropdownIndicator {...props}>
          <MagnifyingGlassIcon className='w-6 h-6 text-slate-400' />
        </components.DropdownIndicator>
      )
    )
  }

  const customStyles = {
    control: (base: any) => ({
      ...base,
      flexDirection: 'row-reverse',
      borderRadius: "9px",
    }),
  }

  if(projects.length > 0 && selectedProjects.length===0){
    setSelectedProjects(projects);
  }

  const filterReports = (value: string) => {
    const filter = projects.filter((pro) => pro.title.toLowerCase().includes(value.toLowerCase()));
    setSelectedProjects(filter);
  }

  return (
    <div>
      {projects.length > 0 && selectedProjects.length > 0? (
        <div className="mt-3">
          <Select
            className='w-full max-w-xl' 
            options={optProjects}
            maxMenuHeight={250}
            components={{
              DropdownIndicator
            }}
            placeholder='Buscar ...'
            styles={customStyles}
            onChange={(value:(Options | null)) => filterReports(value?.label || '')}
            autoFocus
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-2 gap-y-2 mt-2">
            {selectedProjects.map((p) => (
              <div className="grid grid-cols-3 gap-x-2 p-3 border border-slate-700 
                    rounded-xl bg-white shadow-md shadow-slate-500 hover:shadow-xl 
                    hover:shadow-slate-600 cursor-pointer"
                onClick={() => {
                  updateProject(p);
                }}
                key={p._id}
              >
                <div className="col-span-2">
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col items-center gap-y-1">
                      <img src={p.photo} alt="logo" className="w-8 h-auto rounded-full" />
                      <div className={`w-3 h-3 ${p.status? 'bg-green-500': 'bg-red-500'}`}></div>
                    </div>
                    <div>
                      <p>{p.title}</p>
                      <p>{p.account}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                      <div className="bg-purple-600 h-2.5 rounded-full dark:bg-purple-500" 
                        style={{"width": p.progress?? 0}}></div>
                    </div>
                    <p>{p.progress?? 0}%</p>
                  </div>
                </div>
                <div className="text-right flex flex-col justify-between">
                  <p className="text-base">
                    {MoneyFormatter(p.amount)}
                  </p>
                  <p>{ p.date? 
                          Math.round((new Date().getTime() - new Date(p.date).getTime()) 
                              / 86400000): 0 } dias</p>
                </div>
              </div>
            )) }
          </div>
        </div>
      ): <></>}
    </div>
  )
}