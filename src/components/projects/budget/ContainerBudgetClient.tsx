'use client'
//import Header from "../Header"
// import ButtonNew from "./ButtonNew"
import ButtonNewBudgetProject from "./ButtonNewBudgetProject"
import TableBudgetProjects from "./TableBudgetProjects"
import { useState, useEffect } from "react"
import { Options } from "@/interfaces/Common"
import { ProjectsBudgetTable, ProjectMin } from "@/interfaces/Projects"
import { GiSettingsKnobs } from "react-icons/gi"
import { VscListUnordered } from "react-icons/vsc";
import { PiTableThin } from "react-icons/pi";
import Link from "next/link"
import { TbArrowNarrowLeft } from "react-icons/tb"
import SearchInTable from "@/components/SearchInTable"
import { useProjectsStore } from "@/app/store/projectsStore"

import WithOut from "@/components/WithOut"
import { UsrBack } from "@/interfaces/User"
import { showToastMessageError } from "@/components/Alert"
import { ProjectBudgetDataToTableDataMin } from "@/app/functions/SaveProject"
import { getProjectsMin } from "@/app/api/routeProjects"
import { CostoCenterLV } from "@/interfaces/CostCenter"
import { BudgetMin } from "@/interfaces/Budget"
import { useBudgetStore } from "@/app/store/budgetProject"
import { Squares2X2Icon } from "@heroicons/react/24/solid"

export default function ContainerBudgetClient({token, optClients, optCategories, 
                          optTypes, user, optCompanies, optCategoriesFilter, 
                          optConditionsFilter, optTypesFilter, projects, condition, 
                          costoCentersLV, budgets}: 
                        {token:string, optClients:Options[], user:UsrBack,
                          optCategories:Options[], optTypes:Options[],
                          optCompanies: Options[], projects: ProjectMin[], optCategoriesFilter: Options[], 
                          optTypesFilter: Options[], optConditionsFilter: Options[], 
                          condition: string, costoCentersLV: CostoCenterLV[], budgets:BudgetMin[]}){

  const [isFilter, setIsFilter] = useState<boolean>(false);
  const [isTable, setIsTable] = useState<boolean>(true);
  //const [dataTable, setDataTable] = useState<ProjectsBudgetTable[]>(data);

  // const {haveNewProject, projectStore, 
  //   updateProjectStore, updateHaveNewProject} = useProjectsStore();
  const {budgetsStore, updateBudgetsStore} = useBudgetStore();

  useEffect(() => {
    updateBudgetsStore(budgets);
  }, []);

  const handleFilter = (value:boolean) => {
    setIsFilter(value);
  }

  // if( haveNewProject && projects.length <= 0 && projectStore.length <= 0){
  //   const aux = async () =>{
  //     let projs: ProjectMin[] = [];
  //     try {
  //       projs = await getProjectsMin(token);
  //       if(typeof(projs)==='string') showToastMessageError(projs);
  //       else{
  //         const d = ProjectBudgetDataToTableDataMin(projs);
  //         updateProjectStore(projs);
  //         setDataTable(d);
  //       }
  //     } catch (error) {
  //       showToastMessageError('Ocurrio un error al actualizar datos de la tabla!!');
  //     }
  //   }
  //   aux();
  //   updateHaveNewProject(false);
  // }

  if(!budgetsStore || budgetsStore.length <= 0){
    return (
      <>
        {/* <Navigation user={user} /> */}
        <div className="p-2 sm:p-3 md-p-5 lg:p-10 w-full">
          <WithOut img="/img/projects.jpg" subtitle="Presupuestos"
            text="Agregar un presupuesto a
                    un proyecto determinado"
            title="Presupuestos">
              {/* <ButtonNew token={token} optClients={optClients} 
                      optCategories={optCategories} optTypes={optTypes}
                      user={user._id} optCompanies={optCompanies} 
                      condition={condition}  /> */}
                      <p>nuevo</p>
          </WithOut>
        </div>
      </>
    )
  }

  const dataTable: ProjectsBudgetTable[] = ProjectBudgetDataToTableDataMin(budgetsStore);

  return(
    <div className="p-2 sm:p-3 md-p-5 lg:p-10 w-full">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <Link href={'/'}>
            <TbArrowNarrowLeft className="w-9 h-9 text-slate-600" />
          </Link>
          <p className="text-xl ml-4 font-medium">Presupuestos</p>
        </div>
        <div className="flex gap-x-3">
          <div className="flex gap-x-3 items-center">
            <p>Vista: </p>
            <Squares2X2Icon onClick={() => setIsTable(true)} 
              className="text-slate-600 w-8 h-8 cursor-pointer hover:slate-slate-300"
            />
            <VscListUnordered className="text-slate-600 w-8 h-8 cursor-pointer hover:text-red-300" 
              onClick={() => setIsTable(false)}
            />
            <GiSettingsKnobs onClick={() => handleFilter(true)}
              className="text-slate-600 w-8 h-8 cursor-pointer hover:text-slate-300"
            />
          </div>
          <SearchInTable placeH="Buscar presupuesto.." />
          <div className="">
            <div className="flex gap-x-3 items-center">
              {/* <PiTableThin onClick={() => setIsTable(true)} 
                className="text-slate-600 w-8 h-8 cursor-pointer hover:slate-slate-300"
              />
              <VscListUnordered className="text-slate-600 w-8 h-8 cursor-pointer hover:text-red-300" 
                onClick={() => setIsTable(false)}
              /> */}
              {/* <PiTableThin onClick={() => setIsTable(false)} 
                className="text-slate-600 w-8 h-8 cursor-pointer hover:slate-slate-300"
              /> */}
              <GiSettingsKnobs onClick={() => handleFilter(true)}
                className="text-slate-600 w-8 h-8 cursor-pointer hover:text-slate-300"
              />
              <ButtonNewBudgetProject condition="" optCategories={optCategories} optClients={optClients} 
                  optCompanies={optCompanies} optTypes={optTypes} projects={projects} token="" user={user._id}
                  costoCentersLV={costoCentersLV}  />
              {/* <p>nuevo</p> */}
              {/* <ButtonNew token={token} optClients={optClients} 
                      optCategories={optCategories} optTypes={optTypes}
                      user={user._id} optCompanies={optCompanies} condition={condition} /> */}
            </div>
          </div>
        </div>
      </div>
      <div className="mt-5">
        <TableBudgetProjects data={dataTable} token={token} 
          budgets={ budgetsStore} 
          optCategories={optCategoriesFilter} optTypes={optTypesFilter}
          optConditions={optConditionsFilter} isFilter={isFilter} 
          setIsFilter={handleFilter} isTable={isTable}
        />
      </div>
    </div>
  )
}