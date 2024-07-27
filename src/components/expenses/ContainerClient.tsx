'use client'
import TableExpenses from "./TableExpenses"
import ButtonNew from "./ButtonNew"
import { Options } from "@/interfaces/Common"
import { ExpensesTable, Expense } from "@/interfaces/Expenses"
//import { Project } from "@/interfaces/Projects"
import { ReportParse } from "@/interfaces/Reports"
import { useState, useEffect } from "react"
import { GiSettingsKnobs } from "react-icons/gi"
//import { ReportByProject, CostGroupByType } from "@/interfaces/ReportsOfCosts"
import { PDFDownloadLink } from "@react-pdf/renderer";
import { BsFileEarmarkPdf } from "react-icons/bs"; //Archivo PDF
//import ReportCostByProjects from "../ReportCostByProjects";
import TableHistoryExpenses from "./TableHistoryExpenses"
import SearchInTable from "../SearchInTable"
import Link from "next/link"
import { TbArrowNarrowLeft } from "react-icons/tb"
import Button from "../Button"
import { showToastMessage, showToastMessageError } from "../Alert"
import { insertConditionInCost } from "@/app/api/routeCost"
import ReportCostByCostCenter from "../ReportCostByCostCenter"
import ReportCostByCategory from "../ReportCostByCategory"
// import { ReportCostsByProjectOnly } from "@/interfaces/ReportsOfCosts"
// import ReportCostsByProjectOnlyPDF from "../ReportCostByProjectOnlyPDF"

import { useOptionsExpense } from "@/app/store/newExpense"

import { getCostoCentersLV } from "@/app/api/routeCostCenter";
import { CostoCenterLV, ReportByCostcenter, ReportByCostcenterCategory } from "@/interfaces/CostCenter";
import { getProvidersLV, getProvidersSATLV } from "@/app/api/routeProviders";
import { getUsersLV } from "@/app/api/routeUser";
import { getProjectsLV } from "@/app/api/routeProjects";
import { getCatalogsByNameAndCategory, getCatalogsByNameAndCondition, getCatalogsByNameAndType } from "@/app/api/routeCatalogs";
import { GetVatsLV } from "@/app/api/routeCost"
import { GetReportsMin, GetReportsByUserMin } from "@/app/api/routeReports";
import { UsrBack } from "@/interfaces/User"

