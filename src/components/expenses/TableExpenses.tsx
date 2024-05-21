'use client'
import { createColumnHelper } from "@tanstack/react-table";
import Table from "@/components/Table";
import DeleteElement from "../DeleteElement";
import Link from "next/link";
import { useState, useEffect } from "react";
import Button from "../Button";
import { ExpensesTable } from "@/interfaces/Expenses";
import Chip from "../providers/Chip";
import { RemoveCost } from "@/app/api/routeCost";

export default function TableExpenses({data, token}:
                        {data:ExpensesTable[], token:string}){
  
  const columnHelper = createColumnHelper<ExpensesTable>();

  const [filtering, setFiltering] = useState<boolean>(false);
  const [filter, setFilter] = useState<boolean>(false);
  const [dataExpenses, setDataExpenses] = useState(data);

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
    columnHelper.accessor('Responsable', {
      id: 'Responsable',
      cell: ({row}) => (
        <div className="flex gap-x-1 items-center">
          <img src={row.original.Responsable.photo} className="w-6 h-auto rounded-full" alt="user" />
          <DeleteElement id={row.original.id} name={row.original.Descripcion} remove={RemoveCost} token={token} />
        </div>
      ),
      enableSorting:false,
      header: () => (
        <p>Responsable</p>
      )
    }),
    columnHelper.accessor('Proyecto', {
      id: 'Proyecto',
      cell: ({row}) => (
        <Link href={`/expenses/${row.original.id}/profile`}>
          <p className="py-2 font-semibold">{row.original.Proyecto}</p>
        </Link>
      ),
      enableSorting:false,
      header: () => (
        <p>Proyecto</p>
      )
    }),
    columnHelper.accessor('Informe', {
      header: 'Informe',
      id: 'Informe',
      cell: ({row}) => (
        <Link href={`/expenses/${row.original.id}/profile`}>
          <p className="py-2 font-semibold">{row.original.Informe}</p>
        </Link>
      )
    }),
    columnHelper.accessor('Descripcion', {
      header: 'Descripcion',
      id: 'descripcion',
      cell: ({row}) => (
        <Link href={`/expenses/${row.original.id}/profile`}>
          <p className="">{row.original.Descripcion}</p>
        </Link>
      ),
    }),
    columnHelper.accessor('Proveedor', {
      header: 'Proveedor',
      id: 'proveedor',
      cell: ({row}) => (
        <Link href={`/expenses/${row.original.id}/profile`}>
          <p className="">{row.original.Proveedor}</p>
        </Link>
      ),
    }),
    columnHelper.accessor('Estatus', {
      header: 'Estatus',
      id: 'estatus',
      cell: ({row}) => (
        <Link href={`/expenses/${row.original.id}/profile`}>
          <Chip label={row.original.condition} />
        </Link>
      ),
    }),
    columnHelper.accessor('Fecha', {
      header: 'Fecha',
      id: 'fecha',
      cell: ({row}) => (
        <Link href={`/expenses/${row.original.id}/profile`}>
          <p className="">{row.original.Fecha?.substring(0, 10) || ''}</p>
        </Link>
      ),
    }),
    columnHelper.accessor('Importe', {
      header: 'Importe',
      id: 'importe',
      cell: ({row}) => (
        <Link href={`/expenses/${row.original.id}/profile`}>
          <p className="">{row.original.Importe}</p>
        </Link>
      ),
    }),
  ]
  
  const [maxAmount, setMaxAmount] = useState<number>(0);
  // useEffect(() => {
  //   projects.map((project) => {
  //     if(project.amount > maxAmount){
  //       setMaxAmount(project.amount);
  //     }
  //   })
  // }, [])

  const [view, setView] = useState<JSX.Element>(<Table columns={columns} data={dataExpenses} placeH="Buscar gasto.." />);

  // useEffect(() => {
  //   if(filter){
  //     setView(<Table columns={columns} data={dataProjects} placeH="Buscar gasto.." />);
  //     setFilter(false);
  //   }
  // }, [filter]);
  
  // const filterData = (conditions:string[], types:string[], 
  //     categories:string[], minAmount:number, maxAmount:number, startDate:number, endDate:number) => {
    
  //   console.log('filtrar');
  //   console.log('conditions', conditions);
  //   console.log('types ', types);
  //   console.log('categories ', categories);
  //   console.log('startdate ', startDate);
  //   console.log('endDate ', endDate);
  //   console.log('min amount ', minAmount);
  //   console.log('max amount ', maxAmount);
    
  //   let filtered: Project[] = [];
  //   projects.map((project) => {
  //     if(conditions.includes('all')){
  //       if(types.includes('all')){
  //         if(categories.includes('all')){
  //           if(project.amount >= minAmount && project.amount <= maxAmount){
  //             filtered.push(project);
  //           }
  //         }else{
  //           if(project.categorys){
  //             if(categories.includes(project.categorys._id)){
  //               if(project.amount >= minAmount && project.amount <= maxAmount){
  //                 filtered.push(project);
  //               }
  //             }
  //           }
  //         }
  //       }else{
  //         if(project.types){
  //           if(types.includes(project.types._id)){
  //             if(categories.includes('all')){
  //               if(project.amount >= minAmount && project.amount <= maxAmount){
  //                 filtered.push(project);
  //               }
  //             }else{
  //               if(project.categorys){
  //                 if(categories.includes(project.categorys._id)){
  //                   if(project.amount >= minAmount && project.amount <= maxAmount){
  //                     filtered.push(project);
  //                   }
  //                 }
  //               }
  //             }
  //           }
  //         }
  //       }
  //     }else{
  //       if(!project.condition.every((cond) => !conditions.includes(cond.glossary._id))){
  //         if(types.includes('all')){
  //           if(categories.includes('all')){
  //             if(project.amount >= minAmount && project.amount <= maxAmount){
  //               filtered.push(project);
  //             }
  //           }else{
  //             if(project.categorys){
  //               if(categories.includes(project.categorys._id)){
  //                 if(project.amount >= minAmount && project.amount <= maxAmount){
  //                   filtered.push(project);
  //                 }
  //               }
  //             }
  //           }
  //         }else{
  //           if(project.types){
  //             if(types.includes(project.types._id)){
  //               if(categories.includes('all')){
  //                 if(project.amount >= minAmount && project.amount <= maxAmount){
  //                   filtered.push(project);
  //                 }
  //               }else{
  //                 if(project.categorys){
  //                   if(categories.includes(project.categorys._id)){
  //                     if(project.amount >= minAmount && project.amount <= maxAmount){
  //                       filtered.push(project);
  //                     }
  //                   }
  //                 }
  //               }
  //             }
  //           }
  //         }
  //       }
  //     }
  //   });

  //   console.log(filtered);
  //   setDataProjects(ProjectDataToTableData(filtered));
  //   setFilter(true);
  // }

  return(
    <>
      <div className="flex justify-end mb-5">
        {/* <Button type="button" onClick={() => setFiltering(!filtering)}>Filtrar</Button>
        {filtering && <Filtering showForm={setFiltering} optCategories={optCategories} 
                          optTypes={optTypes} optConditions={optConditions} 
                          FilterData={filterData} filterCondition={filterCondition} 
                          filterType={filterType} filterCategory={filterCategory} 
                          maxAmount={maxAmount}  />} */}
      </div>
      {view}
    </>
  )
}