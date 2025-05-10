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

type Props = {
  data:ReportTable[], 
  token:string, 
  reports: ReportParse[], 
  optCompanies: Options[], 
  optProjects: Options[], 
  optConditions: Options[], 
  isFilter:boolean, 
  setIsFilter:Function, 
  user:UsrBack
}

export default function TableReports({data, token, reports, optCompanies, 
  optConditions, optProjects, isFilter, setIsFilter, user}: Props){
  
  const columnHelper = createColumnHelper<ReportTable>();

  // const [filter, setFilter] = useState<boolean>(false);
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
        <p className="cursor-pointer"
          onClick={() => window.location.replace(`/reports/${row.original.id}/profile`)}
        >{row.original.NºGastos}</p>
      ),
    }),
    columnHelper.accessor('Total', {
      header: 'Total',
      id: 'Total',
      cell: ({row}) => (
        <p className="cursor-pointer"
          onClick={() => window.location.replace(`/reports/${row.original.id}/profile`)}
        >{row.original.Total}</p>
      ),
    }),
    columnHelper.accessor('Fecha', {
      header: 'Fecha',
      id: 'Fecha',
      cell: ({row}) => (
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
    if(d >= startDate && d <= endDate){
      console.log('return true ');
      return true;
    }
    return false;
  }

  const amountValidation = (rep:ReportParse, minAmount:number, maxAmount:number, 
                              startDate:number, endDate:number) => {
    if(rep.totalok >= 0){
      if(rep.totalok >= minAmount && rep.totalok <= maxAmount){
        return dateValidation(rep, startDate, endDate);
      }
    }
    return false;
  }

  const projectValidation = (rep:ReportParse, minAmount:number, maxAmount:number, 
                      startDate:number, endDate:number, projects:string[]) => {
    if(projects.includes('all')){
      return amountValidation(rep, minAmount, maxAmount, startDate, endDate);
    }else{
      if(rep.project){
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
      return projectValidation(rep, minAmount, maxAmount, startDate, endDate, projects); 
    }else{
      if(rep.company){
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
      return companyValidation(rep, minAmount, maxAmount, startDate, endDate, projects, companies);
    }else{
      if(conditions.includes(rep.lastmove.condition._id)){
        return companyValidation(rep, minAmount, maxAmount, startDate, endDate, projects, companies);
      }
    }
    return false;
  }

  const pettyCashValidation = (rep:ReportParse, minAmount:number, maxAmount:number, 
      startDate:number, endDate:number, projects:string[], 
      companies:string[], conditions:string[], isPettyCash:boolean) => {

    if(isPettyCash === rep.ispettycash){
      return conditionValidation(rep, minAmount, maxAmount, startDate, endDate, projects, companies, conditions);
    }
    return false;
  }

  const filterData = (conditions:string[], minAmount:number, 
    maxAmount:number, companies:string[], projects:string[], 
    startDate:number, endDate:number, isPettyCash:boolean) => {
  
    let filtered: ReportParse[] = [];
    reportsStore.map((report) => {
      if(pettyCashValidation(report, minAmount, maxAmount, startDate, 
          endDate, projects, companies, conditions, isPettyCash)){
        filtered.push(report);
      }
    });

    setDataReports(ReportParseDataToTableData(filtered));
    // setFilter(true);
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
    }
  }

  const view = <Table columns={columns} data={dataReports} placeH="Buscar informe.." />;

  if(haveNewReport){
    addNewReport();
    updateHaveNewReport(false);
  }

  if(haveDeleteReport){
    const d = ReportParseDataToTableData(reportsStore);
    setDataReports(d);
    updateHaveDeleteReport(false);
  }

  return(
    <>
      <div className="flex justify-end my-5">
        {isFilter && <Filtering showForm={setIsFilter} optConditions={optConditions} 
                        FilterData={filterData} maxAmount={maxAmount} 
                        optProjects={optProjects} optCompanies={optCompanies} />}
      </div>
      {view}
    </>
  )
}