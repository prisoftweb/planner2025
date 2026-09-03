'use client'

import { useState } from "react"
import { ICodeMin } from "@/interfaces/Code";
import { ProviderWithTradeLine } from "@/interfaces/DasboardProviders";
import { Chip as ChipMui } from "@mui/material";
import { DateRangePicker, DateRangePickerValue, } from "@tremor/react";
import { es } from "date-fns/locale"
import { showToastMessage, showToastMessageError } from "../Alert";
import { getAllCodesMINByDateANDProvider } from "@/app/api/routeCode";
import { ICostWithoutCode } from "@/interfaces/Expenses";
import Chip from "@/components/providers/Chip";
import { CurrencyFormatter } from "@/app/functions/Globals";
import {Tooltip} from "@nextui-org/react";
import { propsTooltip } from "@/libs/animations";
import Button from "../Button";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { getAllCostsMINByDateANDProvider, UpdateCost } from "@/app/api/routeCost";
import { updateCode } from "@/app/api/routeCode";
import { getDate } from "@/libs/dates";

export default function ContainerAssignedCodes({codes, providers, token, costs}: 
  {codes:ICodeMin[], providers: ProviderWithTradeLine[], token:string, costs: ICostWithoutCode[]}) {

  const [search, setSearch]=useState<string>('');
  const [statuses, setStatuses]=useState<string[]>([]);
  const [codesState, setCodesState]=useState<ICodeMin[]>(codes);
  const [costsState, setCostsState]=useState<ICostWithoutCode[]>(costs);
  const [searchCost, setSearchCost]=useState<string>('');
  const [codeSelected, setCodeSelected]=useState<ICodeMin | null>(null);
  const [costSelected, setCostSelected]=useState<ICostWithoutCode | null>(null);
  const [message, setMessage]=useState<string | null>();

  const handleAssingCode = async () => {
    if(!codeSelected){
      setMessage('Selecciona un codigo para asignar');
      return;
    }else{
      if(!costSelected){
        setMessage('Selecciona un gasto para asignar el codigo');
        return;
      }else{
        const dataCost = {
          assignedCode:true,
          code:codeSelected.code
        }

        const dataCode = {
          assignedCode:true
        }

        const [resCost, resCode] = await Promise.all([
          UpdateCost(token, costSelected._id, dataCost),
          updateCode(token, codeSelected._id, dataCode)
        ]);

        setMessage(null);

        if(typeof(resCost) === 'string'){
          showToastMessageError(resCost);
          return;
        }

        if(typeof(resCode) === 'string'){
          showToastMessageError(resCode);
          return;
        }

        deleteCodeAndCost(codeSelected._id, costSelected._id);
        showToastMessage('Codigo asignado correctamente');
      }
    }
  }

  const handleMessage = (value: string | null) => {
    setMessage(value);
  }

  const handleDesSelectCode = () => {
    setCodeSelected(null);
  }

  const handleDesSelectCost = () => {
    setCostSelected(null);
  }

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
    const [codesfetch, costsfetch] = await Promise.all([
      // getAllCodesMINByDateANDProvider(token, dateS.toDateString(), dateE.toDateString(), arrStatuses, 'SIN ASIGNAR'), 
      // getAllCostsMINByDateANDProvider(token, dateS.toDateString(), dateE.toDateString(), arrStatuses)
      getAllCodesMINByDateANDProvider(token, getDate(dateS), getDate(dateE), arrStatuses, 'SIN ASIGNAR'), 
      getAllCostsMINByDateANDProvider(token, getDate(dateS), getDate(dateE), arrStatuses)
    ])
    
    if (typeof(codesfetch) === 'string') {
      showToastMessageError(codesfetch);
    }else{
      setCodesState(codesfetch);
    }

    if (typeof(costsfetch) === 'string') {
      showToastMessageError(costsfetch);
    }else{
      setCostsState(costsfetch);
    }
  
  }

  const deleteCodeAndCost = (idcode:string, idcost:string) => {
    const newCodes = codesState?.filter((c) => c._id !== idcode);
    setCodesState(newCodes);

    const newCosts = costsState?.filter((c) => c._id !== idcost);
    setCostsState(newCosts);
    
    handleDesSelectCode();
    handleDesSelectCost();
  }

  const handleDate = (dateI: Date, dateF: Date) => {
    handleFilter(dateI, dateF, statuses);  
  }

  const filteredCodes = search==''? codesState: codesState?.filter((p) => p?.code?.toString()?.toLowerCase()?.includes(search.toLowerCase()));

  const filteredCosts = searchCost==''? costsState: costsState?.filter((p) => p.folio?.toString()?.toLowerCase()?.includes(searchCost.toLowerCase())); 
  
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
      
      <div className="flex gap-x-5 flex-wrap lg:flex-nowrap">
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
                      ${codeSelected?._id===code._id ? 'bg-slate-400': 'bg-white'} `}
                      onClick={() => setCodeSelected(code)}
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
                  value={searchCost}
                  onChange={(e) => setSearchCost(e.target.value)} 
                  className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 
                    rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500
                    outline-0 outline-none 
                    dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                    dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={'Buscar gasto'} required ></input>
              </div>
            </div>

            {message && (
              <div className="my-1 w-full flex justify-between items-center bg-red-100 border-l-4 font-light text-sm border-red-500 text-red-700 p-2">
                {/* <p>Selecciona la factura para poder asignarle el codigo</p> */}
                <p>{message}</p>
                <XMarkIcon className="w-4 h-4 text-red-500 cursor-pointer" 
                    onClick={() => handleMessage(null)} />
              </div>
            )}

            <div className="flex items-center justify-between gap-x-3">
              {codeSelected && (
                <div className="my-1 w-full bg-green-100 flex justify-between items-center border-l-4 font-light text-sm border-green-500 text-green-700 p-2">
                  <p> {codeSelected.code} codigo por asignar </p>
                  <XMarkIcon className="w-4 h-4 text-red-500 cursor-pointer" 
                  onClick={() => handleDesSelectCode()} />
                </div>
              )}

              {!codeSelected && (<div></div>)}

              <Button onClick={() => handleAssingCode()}>Asignar codigo</Button>
              
            </div>

            <div className="relative flex flex-col text-gray-700 bg-white shadow-md w-full rounded-xl bg-clip-border h-[calc(100vh-188px)]">
              <nav className="flex w-full flex-col gap-1 p-2 font-sans text-base font-normal text-blue-gray-700
                  overflow-scroll overflow-y-auto overflow-x-hidden" style={{scrollbarColor: '#ada8a8 white', scrollbarWidth: 'thin'}}>
                {filteredCosts.map((cost) => (
                  <div role="button"
                    key={cost._id}
                    className={`flex items-center justify-between w-full p-3 leading-tight transition-all rounded-lg 
                      outline-none text-start hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 
                      focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 
                      active:bg-opacity-80 active:text-blue-gray-900 border-b border-slate-300 
                      ${costSelected?._id===cost._id ? 'bg-slate-400': 'bg-white'}`}
                    onClick={() => setCostSelected(cost)}
                  >
                    <div className="flex items-center w-full ">
                      <div className="grid mr-4 w-24 place-items-center">
                        <Chip darktext={cost.estatus.darktext?? false} width="w-10" label={cost.estatus.name.substring(0, 3)} color={cost.estatus.color} />
                        <p className="block font-sans text-sm antialiased font-normal leading-normal text-gray-600">
                          {cost?.folio}
                        </p>
                        <p className="block font-sans text-sm antialiased font-normal leading-normal text-gray-600">
                          {cost?.date?.substring(0, 10)}
                        </p>
                      </div>
                      <div className="w-full">
                        <div className="flex gap-x-3 w-full justify-between items-center p-3">
                          <h6
                            className="block font-sans text-sm antialiased font-semibold leading-relaxed tracking-normal text-gray-600 ">
                            {cost?.project?.title}
                          </h6>
                          <div className="text-right">
                            <p className="block font-sans text-2xl antialiased font-normal leading-normal text-orange-600">
                              {CurrencyFormatter({
                                currency: 'USD',
                                value: cost?.cost?.total?? 0
                              })}
                            </p>
                          </div>
                        </div>

                        <Tooltip closeDelay={0} delay={100} motionProps={propsTooltip} content={cost.description} 
                          placement="right" className="text-blue-500 bg-white rounded-md border border-slate-400">
                            <p className="block font-sans text-sm antialiased font-normal leading-normal text-gray-600">
                              {cost?.description?.substring(0, 100)}
                            </p>
                        </Tooltip>
                      </div>
                    </div>
                  </div>
                ))}
              </nav>
            </div>
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