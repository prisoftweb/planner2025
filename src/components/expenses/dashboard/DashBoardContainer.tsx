'use client'
import StatisticsHeader from "./StatisticsHeader"
import DonutChartt from "./DonutChart"
import { BarChartComponent } from "./BarChartComponent"
import { useState } from "react"
import { GetAllCostsGroupByCOSTOCENTERCATEGORYONLYAndProject, GetAllCostsGroupByCOSTOCENTERCONCEPTONLYAndProject, 
  GetAllCostsGroupByDAYAndProject } from "@/app/api/routeCost"
import { CostsByConceptAndCategory, CostsByDay } from "@/interfaces/DashboardsCosts";
import { Options } from "@/interfaces/Common"

interface OptionsDashboard {
  label: string,
  costo: number
}

export default function DashBoardContainer({token, costsCategories, costsConcepts, costsDays, projects}:
          {token: string, costsConcepts: OptionsDashboard[], costsCategories: OptionsDashboard[], 
            costsDays: OptionsDashboard[], projects:Options[]}) {
  
  const [costsByConcept, setCostsByConcept] = useState<OptionsDashboard[]>(costsConcepts);
  const [costsByCategory, setCostsByCategory] = useState<OptionsDashboard[]>(costsCategories);
  const [costsByDay, setCostsByDay] = useState<OptionsDashboard[]>(costsDays);

  const fetchData = async (dateS: string, dateE: string, project:string) => {
    let costsCategory: CostsByConceptAndCategory[] = [];
    try {
      // costsCategory = await GetAllCostsGroupByCOSTOCENTERCATEGORYONLY(token, dateIni, dateIni);
      costsCategory = await GetAllCostsGroupByCOSTOCENTERCATEGORYONLYAndProject(token, dateS, dateE, project);
      if(typeof(costsCategory)==='string'){
        return <h1>Error al obtener costos agrupados por categoria!!!</h1>
      }
    } catch (error) {
      return <h1>Error al obtener costos agrupados por categoria!!!</h1>
    }

    let costsConcept: CostsByConceptAndCategory[] = [];
    try {
      costsConcept = await GetAllCostsGroupByCOSTOCENTERCONCEPTONLYAndProject(token, dateS, dateE, project);
      if(typeof(costsConcept)==='string'){
        return <h1>Error al obtener costos agrupados por concepto!!!</h1>
      }
    } catch (error) {
      return <h1>Error al obtener costos agrupados por concepto!!!</h1>
    }

    let costsDays: CostsByDay[] = [];
    try {
      costsDays = await GetAllCostsGroupByDAYAndProject(token, dateS, dateE, project);
      if(typeof(costsDays)==='string'){
        return <h1>Error al obtener costos agrupados por dias!!!</h1>
      }
    } catch (error) {
      return <h1>Error al obtener costos agrupados por dias!!!</h1>
    }

    const optCategories: OptionsDashboard[] = [];
    const optConcepts: OptionsDashboard[] = [];
    const optDays: OptionsDashboard[] = [];

    costsCategory.map((cc) => {
      optCategories.push({
        label: cc.costocenter.category ?? '',
        costo: cc.subtotalCost
      })
    });

    costsConcept.map((cc) => {
      optConcepts.push({
        label: cc.costocenter.concept ?? '',
        costo: cc.subtotalCost
      })
    });

    costsDays.map((cc) => {
      optDays.push({
        label: cc.day?.toString() || ' ',
        costo: cc.subtotalCost
      })
    });

    setCostsByCategory(optCategories);
    setCostsByConcept(optConcepts);
    setCostsByDay(optDays);
  }

  // const colors = ['blue', 'red', 'cyan', 'green', 'orange', 'indigo', 'amber', 'violet', 'lime', 'fuchsia'];
  const colors = ['blue', 'red', 'cyan', 'green', 'orange', 'indigo', 'amber', 'violet', 'lime', 'fuchsia', 'blue', 'red', 'cyan', 'green', 'orange', 'indigo', 'amber', 'violet', 'lime', 'fuchsia'];

  const categoriesCategories: string[] = [];
  costsByCategory.map((cc) => {
    categoriesCategories.push(cc.label);
  });

  const categoriesConcepts: string[] = [];
  costsByConcept.map((cc) => {
    categoriesConcepts.push(cc.label);
  });

  // const categoriesDays: string[] = [];
  // costsByDay.map((cc) => {
  //   categoriesDays.push(cc.label);
  // });

  return (
    <div className="p-2 sm:p-3 md-p-5 lg:p-10">
      <StatisticsHeader handleDate={fetchData} projects={projects} />
      <div className="mt-5 grid grid-cols-2 gap-x-5">
        <div className="bg-white border border-slate-100 shadow-lg shadow-slate-500 p-5">
          <div className="flex mb-3 gap-x-2 justify-between">
            <p>CENTRO DE COSTOS</p>
            <p>Categorias</p>
          </div>
          <DonutChartt data={costsByCategory} colors={colors} category="costo"
              categories={categoriesCategories}  />
        </div>
        <div className="bg-white border border-slate-100 shadow-lg shadow-slate-500 p-5">
          <div className="flex mb-3 gap-x-2 justify-between">
            <p>CENTRO DE COSTOS</p>
            <p>Conceptos</p>
          </div>
          <DonutChartt data={costsByConcept} colors={colors} category="costo"
              //categories={['New York', 'London', 'Hong Kong', 'San Francisco', 'Singapore']} 
              categories={categoriesConcepts}  />
        </div>
      </div>
      <div className="mt-5 bg-white border border-slate-100 shadow-lg shadow-slate-500 p-5">
        <BarChartComponent categories={['costo']} colors={colors} data={costsByDay} />
      </div>
    </div>
  )
}