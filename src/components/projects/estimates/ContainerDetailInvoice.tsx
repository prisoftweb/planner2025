'use client'
import { OneProjectMin } from "@/interfaces/Projects"
import { TbArrowNarrowLeft } from "react-icons/tb";
import { CurrencyFormatter } from "@/app/functions/Globals";
import { IInvoiceMinFull, ICollectiosByInvoice, ITotalInvoicesByProject, 
  IInvoiceCollectionsTable, IInvoiceFull } from "@/interfaces/Invoices";
import { useState } from "react";
import { FaDollarSign } from "react-icons/fa6";
import { createColumnHelper } from "@tanstack/react-table";
import Table from "@/components/Table";
import { PDFDownloadLink } from "@react-pdf/renderer"
import { BsFileEarmarkPdf } from "react-icons/bs";
import DownloadInvoicesReportPDF from "@/components/invoices/DownloadInvoicesReportPDF";
import { Tooltip } from "@nextui-org/react";
import { propsTooltip } from "@/libs/animations";
import DownloadInvoicePDF from "./DownloadInvoicePDF";
import { getInvoice } from "@/app/api/routeInvoices";
import { useEffect } from "react";
import { showToastMessageError } from "@/components/Alert";
import { getCompanyTAXDATAFULL, getSatXML } from "@/app/api/routeSatInvoices"
import { ISatCompany, IFileXML } from "@/interfaces/SatInvoice"
// import { string } from "zod";
// import { BsFiletypeXml } from "react-icons/bs";
import DownloadXMLButton from "./DownloadXMLButton";

type Props = {
  project: OneProjectMin, 
  token: string, 
  user: string, 
  invoice:IInvoiceMinFull, 
  collections:ICollectiosByInvoice[], 
  totalInvoiceProject: ITotalInvoicesByProject[]
  pageQuery: string | undefined
}

