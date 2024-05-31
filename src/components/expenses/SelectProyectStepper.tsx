//import { Project } from "@/interfaces/Projects";
import CardProject from "./CardProject";
import Select, {components} from 'react-select'
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid'
//import { Options as optProjects } from "@/interfaces/Common";
import { useState } from "react";
import { Options } from "@/interfaces/Common";

import { Report } from "@/interfaces/Reports";

export default function SelectProjectStepper({reports, optReports}: 
                                {reports:Report[], optReports:Options[]}){

  const [filtered, setFiltered] = useState<Report[]>(reports);

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

  // const filterProjects = (value: string) => {
  //   const filter = projects.filter((project) => project.title.toLowerCase().includes(value.toLowerCase()));
  //   setFiltered(filter);
  //   //console.log(filter);
  // }

  const filterReports = (value: string) => {
    const filter = reports.filter((repor) => repor.name.toLowerCase().includes(value.toLowerCase()));
    setFiltered(filter);
    //console.log(filter);
  }

  return (
  <>
    <div className="mt-3">
      <Select
        className='w-full' 
        options={optReports}
        maxMenuHeight={250}
        components={{
          DropdownIndicator
        }}
        placeholder='Buscar ...'
        styles={customStyles}
        onInputChange={(e) => filterReports(e)}
        onChange={(value:(Options | null)) => filterReports(value?.label || '')}
      />
      <div className="grid grid-cols-2 sm:grid-cols-3 2xl:grid-cols-3 
        3xl:grid-cols-4 gap-x-4 gap-y-3 mt-5">
          {filtered.map((repor, index:number) => (
            <CardProject report={repor} key={index} />
          ))}
      </div>
    </div>
  </>)
}

// export default function SelectProjectStepper({projects, optProjects}: 
//                               {projects:Project[], optProjects:optProjects[]}){
  
//   const [filtered, setFiltered] = useState<Project[]>(projects);
  
//   const DropdownIndicator = (props: any) => {
//     return (
//       components.DropdownIndicator && (
//         <components.DropdownIndicator {...props}>
//           <MagnifyingGlassIcon className='w-6 h-6 text-slate-400' />
//         </components.DropdownIndicator>
//       )
//     )
//   }
  
//   const customStyles = {
//     control: (base: any) => ({
//       ...base,
//       flexDirection: 'row-reverse',
//       borderRadius: "9px",
//     }),
//   }

//   const filterProjects = (value: string) => {
//     const filter = projects.filter((project) => project.title.toLowerCase().includes(value.toLowerCase()));
//     setFiltered(filter);
//     //console.log(filter);
//   }

//   return (
//     <>
//       <div className="mt-3">
//         <Select
//           className='w-full' 
//           options={optProjects}
//           maxMenuHeight={250}
//           components={{
//             DropdownIndicator
//           }}
//           placeholder='Buscar ...'
//           styles={customStyles}
//           onInputChange={(e) => filterProjects(e)}
//           onChange={(value:(Options | null)) => filterProjects(value?.label || '')}
//         />
//         <div className="grid grid-cols-2 sm:grid-cols-3 2xl:grid-cols-3 
//           3xl:grid-cols-4 gap-x-4 gap-y-3 mt-5">
//           {filtered.map((project, index:number) => (
//             <CardProject project={project} key={index} />
//           ))}
//         </div>
//       </div>
//     </>)
// }