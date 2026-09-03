import Button from "@/components/Button"
import ContainerSideNav from "@/components/ContainerSideNav"
import { useState, useEffect } from "react"
import AddInvoicesToAdvance from "./AddInvoicesToAdvance";
import { IProviderMin } from "@/interfaces/Providers";
import { PDFDownloadLink } from "@react-pdf/renderer"
import {Tooltip} from "@nextui-org/react";
import { BsFileEarmarkPdf } from "react-icons/bs";
import { propsTooltip } from "@/libs/animations";
// import DownloadCollectionPDF from "@/components/collections/DownloadCollectionPDF";
import DownloadAdvancePDF from "./DownloadAdvancePDF";
import { ICostRelAdvanceInv, ICostRelAdvanceTable } from "@/interfaces/Expenses";
import { getAllCostsByAdvancesToSuppliersMIN, getCostsAdvanceInvoicesCFDIs, 
  getAllCostsByAdvancesToSuppliersMININVandAPP, getCostsAdvanceInvoicesCFDIsWithSTRUCT } from "@/app/api/routeCost";
import { showToastMessageError } from "@/components/Alert";
import { createColumnHelper } from "@tanstack/react-table";
import Table from "@/components/Table";
import { CurrencyFormatter } from "@/app/functions/Globals";
import { IoAlert } from "react-icons/io5";
import { OneExpense } from "@/interfaces/Expenses";
import { Company } from "@/interfaces/Companies";
import { getCompany } from "@/app/api/routeCompany";

