'use client'
import { createColumnHelper } from "@tanstack/react-table";
import Table from "@/components/Table";
import { useState, useEffect, useRef } from "react";
import Chip from "../Chip";
import { BsFileEarmarkPdf } from "react-icons/bs"; //Archivo PDF
import { IoAlert } from "react-icons/io5"; // No hay archivo
// import { ExpenseDataToTablePaidExpensesProviderData } from "@/app/functions/providersFunctions";
// // import { ExpensesTableProvider } from "@/interfaces/Providers";
// import { PaymentProvider } from "@/interfaces/Payments";
// import { Badge } from "@mui/material";
// import ContainerSideNav from "@/components/ContainerSideNav";
import { IAdvanceProvider } from "@/interfaces/Providers";
import { CurrencyFormatter } from "@/app/functions/Globals";

type Props = {
  data:IAdvanceProvider[], 
  token:string, 
  expenses:IAdvanceProvider[], 
  idProv: string, 
}

export default function TableAdvancesProvider({data, token, expenses, idProv }: Props){
  
  const columnHelper = createColumnHelper<IAdvanceProvider>();
  // const refExpenses = useRef(expenses);
  
  const [dataExpenses, setDataExpenses] = useState(data);
  // const [expensesFiltered, setExpensesFiltered] = useState<PaymentProvider[]>(expenses);
  
  // const handleIsFilter = (value: boolean) => {
  //   setIsFilter(value);
  // }

  // const deletePayment = (id:string) => {
  //   const auxExp = expenses.filter((e) => e._id!==id);
  //   // setExpensesFiltered(auxExp);
  //   refExpenses.current = auxExp;
  //   const dataAux = ExpenseDataToTablePaidExpensesProviderData(auxExp);
  //   setDataExpenses(dataAux);
  // }

  const columns = [
    columnHelper.accessor(row => row._id, {
      id: 'seleccion',
      cell: ({row}) => (
        <div className="flex gap-x-2 justify-center">
          <input type="checkbox" 
            checked={row.getIsSelected()}
            onChange={row.getToggleSelectedHandler()}
            className="w-24 cursor-pointer"
          />
        </div>
      ),
      enableSorting:false,
      header: ({table}:any) => (
        <div className="w-8">
          <input type="checkbox"
            className="w-24 cursor-pointer"
            checked={table.getIsAllRowsSelected()}
            onClick={()=> {
              table.toggleAllRowsSelected(!table.getIsAllRowsSelected())
            }}
          />
        </div>
      )
    }),
    columnHelper.accessor('user._id', {
      id: 'Responsable',
      cell: ({row}) => (
        <div className="flex gap-x-1 items-center">
          <img src={row.original.user.photo} className="w-10 h-auto rounded-full" alt="user" />
          {/* <RemovePaymentComponent expenses={expenses} id={row.original._id} name={row.original.notes} 
              token={token} updateTable={deletePayment} user={user} /> */}
          {row.original.files? <BsFileEarmarkPdf className="w-6 h-6 text-green-500" />: <IoAlert className="w-6 h-6 text-red-500" />}
        </div>
      ),
      enableSorting:false,
      header: () => (
        <p>Responsable</p>
      )
    }),
    columnHelper.accessor('project', {
      id: 'proyecto',
      cell: ({row}) => (
        <p className="py-2 font-semibold cursor-pointer"
          onClick={() => window.location.replace(`/providers/${idProv}/advances/${row.original._id}/profile`)}
        >{row.original?.project.title}</p>
      ),
      enableSorting:false,
      header: () => (
        <p>Proyecto</p>
      )
    }),
    columnHelper.accessor('description', {
      id: 'descripcion',
      cell: ({row}) => (
        <p className="py-2 font-semibold cursor-pointer"
          onClick={() => window.location.replace(`/providers/${idProv}/advances/${row.original._id}/profile`)}
        >{row.original.description}</p>
      ),
      enableSorting:false,
      header: () => (
        <p>Descripcion</p>
      )
    }),
    columnHelper.accessor('estatus', {
      header: 'Estatus',
      id: 'Estatus',
      cell: ({row}) => (
        <div className="cursor-pointer" 
          onClick={() => window.location.replace(`/providers/${idProv}/advances/${row.original._id}/profile`)}>
            <Chip label={row.original.estatus.name} color={row.original.estatus.color}
                darktext={row?.original?.estatus?.darktext?? false} />
        </div>
      ),
    }),
    columnHelper.accessor('date', {
      id: 'fecha',
      cell: ({row}) => (
        <p className="py-2 font-semibold cursor-pointer"
          onClick={() => window.location.replace(`/providers/${idProv}/advances/${row.original._id}/profile`)}
        >{row.original?.date?.substring(0, 10)}</p>
      ),
      enableSorting:false,
      header: () => (
        <p>Fecha</p>
      )
    }),
    columnHelper.accessor('cost.subtotal', {
      header: 'Importe',
      id: 'importe',
      cell: ({row}) => (
        <p className="cursor-pointer"
          onClick={() => window.location.replace(`/providers/${idProv}/advances/${row.original._id}/profile`)}
        >{CurrencyFormatter({
          currency: 'MXN', 
          value: row.original.cost.subtotal?? 0
        })}</p>
      ),
    }),
    columnHelper.accessor('cost.total', {
      header: 'Saldo disponible',
      id: 'saldo',
      cell: ({row}) => (
        <p className="cursor-pointer"
          onClick={() => window.location.replace(`/providers/${idProv}/advances/${row.original._id}/profile`)}
        >{CurrencyFormatter({
          currency: 'MXN',
          value: row.original.cost.total?? 0
        })}</p>
      ),
    }),
  ]
  

  const view = <Table columns={columns} data={dataExpenses} placeH="Buscar avance.." typeTable="advance" />

  // const [maxAmount, setMaxAmount] = useState<number>(0);
  // const [minAmount, setMinAmount] = useState<number>(0);
  
  // useEffect(() => {
  //   const expenseM = expenses.reduce((previous, current) => {
  //     return current.payout > previous.payout ? current : previous;
  //   });
  //   const expenseMin = expenses.reduce((previous, current) => {
  //     return current.payout < previous.payout ? current : previous;
  //   });
  //   setMaxAmount(expenseM.payout);
  //   setMinAmount(expenseMin.payout > 0? 0: expenseMin.payout || 0);
  // }, [])

  // const paidValidation = (exp:PaymentProvider, isPaid:number) => {
  //   return exp.status;
  // }

  // const dateValidation = (exp:PaymentProvider, startDate:number, endDate:number, isPaid: number) => {
  //   let d = new Date(exp.date).getTime();
  //   if(d >= startDate && d <= endDate){
  //     return paidValidation(exp, isPaid);
  //   }
  //   return false;
  // }

  // const amountValidation = (exp:PaymentProvider, minAmount:number, maxAmount:number, 
  //                             startDate:number, endDate:number, isPaid: number) => {
  //   if(exp.payout >= minAmount && exp.payout <= maxAmount){
  //     return dateValidation(exp, startDate, endDate, isPaid);
  //   }
  //   return false;
  // }

  // const conditionValidation = (exp:PaymentProvider, minAmount:number, maxAmount:number, 
  //                 startDate:number, endDate:number, conditions:string[], isPaid: number) => {

  //   if(conditions.includes('all')){
  //     return amountValidation(exp, minAmount, maxAmount, startDate, endDate, isPaid);
  //   }else{
  //     return amountValidation(exp, minAmount, maxAmount, startDate, endDate, isPaid);
  //   }
  // }

  // const filterData = (conditions:string[], minAmount:number, maxAmount:number, 
  //   startDate:number, endDate:number, isPaid: number) => {
  
  //   let filtered: PaymentProvider[] = [];
  //   refExpenses.current.map((expense) => {
  //     if(conditionValidation(expense, minAmount, maxAmount, startDate, 
  //         endDate, conditions, isPaid)){
  //       filtered.push(expense);
  //     }
  //   });

  //   // setExpensesFiltered(filtered);
  //   setDataExpenses(ExpenseDataToTablePaidExpensesProviderData(filtered));
  // }

  return(
    <>
      <div className="flex justify-end">
          {/* {isFilter && <FilteringPaymentsProvider showForm={handleIsFilter}  
                          FilterData={filterData} maxAmount={maxAmount} 
                          minAmount={minAmount} token={token} />} */}
        {/* {isFilter && (
          <ContainerSideNav width="w-full max-w-md" open={isFilter}>
            <FilteringPaymentsProvider showForm={handleIsFilter}  
                            FilterData={filterData} maxAmount={maxAmount} 
                            minAmount={minAmount} token={token} />
          </ContainerSideNav>
        )} */}
      </div>
      
      <div className="hidden lg:block w-full">
        {view}
      </div>
      <div className="block lg:hidden w-full mt-2">
        <ListData data={data} idProv={idProv} />
      </div>
    </>
  )
}

