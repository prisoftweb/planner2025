'use client'

import { useState, useEffect } from "react"
import { showToastMessage, showToastMessageError } from "@/components/Alert";
import Table from "@/components/Table";
import { createColumnHelper } from "@tanstack/react-table";
import { CurrencyFormatter } from "@/app/functions/Globals";
import SearchInTable from "../SearchInTable";
import Link from "next/link";
import { TbArrowNarrowLeft } from "react-icons/tb";
import { DateRangePicker, DateRangePickerValue, } from "@tremor/react";
import { es } from "date-fns/locale"
import { Chip as ChipMui } from "@mui/material";
import { getGuaranteesByDateMin, insertConditionInGuarantee, 
  getAmountTotalGuaranteesByDateAndStatus, getTotalGuaranteesByDateAndStatus, 
  getGuaranteesGroupByClientAndDateAndStatus, getGuaranteesGroupByYear, 
  getGuaranteesGroupByStatus, getGuaranteesResumeByProjectMin } 
from "@/app/api/routeGuarantee";
import { ITableGuarantee, IAmountTotalGuaranteesByDateAndStatus, IGuaranteeGroupByClient, 
  IGuaranteeByStatus, IGuaranteByYear, IGuaranteeMin, IGuaranteeResumenByProject} from "@/interfaces/Guarantee";
import { GuaranteeDataToTableData, GuaranteeDataByProjectToTableData } from "@/app/functions/GuaranteesFunctions";
import NewDonutChartComponent from "../projects/dashboard/NewDonutChartComponent";
import { DonutChartJS } from "@/interfaces/DashboardProjects";
import Label from "../Label";

// import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

