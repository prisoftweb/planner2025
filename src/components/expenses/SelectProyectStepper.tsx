import CardProject from "./CardProject";
import Select, {components} from 'react-select'
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid'
import { useState } from "react";
import { Options } from "@/interfaces/Common";
import { ReportParse } from "@/interfaces/Reports";
import { useOptionsExpense } from "@/app/store/newExpense";

export default function SelectProjectStepper(){

  const {reports, reportsOptions} = useOptionsExpense();
  const [filtered, setFiltered] = useState<ReportParse[]>(reports);

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

  if(reports.length > 0 && filtered.length===0){
    setFiltered(reports);
  }

  const filterReports = (value: string) => {
    const filter = reports.filter((repor) => repor.name.toLowerCase().includes(value.toLowerCase()));
    setFiltered(filter);
  }

  return (
    <>
      {reports.length > 0 && reportsOptions.length > 0? (
        <div className="mt-3">
        <Select
          className='w-full max-w-xl' 
          options={reportsOptions}
          maxMenuHeight={250}
          components={{
            DropdownIndicator
          }}
          placeholder='Buscar ...'
          styles={customStyles}
          onChange={(value:(Options | null)) => filterReports(value?.label || '')}
        />
        <div className="grid grid-cols-2 sm:grid-cols-3 2xl:grid-cols-3 
          3xl:grid-cols-4 gap-x-4 gap-y-3 mt-5">
            {filtered.map((repor) => (
              <CardProject report={repor} key={repor._id} />
            ))}
        </div>
      </div>
      ): <></>}
    </>
  )
}