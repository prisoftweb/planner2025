'use client'

import { useState, useEffect, useMemo } from "react"
import { showToastMessageError } from "@/components/Alert";
import Table from "@/components/Table";
import { createColumnHelper } from "@tanstack/react-table";
import { CurrencyFormatter } from "@/app/functions/Globals";
import SearchInTable from "../SearchInTable";
import Link from "next/link";
import { TbArrowNarrowLeft } from "react-icons/tb";
import { DateRangePicker, DateRangePickerValue, } from "@tremor/react";
import { es } from "date-fns/locale"
import { Chip as ChipMui } from "@mui/material";
import { getTotalGuaranteesByDateAndStatus, 
  getGuaranteesGroupByClientAndDateAndStatus, getGuaranteesGroupByYear, 
  getGuaranteesResumeByProjectMin, getAllTOTALGuaranteeFundsResumeByDateAndStatus, getGuaranteesGroupByStatus } 
from "@/app/api/routeGuarantee";
import { ITableGuarantee, IAmountTotalGuaranteesByDateAndStatus, IGuaranteeGroupByClient, 
  IGuaranteByYear, IGuaranteeResumenByProject, ITotalGuaranteefundsByStatus} from "@/interfaces/Guarantee";
import { GuaranteeDataByProjectToTableData } from "@/app/functions/GuaranteesFunctions";
import NewDonutChartComponent from "../projects/dashboard/NewDonutChartComponent";
import { DonutChartJS } from "@/interfaces/DashboardProjects";
import Label from "../Label";
import TooltipContainerIcon from "../tooltipIcons/TooltipContainerIcon";
import { getDate } from "@/libs/dates";
import { useTableStates } from "@/app/store/tableStates";

import Slider from '@mui/material/Slider';
import { IPermissionsAndComponents } from "@/interfaces/Roles"

