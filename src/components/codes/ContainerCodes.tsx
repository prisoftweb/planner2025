'use client'

import { useState } from "react"
import { ICodeMin } from "@/interfaces/Code";
import { ProviderWithTradeLine } from "@/interfaces/DasboardProviders";
import { Chip as ChipMui } from "@mui/material";
import { DateRangePicker, DateRangePickerValue, } from "@tremor/react";
import { es } from "date-fns/locale"
import { showToastMessageError } from "../Alert";
import { getAllCodesMINByDateANDProvider } from "@/app/api/routeCode";
import { getDate } from "@/libs/dates";

export default function ContainerCodes({codes, providers, token}: 
  {codes:ICodeMin[], providers: ProviderWithTradeLine[], token:string}) {

  const [search, setSearch]=useState<string>('');
  const [statuses, setStatuses]=useState<string[]>([]);
  const [codesState, setCodesState]=useState<ICodeMin[]>(codes);

  const [rangeDate, setRangeDate] = useState<DateRangePickerValue>({
    from: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
    to: new Date(),
  });
  
  const addStatus = (status:string) => {
    const newStatus = [...statuses, status];
    setStatuses(newStatus);
    if(rangeDate.from && rangeDate.to){
      handleFilter(rangeDate.from, rangeDate.to, newStatus);
    }else{
      showToastMessageError('Seleccione un rango de fechas para filtrar');
    }
  }

  const deleteStatus = (status:string) => {
    const newStatus = statuses.filter((s) => s !== status);
    setStatuses(newStatus);
    if(rangeDate.from && rangeDate.to){
      handleFilter(rangeDate.from, rangeDate.to, newStatus);
    }else{
      showToastMessageError('Seleccione un rango de fechas para filtrar');
    }
  }

  const handleFilter = async (dateS:Date, dateE:Date, arrStatuses:Array<string>) => {
    // const res = await getAllCodesMINByDateANDProvider(token, dateS.toDateString(), dateE.toDateString(), arrStatuses, 'TODOS');
    const res = await getAllCodesMINByDateANDProvider(token, getDate(dateS), getDate(dateE), arrStatuses, 'TODOS');
    if(typeof(res)==='string'){
      showToastMessageError(res);
    }else{
      setCodesState(res);
    }
  }

  const handleDate = (dateI: Date, dateF: Date) => {
    handleFilter(dateI, dateF, statuses);  
  }

  const filteredCodes = search==''? codesState: codesState?.filter((p) => p?.code?.toString()?.toLowerCase()?.includes(search.toLowerCase()));
  
  return (
    <>
      <div className="flex gap-x-4 gap-y-3 flex-wrap items-center mt-3">
        {providers.map((p) => (
          <ChipStatus id={p._id} addStatus={addStatus} removeStatus={deleteStatus} 
            title={p.tradename} key={p._id} />
        ))}
      </div>
      <div className="mt-3">
        <DateRangePicker 
          className='mt-2'
          placeholder='Seleccione un rango de fechas'
          onValueChange={(e) => {
            setRangeDate(e);
            if(e.from && e.to){
              handleDate(e.from, e.to);
            }
          }}
          value={rangeDate}
          locale={es}
        />
      </div>
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
          <div className="relative flex flex-col text-gray-700 bg-white shadow-md w-full rounded-xl bg-clip-border h-[calc(100vh-188px)]">
            <nav className="flex w-full flex-col gap-1 p-2 font-sans text-base font-normal text-blue-gray-700
                overflow-scroll overflow-y-auto overflow-x-hidden" style={{scrollbarColor: '#ada8a8 white', scrollbarWidth: 'thin'}}>
              {filteredCodes.map((code) => (
                <div role="button"
                  key={code._id}
                  className={`flex items-center justify-between w-full p-3 leading-tight transition-all rounded-lg 
                    outline-none text-start hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 
                    focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 
                    active:bg-opacity-80 active:text-blue-gray-900 border-b border-slate-300 
                    bg-white`}
                >
                  <div className="flex items-center w-full ">
                    <div className="grid mr-4 place-items-center">
                      <img alt="responsable" src={ code?.userRequesting?.photo ?? '/img/users/default.jpg'}
                        className="relative inline-block h-12 w-12 !rounded-full  object-cover object-center" />
                    </div>
                    <div className="w-full">
                      <div className="flex gap-x-3 w-full justify-between items-center p-3">
                        <div>
                          <h6
                            className="block font-sans text-sm antialiased font-semibold leading-relaxed tracking-normal text-gray-600 ">
                            {code?.project?.title}
                          </h6>
                          <p className="block font-sans text-sm antialiased font-normal leading-normal text-gray-600">
                            {code?.provider?.tradename}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="block font-sans text-2xl antialiased font-normal leading-normal text-blue-600">
                            {code?.code}
                          </p>
                          <p className="block font-sans text-sm antialiased font-normal leading-normal text-gray-600">
                            {code?.date?.substring(0, 10) + ' ' + code?.date?.substring(11, 19)}
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
    </>
  )
}

const ChipStatus = ({ addStatus, id, removeStatus, title}: 
  {title:string, id:string, addStatus:Function, removeStatus:Function}) => {
  const [active, setActive] = useState<boolean>(false);

  const view = active? 
                  <ChipMui label={title} className="p-3" color="success" onClick={() => {removeStatus(id); setActive(false)}}>
                  </ChipMui>: 
                  <ChipMui label={title} color="default" onClick={() => {addStatus(id); setActive(true)}}></ChipMui>

  return(
    <>
      {view }
    </>
  )
}
