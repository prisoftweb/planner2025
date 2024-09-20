'use client'
import { createColumnHelper } from "@tanstack/react-table";
import Table from "@/components/Table";
import DeleteElement from "../DeleteElement";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Options } from "@/interfaces/Common";
import { ReportTable, ReportParse } from "@/interfaces/Reports";
import Chip from "../providers/Chip";
//import { RemoveReport } from "@/app/api/routeReports";
import { ReportParseDataToTableData } from "@/app/functions/ReportsFunctions";
import Filtering from "./FilteringReports";
import { FaMoneyCheckDollar } from "react-icons/fa6";

export default function TableHistoryReports({data, token, reports, 
                          optCompanies, optConditions, optProjects, 
                          isFilter, setIsFilter}:
                        {data:ReportTable[], token:string, 
                          reports: ReportParse[], optCompanies: Options[], 
                          optProjects: Options[], optConditions: Options[], 
                          isFilter:boolean, setIsFilter:Function}){
  
  const columnHelper = createColumnHelper<ReportTable>();

  //const [filtering, setFiltering] = useState<boolean>(false);
  const [filter, setFilter] = useState<boolean>(false);
  const [dataReports, setDataReports] = useState(data);

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
        <Link href={`/reports/history/${row.original.id}`}>
          <div className="flex gap-x-1 items-center">
            <p>{row.original.Report}</p>
          </div>
        </Link>
      ),
      enableSorting:false,
      header: () => (
        <p>Informe</p>
      )
    }),
    columnHelper.accessor(row => row.account, {
      id: 'Cuenta',
      cell: ({row}) => (
        <Link href={`/reports/history/${row.original.id}`}>
          <div className="flex gap-x-1 items-center">
            <p>{row.original.account}</p>
          </div>
        </Link>
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
        <Link href={`/reports/history/${row.original.id}`}>
          <div className="flex gap-x-1 items-center">
            <p>{row.original.Project}</p>
          </div>
        </Link>
      )
    }),
    columnHelper.accessor('Company', {
      header: 'Empresa/Depto',
      id: 'Departamento',
      cell: ({row}) => (
        <Link href={`/reports/history/${row.original.id}`}>
          <div className="flex gap-x-1 items-center">
            <img src={row.original.Company} className="w-12 h-auto" alt="compania" />
            <p>{row.original.Depto}</p>
          </div>
        </Link>
      )
    }),
    columnHelper.accessor('Status', {
      header: 'Estatus',
      id: 'Estatus',
      cell: ({row}) => (
        <Link href={`/reports/history/${row.original.id}`}>
          <Chip label={row.original.Status} color={row.original.color} />
        </Link>
      ),
    }),
    columnHelper.accessor('NºGastos', {
      header: 'NºGastos',
      id: 'NºGastos',
      cell: ({row}) => (
        <Link href={`/reports/history/${row.original.id}`}>
          <p className="">{row.original.NºGastos}</p>
        </Link>
      ),
    }),
    columnHelper.accessor('Total', {
      header: 'Total',
      id: 'Total',
      cell: ({row}) => (
        <Link href={`/reports/history/${row.original.id}`}>
          <p className="">{row.original.Total}</p>
        </Link>
      ),
    }),
    columnHelper.accessor('Fecha', {
      header: 'Fecha',
      id: 'Fecha',
      cell: ({row}) => (
        <Link href={`/reports/history/${row.original.id}`}>
          <p className="">{row.original.Fecha?.substring(0, 10) || ''}</p>
        </Link>
      ),
    }),
  ]
  
  const [view, setView] = useState<JSX.Element>(<Table columns={columns} data={dataReports} placeH="Buscar informe.." />);
  
  useEffect(() => {
    if(filter){
      console.log('data rep ', dataReports);
      setView(<></>);
      setTimeout(() => {
        setView(<Table columns={columns} data={dataReports} placeH="Buscar reporte.." />);
      }, 100);
      setFilter(false);
    }
  }, [filter]);

  const [maxAmount, setMaxAmount] = useState<number>(0);
  useEffect(() => {
    const repAmount = reports.reduce((previous, current) => {
      console.log('REP => ', previous);
      return current.total > previous.total ? current : previous;
    });
    setMaxAmount(repAmount.total || 100);
  }, [])

  const dateValidation = (rep:ReportParse, startDate:number, endDate:number) => {
    let d = new Date(rep.date).getTime();
    if(d >= startDate && d <= endDate){
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
    //console.log('filter data => ');
    reports.map((report) => {
      if(pettyCashValidation(report, minAmount, maxAmount, startDate, 
          endDate, projects, companies, conditions, isPettyCash)){
        filtered.push(report);
      }
    });

    //console.log('filteres => ', filtered);
    setDataReports(ReportParseDataToTableData(filtered));
    setFilter(true);
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