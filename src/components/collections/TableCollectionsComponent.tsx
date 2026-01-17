'use client'

import { useState, useEffect } from "react"
import { showToastMessage, showToastMessageError } from "@/components/Alert";
import { CurrencyFormatter } from "@/app/functions/Globals";
import RemoveElement from "@/components/RemoveElement";
import Chip from "@/components/providers/Chip";
import { getCollectionsMin, deleteCollection, getAllTotalAmountRecoveredCollection, 
  getAllTOTAmountRecoveredByDateAndCondition, getAllCollectionsMINByDateAndCondition } from "@/app/api/routeCollections";
import { ICollectionMin, ITotalAmountCollections, ITotalAmountRecoveredCollections } from "@/interfaces/Collections";
import Button from "../Button";
import SearchInTable from "../SearchInTable";
import Link from "next/link";
import { TbArrowNarrowLeft } from "react-icons/tb";
import AddNewCollectionComponent from "./AddNewCollection";
import { insertConditionInCollection } from "@/app/api/routeCollections";
import { DateRangePicker, DateRangePickerValue, } from "@tremor/react";
import { es } from "date-fns/locale"
import { Chip as ChipMui } from "@mui/material";
import { useTableStates } from "@/app/store/tableStates";
import TooltipContainerIcon from "../tooltipIcons/TooltipContainerIcon";
import ContainerSideNav from "../ContainerSideNav";

import { PDFDownloadLink } from "@react-pdf/renderer"
import {Tooltip} from "@nextui-org/react";
import { BsFileEarmarkPdf } from "react-icons/bs";
import { propsTooltip } from "@/libs/animations";
import DownloadCollectionPDF from "./DownloadCollectionPDF";

