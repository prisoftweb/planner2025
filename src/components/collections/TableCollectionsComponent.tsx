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
import { PlusCircleIcon } from "@heroicons/react/24/solid";
import { Company } from "@/interfaces/Companies";
import { getCompany } from "@/app/api/routeCompany";
import { getDate } from "@/libs/dates";
import { IPermissionsAndComponents } from "@/interfaces/Roles"

export default function TableCollectionsComponent({token, user, collectionsParam, totalParam, totalRecoveredP, company, permissions}: 
  {token:string, user:string, collectionsParam:ICollectionMin[], totalParam:ITotalAmountCollections, 
    totalRecoveredP:ITotalAmountRecoveredCollections, company:string, permissions:IPermissionsAndComponents}) {

  const [collections, setCollections] = useState<ICollectionMin[]>(collectionsParam);
  const [showNewCollection, setShowNewCollection]= useState<boolean>(false);
  // const [isFilter, setIsFilter]=useState<boolean>(false);
  const [totalCollections, setTotalCollections]=useState<ITotalAmountCollections>(totalParam);
  const [totalRecovered, setTotalRecovered]=useState<ITotalAmountRecoveredCollections>(totalRecoveredP);
  const [statuses, setStatuses]=useState<string[]>([]);

  const [satCompany, setSatCompany]=useState<Company>();

  const {search} = useTableStates();
  
  // const [widthPage, setWidthPage] = useState<number>(900);

  const [rangeDate, setRangeDate] = useState<DateRangePickerValue>({
    from: new Date(new Date().getFullYear(), 0, 1),
    to: new Date(),
  });

  useEffect(() => {
    const fetch = async () => {
      const [rescomp] = await Promise.all([
        getCompany(token, company),
      ]);
      
      if(typeof(rescomp)==='string'){
        showToastMessageError(rescomp);
      }else{
        setSatCompany(rescomp);
      }
    }

    fetch();
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
      // setIsFilter(false);
    }
  }

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

  const handleShowCollection = (value: boolean) => {
    setShowNewCollection(value);
  }

  const handleFilter = (dateS:Date, dateE:Date, arrStatuses:Array<string>) => {
    updateTotal(getDate(dateS), getDate(dateE), arrStatuses);
  }

  const updateTotal = async (dateI:string, dateF:string, arrStatuses:Array<string>) => {
    const data={
      condition:arrStatuses,
      conditionCharged:['678ed05cc5f08e8a0f36d5e1', '67d20e2959865f640af92682'],
      conditionAccountsReceivable:['67d20cb359865f640af92638'],
    }
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
      if(Array.isArray(col)){
        setCollections(col);
      }
    }

    if(typeof(rest)==='string'){
      showToastMessageError(rest);
    }else{
      setTotalCollections(rest);
    }

    if(typeof(restt)==='string'){
      showToastMessageError(restt);
    }else{
      if(Array.isArray(restt) && restt.length>0){
        setTotalRecovered(restt[0]);
      }
    }
  }

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

  let data
  if(search.length>0){
    data=collections.filter((f) => f.reference.includes(search));
  }else{
    data=collections;
  }
 
  let filterElemnts =<div className="md:flex gap-x-4 justify-end items-center mt-3 md:mt-0 xl:order-1">
                        <div className="flex gap-x-4 justify-end items-center">
                          <ChipStatus id="67e31aa81945c0b1e4c9bc76" addStatus={addStatus} removeStatus={deleteStatus} title="Depositado" />
                          <ChipStatus id="67e318171945c0b1e4c9bc72" addStatus={addStatus} removeStatus={deleteStatus} title="Confirmado" />
                          <ChipStatus id="67e318601945c0b1e4c9bc74" addStatus={addStatus} removeStatus={deleteStatus} title="Devuelto" />
                        </div>
                        <div className="flex gap-x-4 justify-end items-center">
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
      <div className="grid grid-cols-2 md:grid-cols-4 gap-x-3 gap-y-3">
        <div className="p-3 flex gap-x-3 items-center bg-white shadow-md shadow-slate-300 rounded-md">
          <div>
            <p className="text-slate-600">Historial de cobranza</p>
          </div>
        </div>
        {permissions.permission.readfull && (
          <>
            <Card amount={totalCollections?.amountRecovered? totalCollections.amountRecovered.amount: 0} title="Recuperado"></Card>
            <Card amount={totalCollections?.totalAccountsReceivable?.total || 0} title="Por cobrar"></Card>
            <Card amount={totalCollections?.totalCharged?.totalCharged || 0} title="Por cobrar vencido"></Card>
          </>
        )}
      </div>

      <div className="2xl:hidden mt-5 justify-between gap-x-2">
        <div className="flex items-center w-full">
          <Link href={'/'}>
            <TooltipContainerIcon label="Regresar">
              <div className="p-1 border border-slate-400 bg-white rounded-md hover:bg-blue-100">
                <TbArrowNarrowLeft className="w-9 h-9 text-slate-600" />
              </div>
            </TooltipContainerIcon>
          </Link>
          <p className="flex-1 text-xl ml-4 font-medium">Recuperacion de cartera</p>
          {permissions.permission.create && (
            <div className="flex flex-col items-center sm:hidden">
              <PlusCircleIcon onClick={() => setShowNewCollection(true)} className={`w-6 h-6 text-slate-700 cursor-pointer`} />
              <span className="text-xs">Nuevo</span>
            </div>
          )}
        </div>
        <div className="xl:flex lg:gap-x-3 items-center">
          <div className={`flex gap-x-3 gap-y-3 w-full justify-end mt-3 xl:order-2`}>
            <div className="flex-1 flex justify-end">
              {permissions.permission.searchfull && (
                <SearchInTable placeH={"Buscar cobro.."} />
              )}
            </div>
            {satCompany && permissions.permission.print && (
              <PDFDownloadLink document={<DownloadCollectionPDF collections={data} fechaFin={rangeDate?.to} 
                          fechaIni={rangeDate?.from} totalCollections={totalRecovered} satCompany={satCompany} />} fileName={'Cobranza'} >
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
            )}
            <div className="hidden sm:flex justify-end">
              {permissions.permission.create && (
                <Button onClick={() => setShowNewCollection(true)}>Nuevo</Button>
              )}
            </div>
          </div>
          {permissions.permission.filter && (
            filterElemnts
          )}
        </div>
      </div>

      <div className="hidden 2xl:flex justify-between flex-wrap sm:flex-nowrap gap-x-5 gap-y-2 items-center mt-5">
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
            {permissions.permission.searchfull && (
              <SearchInTable placeH={"Buscar cobro.."} />
            )}
          </div>
          <div className={''}>
            <div className="flex gap-x-4 gap-y-4 justify-end items-center">
              {permissions.permission.filter && (
                filterElemnts
              )}
              {satCompany && permissions.permission.print && (
                <PDFDownloadLink document={<DownloadCollectionPDF collections={data} fechaFin={rangeDate?.to} 
                            fechaIni={rangeDate?.from} totalCollections={totalRecovered} satCompany={satCompany} />} fileName={'Cobranza'} >
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
              )}
              {permissions.permission.create && (
                <Button onClick={() => setShowNewCollection(true)}>Nuevo</Button>
              )}
            </div>
          </div>
        </div>
      </div>
      
      <div className="relative mt-5 flex flex-col text-gray-700 bg-white shadow-md w-full rounded-xl bg-clip-border h-[calc(100vh-317px)]">
        <nav className="flex w-full flex-col gap-1 p-2 font-sans text-base font-normal text-blue-gray-700 h-[calc(100vh-317px)]
            overflow-scroll overflow-x-hidden" style={{scrollbarColor: '#ada8a8 white', scrollbarWidth: 'thin'}}>
          {data.map((col, index) => (
            <div role="button"
              key={index}
              className={`flex flex-col w-full p-3 leading-tight transition-all rounded-lg 
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
                    {permissions.permission.delete && (
                      <RemoveElement id={`${col._id}`} name={col.reference} remove={deleteCollection} 
                        removeElement={delCollection} token={token} />
                    )}
                  </div>
                  <Chip label={col.condition.name} color={col.condition.color} darktext={col?.condition?.darktext?? false} />
                  {col.condition.name.toLowerCase().includes('depositado')? (
                    <Toogle value={col.condition.name.toLowerCase().includes('confirmado')} id={col._id} onClick={confirmCollection} />
                  ): <></>}
                </div>
                <div className="w-full"
                  onClick={() => window.location.replace( `/projects/estimates/${col.invoices.project._id}/collections/${col._id}?page=collections`)}
                >
                  <div className="flex gap-x-3 justify-between items-center">
                    <div>
                      <h6
                        className="block font-sans text-xl antialiased font-semibold leading-relaxed tracking-normal text-blue-600">
                        {col.reference}
                      </h6>
                      <h6
                        className="block font-sans text-xl antialiased font-semibold leading-relaxed tracking-normal text-slate-600">
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
                </div>
              </div>

              <p className="block font-sans text-xs antialiased font-normal leading-normal text-gray-400 mt-1">
                {col.concept}
              </p>

            </div>
          ))}
        </nav>
      </div>
      
      {permissions.permission.create && (
        <ContainerSideNav width="w-full max-w-xl" open={showNewCollection}>
          <AddNewCollectionComponent showForm={handleShowCollection} token={token} 
              user={user} updateCollections={updateCollections} company={company} />
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