const ListData = ({data, idProv}: {data: IAdvanceProvider[], idProv:string}) => {

  // const [dataReports, setDataReports] = useState(data);

  // const {search} = useTableStates();

  // const filterData = useMemo(() => {
  //   if(search.trim() === ''){
  //     return data;
  //   }else{
  //     const d = data.filter(item => item.name.toLowerCase().includes(search.toLowerCase()));
  //     return d;
  //   }
  // }, [search]);

  return(
    <div>
      <div className="relative flex flex-col text-gray-700 bg-white shadow-md w-full max-w-2xl rounded-xl bg-clip-border] h-[calc(100vh-264px)]">
        <nav className="flex w-full flex-col gap-1 p-2 font-sans text-base font-normal text-blue-gray-700
          overflow-scroll overflow-y-auto overflow-x-hidden" style={{scrollbarColor: '#ada8a8 white', scrollbarWidth: 'thin'}}>

          {data.map((a) => (
            <CardAdvances advance={a} key={a._id} idProv={idProv} />
          ))}

        </nav>
      </div>
    </div>
  )
}

const CardAdvances = ({advance, idProv }: 
  {advance:IAdvanceProvider, idProv:string }) => {

  return(
    <div role="button"
      key={advance._id}
      // onClick={() => window.location.replace(`/reports/${report.id}/profile`)}
      className={`flex items-center justify-between w-full p-3 leading-tight transition-all rounded-lg 
        outline-none text-start hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 
        focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 
        active:bg-opacity-80 active:text-blue-gray-900 border-b border-slate-300 
        bg-white`}
    >
      <div className="flex items-center w-full ">
        <div className="grid mr-4 place-items-center">
          <img alt="responsable" src={ advance.user?.photo ?? '/img/users/default.jpg'}
            className="relative inline-block h-12 w-12 !rounded-full  object-cover object-center" />
          {/* <DeleteElement id={advance.id} name={advance.name} remove={RemoveCompany} token={token} /> */}
        </div>
        <div className="w-full">
          <div className="flex gap-x-3 w-full justify-between items-center p-3"
            onClick={() => window.location.replace(`/providers/${idProv}/advances/${advance._id}/profile`)}
          >
            <div>
              <h6
                className="block font-sans text-sm antialiased font-semibold leading-relaxed tracking-normal text-gray-600 ">
                {advance.project.title}
              </h6>
              <p className="block font-sans text-sm antialiased font-normal leading-normal text-gray-600">
                {advance.description}
              </p>
            </div>
            <div className="text-right">
              <p className="block font-sans text-2xl antialiased font-normal leading-normal text-blue-600">
                {CurrencyFormatter({
                  currency: 'MXN',
                  value: advance.cost.total?? 0
                })}
              </p>
              <p className="block font-sans text-xs antialiased font-normal leading-normal text-gray-600">
                <Chip label={advance.estatus.name} color={advance.estatus.color}
                darktext={advance?.estatus?.darktext?? false} />
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}