export default function ContainerDetailInvoice({project, token, user, invoice, collections, 
  totalInvoiceProject, pageQuery}: Props) {

  const [showCollections, setShowCollections]=useState<boolean>(false);
  const [invoicefull, setInvoiceFull]=useState<IInvoiceFull>();
  const [satCompany, setSatCompany]=useState<ISatCompany>();
  const [xmlData, setXmlData]=useState<IFileXML>();

  const months = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];

  console.log('invlice detail => ', invoice);

  useEffect(() => {
    const fetch = async () => {
      const res: string| IInvoiceFull = await getInvoice(token, invoice._id);
      // const [res, resXML]= await Promise.all([
      //   getInvoice(token, invoice._id),
      //   getSatXML('9ebbdfc5-588a-4ec4-b985-8081fe3b4505')
      // ]);
      
      if(typeof(res)==='string'){
        showToastMessageError(res);
      }else{
        // console.log('json invoice => ', JSON.stringify(res));
        setInvoiceFull(res);
        // const rescomp: ISatCompany[]| string= await getCompanyTAXDATAFULL(res.company, token);

        const [rescomp, resXML] = await Promise.all([
          getCompanyTAXDATAFULL(res.company, token),
          getSatXML(res.sat.invoiceId)
        ]);
        
        if(typeof(rescomp)==='string'){
          showToastMessageError(rescomp);
        }else{
          console.log('res comp => ', rescomp);
          if(rescomp.length>0){
            setSatCompany(rescomp[0]);
          }else{
            showToastMessageError('Error con la consulta de la compania');
          }
        }

        if(typeof(resXML)==='string'){
          showToastMessageError(resXML);
        }else{
          setXmlData(resXML);
        }
      }

      // if(typeof(resXML)==='string'){
      //   showToastMessageError(resXML);
      // }else{
      //   setXmlData(resXML);
      // }
    }

    fetch();
  }, []);

  // const donwloadXMl = async () => {
  //   const res = await 
  // }

  return (
    <>
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-x-5">
          <div className="p-1 border border-slate-400 bg-white rounded-md cursor-pointer"
            onClick={() => window.location.replace(pageQuery=='projects'? `/projects/estimates/${project._id}/invoice?page=projects` : 
                                (pageQuery=='invoices'? '/invoices': `/projects/estimates/${project._id}/invoice`))}
          >
            <TbArrowNarrowLeft className="w-9 h-9 text-slate-600" />
          </div>
          <p className="text-xl ml-4 font-medium">{project.title} {'->'} {invoice?.folio || 'sin factura'} </p>
          {showCollections? (
            <FaDollarSign className="text-red-500 w-6 h-6 cursor-pointer hover:text-red-300" onClick={() => setShowCollections(false)} />
          ): (
            <FaDollarSign className="text-green-500 w-6 h-6 cursor-pointer hover:text-green-300" onClick={() => setShowCollections(true)} />
          )}
          
          {invoicefull && satCompany && (
            <PDFDownloadLink document={<DownloadInvoicePDF invoicemin={invoice} invoicefull={invoicefull} satCompany={satCompany} />} fileName={'Factura'} >
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
          {/* <BsFileEarmarkPdf className="w-6 h-6 text-blue-600" onClick={donwloadXMl} /> */}
          {xmlData && (
            <DownloadXMLButton base64File={xmlData.base64File} fileName={xmlData.fileName} />
          )}
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-between gap-x-3 gap-y-3 border-b border-slate-500 pb-3">
        <div className="mt-2 order-2 sm:order-1">
          <p className="text-lg">{invoice?.client?.name}</p>
          <p className="text-lg">{invoice?.client?.rfc}</p>

          <p className="text-sm">{invoice?.client?.location?.stret}</p>
          <p className="text-sm">{invoice?.client?.location?.community}</p>
          <p className="text-sm">{invoice?.client?.location?.state}</p>
          <p className="text-sm">{invoice?.client?.location?.cp}</p>
        </div>

        <div className=" order-1 sm:order-3 sm:text-right mt-2 sm:mt-0">
          <img src="/Palaciosconstrucciones_horizontal.png" alt="palacios"
            className=" h-14 md:h-24 w-auto"
          />
          <p className="font-extrabold text-lg text-black">Samuel Palacios Hernandez</p>
          <p className="font-extrabold text-lg text-black">PAHS76123U25</p>
          <p className="text-sm text-slate-500">Betelgeuze #334</p>
          <p className="text-sm text-slate-500">Del Llano San Luis Potosi, S.L.P.</p>
          <p className="text-sm text-slate-500">CP 78377 Mexico</p>
        </div>
      </div>

      <div className="flex justify-between gap-x-3 mt-3">
        <div>
          <div className="md:hidden">
            <p className="text-slate-500 font-extrabold">ESTIMACION</p>
            <p className="text-black font-extrabold">{invoice?.estimate?.name}</p>
          </div>
          <p className="text-slate-500 font-extrabold mt-3 md:mt-0">PROYECTO</p>
          <p className="text-black font-extrabold">{invoice.project.title}</p>
          {/* <p>direccion?</p> */}
        </div>

        <div className="hidden md:block">
          <p className="text-slate-500 font-extrabold">ESTIMACION</p>
          <p className="text-black font-extrabold">{invoice?.estimate?.name}</p>
        </div>

        <div className="text-right">
          <p className="text-slate-500 font-extrabold">FACTURA</p>
          <p className="text-blue-500 font-bold">Factura No: {invoice.folio}</p>
          <p className="text-sm">{invoice?.date?.substring(8, 10)} de {months[new Date(invoice.date).getMonth()]} {invoice?.date?.substring(0, 4)}</p>
          <p className="text-sm">{invoice.useCFDI}</p>
          <p className="text-sm">{invoice.paymentMethod}</p>
          <p className="text-sm">{invoice.paymentWay}</p>
        </div>

      </div>

      <div className={`grid gap-x-3 gap-y-3 ${showCollections? 'lg:grid-cols-2': ''}`}>
        <div>
          <div className="mt-5 bg-blue-500 py-3">
            <p className="text-white text-center text-lg font-bold">FACTURA</p>
          </div>

          <div className="hidden md:block">
            <div className="grid grid-cols-6 gap-x-2 mt-4">
              <p className="text-slate-600 font-bold">CANTIDAD</p>
              <p className="text-slate-600 font-bold col-span-3">DESCRIPCION</p>
              <p className="text-slate-600 font-bold text-right">PRECIO</p>
              <p className="text-slate-600 font-bold text-right">IMPORTE</p>
            </div>

            {invoice.conceptsInvoiceInfo.map((c) => (
              <div className="grid grid-cols-6 gap-x-2 mt-3" key={c._id}>
                <p className="text-black">{c?.quantity || 0}</p>
                <p className="text-black col-span-3">{c.conceptEstimate.description}</p>
                <p className="text-black text-right">{CurrencyFormatter({
                  currency: 'MXN',
                  value: c?.priceConcepEstimate?.cost || 0
                })}</p>
                <p className="text-black text-right">{CurrencyFormatter({
                  currency: 'MXN', 
                  value: c?.amount || 0
                })}</p>
              </div>
            ))}
          </div>

          <div className="md:hidden">
            <ListData data={invoice} />
          </div>

          <div className="mt-6 py-3 flex justify-between items-center border-y-2 border-blue-200">
            <p className="font-extrabold text-slate-600">SUBTOTAL</p>
            <p className="text-blue-600 font-bold">{CurrencyFormatter({
              currency: 'MXN',
              value: invoice.cost.subtotal
            })}</p>
          </div>
          
          <div className="py-3 flex justify-between items-center">
            <p className="font-extrabold text-slate-600">(+)IVA</p>
            <p className="text-blue-600 font-bold">{CurrencyFormatter({
              currency: 'MXN',
              value: invoice.cost.iva
            })}</p>
          </div>

          <div className="py-3 flex justify-between items-center border-y-2 border-blue-500">
            <p className="font-extrabold text-slate-600">Total</p>
            <p className="text-blue-600 font-bold">{CurrencyFormatter({
              currency: 'MXN',
              value: invoice.cost.total
            })}</p>
          </div>

          <p className="font-extrabold text-slate-600 mt-6">NOTAS</p>
          <p className="text-slate-600 text-sm">{invoice.notes}</p>
          {/* <p className="text-slate-600 text-sm">Validar estimacion vs factura</p>
          <p className="text-slate-600 text-sm">Validar abonos de factura completos</p> */}
        </div>

        {showCollections && (
          <div>
            <div className="mt-5 bg-blue-500 py-3">
              <p className="text-white text-center text-lg font-bold">Cobros</p>
            </div>

            {collections.map((c) => (
              <div role="button"
                key={c._id}
                className={`flex items-center justify-between w-full p-3 leading-tight transition-all rounded-lg 
                  outline-none text-start hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 
                  focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 
                  active:bg-opacity-80 active:text-blue-gray-900 border-b border-slate-300 text-white`}
              >
                <div className="flex items-center w-full">
                  <div className="grid mr-4 place-items-center">
                    <img alt="responsable" src={ c.accountReceivable?.user?.photo?? '/img/users/default.jpg'}
                      className="relative inline-block h-12 w-12 rounded-full  object-cover object-center" />
                  </div>
                  <div className={`w-full`}>
                    <div className="flex justify-between items-center">
                      <h6
                        className="block font-sans antialiased font-semibold leading-relaxed tracking-normal text-2xl text-blue-600">
                        {c.accountReceivable.reference}
                      </h6>
                      <p className="text-slate-500 text-sm">{CurrencyFormatter({
                        currency: 'MXN',
                        value: c.charged
                      })}</p>
                    </div>
                    <div className="flex justify-between items-center">
                      <h6
                        className="block font-sans antialiased font-semibold leading-relaxed tracking-normal text-green-600">
                        {c.accountReceivable?.date?.substring(0, 10)}
                      </h6>
                      <p className="text-slate-500 text-sm">{CurrencyFormatter({
                        currency: 'MXN',
                        value: c?.accountReceivable?.amount || 0
                      })}</p>
                    </div>
                    <p className="block font-sans text-xs antialiased font-normal leading-normal text-gray-400">
                      {c?.accountReceivable?.concept}
                    </p>
                  </div>
                </div>
              </div>
            ))}

            {/* <TableCollectionsInvoice collections={collections} /> */}
          </div>
        )}
      </div>

    </>
  )
}

export function TableCollectionsInvoice({collections}: {collections: ICollectiosByInvoice[]}){
  const columnHelper = createColumnHelper<IInvoiceCollectionsTable>();
  
  const columns = [
    // columnHelper.accessor(row => row.id, {
    //   id: 'Accion',
    //   cell: ({row}) => (
    //     <div className="flex gap-x-2">
          
    //     </div>
    //   ),
    //   size: 300,
    //   enableSorting:false,
    //   header: ({table}:any) => (
        
    //     <p>Accion</p>
    //   )
    // }),
    columnHelper.accessor('reference', {
      header: 'Referencia',
      id: 'referencia',
      cell: ({row}) => (
        <p className="cursor-pointer">{row.original.reference}</p>
      ),
    }),
    columnHelper.accessor('concept', {
      header: 'Concepto',
      id: 'concepto',
      cell: ({row}) => (
        <p className="cursor-pointer">{row.original.concept}</p>
      ),
    }),
    columnHelper.accessor('amount', {
      header: 'Monto',
      id: 'monto',
      cell: ({row}) => (
        <p className="cursor-pointer">{CurrencyFormatter({
          currency: 'MXN',
          value: row.original.amount ?? 0
        })}</p>
      ),
    }),
    columnHelper.accessor('charged', {
      header: 'Cobrado',
      id: 'cobrado',
      cell: ({row}) => (
        <p className="cursor-pointer">{CurrencyFormatter({
          currency: 'MXN',
          value: row.original.charged ?? 0
        })}</p>
      ),
    }),
  ];

  const data = TrasnformFromCollectionDataToTableData(collections);

  return(
    <Table columns={columns} data={data} placeH="buscar cobro" />
  )
}

function TrasnformFromCollectionDataToTableData(collections: ICollectiosByInvoice[]){
  const data: IInvoiceCollectionsTable[] = [];

  collections.map((c) => {
    data.push({
      amount: c?.accountReceivable?.amount || 0,
      charged: c.charged,
      concept: c?.accountReceivable?.concept || '',
      id: c._id,
      reference: c?.accountReceivable?.reference || ''
    });
  });

  return data;
}

const ListData = ({data }: 
  {data: IInvoiceMinFull}) => {

  // const [dataReports, setDataReports] = useState(data);
  // const {search} = useTableStates();

  // const filterData = useMemo(() => {
  //   if(search.trim() === ''){
  //     return data;
  //   }else{
  //     const d = data.filter(item => item.folio.toLowerCase().includes(search.toLowerCase()));
  //     return d;
  //   }
  // }, [search]);

  // let filterData = [];
  // if(search.trim() === ''){
  //   filterData=data;
  // }else{
  //   const d = data.filter(item => item.folio.toLowerCase().includes(search.toLowerCase()));
  //   filterData=d;
  // }

  return(
    <div>
      <div className="relative flex flex-col text-gray-700 bg-white shadow-md w-full rounded-xl bg-clip-border] h-[calc(100vh-249px)]">
        <nav className="flex w-full flex-col gap-1 p-2 font-sans text-base font-normal text-blue-gray-700
          overflow-scroll overflow-y-auto overflow-x-hidden" style={{scrollbarColor: '#ada8a8 white', scrollbarWidth: 'thin'}}>

          {data.conceptsInvoiceInfo.map((i) => (
            <CardInvoice invoice={i} key={i._id} />
          ))}

        </nav>
      </div>
    </div>
  )
}

const CardInvoice = ({invoice }: 
  {invoice:any }) => {
  
  return(
    <div role="button"
      key={invoice._id}
      className={`flex items-center justify-between w-full p-3 leading-tight transition-all rounded-lg 
        outline-none text-start hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 
        focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 
        active:bg-opacity-80 active:text-blue-gray-900 border-b border-slate-300 
        bg-white`}
    >
      <div className="flex items-center w-full ">
        {/* <div className="grid mr-4 place-items-center">
        </div> */}
        <div className="w-full">
          <div className="flex gap-x-3 w-full justify-between items-center p-3">
            <div>
              <h6
                className="block font-sans text-sm antialiased font-semibold leading-relaxed tracking-normal text-gray-600 ">
                {CurrencyFormatter({
                  currency: 'MXN',
                  value: invoice.priceConcepEstimate?.cost || 0
                })}
              </h6>
              {/* <p className="block font-sans text-sm antialiased font-normal leading-normal text-gray-600">
                {invoice.folio}
              </p> */}
            </div>
            <div className="text-right">
              <p className="block font-sans text-2xl antialiased font-normal leading-normal text-blue-600">
                {CurrencyFormatter({
                  currency: 'MXN',
                  value: invoice.amount || 0
                })}
              </p>
              {/* <p className="block font-sans text-xs antialiased font-normal leading-normal text-gray-600">
                {CurrencyFormatter({
                  currency: 'MXN',
                  value: invoice.charged
                })}
              </p> */}
            </div>
          </div>
          <p className="block font-sans text-sm antialiased font-normal leading-normal text-gray-600">
            {invoice.conceptEstimate.description}
          </p>
        </div>
      </div>
    </div>
  )
}