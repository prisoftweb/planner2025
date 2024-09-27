import CardProject from "./CardProject"
import { ProjectMin } from "@/interfaces/Projects"
import { useState } from "react"
import Select, {components} from 'react-select'
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid'
import { Options } from "@/interfaces/Common";

export default function SelectBudgetProject({projects, token}:{projects:ProjectMin[], token:string}) {
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
    //console.log(filter);
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
            //onInputChange={(e) => filterReports(e)}
            onChange={(value:(Options | null)) => filterReports(value?.label || '')}
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-2 gap-y-2 mt-2">
            {selectedProjects.map((p) => (
              <CardProject project={p} token={token} key={p._id} />
            )) }
          </div>
        </div>
      ): <></>}
    </div>
  )
}