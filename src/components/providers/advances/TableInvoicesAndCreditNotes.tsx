import Button from "@/components/Button"
import ContainerSideNav from "@/components/ContainerSideNav"
import { useState, useEffect } from "react"
import AddInvoicesToAdvance from "./AddInvoicesToAdvance";
import { ProviderMin } from "@/interfaces/Providers";
import { PDFDownloadLink } from "@react-pdf/renderer"
import {Tooltip} from "@nextui-org/react";
import { BsFileEarmarkPdf } from "react-icons/bs";
import { propsTooltip } from "@/libs/animations";
// import DownloadCollectionPDF from "@/components/collections/DownloadCollectionPDF";
import DownloadAdvancePDF from "./DownloadAdvancePDF";
import { ICostRelAdvance } from "@/interfaces/Expenses";
import { getAllCostsByAdvancesToSuppliersMIN } from "@/app/api/routeCost";
import { showToastMessageError } from "@/components/Alert";
import { createColumnHelper } from "@tanstack/react-table";
import Table from "@/components/Table";
import { CurrencyFormatter } from "@/app/functions/Globals";
import { IoAlert } from "react-icons/io5";

export default function TableInvoicesAndCreditNotes({provider, user, token, ida, pending}: 
  {provider:ProviderMin, user:string, token:string, ida:string, pending:number}) {

  const [isAddInvoices, setIsAddInvoices]=useState<boolean>(false);
  const [costsRelAdvance, setCostsRelAdvance]=useState<ICostRelAdvance[]>([]);
  const [expensesSelected, setExpensesSelected] = useState<ICostRelAdvance[]>([]);

  const columnHelper = createColumnHelper<ICostRelAdvance>();

  useEffect(() => {
    const fetch = async() => {
      const res = await getAllCostsByAdvancesToSuppliersMIN(token, ida);
      if(typeof(res)==='string'){
        showToastMessageError(res);
      }else{
        // console.log('res table adv => ', res);
        setCostsRelAdvance(res);
      }
    }
    fetch();
  }, []);

  const handleIsAddInvoices = (value:boolean) => {
    setIsAddInvoices(value);
  }

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
          // onClick={() => window.location.replace(`/providers/${idProv}/advances/${row.original._id}/profile`)}
        >{row.original?.project.title}</p>
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
    columnHelper.accessor('cost.subtotal', {
      header: 'Importe',
      id: 'importe',
      cell: ({row}) => (
        <p className="cursor-pointer"
          // onClick={() => window.location.replace(`/providers/${idProv}/advances/${row.original._id}/profile`)}
        >{CurrencyFormatter({
          currency: 'MXN', 
          value: row.original.cost.subtotal?? 0
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
    //       currency: 'MXN',
    //       value: row.original.cost.total?? 0
    //     })}</p>
    //   ),
    // }),
  ]

  const handleExpensesSelected = (value: ICostRelAdvance[]) => {
    // const noPaid = value.filter((c) => c.Estatus._id !== '67318a51ceaf47ece0d3aa72' && 
    //                                     c.Estatus._id !== '661eade6f642112488c85fad' &&
    //                                     c.Estatus._id !== '661eaa71f642112488c85f59' &&
    //                                     c.Estatus._id !== '661eaa4af642112488c85f56' );
    setExpensesSelected(value);
  }

  return (
    <div className="w-full" >
      <div className="flex justify-end mt-5">
        {expensesSelected.length > 0 && (
          <Button onClick={() => handleIsAddInvoices(true)}>Agregar a anticipo</Button>
        )}
      </div>
      {/*<PDFDownloadLink document={<DownloadAdvancePDF />} fileName={'Anticipo'} >
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
      </PDFDownloadLink>*/}
      <div className="mt-5">
        <Table columns={columns} data={costsRelAdvance} placeH="Buscar gasto.." typeTable="advance"
          selectFunction={handleExpensesSelected} />
      </div>
      <ContainerSideNav width="w-full max-w-5xl" open={isAddInvoices}>
        <AddInvoicesToAdvance token={token} costs={expensesSelected} pending={pending}
          showForm={handleIsAddInvoices} provider={provider} user={user} open={isAddInvoices} />
      </ContainerSideNav>
    </div>
  )
}