export default function ContainerClient({data, token, expenses, 
                    user, costCostoCenterCategory, 
                    isHistory=false, costCostoCenter, isViewReports}:
                  {data:ExpensesTable[], token:string, 
                    expenses:Expense[], user:UsrBack, isHistory?:boolean, 
                    costCostoCenter: ReportByCostcenter[], costCostoCenterCategory: ReportByCostcenterCategory[], 
                    isViewReports: boolean}){

  const { categories, conditions, costCenterOpt, projects, providers, responsibles, types, 
    updateCategories, updateConditions, updateCostC, updateProjects, updateProviders,
    updateReportsOptions, updateResponsibles, updateTypes, updateVats, updateProvidersSAT, 
    updateReports} = useOptionsExpense();

  // console.log('costo center concept container => ', costCostoCenter);
  // console.log('costo center category container => ', costCostoCenterCategory);
  const [idVal, setIdVal] = useState<string>('');

  useEffect(() => {
    const fetchApis = async () => {
      let costcenters: CostoCenterLV[];
      try {
        costcenters = await getCostoCentersLV(token);
        if(typeof(costcenters)==='string'){
          return <h1 className="text-center text-lg text-red-500">{costcenters}</h1>
        }    
      } catch (error) {
        return <h1 className="text-center text-lg text-red-500">Error al consultar los centros de costos!!</h1>
      }

      const optCostCenter:Options[]= [];
      costcenters.map((costcenter) => {
        optCostCenter.push({
          label: costcenter.label || 'sin categoria',
          value: costcenter.categoryid + '/' + costcenter.value
        });
      });

      let optProviders:Options[]= [];
      try {
        optProviders = await getProvidersLV(token);
        if(typeof(optProviders)==='string'){
          return <h1 className="text-center text-lg text-red-500">{optProviders}</h1>
        }
      } catch (error) {
        return <h1 className="text-center text-lg text-red-500">Error al consultar los proveedores!!</h1>
      }

      let optProvidersSAT:Options[]= [];
      try {
        optProvidersSAT = await getProvidersSATLV(token);
        if(typeof(optProvidersSAT)==='string'){
          return <h1 className="text-center text-lg text-red-500">{optProvidersSAT}</h1>
        }
      } catch (error) {
        return <h1 className="text-center text-lg text-red-500">Error al consultar los proveedores del sat!!</h1>
      }

      let optResponsibles:Options[]= [];
      try {
        optResponsibles = await getUsersLV(token);
        if(typeof(optResponsibles)==='string'){
          return <h1 className="text-center text-lg text-red-500">{optResponsibles}</h1>
        }    
      } catch (error) {
        return <h1 className="text-center text-lg text-red-500">Error al consultar los usuarios!!</h1>
      }

      let optProjects:Options[];
      try {
        optProjects = await getProjectsLV(token);
        if(typeof(optProjects)==='string'){
          return <h1 className="text-center text-lg text-red-500">{optProjects}</h1>
        }    
      } catch (error) {
        return <h1 className="text-center text-lg text-red-500">Error al consultar los proyectos!!</h1>
      }

      let optCategories: Options[] = [];
      try {
        optCategories = await getCatalogsByNameAndCategory(token, 'cost');
        if(typeof(optCategories)==='string') return <h1 className="text-red-500 text-center text-lg">{optCategories}</h1>
      } catch (error) {
        return <h1>Error al consultar catalogos!!</h1>
      }

      let optTypes: Options[] = [];
      try {
        optTypes = await getCatalogsByNameAndType(token, 'cost');
        if(typeof(optTypes)==='string') return <h1 className="text-red-500 text-center text-lg">{optTypes}</h1>
      } catch (error) {
        return <h1>Error al consultar catalogos!!</h1>
      }

      let optConditions: Options[] = [];
      try {
        optConditions = await getCatalogsByNameAndCondition(token, 'cost');
        if(typeof(optConditions)==='string') return <h1 className="text-red-500 text-center text-lg">{optConditions}</h1>
      } catch (error) {
        return <h1>Error al consultar catalogos!!</h1>
      }

      let optVats: Options[];
      try {
        optVats = await GetVatsLV(token);
        if(typeof(optVats)==='string'){
          return <h1 className="text-center text-lg text-red-500">{optVats}</h1>
        }    
      } catch (error) {
        return <h1 className="text-center text-lg text-red-500">Error al consultar los ivas!!</h1>
      }
      console.log('optvats => ', optVats);

      let reps: ReportParse[];
      try {
        if(user.rol && (user.rol?.name.toLowerCase().includes('admin') || user.rol?.name.toLowerCase().includes('superadmin'))){
          reps = await GetReportsMin(token);
        }else{
          reps = await GetReportsByUserMin(token, user._id);
        }
        
        if(typeof(reps)==='string'){
          return <h1 className="text-center text-lg text-red-500">{reps}</h1>
        }    
      } catch (error) {
        return <h1 className="text-center text-lg text-red-500">Error al consultar los reportes!!</h1>
      }

      const opReports:Options[]= [];
      reps.map((rep) => {
        const r = {
          label: rep.name,
          value: rep._id
        }
        opReports.push(r);
      });

      const val = optConditions.find((cond) => cond.label.toLowerCase().includes('validado'))?.value || '';
      setIdVal(val);

      updateCostC(optCostCenter);
      updateProviders(optProviders);
      updateResponsibles(optResponsibles);
      updateProjects(optProjects);
      updateCategories(optCategories);
      updateTypes(optTypes);
      updateConditions(optConditions);
      updateVats(optVats);
      updateReports(reps);
      updateReportsOptions(opReports);
      //console.log('update rep opt => ', opReports);
      //updateReportsOptions(optReports);
      updateProvidersSAT(optProvidersSAT);
    }

    fetchApis();
  }, []);

  const [isFilter, setIsFilter] = useState<boolean>(false);
  const [expensesSelected, setExpensesSelected] = useState<ExpensesTable[]>([]);
  const handleFilter = (value: boolean) => {
    setIsFilter(value);
  }

  const handleExpensesSelected = (value: ExpensesTable[]) => {
    setExpensesSelected(value);
  }

  const changeConditionInCost = async () => {
    //
    if(expensesSelected.length > 0){
      const filter: string[] = [];
      expensesSelected.map((row) => {
        filter.push(row.id);
      })
      const data = {
        condition: {
          glossary: idVal,
          user
        },
        filter,
      }

      try {
        const res = await insertConditionInCost(token, data);
        if(res===200){
          showToastMessage('Costos actualizados satisfactoriamente!!!');
          setTimeout(() => {
            window.location.reload();
          }, 500);
        }else{
          showToastMessageError(res);
        }
      } catch (error) {
        showToastMessageError('Ocurrio un problema al actualizar condicion!!');
      }
    }
  }

  return(
    <div className="p-2 sm:p-3 md-p-5 lg:p-10">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <Link href={'/'}>
            <TbArrowNarrowLeft className="w-9 h-9 text-slate-600" />
          </Link>
          <p className="text-xl ml-4 font-medium">{isHistory? 'Historial de Gastos': 'Gastos'}</p>
        </div>
        {/* <ButtonNewProvider id={id} token={token} /> */}
        <div className="flex gap-x-3">
          <SearchInTable placeH={"Buscar gasto.."} />
          <div className="w-72">
            <div className="flex gap-x-4 items-center">
              {categories.length > 0 && 
                conditions.length > 0 && costCenterOpt.length > 0 && 
                projects.length > 0 && providers.length > 0 && responsibles.length > 0 && 
                types.length > 0 && (
                  <GiSettingsKnobs onClick={() => handleFilter(true)}
                    className="text-slate-600 w-8 h-8 cursor-pointer hover:text-slate-300"
                  />
              )}  
              {/* <GiSettingsKnobs onClick={() => handleFilter(true)}
                className="text-slate-600 w-8 h-8 cursor-pointer hover:text-slate-300"
              /> */}
              {/* <PDFDownloadLink document={<ReportCostByCostCenterPDF />} fileName={`costo por cost center`} > */}
              <>
                {isViewReports && (
                  <>
                    {/* <PDFDownloadLink document={<ReportCostByProjects reports={reportProjects} costsByTypes={costsTypes} />} 
                        fileName={`InformeCostoporProyecto`} >
                      {({loading, url, error, blob}) => 
                        loading? (
                          <BsFileEarmarkPdf className="w-6 h-6 text-slate-500" />
                        ) : (
                          <BsFileEarmarkPdf className="w-6 h-6 text-blue-500" />
                        ) }
                    </PDFDownloadLink> */}
                    <PDFDownloadLink document={<ReportCostByCostCenter costsCostCenter={costCostoCenter} />} 
                        fileName={`InformeCostoporConcepto`} >
                      {({loading, url, error, blob}) => 
                        loading? (
                          <BsFileEarmarkPdf className="w-6 h-6 text-slate-500" />
                        ) : (
                          <BsFileEarmarkPdf className="w-6 h-6 text-blue-500" />
                        ) }
                    </PDFDownloadLink>
                    <PDFDownloadLink document={<ReportCostByCategory costsCostCenter={costCostoCenterCategory} />} 
                        fileName={`InformeCostoporCategoria`} >
                      {({loading, url, error, blob}) => 
                        loading? (
                          <BsFileEarmarkPdf className="w-6 h-6 text-slate-500" />
                        ) : (
                          <BsFileEarmarkPdf className="w-6 h-6 text-blue-500" />
                        ) }
                    </PDFDownloadLink>
                    {/* <PDFDownloadLink document={<ReportCostsByProjectOnlyPDF reports={reportCostProjectOnly} />} 
                        fileName={`InformeCostosAgrupadosPorProyecto`} >
                      {({loading, url, error, blob}) => 
                        loading? (
                          <BsFileEarmarkPdf className="w-6 h-6 text-slate-500" />
                        ) : (
                          <BsFileEarmarkPdf className="w-6 h-6 text-blue-500" />
                        ) }
                    </PDFDownloadLink> */}
                  </>
                )}
                {!isHistory && (
                  <>
                    {expensesSelected.length > 0 && (
                      <Button onClick={changeConditionInCost}>Validar</Button>
                    )}
                    <ButtonNew token={token} user={user} />
                  </>
                )}
              </>
            </div>
          </div>
        </div>
      </div>
      {
        isHistory? (
          <TableHistoryExpenses data={data} token={token} 
            expenses={expenses} isFilter={isFilter} setIsFilter={setIsFilter}
            isViewReports={isViewReports}
          />
        ): (
          <TableExpenses data={data} token={token} 
            expenses={expenses} isFilter={isFilter} setIsFilter={handleFilter}
            idValidado={idVal} user={user._id} isViewReports={isViewReports}
            handleExpensesSelected={handleExpensesSelected} 
          />
        )
      }
    </div>
  )
}