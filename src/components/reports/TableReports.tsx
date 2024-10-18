'use client'
import { createColumnHelper } from "@tanstack/react-table";
import Table from "@/components/Table";
import { useState, useEffect } from "react";
import { Options } from "@/interfaces/Common";
import { ReportTable, ReportParse } from "@/interfaces/Reports";
import Chip from "../providers/Chip";
import { RemoveReport } from "@/app/api/routeReports";
import { ReportParseDataToTableData } from "@/app/functions/ReportsFunctions";
import Filtering from "./FilteringReports";
import { FaMoneyCheckDollar } from "react-icons/fa6";
import { useOptionsReports } from "@/app/store/reportsStore";
import { UsrBack } from "@/interfaces/User";
import { GetAllReportsWithLastMoveInDepartmentAndNEConditionMIN, GetAllReportsWithUSERAndNEConditionMIN,
  CloneReport
} from "@/app/api/routeReports";
import { showToastMessageError, showToastMessage } from "../Alert";
import RemoveElement from "../RemoveElement";
import { IoCopy } from "react-icons/io5";

export default function TableReports({data, token, reports, 
                          optCompanies, optConditions, optProjects, 
                          isFilter, setIsFilter, user}:
                        {data:ReportTable[], token:string, 
                          reports: ReportParse[], optCompanies: Options[], 
                          optProjects: Options[], optConditions: Options[], 
                          isFilter:boolean, setIsFilter:Function, user:UsrBack}){
  
  const columnHelper = createColumnHelper<ReportTable>();

  //const [filtering, setFiltering] = useState<boolean>(false);
  const [filter, setFilter] = useState<boolean>(false);
  const [dataReports, setDataReports] = useState(data);

  const {haveDeleteReport, haveNewReport, updateHaveDeleteReport, updateHaveNewReport, 
    updateReportStore, reportsStore} = useOptionsReports();

  const delReport = async(id: string) => {
    try {
      const arrReports = reportsStore.filter(rep => rep._id !== id);
      updateReportStore(arrReports);
      updateHaveDeleteReport(true);
    } catch (error) {
      showToastMessageError('Error al quitar informe de la tabla!!');
    }
  }

  const cloneReport = async (id: string) => {
    try {
      const res = await CloneReport(token, id);
      if(typeof(res)==='string'){
        showToastMessageError(res);
      }else{
        showToastMessage('Reporte copiado exitosamente!!!');
        let reps;
        try {
          if(typeof(user.department)=== 'string' || user.department.name.toLowerCase().includes('obras')){
            reps = await GetAllReportsWithUSERAndNEConditionMIN(token, user._id);
          }else{
            reps = await GetAllReportsWithLastMoveInDepartmentAndNEConditionMIN(token, user.department._id);
          }
          if(typeof(reps)==='string'){
            showToastMessageError(reps);
          }else{
            const d = ReportParseDataToTableData(reps);
            updateReportStore(reps);
            setDataReports(d);
          }
        } catch (error) {
          showToastMessageError('Ocurrio un error al actualizar datos de la tabla!!');
        }
      }
    } catch (error) {
      showToastMessageError("Ocurrio un problema al clonar costo!!!");
    }
  }

  const columns = [
    columnHelper.accessor(row => row.id, {
      id: 'seleccion',
      cell: ({row}) => (
        <div className="flex gap-x-2">
          <input type="checkbox" 
            checked={row.getIsSelected()}
            onChange={row.getToggleSelectedHandler()}
          />
        </div>
      ),
      enableSorting:false,
      header: ({table}:any) => (
        <input type="checkbox"
          checked={table.getIsAllRowsSelected()}
          onClick={()=> {
            table.toggleAllRowsSelected(!table.getIsAllRowsSelected())
          }}
        />
      )
    }),
    columnHelper.accessor('Responsible', {
      id: 'Responsable',
      cell: ({row}) => (
        <div className="flex gap-x-1 items-center">
          <img src={row.original.Responsible} className="w-12 h-auto rounded-full" alt="responsable" />
          {/* <DeleteElement id={row.original.id} name={row.original.Report} remove={RemoveReport} token={token} /> */}
          <RemoveElement id={row.original.id} name={row.original.Report} token={token} 
              remove={RemoveReport} removeElement={delReport} />
          <IoCopy className="w-6 h-6 text-slate-400 hover:text-slate-600 cursor-pointer" onClick={() => cloneReport(row.original.id)} />
          {row.original.isPettyCash && <FaMoneyCheckDollar className="w-6 h-6 text-green-500" />}
        </div>
      ),
      enableSorting:false,
      header: () => (
        <p>Responsables</p>
      )
    }),
    columnHelper.accessor(row => row.Report, {
      id: 'Informe',
      cell: ({row}) => (
        // <Link href={`/reports/${row.original.id}/profile`}>
        //   <div className="flex gap-x-1 items-center">
        //     <p>{row.original.Report}</p>
        //   </div>
        // </Link>
        <div className="flex gap-x-1 items-center cursor-pointer"
          onClick={() => window.location.replace(`/reports/${row.original.id}/profile`)}
        >
          <p>{row.original.Report}</p>
        </div>
      ),
      enableSorting:false,
      header: () => (
        <p>Informe</p>
      )
    }),
    columnHelper.accessor(row => row.account, {
      id: 'Cuenta',
      cell: ({row}) => (
        // <Link href={`/reports/${row.original.id}/profile`}>
        //   <div className="flex gap-x-1 items-center">
        //     <p>{row.original.account}</p>
        //   </div>
        // </Link>
        <div className="flex gap-x-1 items-center cursor-pointer"
          onClick={() => window.location.replace(`/reports/${row.original.id}/profile`)}
        >
          <p>{row.original.account}</p>
        </div>
      ),
      enableSorting:false,
      header: () => (
        <p>Cuenta</p>
      )
    }),
    columnHelper.accessor('Project', {
      header: 'Proyecto',
      id: 'Proyecto',
      cell: ({row}) => (
        // <Link href={`/reports/${row.original.id}/profile`}>
        //   <div className="flex gap-x-1 items-center">
        //     <p>{row.original.Project}</p>
        //   </div>
        // </Link>
        <div className="flex gap-x-1 items-center cursor-pointer"
          onClick={() => window.location.replace(`/reports/${row.original.id}/profile`)}
        >
          <p>{row.original.Project}</p>
        </div>
      )
    }),
    columnHelper.accessor('Company', {
      header: 'Empresa/Depto',
      id: 'Departamento',
      cell: ({row}) => (
        // <Link href={`/reports/${row.original.id}/profile`}>
        //   <div className="flex gap-x-1 items-center">
        //     <img src={row.original.Company} className="w-12 h-auto" alt="compania" />
        //     <p>{row.original.Depto}</p>
        //   </div>
        // </Link>
        <div className="flex gap-x-1 items-center cursor-pointer"
          onClick={() => window.location.replace(`/reports/${row.original.id}/profile`)}
        >
          <img src={row.original.Company} className="w-12 h-auto" alt="compania" />
          <p>{row.original.Depto}</p>
        </div>
      )
    }),
    columnHelper.accessor('Status', {
      header: 'Estatus',
      id: 'Estatus',
      cell: ({row}) => (
        // <Link href={`/reports/${row.original.id}/profile`}>
        //   <Chip label={row.original.Status} color={row.original.color} />
        // </Link>
        <div className="cursor-pointer"
          onClick={() => window.location.replace(`/reports/${row.original.id}/profile`)}
        >
          <Chip label={row.original.Status} color={row.original.color} />
        </div>
      ),
    }),
    columnHelper.accessor('NºGastos', {
      header: 'NºGastos',
      id: 'NºGastos',
      cell: ({row}) => (
        // <Link href={`/reports/${row.original.id}/profile`}>
        //   <p className="">{row.original.NºGastos}</p>
        // </Link>
        <p className="cursor-pointer"
          onClick={() => window.location.replace(`/reports/${row.original.id}/profile`)}
        >{row.original.NºGastos}</p>
      ),
    }),
    columnHelper.accessor('Total', {
      header: 'Total',
      id: 'Total',
      cell: ({row}) => (
        // <Link href={`/reports/${row.original.id}/profile`}>
        //   <p className="">{row.original.Total}</p>
        // </Link>
        <p className="cursor-pointer"
          onClick={() => window.location.replace(`/reports/${row.original.id}/profile`)}
        >{row.original.Total}</p>
      ),
    }),
    columnHelper.accessor('Fecha', {
      header: 'Fecha',
      id: 'Fecha',
      cell: ({row}) => (
        // <Link href={`/reports/${row.original.id}/profile`}>
        //   <p className="">{row.original.Fecha?.substring(0, 10) || ''}</p>
        // </Link>
        <p className="cursor-pointer"
          onClick={() => window.location.replace(`/reports/${row.original.id}/profile`)}
        >{row.original.Fecha?.substring(0, 10) || ''}</p>
      ),
    }),
  ]

  const [maxAmount, setMaxAmount] = useState<number>(0);
  useEffect(() => {
    const repAmount = reports.reduce((previous, current) => {
      return current.totalok > previous.totalok ? current : previous;
    });
    setMaxAmount(repAmount.totalok || 100);
  }, [])

  const dateValidation = (rep:ReportParse, startDate:number, endDate:number) => {
    let d = new Date(rep.date).getTime();
    console.log('date validation => ');
    if(d >= startDate && d <= endDate){
      console.log('return true ');
      return true;
    }
    return false;
  }

  const amountValidation = (rep:ReportParse, minAmount:number, maxAmount:number, 
                              startDate:number, endDate:number) => {
    console.log('rep total => ', rep.totalok);
    if(rep.totalok >= 0){
      console.log('min amo => ', minAmount, ' maxamo => ', maxAmount);
      if(rep.totalok >= minAmount && rep.totalok <= maxAmount){
        return dateValidation(rep, startDate, endDate);
      }
    }
    return false;
  }

  const projectValidation = (rep:ReportParse, minAmount:number, maxAmount:number, 
                      startDate:number, endDate:number, projects:string[]) => {
    if(projects.includes('all')){
      console.log('projects all');
      return amountValidation(rep, minAmount, maxAmount, startDate, endDate);
    }else{
      if(rep.project){
        console.log('proyects => ', projects);
        if(projects.includes(rep.project._id)){
          return amountValidation(rep, minAmount, maxAmount, startDate, endDate);
        }
      }
    }
    return false;
  }

  const companyValidation = (rep:ReportParse, minAmount:number, maxAmount:number, 
              startDate:number, endDate:number, projects:string[], companies:string[]) => {
    if(companies.includes('all')){
      console.log('companies all');
      return projectValidation(rep, minAmount, maxAmount, startDate, endDate, projects); 
    }else{
      if(rep.company){
        console.log('companies => ', companies);
        if(companies.includes(rep.company._id)){
          return projectValidation(rep, minAmount, maxAmount, startDate, endDate, projects);
        }
      }
    }
    return false;
  }

  const conditionValidation = (rep:ReportParse, minAmount:number, maxAmount:number, 
                  startDate:number, endDate:number, projects:string[], 
                  companies:string[], conditions:string[]) => {

    if(conditions.includes('all')){
      console.log('condition all')
      return companyValidation(rep, minAmount, maxAmount, startDate, endDate, projects, companies);
    }else{
      console.log('conditions => ', conditions);
      if(conditions.includes(rep.lastmove.condition._id)){
        return companyValidation(rep, minAmount, maxAmount, startDate, endDate, projects, companies);
      }
      // if(!rep.condition.every((cond) => !conditions.includes(cond.glossary._id))){
      //   return companyValidation(rep, minAmount, maxAmount, startDate, endDate, projects, companies);
      // }
    }
    return false;
  }

  const pettyCashValidation = (rep:ReportParse, minAmount:number, maxAmount:number, 
      startDate:number, endDate:number, projects:string[], 
      companies:string[], conditions:string[], isPettyCash:boolean) => {

    console.log('petty cash => ', isPettyCash, ' repCash => ', rep.ispettycash);
    if(isPettyCash === rep.ispettycash){
      return conditionValidation(rep, minAmount, maxAmount, startDate, endDate, projects, companies, conditions);
    }
    return false;
  }

  const filterData = (conditions:string[], minAmount:number, 
    maxAmount:number, companies:string[], projects:string[], 
    startDate:number, endDate:number, isPettyCash:boolean) => {
  
    let filtered: ReportParse[] = [];
    console.log('filter data => ');
    // reports.map((report) => {
    //   if(pettyCashValidation(report, minAmount, maxAmount, startDate, 
    //       endDate, projects, companies, conditions, isPettyCash)){
    //     filtered.push(report);
    //   }
    // });
    reportsStore.map((report) => {
      if(pettyCashValidation(report, minAmount, maxAmount, startDate, 
          endDate, projects, companies, conditions, isPettyCash)){
        filtered.push(report);
      }
    });

    console.log('filteres => ', filtered);
    setDataReports(ReportParseDataToTableData(filtered));
    setFilter(true);
  }

  const addNewReport = async() => {
    let reports: ReportParse[] = [];
    try {
      if(typeof(user.department)=== 'string' || user.department.name.toLowerCase().includes('obras')){
        reports = await GetAllReportsWithUSERAndNEConditionMIN(token, user._id);
      }else{
        reports = await GetAllReportsWithLastMoveInDepartmentAndNEConditionMIN(token, user.department._id);
      }
      if(typeof(reports)==='string'){
        showToastMessageError(reports);
      }else{
        const d = ReportParseDataToTableData(reports);
        updateReportStore(reports);
        setDataReports(d);
      }
    } catch (error) {
      showToastMessageError('Ocurrio un error al actualizar datos de la tabla!!');
      //return <h1 className="text-lg text-center text-red-500">Ocurrio un error al consultar reportes!!</h1>
    }
  }

  const view = <Table columns={columns} data={dataReports} placeH="Buscar informe.." />;

  if(haveNewReport){
    addNewReport();
    updateHaveNewReport(false);
  }

  if(haveDeleteReport){
    const d = ReportParseDataToTableData(reportsStore);
    //setExpensesFiltered(expensesTable);
    setDataReports(d);
    updateHaveDeleteReport(false);
  }

  return(
    <>
      <div className="flex justify-end my-5">
        {/* <Button type="button" onClick={() => setFiltering(!filtering)}>Filtrar</Button> */}
        {/* <GiSettingsKnobs onClick={() => setFiltering(!filtering)}
          className="text-slate-600 w-8 h-8 cursor-pointer hover:text-slate-300"
        /> */}
          {/* {filtering && <Filtering showForm={setFiltering} optConditions={optConditions} 
                          FilterData={filterData} maxAmount={maxAmount} 
                          optProjects={optProjects} optCompanies={optCompanies} />} */}
        {isFilter && <Filtering showForm={setIsFilter} optConditions={optConditions} 
                        FilterData={filterData} maxAmount={maxAmount} 
                        optProjects={optProjects} optCompanies={optCompanies} />}
      </div>
      {view}
    </>
  )
}