export default function TableInvoicesAndCreditNotes({provider, user, token, ida, pending, advance, company}: 
  {provider:IProviderMin, user:string, token:string, ida:string, pending:number, advance:OneExpense, company:string}) {

  const [isAddInvoices, setIsAddInvoices]=useState<boolean>(false);
  const [costsRelAdvance, setCostsRelAdvance]=useState<ICostRelAdvanceInv[]>([]);
  const [expensesSelected, setExpensesSelected] = useState<ICostRelAdvanceInv[]>([]);
  const [costsAdvance, setCostsAdvance]=useState<ICostRelAdvanceInv[]>([]);
  const [dataTable, setDatatable]=useState<ICostRelAdvanceTable[]>([]);

  const [satCompany, setSatCompany]=useState<Company>();

  const columnHelper = createColumnHelper<ICostRelAdvanceTable>();

//   useEffect(() => {
//     const fetch = async () => {
//       const [rescomp] = await Promise.all([
//         // getCompanyTAXDATAFULL(res.company, token),
//         getCompany(token, company),
//       ]);
      
//       if(typeof(rescomp)==='string'){
//         showToastMessageError(rescomp);
//       }else{
//         // console.log('res comp => ', rescomp);
//         setSatCompany(rescomp);
//       }
//     }

//     fetch();
// }, []);

  useEffect(() => {
    const fetch = async() => {
      const [res, resCosts, rescomp] = await Promise.all([
        // getAllCostsByAdvancesToSuppliersMIN(token, ida),
        getAllCostsByAdvancesToSuppliersMININVandAPP(token, ida),
        // getCostsAdvanceInvoicesCFDIs(token, ida)
        getCostsAdvanceInvoicesCFDIsWithSTRUCT(token, ida),
        getCompany(token, company)
      ]);

      if(typeof(res)==='string'){
        showToastMessageError(res);
      }else{
        // console.log('Rel advance:', res);
        setCostsRelAdvance(res);
        const data = transformDataInvoicesInDataTable(res);
        // console.log('Data table:', data);
        setDatatable(data);
      }

      if(typeof(resCosts)==='string'){
        showToastMessageError(resCosts);
      }else{
        setCostsAdvance(resCosts);
      }

      if(typeof(rescomp)==='string'){
        showToastMessageError(rescomp);
      }else{
        setSatCompany(rescomp);
      }
    }
    fetch();
  }, []);

  const updateInvoices = async() => {
    const [res, resCosts] = await Promise.all([
      // getAllCostsByAdvancesToSuppliersMIN(token, ida),
      getAllCostsByAdvancesToSuppliersMININVandAPP(token, ida),
      getCostsAdvanceInvoicesCFDIs(token, ida)
    ]);

    if(typeof(res)==='string'){
      showToastMessageError(res);
    }else{
      setCostsRelAdvance(res);
    }

    if(typeof(resCosts)==='string'){
      showToastMessageError(resCosts);
    }else{
      setCostsAdvance(resCosts);
    }
  }

  const handleIsAddInvoices = (value:boolean) => {
    // if(value){
    //   if(expensesSelected.length % 2 === 0){
    //     setIsAddInvoices(value);
    //   }else{
    //     showToastMessageError('El numero de facturas seleccionadas debe coincidir con las notas de credito!!!!');
    //   }
    // }else{
    //   setIsAddInvoices(value);
    // }
    setIsAddInvoices(value);
  }

  const columns = [
    columnHelper.accessor(row => row.id, {
      id: 'seleccion',
      cell: ({row}) => (
        <div className="flex gap-x-2 justify-center">
          {row.original.isinvoiceUUID? (
            <input type="checkbox" 
              checked={row.getIsSelected()}
              onChange={row.getToggleSelectedHandler()}
              className="w-24 cursor-pointer"
            />
          ): (
            <></>
          )}
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
          // onClick={() => window.location.replace(`/providers/${idProv}/advances/${row.original._id}/profile`)}
        >{row.original?.project}</p>
      ),
      enableSorting:false,
      header: () => (
        <p>Proyecto</p>
      )
    }),
    columnHelper.accessor('folio', {
      id: 'folio',
      cell: ({row}) => (
        <p className="py-2 font-semibold cursor-pointer"
          // onClick={() => window.location.replace(`/providers/${idProv}/advances/${row.original._id}/profile`)}
        >{row.original.folio}</p>
      ),
      enableSorting:false,
      header: () => (
        <p>Folio</p>
      )
    }),
    columnHelper.accessor('description', {
      id: 'descripcion',
      cell: ({row}) => (
        <Tooltip closeDelay={0} delay={100} motionProps={propsTooltip} content={row.original.description} 
            placement="right" className="text-blue-500 bg-white rounded-md border border-slate-400">
          <p className="py-2 font-semibold cursor-pointer"
            // onClick={() => window.location.replace(`/providers/${idProv}/advances/${row.original._id}/profile`)}
          >{row.original.description?.substring(0, 300)}</p>
        </Tooltip>
      ),
      enableSorting:false,
      header: () => (
        <p>Descripcion</p>
      )
    }),
    columnHelper.accessor('date', {
      id: 'fecha',
      cell: ({row}) => (
        <p className="py-2 font-semibold cursor-pointer"
          // onClick={() => window.location.replace(`/providers/${idProv}/advances/${row.original._id}/profile`)}
        >{row.original?.date?.substring(0, 10)}</p>
      ),
      enableSorting:false,
      header: () => (
        <p>Fecha</p>
      )
    }),
    columnHelper.accessor('cost.total', {
      header: 'Importe',
      id: 'importe',
      cell: ({row}) => (
        <p className="cursor-pointer"
          // onClick={() => window.location.replace(`/providers/${idProv}/advances/${row.original._id}/profile`)}
        >{CurrencyFormatter({
          currency: 'USD', 
          value: row.original.cost.total?? 0
        })}</p>
      ),
    }),
    // columnHelper.accessor('cost.total', {
    //   header: 'Saldo disponible',
    //   id: 'saldo',
    //   cell: ({row}) => (
    //     <p className="cursor-pointer"
    //       // onClick={() => window.location.replace(`/providers/${idProv}/advances/${row.original._id}/profile`)}
    //     >{CurrencyFormatter({
    //       currency: 'USD',
    //       value: row.original.cost.total?? 0
    //     })}</p>
    //   ),
    // }),
  ]

  const handleExpensesSelected = (value: ICostRelAdvanceTable[]) => {
    // setExpensesSelected(value);
    const d = costsRelAdvance.filter( c =>
      value.some(v => v.id === c.invoiceUUID._id)
    );

    setExpensesSelected(d);
  }

  return (
    <div className="w-full" >
      <div className="flex justify-end mt-5">
        {expensesSelected.length > 0 && (
          <Button onClick={() => handleIsAddInvoices(true)}>Agregar a anticipo</Button>
        )}
      </div>
      <div className="flex justify-end gap-x-5 mr-3 mt-3">
        {dataTable.length <= 0 && (
          <p className="text-red-500 w-full">No hay facturas pendientes de aplicacion</p>
        ) }
        <div>
          {satCompany && (
            <PDFDownloadLink document={<DownloadAdvancePDF provider={provider} advance={advance} costsRelAdvance={costsAdvance} satCompany={satCompany} />} fileName={'Anticipo'} >
              {({loading, url, error, blob}) => 
                loading? (
                  <Tooltip closeDelay={0} delay={100} motionProps={propsTooltip} content='Informe' 
                      placement="right" className="text-blue-500 bg-white rounded-md border border-slate-400">
                    <BsFileEarmarkPdf className="w-8 h-8 text-slate-500" />
                  </Tooltip>
                ) : (
                  <Tooltip closeDelay={0} delay={100} motionProps={propsTooltip} content='Informe' 
                      placement="right" className="text-blue-500 bg-white rounded-md border border-slate-400">
                    <BsFileEarmarkPdf className="w-8 h-8 text-green-500" />
                  </Tooltip>
                ) }
            </PDFDownloadLink>
          )}
        </div>
      </div>
      <div className="mt-5">
        {/* <Table columns={columns} data={costsRelAdvance} placeH="Buscar factura.." typeTable="advance"
          selectFunction={handleExpensesSelected} /> */}
        
        <div className="hidden xl:block w-full">
          <Table columns={columns} data={dataTable} placeH="Buscar factura.." typeTable="advance"
            selectFunction={handleExpensesSelected} />
        </div>
        <div className="block xl:hidden w-full">
          <ListData data={dataTable} />
        </div>
      </div>
      <ContainerSideNav width="w-full max-w-5xl" open={isAddInvoices}>
        <AddInvoicesToAdvance token={token} costs={expensesSelected} pending={pending} advance={advance}
          showForm={handleIsAddInvoices} provider={provider} user={user} open={isAddInvoices} 
          updateInvoices={updateInvoices} />
      </ContainerSideNav>
    </div>
  )
}

