'use client'

import { useState, useEffect } from "react"
import { showToastMessage, showToastMessageError } from "@/components/Alert";
import Table from "@/components/Table";
import { createColumnHelper } from "@tanstack/react-table";
import { CurrencyFormatter } from "@/app/functions/Globals";
import RemoveElement from "@/components/RemoveElement";
import Chip from "@/components/providers/Chip";
import { getCollectionsMin, deleteCollection, getAllTotalAmountRecoveredCollection } from "@/app/api/routeCollections";
import { ICollectionMin, ITableCollection, ITotalAmountCollections } from "@/interfaces/Collections";
import { CollectionDataToTableData } from "@/app/functions/CollectionsFunctions";
import Button from "../Button";
import SearchInTable from "../SearchInTable";
import Link from "next/link";
import { TbArrowNarrowLeft } from "react-icons/tb";
import AddNewCollectionComponent from "./AddNewCollection";
import { insertConditionInCollection } from "@/app/api/routeCollections";
import { DateRangePicker, DateRangePickerValue, } from "@tremor/react";
import { es } from "date-fns/locale"
import { Chip as ChipMui } from "@mui/material";
import ReactTableCollections from "./ReactTableCollections";
import { ITableCollectionMin } from "@/interfaces/Collections";
import { useTableStates } from "@/app/store/tableStates";

export default function NewTableCollections({token, user}: {token:string, user:string}) {

  const [collections, setCollections] = useState<ICollectionMin[]>([]);
  const [filteredCollections, setFilteredCollections] = useState<ICollectionMin[]>([]);
  const [showNewCollection, setShowNewCollection]= useState<boolean>(false);
  const [isFilter, setIsFilter]=useState<boolean>(false);
  const [showIsFilter, setShowIsFilter]=useState<boolean>(false);
  const [totalCollections, setTotalCollections]=useState<ITotalAmountCollections>();
  const [statuses, setStatuses]=useState<string[]>([]);

  const {search} = useTableStates();
  
  const [widthPage, setWidthPage] = useState<number>(900);

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

      const r = await getCollectionsMin(token);
      const rt = await getAllTotalAmountRecoveredCollection(token, '2025-01-01', '2025-12-31', data);

      const [res, rest] = await Promise.all([r, rt]);

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

  const delCollection = (id:string) => {
    showToastMessage('Cobro eliminado satisfactoriamente!!!');
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  }

  let data
  if(search.length>0){
    data=collections.filter((f) => f.reference.includes(search));
  }else{
    data=collections;
  }
  
  return (
    <>
      <div className="grid grid-cols-4 gap-x-3">
        <div className="p-3 flex gap-x-3 items-center bg-white shadow-md shadow-slate-300 rounded-md">
          <div>
            <p className="text-slate-600">Historial de cobranza</p>
          </div>
        </div>
        <Card amount={totalCollections?.amountRecovered? totalCollections.amountRecovered.amount: 0} title="Recuperado"></Card>
        <Card amount={totalCollections?.totalAccountsReceivable?.total || 0} title="Por cobrar"></Card>
        <Card amount={totalCollections?.totalCharged?.totalCharged || 0} title="Por cobrar vencido"></Card>
      </div>
      <div className="flex justify-between flex-wrap sm:flex-nowrap gap-x-5 gap-y-2 items-center mt-5">
        <div className="flex items-center w-full max-w-96">
          <Link href={'/'}>
            <div className="p-1 border border-slate-400 bg-white rounded-md">
              <TbArrowNarrowLeft className="w-9 h-9 text-slate-600" />
            </div>
          </Link>
          <p className="text-xl ml-4 font-medium">Recuperacion de cartera</p>
        </div>
        <div className={`flex gap-x-3 gap-y-3 w-full justify-end`}>
          <div className="">
            <SearchInTable placeH={"Buscar cobro.."} />
          </div>
          <div className={''}>
            <div className="flex gap-x-4 gap-y-4 justify-end items-center">
              {/* {widthPage < 1080 && filterElemnts} */}
              {/* {filterElemnts} */}
              <Button onClick={() => setShowNewCollection(true)}>Nuevo</Button>
            </div>
          </div>
        </div>
      </div>
      {/* {filterElemnts} */}
      {/* {widthPage > 1080 && filterElemnts} */}
      {/* <Table columns={columns} data={data} placeH="buscar cobro" /> */}
      {/* {rangeDate.from && rangeDate.to ? (
        <ReactTableCollections columns={columns} data={data} arrStatuses={statuses} 
          dateE={rangeDate.to} dateS={rangeDate.from} isFiter={isFilter} />
      ): (
        <ReactTableCollections columns={columns} data={data} arrStatuses={statuses} 
          dateE={new Date()} dateS={new Date()} isFiter={false} />
      )} */}
      {/* {JSON.stringify(data)} */}
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
              // onClick={() => handleProjectSel(prj._id, prj.title)}
            >
              <div className="flex items-center w-full ">
                <div className="grid mr-4 place-items-center gap-x-1 gap-y-2">
                  <div className="flex gap-x-1 items-end">
                    <img alt="responsable" src={ '/img/projects/default.svg'}
                      className="relative inline-block h-12 w-12 !rounded-full  object-cover object-center" />
                    <RemoveElement id={`${col._id}`} name={col.reference} remove={deleteCollection} 
                      removeElement={delCollection} token={token} />
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
      {/* {showNewCollection && <AddNewCollectionComponent showForm={handleShowCollection} token={token} 
                                user={user} updateCollections={updateCollections} />} */}
      {/* {showIsFilter && <FilteringCollectionsComponent FilterData={filterData} maxAmount={maxAmount} showForm={handleShowIsFilter} token={token} />} */}
    </>
  )
}

export const Card = ({amount, title}: {title:string, amount:number}) => {
  // console.log('amount => ', amount);
  // console.log('title => ', title);
  return(
    <div className="p-3 flex gap-x-3 items-center bg-white shadow-md shadow-slate-300 rounded-md">
      {/* {children} */}
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

const Toogle = ({value, onClick, id}: 
  {value:boolean, id:string, onClick: (id:string) => void}) => {

  const [checked, setChecked] = useState(value);
  
  return(
    <div className="relative inline-block w-8 h-4 rounded-full cursor-pointer">
      <input 
        // checked={row.original.confirm} 
        checked={checked}
        onClick={() => {onClick(id); setChecked(true);}} id={id} type="checkbox"
        disabled={checked}
        className="absolute w-8 h-4 transition-colors duration-300 rounded-full 
          appearance-none cursor-pointer peer bg-blue-gray-100 checked:bg-green-500 
          peer-checked:border-green-500 peer-checked:before:bg-green-500
          border border-slate-300" />
      <label htmlFor={id.toString()}
        className="before:content[''] absolute top-2/4 -left-1 h-5 w-5 -translate-y-2/4 cursor-pointer rounded-full border border-blue-gray-100 bg-white shadow-md transition-all duration-300 before:absolute before:top-2/4 before:left-2/4 before:block before:h-10 before:w-10 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity hover:before:opacity-10 peer-checked:translate-x-full peer-checked:border-green-500 peer-checked:before:bg-green-500">
        <div className="inline-block p-5 rounded-full top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4"
          data-ripple-dark="true"></div>
      </label>
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

  // const view = active? 
  //                 <ChipUi className="p-3" color="success" onClick={() => {removeStatus(id); setActive(false)}}>
  //                   {title}
  //                 </ChipUi>: 
  //                 <ChipUi color="danger" onClick={() => {addStatus(id); setActive(true)}}>{title}</ChipUi>

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
