'use client'

import { useState, useEffect } from "react"
import { showToastMessageError } from "@/components/Alert";
import { CurrencyFormatter } from "@/app/functions/Globals";
import Chip from "@/components/providers/Chip";
import { getCollectionsMin, getAllTotalAmountRecoveredCollection } from "@/app/api/routeCollections";
import { ICollectionMin, ITotalAmountCollections } from "@/interfaces/Collections";
import SearchInTable from "../SearchInTable";
import Link from "next/link";
import { TbArrowNarrowLeft } from "react-icons/tb";
import { DateRangePicker, DateRangePickerValue, } from "@tremor/react";
import { es } from "date-fns/locale"
import { Chip as ChipMui } from "@mui/material";
import { useTableStates } from "@/app/store/tableStates";
import TooltipContainerIcon from "../tooltipIcons/TooltipContainerIcon";

export default function TableHistoryCollectionsComponent({token, user}: {token:string, user:string}) {

  const [collections, setCollections] = useState<ICollectionMin[]>([]);
  const [filteredCollections, setFilteredCollections] = useState<ICollectionMin[]>([]);
  const [isFilter, setIsFilter]=useState<boolean>(false);
  const [totalCollections, setTotalCollections]=useState<ITotalAmountCollections>();
  const [statuses, setStatuses]=useState<string[]>([]);
  
  const [widthPage, setWidthPage] = useState<number>(900);
  const {search} = useTableStates();

  const [rangeDate, setRangeDate] = useState<DateRangePickerValue>({
    from: new Date('2024-01-02'),
    to: new Date('2024-10-30'),
  });

  const handleResize = () => {
    setWidthPage(Math.max(
      document.body.scrollHeight, document.documentElement.scrollHeight,
      document.body.offsetHeight, document.documentElement.offsetHeight,
      document.body.clientHeight, document.documentElement.clientHeight
    ));
  }

  useEffect(() => {
    window.addEventListener("resize", handleResize, false);
    setWidthPage(Math.max(
      document.body.scrollWidth, document.documentElement.scrollWidth,
      document.body.offsetWidth, document.documentElement.offsetWidth,
      document.body.clientWidth, document.documentElement.clientWidth
    ));
    return () => window.removeEventListener('scroll', handleResize);
  }, []);

  useEffect(() => {
    const fetch = async() => {
      const data={
        condition: [],
        conditionCharged:['678ed05cc5f08e8a0f36d5e1', '67d20e2959865f640af92682'],
        conditionAccountsReceivable:['67d20cb359865f640af92638'],
      }

      const [res, rest] = await Promise.all([
        getCollectionsMin(token),
        getAllTotalAmountRecoveredCollection(token, '2025-01-01', '2025-12-31', data)
      ])
      
      if(typeof(res)==='string'){
        showToastMessageError(res);
      }else{
        setCollections(res);
        setFilteredCollections(res);
      }
      
      if(typeof(rest)==='string'){
        showToastMessageError(rest);
      }else{
        setTotalCollections(rest);
      }
    }

    fetch();
  }, []);

  const handleDate = (dateI: Date, dateF: Date) => {
    handleFilter(dateI, dateF, statuses);
  }

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

  const handleFilter = (dateS:Date, dateE:Date, arrStatuses:Array<string>) => {
    let statusesFil;
    if(arrStatuses.length > 0){
      statusesFil = collections.filter((c) => arrStatuses.includes(c.condition._id));
    }else{
      statusesFil = collections;
    }

    const filtered = statusesFil.filter((c) => {
      let d = new Date(c.date).getTime();
      if(d >= dateS.getTime() && d <= dateE.getTime()){
        return c;
      }
    });

    setFilteredCollections(filtered);
    setIsFilter(true);
    updateTotal(getDate(dateS), getDate(dateE));
  }

  const updateTotal = async (dateI:string, dateF:string) => {
    const data={
        condition: statuses,
        conditionCharged:['678ed05cc5f08e8a0f36d5e1', '67d20e2959865f640af92682'],
        conditionAccountsReceivable:['67d20cb359865f640af92638'],
      }
    const rest = await getAllTotalAmountRecoveredCollection(token, dateI, dateF, data);
    if(typeof(rest)==='string'){
      showToastMessageError(rest);
    }else{
      setTotalCollections(rest);
    }
  }

  if(collections.length <= 0){
    return (
      <>
        <div className="flex flex-col items-center">
          <p className="text-5xl mt-20 font-bold">Cobranza</p>
          <p className="text-xl mt-10 text-slate-700 font-bold" 
            >Gestiona las cuentas por cobrar,
            recuperacion de cobranza y mas
            desde Planner</p>
          <img src="/img/estimates/invoices.svg" alt="image" className="w-60 h-auto" />
        </div>
      </>
    )
  }

  let data
  if(isFilter){
    if(search.length>0){
      data=filteredCollections.filter((f) => f.reference.includes(search));
    }else{
      data=filteredCollections;
    }
  }else{
    if(search.length>0){
      data=collections.filter((f) => f.reference.includes(search));
    }else{
      data=collections;
    }
  }
  
  let filterElemnts = <div className="flex gap-x-4 justify-end items-center">
                <ChipStatus id="67e31aa81945c0b1e4c9bc76" addStatus={addStatus} removeStatus={deleteStatus} title="Depositado" />
                <ChipStatus id="67e318171945c0b1e4c9bc72" addStatus={addStatus} removeStatus={deleteStatus} title="Confirmado" />
                <ChipStatus id="67e318601945c0b1e4c9bc74" addStatus={addStatus} removeStatus={deleteStatus} title="Devuelto" />
                <div>
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
              </div>

  return (
    <>
      <div className="grid grid-cols-4 gap-x-3">
        <div className="p-3 flex gap-x-3 items-center bg-white shadow-md shadow-slate-300 rounded-md">
          <div>
            <p className="text-slate-600">Historial de cobranza</p>
          </div>
        </div>
        <Card amount={totalCollections?.amountRecovered?.amount || 0} title="Recuperado"></Card>
        <Card amount={totalCollections?.totalAccountsReceivable?.total || 0} title="Por cobrar"></Card>
        <Card amount={totalCollections?.totalCharged?.totalCharged || 0} title="Por cobrar vencido"></Card>
      </div>
      <div className="flex justify-between flex-wrap sm:flex-nowrap gap-x-5 gap-y-2 items-center mt-5">
        <div className="flex items-center w-full max-w-96">
          <Link href={'/'}>
            <TooltipContainerIcon label="Regresar">
              <div className="p-1 border border-slate-400 bg-white rounded-md hover:bg-blue-100">
                <TbArrowNarrowLeft className="w-9 h-9 text-slate-600" />
              </div>
            </TooltipContainerIcon>
          </Link>
          <p className="text-xl ml-4 font-medium">Historial de recuperacion de cartera</p>
        </div>
        <div className={`flex gap-x-3 gap-y-3 w-full justify-end`}>
          <div className="">
            <SearchInTable placeH={"Buscar cobro.."} />
          </div>
        </div>
      </div>
      {widthPage > 1080 && filterElemnts}
      <div className="relative flex flex-col text-gray-700 bg-white shadow-md w-full rounded-xl bg-clip-border">
        <nav className="flex w-full flex-col gap-1 p-2 font-sans text-base font-normal text-blue-gray-700 h-96
            overflow-scroll overflow-x-hidden" style={{scrollbarColor: '#ada8a8 white', scrollbarWidth: 'thin'}}>
          {data.map((col, index) => (
            <div role="button"
              key={index}
              className={`flex items-center justify-between w-full p-3 leading-tight transition-all rounded-lg 
                outline-none text-start hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 
                focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 
                active:bg-opacity-80 active:text-blue-gray-900 border-b border-slate-300 
                bg-white`}
            >
              <div className="flex items-center w-full ">
                <div className="grid mr-4 place-items-center gap-x-1 gap-y-2">
                  <div className="flex gap-x-1 items-end">
                    <img alt="responsable" src={ '/img/projects/default.svg'}
                      className="relative inline-block h-12 w-12 !rounded-full  object-cover object-center" />
                  </div>
                  <Chip label={col.condition.name} color={col.condition.color} darktext={col.condition?.darktext?? false} />
                </div>
                <div className="w-full">
                  <div className="flex gap-x-3 justify-between items-center">
                    <div>
                      <h6
                        className="block font-sans text-xl antialiased font-semibold leading-relaxed tracking-normal text-blue-600">
                        {col.reference}
                      </h6>
                      <h6
                        className="block font-sans text-xl antialiased font-semibold leading-relaxed tracking-normal text-slate-600">
                        Factura #
                      </h6>
                    </div>
                    <div>
                      <h6
                        className="block font-sans text-xl antialiased font-semibold leading-relaxed tracking-normal text-blue-600">
                        {CurrencyFormatter({
                          currency: 'MXN',
                          value: col.amount
                        })}
                      </h6>
                      <h6
                        className="block font-sans text-xl antialiased font-semibold leading-relaxed tracking-normal text-slate-600">
                        {col.date.substring(0, 10)}
                      </h6>
                    </div>
                  </div>
                  <p className="block font-sans text-xs antialiased font-normal leading-normal text-gray-400">
                    {col.concept}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </nav>
      </div>
    </>
  )
}

export const Card = ({amount, title}: {title:string, amount:number}) => {
  return(
    <div className="p-3 flex gap-x-3 items-center bg-white shadow-md shadow-slate-300 rounded-md">
      <div>
        <p className="text-slate-600">{title}</p>
        <p className="text-xl font-bold">{CurrencyFormatter({
          currency: 'MXN',
          value: amount
        })}</p>
      </div>
    </div>
  )
}

function getDate(date: Date){
  let day = date.getDate()
  let month = date.getMonth() + 1
  let year = date.getFullYear()

  if(month < 10){
    return `${year}-0${month}-${day}`;
  }else{
    return `${year}-${month}-${day}`;
  }
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