function transformDataInvoicesInDataTable(dataBack:ICostRelAdvanceInv[]){
  const table: ICostRelAdvanceTable[]=[];

  dataBack.forEach(element => {
    table.push({
      cost: element.invoiceUUID.cost,
      date: element.invoiceUUID.date,
      description: element.invoiceUUID.description,
      files: element.invoiceUUID.files,
      folio: element.invoiceUUID.folio,
      id: element.invoiceUUID._id,
      isinvoiceUUID:true,
      project: element.invoiceUUID.project.title,
      user: element.invoiceUUID.user
    });
    
// Antes de usar forEach, valida que sí sea un arreglo:
// Si no es arreglo, simplemente no entra y no truena.
// Así aunque venga {}, se convierte en [] y sigue

    (Array.isArray(element.applicationUUID) ? element.applicationUUID : [])
    .forEach(app => {
      table.push({
        cost: app.cost,
        date: app.date,
        description: app.description,
        files: app.files,
        folio: app.folio,
        id: app._id,
        isinvoiceUUID:false,
        project: app.project.title,
        user: app.user
      });
    });

    // element.applicationUUID.forEach(element => {
    //   table.push({
    //     cost: element.cost,
    //     date: element.date,
    //     description: element.description,
    //     files: element.files,
    //     folio: element.folio,
    //     id: element._id,
    //     isinvoiceUUID:false,
    //     project: element.project.title,
    //     user: element.user
    //   });
    // });
  });
  return table;
}

const ListData = ({data}: {data: ICostRelAdvanceTable[]}) => {

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

  if(data.length <= 0){
    return(
      <div className="flex items-center justify-center gap-x-2 mt-10">
        <IoAlert className="w-10 h-10 text-red-500" />
        <p className="text-red-500 text-lg">No hay facturas pendientes de aplicacion...</p>
      </div>
    )
  }

  return(
    <div>
      <div className="relative flex flex-col text-gray-700 bg-white shadow-md w-full max-w-2xl rounded-xl bg-clip-border] h-[calc(100vh-264px)]">
        <nav className="flex w-full flex-col gap-1 p-2 font-sans text-base font-normal text-blue-gray-700
          overflow-scroll overflow-y-auto overflow-x-hidden" style={{scrollbarColor: '#ada8a8 white', scrollbarWidth: 'thin'}}>

          {data.map((e) => (
            <CardInvoices expense={e} key={e.id} />
          ))}

        </nav>
      </div>
    </div>
  )
}

const CardInvoices = ({expense }: 
  {expense:ICostRelAdvanceTable }) => {

  return(
    <div role="button"
      key={expense.id}
      // onClick={() => window.location.replace(`/reports/${report.id}/profile`)}
      className={`flex items-center justify-between w-full p-3 leading-tight transition-all rounded-lg 
        outline-none text-start hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 
        focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 
        active:bg-opacity-80 active:text-blue-gray-900 border-b border-slate-300 
        bg-white`}
    >
      <div className="flex items-center w-full ">
        <div className="grid mr-4 place-items-center">
          <img alt="responsable" src={ expense.user?.photo ?? '/img/users/default.jpg'}
            className="relative inline-block h-12 w-12 !rounded-full  object-cover object-center" />
          {/* <DeleteElement id={expense.id} name={expense.name} remove={RemoveCompany} token={token} /> */}
        </div>
        <div className="w-full">
          <div className="flex gap-x-3 w-full justify-between items-center p-3"
            // onClick={() => window.location.replace(`/expenses/${expense.id}/profile?prov=${idProv}`)}
          >
            <div>
              <h6
                className="block font-sans text-sm antialiased font-semibold leading-relaxed tracking-normal text-gray-600 ">
                {expense.project}
              </h6>
              <p className="block font-sans text-sm antialiased font-normal leading-normal text-gray-600">
                {expense.description}
              </p>
            </div>
            <div className="text-right">
              <p className="block font-sans text-2xl antialiased font-normal leading-normal text-blue-600">
                {expense.date?.substring(0, 10)}
              </p>
              <p className="block font-sans text-xs antialiased font-normal leading-normal text-gray-600">
                {CurrencyFormatter({
                  currency: 'USD', 
                  value: expense.cost.total?? 0
                })}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}