export default function TableGuaranteeComponent({token, user, permissions}: {token:string, user:string, permissions:IPermissionsAndComponents}) {

  const [guarantees, setGuarantees] = useState<IGuaranteeResumenByProject[]>([]);
  const [filteredGuarantees, setFilteredGuarantees] = useState<IGuaranteeResumenByProject[]>([]);
  const [isFilter, setIsFilter]=useState<boolean>(false);
  const [statuses, setStatuses]=useState<string[]>([]);
  const [amountTotalByStatuses, setAmountTotalByStatuses]=useState<IAmountTotalGuaranteesByDateAndStatus[]>();

  const [recuperar, setRecuperar]=useState<IAmountTotalGuaranteesByDateAndStatus>();
  const [porCobrar, setPorCobrar]=useState<IAmountTotalGuaranteesByDateAndStatus>();

  const [guaranteesByClient, setGuaranteesByClient]=useState<IGuaranteeGroupByClient[]>([]);
  const [guaranteeByYear, setGuaranteeByYear]=useState<IGuaranteByYear[]>([]);
  const [guaranteeByStatus, setGuaranteeByStatus]=useState<ITotalGuaranteefundsByStatus>();
  
  const [widthPage, setWidthPage] = useState<number>(900);

  const [rangeDate, setRangeDate] = useState<DateRangePickerValue>({
    from: new Date('2024-01-01'),
    to: new Date('2025-04-30'),
  });

  // const [rangeDate, setRangeDate] = useState<DateRangePickerValue>({
  //   from: new Date(new Date().getFullYear(), 0, 1),
  //   to: new Date(),
  // });

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
    updateTotal(getDate(rangeDate?.from ?? new Date('2024-01-01')),
                getDate(rangeDate?.to ?? new Date('2025-04-30')),
                ["6827d5c2936cac5913f94ad7", "6827d64a936cac5913f94ad9", "6827d67b936cac5913f94adb", "6827d56d936cac5913f94ad5", "6840deda0c901d22c05dead1"]);
  }, []);

  const handleDate = (dateI: Date, dateF: Date) => {
    //actualizar total con el rango de fechas
    updateTotal(getDate(dateI), getDate(dateF), statuses);
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
    updateTotal(getDate(dateS), getDate(dateE), arrStatuses);
  }

  const updateTotal = async (dateI:string, dateF:string, arrStatuses:string[]) => {

    const [res, resTotal, resCobrar, resRecuperado, guaranteesClient, guaranteesYear, guaranteebyStatus] = await Promise.all([
      getGuaranteesResumeByProjectMin(token, dateI, dateF, arrStatuses),
      getGuaranteesGroupByStatus(token, dateI, dateF, arrStatuses),
      getTotalGuaranteesByDateAndStatus(token, dateI, dateF, 'POR COBRAR'),
      getTotalGuaranteesByDateAndStatus(token, dateI, dateF, 'RECUPERADO'),
      getGuaranteesGroupByClientAndDateAndStatus(token, dateI, dateF, arrStatuses),
      getGuaranteesGroupByYear(token, dateI, dateF, arrStatuses),
      getAllTOTALGuaranteeFundsResumeByDateAndStatus(token, dateI, dateF, arrStatuses)
    ]);

    if(typeof(res)==='string'){
      showToastMessageError(res);
    }else{
      setGuarantees(res);
      setFilteredGuarantees(res);
    }

    if(typeof(resTotal)==='string'){
      showToastMessageError(resTotal);
    }else{
      setAmountTotalByStatuses(resTotal);
    }

    if(typeof(resCobrar)==='string'){
      showToastMessageError(resCobrar);
    }else{
      setPorCobrar(resCobrar[0]);
    }

    if(typeof(resRecuperado)==='string'){
      showToastMessageError(resRecuperado);
    }else{
      setRecuperar(resRecuperado[0]);
    }

    if(typeof(guaranteesClient)==='string'){
      showToastMessageError(guaranteesClient);
    }else{
      setGuaranteesByClient(guaranteesClient);
    }

    if(typeof(guaranteesYear)==='string'){
      showToastMessageError(guaranteesYear);
    }else{
      setGuaranteeByYear(guaranteesYear);
    }

    if(typeof(guaranteebyStatus)==='string'){
      showToastMessageError(guaranteebyStatus);
    }else{
      setGuaranteeByStatus(guaranteebyStatus);
    }
  }

  const columnHelper = createColumnHelper<ITableGuarantee>();
  
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
        <>
          {permissions.permission.select && (
            <input type="checkbox"
              checked={table.getIsAllRowsSelected()}
              onClick={()=> {
                table.toggleAllRowsSelected(!table.getIsAllRowsSelected())
              }}
            />
          )}
        </>
        // <p>Accion</p>
      )
    }),
    columnHelper.accessor('proyect', {
      header: 'Proyecto',
      id: 'proyecto',
      cell: ({row}) => (
        <p className="cursor-pointer"
        >{row.original.proyect}</p>
      ),
    }),
    columnHelper.accessor('client', {
      header: 'Cliente',
      id: 'cliente',
      cell: ({row}) => (
        <p className="cursor-pointer"
        >{row.original.client}</p>
      ),
    }),
    columnHelper.accessor('dateGuarantee', {
      header: 'Fecha de garantia',
      id: 'fecha',
      cell: ({row}) => (
        <p className="cursor-pointer"
        >{row.original.dateGuarantee.substring(0, 10)}</p>
      ),
    }),
    columnHelper.accessor('datePayment', {
      header: 'Fecha de pago',
      id: 'fechaPago',
      cell: ({row}) => (
        <p className="cursor-pointer"
        >{row.original.datePayment.substring(0, 10)}</p>
      ),
    }),
    columnHelper.accessor('amount', {
      header: 'Monto de garantia',
      id: 'monto',
      cell: ({row}) => (
        <p className="cursor-pointer"
        >{CurrencyFormatter({
          currency: 'USD',
          value: row.original.amount
        })}</p>
      ),
    }),
    columnHelper.accessor('amountVat', {
      header: 'Monto con iva',
      id: 'monto',
      cell: ({row}) => (
        <p className="cursor-pointer"
        >{CurrencyFormatter({
          currency: 'USD',
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

  let filterElemnts = <div className="flex mt-3 flex-wrap lg:flex-nowrap gap-x-4 justify-end items-center">
                <div className="flex justify-end gap-x-2 items-center">
                  <ChipStatus id="6827d56d936cac5913f94ad5" addStatus={addStatus} removeStatus={deleteStatus} title="Vencidos" />
                  <ChipStatus id="6827d64a936cac5913f94ad9" addStatus={addStatus} removeStatus={deleteStatus} title="Por cobrar" />
                  <ChipStatus id="6827d5c2936cac5913f94ad7" addStatus={addStatus} removeStatus={deleteStatus} title="Recuperado" />
                  <ChipStatus id="6827d67b936cac5913f94adb" addStatus={addStatus} removeStatus={deleteStatus} title="Programado" />
                  <ChipStatus id="6840deda0c901d22c05dead1" addStatus={addStatus} removeStatus={deleteStatus} title="Retenido" />
                </div>
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
              </div>;

  const titles:string[]=[];
  const values: number[] = [];

  guaranteesByClient.map((prj) => {
    titles.push(prj.client);
    values.push(prj.total);
  });

  const DataGuaranteesClient: DonutChartJS = {
    labels: titles,
    datasets: [
      {
        label: 'Proyectos',
        data: values,
        backgroundColor:[ '#E4D831', '#71B2F2', '#434348', '#6BF672', '#FFA145', '#8579F0', '#FF467A', '#ff4081', '#e040fb', '#448aff', '#ff5252', '#ff6e40', '#69f0ae', '#7c4dff', '#83b14e', '#458a3f', '#295ba0', '#2a4175', '#289399', '#289399', '#617178', '#8a9a9a', '#516f7d'],
        hoverOffset: 4
      }
    ]
  };

  const colorsSlider: any[]=['error', 'info', 'primary', 'secondary', 'success', 'warning'];

  const retenido = amountTotalByStatuses?.find(a => a.status.toLowerCase().includes('retenido'));
  const programado = amountTotalByStatuses?.find(a => a.status.toLowerCase().includes('programado'));
  const vencido = amountTotalByStatuses?.find(a => a.status.toLowerCase().includes('vencido'));

  // console.log('data table => ', data);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-3 gap-y-3">
        <Card amount={guaranteeByStatus?.guarantee?.subtotal || 0} title="FONDO DE GARANTIA" />
        <div className="p-3 gap-x-3 gap-y-3 sm:col-span-2 md:col-span-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 bg-white shadow-md shadow-slate-300 rounded-md">
          <div>
            <p className="text-slate-600">Recuperado</p>
            <p className="text-xl font-bold">{CurrencyFormatter({
              currency: 'USD',
              value: recuperar?.total || 0
            })}</p>
          </div>
          <div>
            <p className="text-slate-600">Por cobrar</p>
            <p className="text-xl font-bold">{CurrencyFormatter({
              currency: 'USD',
              value: porCobrar?.total || 0
            })}</p>
          </div>
          <div>
            <p className="text-slate-600">Vencido</p>
            <p className="text-xl font-bold">{CurrencyFormatter({
              currency: 'USD',
              value: vencido?.total || 0
            })}</p>
          </div>
          <div>
            <p className="text-slate-600">Retenido</p>
            <p className="text-xl font-bold">{CurrencyFormatter({
              currency: 'USD',
              value: retenido?.total || 0
            })}</p>
          </div>
          <div>
            <p className="text-slate-600">Programado</p>
            <p className="text-xl font-bold">{CurrencyFormatter({
              currency: 'USD',
              value: programado?.total || 0
            })}</p>
          </div>
        </div>
      </div>
      <div className="flex justify-between flex-wrap sm:flex-nowrap gap-x-5 gap-y-2 items-center mt-5">
        <div className="flex items-center w-full max-w-96">
          <Link href={'/'}>
            <TooltipContainerIcon label="Regresar">
              <div className="p-1 border border-slate-400 bg-white rounded-md hover:bg-blue-100">
                <TbArrowNarrowLeft className="w-10 h-10 text-slate-600" />
              </div>
            </TooltipContainerIcon>
          </Link>
          <p className="text-xl ml-4 font-medium">FONDO DE GARANTIA </p>
        </div>
        <div className={`flex gap-x-3 gap-y-3 w-full justify-end`}>
          <div className="">
            {permissions.permission.searchfull && (
              <SearchInTable placeH={"Buscar garantia.."} />
            )}
          </div>
        </div>
      </div>
      {/* {widthPage > 1080 && filterElemnts} */}
      {permissions.permission?.filter && filterElemnts}
      <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-5">
        <div>
          <Label>GARANTIA POR CLIENTE</Label>
          <div className="mt-3">
            <NewDonutChartComponent data={DataGuaranteesClient} />
          </div>
        </div>
        <div>
          <Label>SEGMENTADA POR AÑO</Label>
          <div className="mt-3">
            {guaranteeByYear.map((g, index:number) => (
              <div className="my-2" key={g.year}>
                <div className="flex items-center justify-between">
                  <div className="w-full">
                    <Label>Año {g.year}</Label>
                  </div>
                  <div className="text-right">
                    <Label>{CurrencyFormatter({
                      currency: 'USD',
                      value: g.total
                    })}</Label>
                  </div>
                </div>
                <Slider defaultValue={g.porcentage} color={colorsSlider[index%6]} min={0} max={100} aria-label="Default" valueLabelDisplay="auto" />
              </div>
            ))}
          </div>
        </div>
        <div>
          <Label>RECUPERADO VS PENDIENTE</Label>
          <div className="mt-3">
            <div className="flex justify-between items-center mb-2">
              <p className="text-lg font-bold">{(guaranteeByStatus?.porcentage)?.toFixed(2) || 0}%</p>
              <p className="text-lg font-bold text-right">{(100 - (guaranteeByStatus?.porcentage ?? 0)).toFixed(2)}%</p>
            </div>
            <div className="w-full h-6 bg-red-700">
              <div className="h-6 bg-green-600" style={{width: (guaranteeByStatus?.porcentage?.toString() ?? '0')+'%'}}></div>
            </div>
            <div className="flex justify-between items-center mb-2">
              <p className="text-lg">{CurrencyFormatter({
                currency: 'USD',
                value: guaranteeByStatus?.recovered?.subtotalRecovered ?? 0
              })}</p>
              <p className="text-lg text-right">{CurrencyFormatter({
                currency: 'USD',
                value: (guaranteeByStatus?.guarantee?.subtotal ?? 0) - (guaranteeByStatus?.recovered?.subtotalRecovered ?? 0)
              })}</p>
            </div>
          </div>
        </div>
      </div>
      {permissions.permission.readfull && (
        <>
          <div className="hidden md:block w-full">
            <Table columns={columns} data={data} placeH="buscar garantia" typeTable="guarantee" />      
          </div>
          <div className="block md:hidden w-full">
            <ListData data={data} />
          </div>
        </>
      )}
    </>
  )
}

const ListData = ({data}: 
  {data: ITableGuarantee[]}) => {

  // const [dataReports, setDataReports] = useState(data);
  const {search} = useTableStates();

  // const filterData = useMemo(() => {
  //   if(!search || search.trim() === ''){
  //     console.log('no search => ', search);
  //     console.log('data ns => ', data);
  //     return data;
  //   }else{
  //     console.log('search => ', search);
  //     const d = data.filter(item => item.proyect.toLowerCase().includes(search.toLowerCase()));
  //     return d;
  //   }
  // }, [search]);

  // console.log('data => ', data);

  let filterData = [];

  if(!search || search.trim() === ''){
      // console.log('no search => ', search);
      // console.log('data ns => ', data);
      filterData= data;
    }else{
      // console.log('search => ', search);
      const d = data.filter(item => item.proyect.toLowerCase().includes(search.toLowerCase()));
      filterData = d;
    }

  // console.log('filter data => ', filterData);

  return(
    <div>
      <div className="relative flex flex-col text-gray-700 bg-white shadow-md w-full rounded-xl bg-clip-border] h-[calc(100vh-264px)]">
        <nav className="flex w-full flex-col gap-1 p-2 font-sans text-base font-normal text-blue-gray-700
          overflow-scroll overflow-y-auto overflow-x-hidden" style={{scrollbarColor: '#ada8a8 white', scrollbarWidth: 'thin'}}>

          {filterData.map((g, index:number) => (
            <CardGuarantee guarantee={g} key={g.id+index} />
          ))}

        </nav>
      </div>
    </div>
  )
}

const CardGuarantee = ({guarantee}: 
  {guarantee:ITableGuarantee}) => {
  
  return(
    <div role="button"
      // key={guarantee.id}
      className={`flex items-center justify-between w-full p-3 leading-tight transition-all rounded-lg 
        outline-none text-start hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 
        focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 
        active:bg-opacity-80 active:text-blue-gray-900 border-b border-slate-300 
        bg-white`}
    >
      <div className="flex items-center w-full ">
        {/* <div className="grid mr-4 place-items-center">
          <img alt="responsable" src={ expense.Responsable?.photo ?? '/img/users/default.jpg'}
            className="relative inline-block h-12 w-12 !rounded-full  object-cover object-center" />
        </div> */}
        <div className="w-full">
          <div className="flex gap-x-3 w-full justify-between items-center p-3">
            <div>
              <h6
                className="block font-sans text-sm antialiased font-semibold leading-relaxed tracking-normal text-gray-600 ">
                {guarantee.proyect}
              </h6>
              <p className="block font-sans text-sm antialiased font-normal leading-normal text-gray-600">
                {guarantee.client}
              </p>
            </div>
            <div className="text-right">
              <p className="block font-sans text-2xl antialiased font-normal leading-normal text-blue-600">
                {CurrencyFormatter({
                  currency: 'USD',
                  value: guarantee.amount
                })}
              </p>
              <p className="block font-sans text-xs antialiased font-normal leading-normal text-gray-600">
                {CurrencyFormatter({
                  currency: 'USD',
                  value: guarantee.amountVat
                })}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export const Card = ({amount, title}: {title:string, amount:number}) => {
  return(
    <div className="p-3 flex gap-x-3 items-center bg-white shadow-md shadow-slate-300 rounded-md">
      {/* {children} */}
      <div>
        <p className="text-slate-600">{title}</p>
        <p className="text-xl font-bold">{CurrencyFormatter({
          currency: 'USD',
          value: amount
        })}</p>
      </div>
    </div>
  )
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