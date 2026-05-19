'use client'
import Button from "../Button"
import { TbArrowNarrowLeft } from "react-icons/tb"
import Link from "next/link"
import SearchInTable from "../SearchInTable"
import { IQuotationMin } from "@/interfaces/Quotations"
import { useState, useEffect, useRef } from "react"
import TableQuotations from "./TableQuotations"
import { QuotationsDataToQuotationsTable } from "@/app/functions/QuotationsFunctions"
import { getQuotationsMin, getQuotationsByUserMin } from "@/app/api/routeQuotations"
import { showToastMessageError } from "../Alert"
import WithOut from "../WithOut"
import NewQuotation from "./NewQuotation"
import { UsrBack } from "@/interfaces/User"
import FilteringQuatations from "./FilteringQuatations"

import { useOptionsQuotations } from "@/app/store/QuotationStates"
import { getCatalogsByNameAndCategory, getCatalogsByNameAndType, getCatalogsByNameAndCondition } from "@/app/api/routeCatalogs"
import { GetVatsLV } from "@/app/api/routeCost"
import { getUsersLV } from "@/app/api/routeUser"
import { getClientsLV } from "@/app/api/routeClients"
import { Options } from "@/interfaces/Common"
import TooltipContainerIcon from "../tooltipIcons/TooltipContainerIcon"
import TooltipFilterIcon from "../tooltipIcons/TooltipFilterIcon"

