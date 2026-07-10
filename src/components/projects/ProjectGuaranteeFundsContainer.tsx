'use client'

import { useState, useEffect } from "react"
import { OneProjectMin } from "@/interfaces/Projects"
import { useOneProjectsStore } from "@/app/store/projectsStore"
import { IGuaranteeByPojectMin, ITableGuaranteeByProject } from "@/interfaces/Guarantee"
import { createColumnHelper } from "@tanstack/react-table"
import { CurrencyFormatter } from "@/app/functions/Globals"
import Table from "../Table"
import Chip from "../providers/Chip"
import DownloadGuaranteeByProjectPDF from "../guarantee/DownloadGuaranteeByProject"
import { PDFDownloadLink } from "@react-pdf/renderer"
import {Tooltip} from "@nextui-org/react";
import { BsFileEarmarkPdf } from "react-icons/bs";
import { propsTooltip } from "@/libs/animations"
import { Company } from "@/interfaces/Companies";
import { getCompany } from "@/app/api/routeCompany";
import { showToastMessageError } from "../Alert"
import { IPermissionsAndComponents } from "@/interfaces/Roles"

type Props = {
  project:OneProjectMin, 
  token:string, 
  id:string,
  user:string
  guarantees: IGuaranteeByPojectMin[],
  company:string,
  permissions:IPermissionsAndComponents
}