export default function TableCollectionsComponent({token, user, collectionsParam, totalParam, totalRecoveredP}: 
  {token:string, user:string, collectionsParam:ICollectionMin[], totalParam:ITotalAmountCollections, 
    totalRecoveredP:ITotalAmountRecoveredCollections}) {

  const [collections, setCollections] = useState<ICollectionMin[]>(collectionsParam);
  const [filteredCollections, setFilteredCollections] = useState<ICollectionMin[]>([]);
  const [showNewCollection, setShowNewCollection]= useState<boolean>(false);
  const [isFilter, setIsFilter]=useState<boolean>(false);
  const [totalCollections, setTotalCollections]=useState<ITotalAmountCollections>(totalParam);
  const [totalRecovered, setTotalRecovered]=useState<ITotalAmountRecoveredCollections>(totalRecoveredP);
  const [statuses, setStatuses]=useState<string[]>([]);

  const {search} = useTableStates();
  
  const [widthPage, setWidthPage] = useState<number>(900);

  const [rangeDate, setRangeDate] = useState<DateRangePickerValue>({
    from: new Date(new Date().getFullYear(), 0, 1),
    to: new Date(),
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
    handleFilter(rangeDate.from!, rangeDate.to!, statuses);
  }, []);

  const updateCollections = async() => {
    const res = await getCollectionsMin(token);
    if(typeof(res)==='string'){
      showToastMessageError(res);
    }else{
      setCollections(res);
      setIsFilter(false);
    }
  }

  const handleDate = (dateI: Date, dateF: Date) => {
    handleFilter(dateI, dateF, statuses);
  }

  const addStatus = (status:string) => {
    const newStatus = [...statuses, status];
    setStatuses(newStatus);
    if(rangeDate.from && rangeDate.to){
      console.log('add status');
      handleFilter(rangeDate.from, rangeDate.to, newStatus);
    }else{
      console.log('error add =>');
      showToastMessageError('Seleccione un rango de fechas para filtrar');
    }
  }

  const deleteStatus = (status:string) => {
    const newStatus = statuses.filter((s) => s !== status);
    setStatuses(newStatus);
    if(rangeDate.from && rangeDate.to){
      console.log('filter delete');
      handleFilter(rangeDate.from, rangeDate.to, newStatus);
    }else{
      console.log('error delete => ');
      showToastMessageError('Seleccione un rango de fechas para filtrar');
    }
  }

  const handleShowCollection = (value: boolean) => {
    setShowNewCollection(value);
  }

  const handleFilter = (dateS:Date, dateE:Date, arrStatuses:Array<string>) => {
    // let statusesFil;
    // if(arrStatuses.length > 0){
    //   statusesFil = collections.filter((c) => arrStatuses.includes(c.condition._id));
    // }else{
    //   statusesFil = collections;
    // }

    // const filtered = statusesFil.filter((c) => {
    //   let d = new Date(c.date).getTime();
    //   if(d >= dateS.getTime() && d <= dateE.getTime()){
    //     return c;
    //   }
    // });

    // setFilteredCollections(filtered);
    // setIsFilter(true);
    updateTotal(getDate(dateS), getDate(dateE), arrStatuses);
  }

  const updateTotal = async (dateI:string, dateF:string, arrStatuses:Array<string>) => {
    const data={
      // condition: statuses,
      condition:arrStatuses,
      conditionCharged:['678ed05cc5f08e8a0f36d5e1', '67d20e2959865f640af92682'],
      conditionAccountsReceivable:['67d20cb359865f640af92638'],
    }
    // const rest = await getAllTotalAmountRecoveredCollection(token, dateI, dateF, data);
    const [col,rest, restt]= await Promise.all([
      getAllCollectionsMINByDateAndCondition(token, dateI, dateF, {
          "condition": arrStatuses
      }),
      getAllTotalAmountRecoveredCollection(token, dateI, dateF, data),
      getAllTOTAmountRecoveredByDateAndCondition(token, dateI, dateF, arrStatuses),
    ]);
    if(typeof(col)==='string'){
      showToastMessageError(col);
    }else{
      // console.log('cols => ', col);
      setCollections(col);
    }

    if(typeof(rest)==='string'){
      showToastMessageError(rest);
    }else{
      // console.log('rest => ', rest);
      setTotalCollections(rest);
    }

    if(typeof(restt)==='string'){
      showToastMessageError(restt);
    }else{
      // console.log('restt => ', restt);
      setTotalRecovered(restt[0]);
    }
  }

  // if(collections?.length <= 0){
  //   return (
  //     <>
  //       <div className="flex flex-col items-center">
  //         <p className="text-5xl mt-20 font-bold">Cobranza</p>
  //         <p className="text-xl mt-10 text-slate-700 font-bold" 
  //           >Gestiona las cuentas por cobrar,
  //           recuperacion de cobranza y mas
  //           desde Planner</p>
  //         <img src="/img/estimates/invoices.svg" alt="image" className="w-60 h-auto" />
  //       </div>
  //     </>
  //   )
  // }

  const delCollection = (id:string) => {
    showToastMessage('Cobro eliminado satisfactoriamente!!!');
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  }

  const confirmCollection = async( id: string) => {
    const data = {
      condition: [
        {
          glossary: "67e318171945c0b1e4c9bc72",
          user
        }
      ]
    }
    const res = await insertConditionInCollection(token, data, id);
    if(typeof(res)==='string'){
      showToastMessageError(res);
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    }else{
      showToastMessage('Cobro actualizado satisfactoriamente!!!');
      updateCollections();
    }
  }

  // let data
  // if(isFilter){
  //   if(search.length>0){
  //     data=filteredCollections.filter((f) => f.reference.includes(search));
  //   }else{
  //     data=filteredCollections;
  //   }
  // }else{
  //   if(search.length>0){
  //     data=collections.filter((f) => f.reference.includes(search));
  //   }else{
  //     data=collections;
  //   }
  // }

  let data
  if(search.length>0){
    data=collections.filter((f) => f.reference.includes(search));
  }else{
    data=collections;
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
        <Card amount={totalCollections?.amountRecovered? totalCollections.amountRecovered.amount: 0} title="Recuperado"></Card>
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
          <p className="text-xl ml-4 font-medium">Recuperacion de cartera</p>
        </div>
        <div className={`flex gap-x-3 gap-y-3 w-full justify-end`}>
          <div className="">
            <SearchInTable placeH={"Buscar cobro.."} />
          </div>
          <div className={''}>
            <div className="flex gap-x-4 gap-y-4 justify-end items-center">
              {widthPage < 1080 && filterElemnts}
              <PDFDownloadLink document={<DownloadCollectionPDF collections={data} fechaFin={rangeDate?.to} 
                          fechaIni={rangeDate?.from} totalCollections={totalRecovered} />} fileName={'Cobranza'} >
                {({loading, url, error, blob}) => 
                  loading? (
                    <Tooltip closeDelay={0} delay={100} motionProps={propsTooltip} content='Informe' 
                        placement="right" className="text-blue-500 bg-white rounded-md border border-slate-400">
                      <BsFileEarmarkPdf className="w-8 h-8 text-slate-500" />
                    </Tooltip>
                  ) : (
                    <Tooltip closeDelay={0} delay={100} motionProps={propsTooltip} content='Informe' 
                        placement="right" className="text-blue-500 bg-white rounded-md border border-slate-400">
                      <BsFileEarmarkPdf className="w-8 h-8 text-green-500" />
                    </Tooltip>
                  ) }
              </PDFDownloadLink>
              <Button onClick={() => setShowNewCollection(true)}>Nuevo</Button>
            </div>
          </div>
        </div>
      </div>
      {widthPage > 1080 && filterElemnts}
      
      <div className="relative flex flex-col text-gray-700 bg-white shadow-md w-full rounded-xl bg-clip-border h-[calc(100vh-317px)]">
        <nav className="flex w-full flex-col gap-1 p-2 font-sans text-base font-normal text-blue-gray-700 h-[calc(100vh-317px)]
            overflow-scroll overflow-x-hidden" style={{scrollbarColor: '#ada8a8 white', scrollbarWidth: 'thin'}}>
          {data.map((col, index) => (
            <div role="button"
              key={index}
              className={`flex items-center justify-between w-full p-3 leading-tight transition-all rounded-lg 
                outline-none text-start hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 
                focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 
                active:bg-opacity-80 active:text-blue-gray-900 border-b border-slate-300 
                bg-white`}
              onClick={() => window.location.replace( `/projects/estimates/${col.invoices.project._id}/collections/${col._id}?page=collections`)}
            >
              <div className="flex items-center w-full ">
                <div className="grid mr-4 place-items-center gap-x-1 gap-y-2">
                  <div className="flex gap-x-1 items-end">
                    <img alt="responsable" src={ '/img/projects/default.svg'}
                      className="relative inline-block h-12 w-12 !rounded-full  object-cover object-center" />
                    <RemoveElement id={`${col._id}`} name={col.reference} remove={deleteCollection} 
                      removeElement={delCollection} token={token} />
                  </div>
                  <Chip label={col.condition.name} color={col.condition.color} darktext={col?.condition?.darktext?? false} />
                  {col.condition.name.toLowerCase().includes('depositado')? (
                    <Toogle value={col.condition.name.toLowerCase().includes('confirmado')} id={col._id} onClick={confirmCollection} />
                  ): <></>}
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
      {showNewCollection && (
        <ContainerSideNav width="w-full max-w-xl">
          <AddNewCollectionComponent showForm={handleShowCollection} token={token} 
                                user={user} updateCollections={updateCollections} />
        </ContainerSideNav>
      )}
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

const Toogle = ({value, onClick, id}: 
  {value:boolean, id:string, onClick: (id:string) => void}) => {

  const [checked, setChecked] = useState(value);
  
  return(
    <div className="relative inline-block w-8 h-4 rounded-full cursor-pointer">
      <input 
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