export default function ContainerQuotations({quotations, token, user, isByUser=false, company}: 
  {quotations: IQuotationMin[], token:string, user: UsrBack, isByUser?: boolean, company:string}) {

  const [filter, setFilter] = useState<boolean>(false);
  const [showFilter, setShowFilter]=useState<boolean>(false);
  const [quotationsState, setQuotationsState] = useState<IQuotationMin[]>(quotations);
  const [quotationsfiltered, setQuotationsFiltered] = useState<IQuotationMin[]>(quotations);
  const [showNewQuotation, setShowNewQuotation] = useState<boolean>(false);
  const [maxAmount, setMaxAmount] = useState<number>(0);

  const fetchRef=useRef(false);

  const {updateCategories, updateClients, updateConditions, updateTypes, 
    updateUsers, updateVats, optCategories, optClients, optTypes, optUsers, optVats, optConditions } = useOptionsQuotations();

  const handleShowNewQuotation = (value: boolean) => {
    setShowNewQuotation(value);
  }

  const handleShowFilter = (value: boolean) => {
    setShowFilter(value);
  }

  useEffect(() => {
    if(quotations.length > 0){
      const projectM = quotations.reduce((previous, current) => {
        return current.cost.total > previous.cost.total ? current : previous;
      });
      setMaxAmount(projectM.cost.total);
    }else{
      setMaxAmount(0);
    }

    const fetchData = async () => {
      const res = await getClientsLV(token);
      if(typeof(res)==='string'){
        showToastMessageError(res);
        fetchRef.current=false;
      }else{
        updateClients(res);
      }

      const cons = await getCatalogsByNameAndCondition(token, 'Quotations');
      if(typeof(cons)==='string'){
        fetchRef.current=false;
        showToastMessageError(cons);
      }else{
        updateConditions(cons);
      }

      const opUs: Options[] = await getUsersLV(token);
      if(typeof(opUs)==='string'){
        fetchRef.current=false;
        showToastMessageError(opUs);
      }else{
        updateUsers(opUs);
      }

      const opVat: Options[] = await GetVatsLV(token);
      if(typeof(opVat)==='string'){
        showToastMessageError(opVat);
      }else{
        updateVats(opVat);
      }

      const opCats: Options[] = await getCatalogsByNameAndCategory(token, 'Quotations');
      if(typeof(opCats)==='string'){
        showToastMessageError(opCats);
      }else{
        updateCategories(opCats);
      }
      
      const opTyps: Options[] = await getCatalogsByNameAndType(token, 'Quotations');
      if(typeof(opTyps)==='string'){
        showToastMessageError(opTyps);
      }else{
        updateTypes(opTyps);
      }
    }
    fetchData();
  }, [])

  const refreshQuatations = async() => {
    let quots: IQuotationMin[];
    try {
      if(isByUser){
        quots = await getQuotationsByUserMin(token, user._id);
      }else{
        quots = await getQuotationsMin(token);
      }
      if(typeof(quots)==='string') 
        showToastMessageError(quots);
      else {
        setQuotationsState(quots);
        setFilter(false);
      }
    } catch (error) {
      return <h1>Error al consultar los proyectos!!</h1>
    }
  }

  const deleteQuatation = (id: string) => {
    const fil = quotationsState.filter((q) => q._id !== id);
    setQuotationsState(fil);
  }

  if(quotationsState.length <= 0 ){
      return (
        <>
          <div className="p-2 sm:p-3 md-p-5 lg:p-10 w-full">
            <WithOut img="/img/projects.jpg" subtitle="Cotizaciones"
              text="Agregar una cotizacion para asignar
                      luego en proyectos de la empresa"
              title="Cotizaciones ">
                <Button onClick={() => setShowNewQuotation(true)}>Nueva</Button>
            </WithOut>
          </div>
          {showNewQuotation && <NewQuotation showForm={handleShowNewQuotation} token={token} usr={user._id} 
              updateQuotations={refreshQuatations} showSideNav={showNewQuotation} company={company} />}
        </>
      )
    }

  const dateValidation = (date:string, startDate:number, endDate:number) => {
    let d = new Date(date).getTime();
    if(d >= startDate && d <= endDate){
      return true;
    }
    return false;
  }

  const amountValidation = (quatation:IQuotationMin, startDate:number, endDate:number, 
        minAmount:number, maxAmount:number) => {
    if(quatation.cost.total >= minAmount && quatation.cost.total <= maxAmount){
      if(dateValidation(quatation.applicationdate, startDate, endDate)){
        return true;
      }
    }
    return false;
  }

  const clientsValidation = (quatation:IQuotationMin, startDate:number, endDate:number, 
    minAmount:number, maxAmount:number, clients:string[]) => {
    if(clients.includes('all')){
      if(amountValidation(quatation, startDate, endDate, minAmount, maxAmount))
        return true;
      return false;
    }else{
      if(quatation.client)
        if(clients.includes(quatation.client._id))
          if(amountValidation(quatation, startDate, endDate, minAmount, maxAmount))
            return true;
      return false;
    }
  }

  const conditionsValidation = (quatation:IQuotationMin, startDate:number, endDate:number, 
        minAmount:number, maxAmount:number, clients:string[], conditions:string[]) => {
    if(conditions.includes('all')){
      if(clientsValidation(quatation, startDate, endDate, minAmount, maxAmount, clients))
        return true;
      return false;
    }else{
      if(conditions.includes(quatation.condition[0]._id))
        if(clientsValidation(quatation, startDate, endDate, minAmount, maxAmount, clients))
          return true;
      return false;
    }
  }

  const filterData = (conditions:string[], clients:string[], minAmount:number, maxAmount:number, 
    startDate:number, endDate:number) => {
  
    let filtered: IQuotationMin[] = [];
    quotationsState.map((quatation) => {
      if(conditionsValidation(quatation, startDate, endDate, minAmount, maxAmount, clients, conditions)){
        filtered.push(quatation);
      }
    });
    setQuotationsFiltered(filtered);
    setFilter(true);
  }

  const quotationsData = QuotationsDataToQuotationsTable(filter? quotationsfiltered: quotationsState);

  return (
    <>
      <div className="flex gap-y-3 gap-x-5 justify-between items-center flex-wrap md:flex-nowrap">
        <div className="flex items-center w-full">
          <Link href={'/'}>
            <TooltipContainerIcon label="Regresar">
              <div className="p-1 border border-slate-400 bg-white rounded-md hover:bg-blue-100">
                <TbArrowNarrowLeft className="w-10 h-10 text-slate-600" />
              </div>
            </TooltipContainerIcon>
          </Link>
          <p className="text-xl ml-4 font-medium">Cotizaciones</p>
          
          <div className="flex flex-1 justify-end sm:hidden gap-x-3 items-center ">
            <TooltipFilterIcon handleFilter={handleShowFilter} />
            <Button onClick={() => setShowNewQuotation(true)}>Nueva</Button>
          </div>
        </div>
        <div className="flex w-full gap-x-3 gap-y-3 flex-wrap-reverse sm:flex-nowrap justify-end">
          <SearchInTable placeH="Buscar cotizacion.." />
          <div className="hidden sm:flex gap-x-3 items-center ">
            <TooltipFilterIcon handleFilter={handleShowFilter} />
            <Button onClick={() => setShowNewQuotation(true)}>Nueva</Button>
          </div>
        </div>
      </div>
      <div className="mt-5">
        <TableQuotations quotationsData={quotationsData} token={token} deleteQuatation={deleteQuatation} />
      </div>
      {/* {showNewQuotation && optCategories.length> 0 && optClients.length> 0 && optTypes.length > 0 && 
          optUsers.length > 0 && optVats.length > 0 && <NewQuotation showForm={handleShowNewQuotation} 
            token={token} usr={user._id} updateQuotations={refreshQuatations} />} */}
      {optCategories.length> 0 && optClients.length> 0 && optTypes.length > 0 && 
          optUsers.length > 0 && optVats.length > 0 && <NewQuotation showForm={handleShowNewQuotation} company={company} 
            token={token} usr={user._id} updateQuotations={refreshQuatations} showSideNav={showNewQuotation} />}
      {showFilter && optClients && optConditions && <FilteringQuatations FilterData={filterData} maxAmount={maxAmount} 
                    showForm={handleShowFilter} />}
    </>
  )
}