export default function ProjectGuaranteeFundsContainer({project, token, id, user, guarantees, company, permissions}: Props){

  const {updateOneProjectStore} = useOneProjectsStore();

  const [satCompany, setSatCompany]=useState<Company>();
 
  useEffect(() => {
    const fetch = async () => {
      const [rescomp] = await Promise.all([
        getCompany(token, company),
      ]);
      
      if(typeof(rescomp)==='string'){
        showToastMessageError(rescomp);
      }else{
        setSatCompany(rescomp);
      }
    }

    fetch();
  }, []);
  
  useEffect(() => {
    updateOneProjectStore(project);
  }, []);

  const columnHelper = createColumnHelper<ITableGuaranteeByProject>();
    
  const columns = [
    columnHelper.accessor(row => row.id, {
      id: 'Accion',
      cell: ({row}) => (
        <div className="flex gap-x-2">
          {permissions.permission.select && (
            <input type="checkbox" 
              checked={row.getIsSelected()}
              onChange={row.getToggleSelectedHandler()}
            />
          )}
          {/* <RemoveElement id={`${row.original.id}`} name={row.original.Referencia} remove={deleteCollection} 
                      removeElement={delCollection} token={token} /> */}
        </div>
      ),
      size: 300,
      enableSorting:false,
      header: ({table}:any) => (
        // <input type="checkbox"
        //   checked={table.getIsAllRowsSelected()}
        //   onClick={()=> {
        //     table.toggleAllRowsSelected(!table.getIsAllRowsSelected())
        //   }}
        // />
        <p>Accion</p>
      )
    }),
    columnHelper.accessor('user', {
      header: 'Usuario',
      id: 'usuario',
      cell: ({row}) => (
        <p className="cursor-pointer"
        // onClick={() => window.location.replace( `/projects/estimates/${row.original.Facturas[0].project._id}/collections/${row.original.id}?page=collections`)}
        >{row.original.user}</p>
      ),
    }),
    columnHelper.accessor('client', {
      header: 'Cliente',
      id: 'cliente',
      cell: ({row}) => (
        <p className="cursor-pointer"
        // onClick={() => window.location.replace( `/projects/estimates/${row.original.Facturas[0].project._id}/collections/${row.original.id}?page=collections`)}
        >{row.original.client}</p>
      ),
    }),
    columnHelper.accessor('estimate', {
      header: 'Estimacion',
      id: 'estimacion',
      cell: ({row}) => (
        <p className="cursor-pointer"
        // onClick={() => window.location.replace( `/projects/estimates/${row.original.Facturas[0].project._id}/collections/${row.original.id}?page=collections`)}
        >{row.original.estimate}</p>
      ),
    }),
    columnHelper.accessor('date', {
      header: 'Fecha de retencion',
      id: 'fecha',
      cell: ({row}) => (
        <p className="cursor-pointer"
        // onClick={() => window.location.replace(`/projects/estimates/${row.original.Facturas[0].project._id}/collections/${row.original.id}?page=collections`)}
        >{row.original.date.substring(0, 10)}</p>
      ),
    }),
    columnHelper.accessor('fechaGarantia', {
      header: 'Fecha de garantia',
      id: 'fecha de garantia',
      cell: ({row}) => (
        <p className="cursor-pointer"
        // onClick={() => window.location.replace(`/projects/estimates/${row.original.Facturas[0].project._id}/collections/${row.original.id}?page=collections`)}
        >{row.original?.fechaGarantia?.substring(0, 10)}</p>
      ),
    }),
    columnHelper.accessor('fechaProgramacion', {
      header: 'Fecha de programacion',
      id: 'fecha programacion',
      cell: ({row}) => (
        <p className="cursor-pointer"
        // onClick={() => window.location.replace(`/projects/estimates/${row.original.Facturas[0].project._id}/collections/${row.original.id}?page=collections`)}
        >{row.original.fechaProgramacion?.substring(0, 10)}</p>
      ),
    }),
    columnHelper.accessor('fechaPago', {
      header: 'Fecha de pago',
      id: 'fecha pago',
      cell: ({row}) => (
        <p className="cursor-pointer"
        // onClick={() => window.location.replace(`/projects/estimates/${row.original.Facturas[0].project._id}/collections/${row.original.id}?page=collections`)}
        >{row.original.fechaPago?.substring(0, 10)}</p>
      ),
    }),
    columnHelper.accessor('status', {
      header: 'Estatus',
      id: 'estatus',
      cell: ({row}) => (
        <p className="cursor-pointer"
        // onClick={() => window.location.replace( `/projects/estimates/${row.original.Facturas[0].project._id}/collections/${row.original.id}?page=collections`)}
        ><Chip label={row.original.status.name} color={row.original.status.color} darktext={row.original.darktext} /> </p>
      ),
    }),
    columnHelper.accessor('amount', {
      header: 'Monto de garantia',
      id: 'monto',
      cell: ({row}) => (
        <p className="cursor-pointer"
        // onClick={() => window.location.replace(`/projects/estimates/${row.original.Facturas[0].project._id}/collections/${row.original.id}?page=collections`)}
        >{CurrencyFormatter({
          currency: 'MXN',
          value: row.original.amount
        })}</p>
      ),
    }),
    columnHelper.accessor('amountVat', {
      header: 'Monto con iva',
      id: 'monto',
      cell: ({row}) => (
        <p className="cursor-pointer"
        // onClick={() => window.location.replace(`/projects/estimates/${row.original.Facturas[0].project._id}/collections/${row.original.id}?page=collections`)}
        >{CurrencyFormatter({
          currency: 'MXN',
          value: row.original.amountVat
        })}</p>
      ),
    }),
  ]

  const data = TransformDataGuaranteeTotable(guarantees);

  return(
    <>
      {/* <div className="flex w-full max-w-2xl justify-end items-center p-3"> */}
      <div className="flex w-full justify-end items-center p-3">
        {satCompany && permissions.permission.print && (
          <PDFDownloadLink document={<DownloadGuaranteeByProjectPDF project={project} token={token} guarantees={guarantees} satCompany={satCompany} />} fileName={'Fondo de garantia - '+project.title} >
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
      {/* <div className={`flex w-full`}>
        <Table columns={columns} data={data} placeH="Buscar fondo de garantia" typeTable="guaranteefunds" />
      </div> */}
      {permissions.permission.readfull && (
        <>
          <div className="hidden xl:block w-full">
            <Table columns={columns} data={data} placeH="Buscar fondo de garantia" typeTable="guaranteefunds" />
          </div>
          <div className="block xl:hidden w-full">
            <ListData data={data} />
          </div>
        </>
      )}
    </>
  )
}

function TransformDataGuaranteeTotable(guarantees: IGuaranteeByPojectMin[]): ITableGuaranteeByProject[] {
  return guarantees.map((guarantee) => ({
    id: guarantee._id,
    client: guarantee.client.name,
    // dateGuarantee: guarantee.dateGuarantee,
    // datePayment: guarantee.datePayment,
    date: guarantee.date.substring(0, 10),
    amount: guarantee.cost.subtotal,
    amountVat: guarantee.cost.total,
    estimate: guarantee.estimate.name,
    user: guarantee.user.name,
    status: guarantee.estatus,
    fechaGarantia: guarantee.dateGuarantee?.substring(0, 10) || '',
    fechaPago: guarantee.datePayment?.substring(0, 10) || '',
    fechaProgramacion: guarantee.dateScheduled?.substring(0, 10) || '',
    darktext: guarantee.estatus?.darktext?? false
    // fechaRetencion: ''
  }));
}

const ListData = ({data}: 
  {data: ITableGuaranteeByProject[]}) => {

  // const [dataReports, setDataReports] = useState(data);
  // const {search} = useTableStates();

  // const filterData = useMemo(() => {
  //   if(search.trim() === ''){
  //     return data;
  //   }else{
  //     const d = data.filter(item => item.Descripcion.toLowerCase().includes(search.toLowerCase()));
  //     return d;
  //   }
  // }, [search]);

  return(
    <div>
      <div className="relative flex flex-col text-gray-700 bg-white shadow-md w-full max-w-2xl mt-3 rounded-xl bg-clip-border] h-[calc(100vh-264px)]">
        <nav className="flex w-full flex-col gap-1 p-2 font-sans text-base font-normal text-blue-gray-700
          overflow-scroll overflow-y-auto overflow-x-hidden" style={{scrollbarColor: '#ada8a8 white', scrollbarWidth: 'thin'}}>

          {data.map((g) => (
            <CardGuarantee key={g.id} gurantee={g} />
          ))}

        </nav>
      </div>
    </div>
  )
}

const CardGuarantee = ({gurantee}: 
  {gurantee:ITableGuaranteeByProject}) => {
  
  return(
    <div role="button"
      key={gurantee.id}
      className={`flex items-center justify-between w-full p-3 leading-tight transition-all rounded-lg 
        outline-none text-start hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 
        focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 
        active:bg-opacity-80 active:text-blue-gray-900 border-b border-slate-300 
        bg-white`}
      // onClick={() => window.location.replace(`/expenses/${gurantee.id}/profile${queryParam}`)}
    >
      <div className="flex items-center w-full ">
        {/* <div className="grid mr-4 place-items-center">
          <img alt="responsable" src={ gurantee.Responsable?.photo ?? '/img/users/default.jpg'}
            className="relative inline-block h-12 w-12 !rounded-full  object-cover object-center" />
          <RemoveElement id={glossary.id} name={glossary.name} token={token} 
              remove={RemoveGlossary} removeElement={delGlossary} />
            <RemoveElement id={gurantee.id} name={gurantee.Descripcion} 
              remove={RemoveCost} removeElement={delCost} 
              token={token} colorIcon="text-slate-500 hover:text-slate-300" />
        </div> */}
        <div className="w-full">
          <div className="flex gap-x-3 w-full justify-between items-center p-3">
            <div>
              <h6
                className="block font-sans text-sm antialiased font-semibold leading-relaxed tracking-normal text-gray-600 ">
                {gurantee.client} 
              </h6>
              <p className="block font-sans text-sm antialiased font-normal leading-normal text-gray-600">
                {gurantee.user} - {gurantee.estimate}
              </p>
            </div>
            <div className="text-right">
              <p className="block font-sans text-2xl antialiased font-normal leading-normal text-blue-600">
                {CurrencyFormatter({
                  currency: 'MXN',
                  value: gurantee.amount
                })}
              </p>
              <p className="block font-sans text-xs antialiased font-normal leading-normal text-gray-600">
                <Chip label={gurantee.status.name} color={gurantee.status.color} darktext={gurantee.darktext} />
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}