export default function TableGuaranteeComponent({token, user}: {token:string, user:string}) {

  const [guarantees, setGuarantees] = useState<IGuaranteeResumenByProject[]>([]);
  const [filteredGuarantees, setFilteredGuarantees] = useState<IGuaranteeResumenByProject[]>([]);
  const [isFilter, setIsFilter]=useState<boolean>(false);
  // const [totalCollections, setTotalCollections]=useState<ITotalAmountCollections>();
  const [statuses, setStatuses]=useState<string[]>([]);
  const [amountTotal, setAmountTotal]=useState<IAmountTotalGuaranteesByDateAndStatus>();

  const [recuperar, setRecuperar]=useState<IAmountTotalGuaranteesByDateAndStatus>();
  const [porCobrar, setPorCobrar]=useState<IAmountTotalGuaranteesByDateAndStatus>();
  const [vencido, setVencido]=useState<IAmountTotalGuaranteesByDateAndStatus>();

  const [guaranteesByClient, setGuaranteesByClient]=useState<IGuaranteeGroupByClient[]>([]);
  const [guaranteeByYear, setGuaranteeByYear]=useState<IGuaranteByYear[]>([]);
  const [guaranteeByStatus, setGuaranteeByStatus]=useState<IGuaranteeByStatus>();
  
  const [widthPage, setWidthPage] = useState<number>(900);

  const [rangeDate, setRangeDate] = useState<DateRangePickerValue>({
    from: new Date('2024-01-01'),
    to: new Date('2025-04-30'),
  });

  const handleResize = () => {
    setWidthPage(Math.max(
      document.body.scrollHeight, document.documentElement.scrollHeight,
      document.body.offsetHeight, document.documentElement.offsetHeight,
      document.body.clientHeight, document.documentElement.clientHeight
    ));
  }

  useEffect(() => {
    window.addEventListener("resize", handleResize, false);
    setWidthPage(Math.max(
      document.body.scrollWidth, document.documentElement.scrollWidth,
      document.body.offsetWidth, document.documentElement.offsetWidth,
      document.body.clientWidth, document.documentElement.clientWidth
    ));
    return () => window.removeEventListener('scroll', handleResize);
  }, []);

  useEffect(() => {
    const fetch = async() => {
      const res = await getGuaranteesResumeByProjectMin(token, '2024-01-01', '2025-04-30');
      if(typeof(res)==='string'){
        showToastMessageError(res);
      }else{
        setGuarantees(res);
        setFilteredGuarantees(res);
      }

      const resTotal = await getAmountTotalGuaranteesByDateAndStatus(token, '2024-01-01', '2025-04-30');
      if(typeof(resTotal)==='string'){
        showToastMessageError(resTotal);
      }else{
        setAmountTotal(resTotal[0]);
      }

      const resCobrar = await getTotalGuaranteesByDateAndStatus(token, '2024-01-01', '2025-04-30', 'POR COBRAR');
      if(typeof(resCobrar)==='string'){
        showToastMessageError(resCobrar);
      }else{
        setPorCobrar(resCobrar[0]);
      }

      const resRecuperado = await getTotalGuaranteesByDateAndStatus(token, '2024-01-01', '2025-04-30', 'RECUPERADO');
      if(typeof(resRecuperado)==='string'){
        showToastMessageError(resRecuperado);
      }else{
        setRecuperar(resRecuperado[0]);
      }

      const resVencido = await getTotalGuaranteesByDateAndStatus(token, '2024-01-01', '2025-04-30', 'VENCIDO');
      if(typeof(resVencido)==='string'){
        showToastMessageError(resVencido);
      }else{
        setVencido(resVencido[0]);
      }

      const guaranteesClient = await getGuaranteesGroupByClientAndDateAndStatus(token, '2024-01-01', '2025-04-30');
      if(typeof(guaranteesClient)==='string'){
        showToastMessageError(guaranteesClient);
      }else{
        setGuaranteesByClient(guaranteesClient);
      }

      const guaranteesYear = await getGuaranteesGroupByYear(token, '2024-01-01', '2025-04-30');
      if(typeof(guaranteesYear)==='string'){
        showToastMessageError(guaranteesYear);
      }else{
        setGuaranteeByYear(guaranteesYear);
      }
    }

    fetch();
  }, []);

  const updateCollections = async() => {
    const res = await getGuaranteesByDateMin(token, getDate(rangeDate?.from ?? new Date('2024-01-01')) , 
                                                getDate(rangeDate?.to ?? new Date('2025-04-30')));
    if(typeof(res)==='string'){
      showToastMessageError(res);
    }else{
      setGuarantees(res);
      setIsFilter(false);
      // setFilteredCollections(res);
    }
  }

  const handleDate = (dateI: Date, dateF: Date) => {
    handleFilter(dateI, dateF, statuses);
    
    //actualizar total con el rango de fechas
    updateTotal(getDate(dateI), getDate(dateF));
  }

  const addStatus = (status:string) => {
    const newStatus = [...statuses, status];
    setStatuses(newStatus);
    if(rangeDate.from && rangeDate.to){
      handleFilter(rangeDate.from, rangeDate.to, newStatus);
    }else{
      showToastMessageError('Seleccione un rango de fechas para filtrar');
    }
  }

  const deleteStatus = (status:string) => {
    const newStatus = statuses.filter((s) => s !== status);
    setStatuses(newStatus);
    if(rangeDate.from && rangeDate.to){
      handleFilter(rangeDate.from, rangeDate.to, newStatus);
    }else{
      showToastMessageError('Seleccione un rango de fechas para filtrar');
    }
  }

  const handleFilter = (dateS:Date, dateE:Date, arrStatuses:Array<string>) => {
    // let statusesFil;
    // if(arrStatuses.length > 0){
    //   statusesFil = guarantees.filter((g) => arrStatuses.includes(g.estatus._id));
    // }else{
    //   statusesFil = guarantees;
    // }

    // const filtered = statusesFil.filter((c) => {
    //   let d = new Date(c.date).getTime();
    //   if(d >= dateS.getTime() && d <= dateE.getTime()){
    //     return c;
    //   }
    // });

    // setFilteredGuarantees(filtered);
    // setIsFilter(true);
    updateTotal(getDate(dateS), getDate(dateE));
  }

  const updateTotal = async (dateI:string, dateF:string) => {
    const resTotal = await getAmountTotalGuaranteesByDateAndStatus(token, dateI, dateF);
    if(typeof(resTotal)==='string'){
      showToastMessageError(resTotal);
    }else{
      setAmountTotal(resTotal[0]);
    }

    const resCobrar = await getTotalGuaranteesByDateAndStatus(token, dateI, dateF, 'POR COBRAR');
    if(typeof(resCobrar)==='string'){
      showToastMessageError(resCobrar);
    }else{
      setPorCobrar(resCobrar[0]);
    }

    const resRecuperado = await getTotalGuaranteesByDateAndStatus(token, dateI, dateF, 'RECUPERADO');
    if(typeof(resRecuperado)==='string'){
      showToastMessageError(resRecuperado);
    }else{
      setRecuperar(resRecuperado[0]);
    }

    const resVencido = await getTotalGuaranteesByDateAndStatus(token, dateI, dateF, 'VENCIDO');
    if(typeof(resVencido)==='string'){
      showToastMessageError(resVencido);
    }else{
      setVencido(resVencido[0]);
    }
  }

  if(guarantees.length <= 0){
    return (
      <>
        <div className="flex flex-col items-center">
          <p className="text-5xl mt-20 font-bold">Garantias</p>
          <p className="text-xl mt-10 text-slate-700 font-bold" 
            >Gestiona las garantias desde Planner</p>
          <img src="/img/estimates/invoices.svg" alt="image" className="w-60 h-auto" />
        </div>
      </>
    )
  }

  const delCollection = (id:string) => {
    showToastMessage('Cobro eliminado satisfactoriamente!!!');
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  }

  const confirmGuarantee = async( id: string) => {
    const data = {
      condition: [
        {
          glossary: "6827d5c2936cac5913f94ad7",
          user
        }
      ]
    }
    const res = await insertConditionInGuarantee(token, id, data);
    if(typeof(res)==='string'){
      showToastMessageError(res);
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    }else{
      showToastMessage('Cobro actualizado satisfactoriamente!!!');
      updateCollections();
    }
  }

  const columnHelper = createColumnHelper<ITableGuarantee>();
  
  const columns = [
    columnHelper.accessor(row => row.id, {
      id: 'Accion',
      cell: ({row}) => (
        <div className="flex gap-x-2">
          <input type="checkbox" 
            checked={row.getIsSelected()}
            onChange={row.getToggleSelectedHandler()}
          />
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
    columnHelper.accessor('proyect', {
      header: 'Proyecto',
      id: 'proyecto',
      cell: ({row}) => (
        <p className="cursor-pointer"
        // onClick={() => window.location.replace( `/projects/estimates/${row.original.Facturas[0].project._id}/collections/${row.original.id}?page=collections`)}
        >{row.original.proyect}</p>
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
    columnHelper.accessor('dateGuarantee', {
      header: 'Fecha de garantia',
      id: 'fecha',
      cell: ({row}) => (
        <p className="cursor-pointer"
        // onClick={() => window.location.replace(`/projects/estimates/${row.original.Facturas[0].project._id}/collections/${row.original.id}?page=collections`)}
        >{row.original.dateGuarantee.substring(0, 10)}</p>
      ),
    }),
    columnHelper.accessor('datePayment', {
      header: 'Fecha de pago',
      id: 'fechaPago',
      cell: ({row}) => (
        <p className="cursor-pointer"
        // onClick={() => window.location.replace(`/projects/estimates/${row.original.Facturas[0].project._id}/collections/${row.original.id}?page=collections`)}
        >{row.original.datePayment.substring(0, 10)}</p>
      ),
    }),
    // columnHelper.accessor('datePayment', {
    //   header: 'Confirmar',
    //   id: 'confirmar',
    //   cell: ({row}) => (
    //     <Toogle value={row.original.isValidate} id={row.original.id} onClick={confirmGuarantee} />
    //   ),
    // }),
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

  let data;
  if(isFilter){
    data = GuaranteeDataByProjectToTableData(filteredGuarantees);
  }else{
    data = GuaranteeDataByProjectToTableData(filteredGuarantees);
  }

  let filterElemnts = <div className="flex gap-x-4 justify-end items-center">
                <ChipStatus id="67e31aa81945c0b1e4c9bc76" addStatus={addStatus} removeStatus={deleteStatus} title="Vencidos" />
                <ChipStatus id="67e318171945c0b1e4c9bc72" addStatus={addStatus} removeStatus={deleteStatus} title="Por cobrar" />
                <ChipStatus id="67e318601945c0b1e4c9bc74" addStatus={addStatus} removeStatus={deleteStatus} title="Recuperado" />
                <div>
                  {/* <Label htmlFor='date'>Fecha</Label> */}
                  <DateRangePicker 
                    className='mt-2'
                    placeholder='Seleccione un rango de fechas'
                    onValueChange={(e) => {
                      setRangeDate(e);
                      if(e.from && e.to){
                        handleDate(e.from, e.to);
                      }
                    }}
                    value={rangeDate}
                    locale={es}
                  />
                </div>
              </div>

  // const DataGuaranteesClient = [];
  const titles:string[]=[];
  const values: number[] = [];

  guaranteesByClient.map((prj) => {
    // DataGuaranteesClient.push({
    //   costo: prj.total,
    //   label: prj.client
    // });
    titles.push(prj.client);
    values.push(prj.total);
    // categoriesCostoCenters.push(prj.costocenter.concept);
  });

  const DataGuaranteesClient: DonutChartJS = {
    labels: titles,
    datasets: [
      {
        label: 'Projectos por cliente',
        data: values,
        backgroundColor:[ '#E4D831', '#71B2F2', '#434348', '#6BF672', '#FFA145', '#8579F0', '#FF467A', '#ff4081', '#e040fb', '#448aff', '#ff5252', '#ff6e40', '#69f0ae', '#7c4dff', '#83b14e', '#458a3f', '#295ba0', '#2a4175', '#289399', '#289399', '#617178', '#8a9a9a', '#516f7d'],
        hoverOffset: 4
      }
    ]
  };

  return (
    <>
      <div className="grid grid-cols-4 gap-x-3">
        <Card amount={amountTotal?.total || 0} title="FONDO DE GARANTIA"></Card>
        <div className="p-3 gap-x-3 col-span-2 grid grid-cols-3 bg-white shadow-md shadow-slate-300 rounded-md">
          <div>
            <p className="text-slate-600">Recuperado</p>
            <p className="text-xl font-bold">{CurrencyFormatter({
              currency: 'MXN',
              value: recuperar?.total || 0
            })}</p>
          </div>
          <div>
            <p className="text-slate-600">Por cobrar</p>
            <p className="text-xl font-bold">{CurrencyFormatter({
              currency: 'MXN',
              value: porCobrar?.total || 0
            })}</p>
          </div>
          <div>
            <p className="text-slate-600">Vencido</p>
            <p className="text-xl font-bold">{CurrencyFormatter({
              currency: 'MXN',
              value: vencido?.total || 0
            })}</p>
          </div>
        </div>
        <Card amount={amountTotal?.total || 0} title="Pendiente porcentaje"></Card>
      </div>
      <div className="flex justify-between flex-wrap sm:flex-nowrap gap-x-5 gap-y-2 items-center mt-5">
        <div className="flex items-center w-full max-w-96">
          <Link href={'/'}>
            <div className="p-1 border border-slate-400 bg-white rounded-md">
              <TbArrowNarrowLeft className="w-9 h-9 text-slate-600" />
            </div>
          </Link>
          <p className="text-xl ml-4 font-medium">FONDO DE GARANTIA </p>
        </div>
        <div className={`flex gap-x-3 gap-y-3 w-full justify-end`}>
          <div className="">
            <SearchInTable placeH={"Buscar garantia.."} />
          </div>
        </div>
      </div>
      {widthPage > 1080 && filterElemnts}
      <Table columns={columns} data={data} placeH="buscar garantia" />      
      <div className="mt-5 grid grid-cols-3 gap-x-3">
        <div>
          <NewDonutChartComponent data={DataGuaranteesClient} />
        </div>
        <div>
          {guaranteeByYear.map((g) => (
            <div className="my-2" key={g.year}>
              <Label>Año {g.year}</Label>
              <Slider defaultValue={50} min={0} max={200} aria-label="Default" valueLabelDisplay="auto" />
            </div>
          ))}
        </div>
        <div></div>
      </div>
    </>
  )
}

export const Card = ({amount, title}: {title:string, amount:number}) => {
  return(
    <div className="p-3 flex gap-x-3 items-center bg-white shadow-md shadow-slate-300 rounded-md">
      {/* {children} */}
      <div>
        <p className="text-slate-600">{title}</p>
        <p className="text-xl font-bold">{CurrencyFormatter({
          currency: 'MXN',
          value: amount
        })}</p>
      </div>
    </div>
  )
}

const Toogle = ({value, onClick, id}: 
  {value:boolean, id:string, onClick: (id:string) => void}) => {

  const [checked, setChecked] = useState(value);
  
  return(
    <div className="relative inline-block w-8 h-4 rounded-full cursor-pointer">
      <input 
        // checked={row.original.confirm} 
        checked={checked}
        onClick={() => {onClick(id); setChecked(true);}} id={id} type="checkbox"
        disabled={checked}
        className="absolute w-8 h-4 transition-colors duration-300 rounded-full 
          appearance-none cursor-pointer peer bg-blue-gray-100 checked:bg-green-500 
          peer-checked:border-green-500 peer-checked:before:bg-green-500
          border border-slate-300" />
      <label htmlFor={id.toString()}
        className="before:content[''] absolute top-2/4 -left-1 h-5 w-5 -translate-y-2/4 cursor-pointer rounded-full border border-blue-gray-100 bg-white shadow-md transition-all duration-300 before:absolute before:top-2/4 before:left-2/4 before:block before:h-10 before:w-10 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity hover:before:opacity-10 peer-checked:translate-x-full peer-checked:border-green-500 peer-checked:before:bg-green-500">
        <div className="inline-block p-5 rounded-full top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4"
          data-ripple-dark="true"></div>
      </label>
    </div>
  )
}

function getDate(date: Date){
  let day = date.getDate()
  let month = date.getMonth() + 1
  let year = date.getFullYear()

  if(month < 10){
    return `${year}-0${month}-${day}`;
  }else{
    return `${year}-${month}-${day}`;
  }
}

const ChipStatus = ({ addStatus, id, removeStatus, title}: 
  {title:string, id:string, addStatus:Function, removeStatus:Function}) => {
  const [active, setActive] = useState<boolean>(false);

  const view = active? 
                  <ChipMui label={title} className="p-3" color="success" onClick={() => {removeStatus(id); setActive(false)}}>
                  </ChipMui>: 
                  <ChipMui label={title} color="default" onClick={() => {addStatus(id); setActive(true)}}></ChipMui>

  return(
    <>
      {view }
    </>
  )
}