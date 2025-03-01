'use client'
import Button from "../Button"
import { TbArrowNarrowLeft } from "react-icons/tb"
import Link from "next/link"
import SearchInTable from "../SearchInTable"
import { GiSettingsKnobs } from "react-icons/gi"
import { IQuotationMin } from "@/interfaces/Quotations"
import { useState } from "react"
import TableQuotations from "./TableQuotations"
import { QuotationsDataToQuotationsTable } from "@/app/functions/QuotationsFunctions"
import { getQuotationsMin } from "@/app/api/routeQuotations"
import { showToastMessageError } from "../Alert"
import WithOut from "../WithOut"
import NewQuotation from "./NewQuotation"
import { UsrBack } from "@/interfaces/User"

export default function ContainerQuotations({quotations, token, user}: 
  {quotations: IQuotationMin[], token:string, user: UsrBack}) {

  const [filter, setFilter] = useState<boolean>(false);
  const [quotationsState, setQuotationsState] = useState<IQuotationMin[]>(quotations);
  const [showNewQuotation, setShowNewQuotation] = useState<boolean>(false);

  const handleShowNewQuotation = (value: boolean) => {
    setShowNewQuotation(value);
  }

  const handleFilter = (value: boolean) => {

  }

  const refreshQuatations = async() => {
    let quots: IQuotationMin[];
    try {
      quots = await getQuotationsMin(token);
      if(typeof(quots)==='string') 
        showToastMessageError(quots);
      else {
        setQuotationsState(quots);
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
          {/* <Navigation user={user} /> */}
          <div className="p-2 sm:p-3 md-p-5 lg:p-10 w-full">
            <WithOut img="/img/projects.jpg" subtitle="Cotizaciones"
              text="Agregar una cotizacion para asignar
                      luego en proyectos de la empresa"
              title="Cotizaciones ">
                <Button onClick={() => setShowNewQuotation(true)}>Nueva</Button>
            </WithOut>
          </div>
        </>
      )
    }

  // const [maxAmount, setMaxAmount] = useState<number>(0);
  
  // useEffect(() => {
  //   const projectM = projects.reduce((previous, current) => {
  //     return current.amount > previous.amount ? current : previous;
  //   });
  //   setMaxAmount(projectM.amount);
  // }, [])

  // const [filteredProjects, setFilteredProjects] = useState<ProjectMin[]>(projects);

  // const dateValidation = (date:string, startDate:number, endDate:number) => {
  //   let d = new Date(date).getTime();
  //   if(d >= startDate && d <= endDate){
  //     return true;
  //   }
  //   return false;
  // }

  // const amountValidation = (project:ProjectMin, startDate:number, endDate:number, 
  //       minAmount:number, maxAmount:number) => {
  //   if(project.amount >= minAmount && project.amount <= maxAmount){
  //     if(dateValidation(project.date, startDate, endDate)){
  //       return true;
  //     }
  //   }
  //   return false;
  // }

  // const categoriesValidation = (project:ProjectMin, startDate:number, endDate:number, 
  //           minAmount:number, maxAmount:number, categories:string[]) => {
  //   if(categories.includes('all')){
  //     if(amountValidation(project, startDate, endDate, minAmount, maxAmount))
  //       return true
  //     return false;
  //   }else{
  //     if(project.segment)
  //       if(categories.includes(project.segment._id))
  //         if(amountValidation(project, startDate, endDate, minAmount, maxAmount))
  //           return true
  //     return false;
  //   }
  // }

  // const typesValidation = (project:ProjectMin, startDate:number, endDate:number, 
  //   minAmount:number, maxAmount:number, categories:string[], types:string[]) => {
  //   if(types.includes('all')){
  //     if(categoriesValidation(project, startDate, endDate, minAmount, maxAmount, categories))
  //       return true;
  //     return false;
  //   }else{
  //     if(project.type)
  //       if(types.includes(project.type._id))
  //         if(categoriesValidation(project, startDate, endDate, minAmount, maxAmount, categories))
  //           return true;
  //     return false;
  //   }
  // }

  // const conditionsValidation = (project:ProjectMin, startDate:number, endDate:number, 
  //       minAmount:number, maxAmount:number, categories:string[], 
  //       types:string[], conditions:string[]) => {
  //   if(conditions.includes('all')){
  //     if(typesValidation(project, startDate, endDate, minAmount, maxAmount, categories, types))
  //       return true;
  //     return false;
  //   }else{
  //     if(conditions.includes(project.category._id))
  //       if(typesValidation(project, startDate, endDate, minAmount, maxAmount, categories, types))
  //         return true;
  //     return false;
  //   }
  // }

  // const filterData = (conditions:string[], types:string[], 
  //   categories:string[], minAmount:number, maxAmount:number, startDate:number, endDate:number) => {
  
  //   let filtered: ProjectMin[] = [];
  //   if(isHistory){
  //     projects.map((project) => {
  //       if(conditionsValidation(project, startDate, endDate, minAmount, maxAmount, categories, types, conditions)){
  //         filtered.push(project);
  //       }
  //     });
  //   }else{
  //     projectStore.map((project) => {
  //       if(conditionsValidation(project, startDate, endDate, minAmount, maxAmount, categories, types, conditions)){
  //         filtered.push(project);
  //       }
  //     });
  //   }
  //   setFilteredProjects(filtered);
  //   setDataProjects(ProjectDataToTableDataMin(filtered));
  //   setFilter(true);
  // }

  const quotationsData = QuotationsDataToQuotationsTable(quotationsState);

  return (
    <>
      <div className="flex gap-y-3 gap-x-5 justify-between items-center flex-wrap md:flex-nowrap">
        <div className="flex items-center">
          <Link href={'/'}>
            <div className="p-1 border border-slate-400 bg-white rounded-md">
              <TbArrowNarrowLeft className="w-9 h-9 text-slate-600" />
            </div>
          </Link>
          <p className="text-xl ml-4 font-medium">Cotizaciones</p>
        </div>
        <div className="flex w-full gap-x-3 gap-y-3 flex-wrap-reverse sm:flex-nowrap justify-end">
          <SearchInTable placeH="Buscar proyecto.." />
          <div>
            <div className="flex gap-x-3 items-center">
              <GiSettingsKnobs onClick={() => handleFilter(true)}
                className="text-slate-600 w-8 h-8 cursor-pointer hover:text-slate-300"
              />
              <Button onClick={() => setShowNewQuotation(true)}>Nueva</Button>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-5">
        <TableQuotations quotationsData={quotationsData} token={token} deleteQuatation={deleteQuatation} />
      </div>
      {showNewQuotation && <NewQuotation showForm={handleShowNewQuotation} token={token} usr={user._id} 
              updateQuotations={refreshQuatations} />}
    </>
  )
}
