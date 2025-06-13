'use client'

import { useEffect, useState } from "react"
import { ICollectionMin } from "@/interfaces/Collections"
import { CurrencyFormatter } from "@/app/functions/Globals"
import { Chip as ChipMui } from "@mui/material";
import { ITotalAmountCollections } from "@/interfaces/Collections";
import { getAllTotalAmountRecoveredCollection } from "@/app/api/routeCollections";
import { showToastMessageError, showToastMessage } from "../Alert";
import SearchInTable from "../SearchInTable";
import Button from "../Button";
import Link from "next/link";
import { TbArrowNarrowLeft } from "react-icons/tb";
import { es } from "date-fns/locale"
import { DateRangePicker, DateRangePickerValue } from "@tremor/react";
import { getCollectionsMin, deleteCollection, insertConditionInCollection } from "@/app/api/routeCollections";
import { createColumnHelper } from "@tanstack/react-table";
import { ITableCollectionMin } from "@/interfaces/Collections";
import RemoveElement from "../RemoveElement";
import Chip from "../providers/Chip";
// import Table from "../Table";
import ReactTableCollections from "./ReactTableCollections";

export default function TableCollectionsComp({token, user}: {token:string, user:string}) {

  const [totalCollections, setTotalCollections]=useState<ITotalAmountCollections>();
  const [collections, setCollections] = useState<ICollectionMin[]>([]);
  const [filteredCollections, setFilteredCollections] = useState<ICollectionMin[]>([]);
  const [statuses, setStatuses]=useState<string[]>([]);
  const [widthPage, setWidthPage] = useState<number>(900);
  const [showNewCollection, setShowNewCollection]= useState<boolean>(false);
  const [isFilter, setIsFilter]=useState<boolean>(false);
  const [rangeDate, setRangeDate] = useState<DateRangePickerValue>({
    from: new Date(new Date().getFullYear(), 0, 1),
    to: new Date(),
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
    const fetch = async () => {

      const res = await getCollectionsMin(token);
      if(typeof(res)==='string'){
        showToastMessageError(res);
      }else{
        setCollections(res);
        setFilteredCollections(res);
        console.log('collections => ', res);
      }

      const data={
        condition: [],
        conditionCharged:['678ed05cc5f08e8a0f36d5e1', '67d20e2959865f640af92682'],
        conditionAccountsReceivable:['67d20cb359865f640af92638'],
      }
      const rest = await getAllTotalAmountRecoveredCollection(token, '2025-01-01', '2025-12-31', data);
      if(typeof(rest)==='string'){
        showToastMessageError(rest);
      }else{
        setTotalCollections(rest);
      }
    }

    fetch();
  }, []);

  const confirmCollection = async( id: string) => {
    const data = {
      condition: [
        {
          glossary: "67e318171945c0b1e4c9bc72",
          user
        }
      ]
    }
    const res = await insertConditionInCollection(token, data, id);
    if(typeof(res)==='string'){
      showToastMessageError(res);
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    }else{
      showToastMessage('Cobro actualizado satisfactoriamente!!!');
      // updateCollections();
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    }
  }

  const delCollection = (id:string) => {
    showToastMessage('Cobro eliminado satisfactoriamente!!!');
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  }

  const columnHelper = createColumnHelper<ITableCollectionMin>();
    
  const columns = [
    columnHelper.accessor(row => row.id, {
      id: 'Accion',
      cell: ({row}) => (
        <div className="flex gap-x-2">
          <input type="checkbox" 
            checked={row.getIsSelected()}
            onChange={row.getToggleSelectedHandler()}
          />
          <RemoveElement id={`${row.original.id}`} name={row.original.Referencia} remove={deleteCollection} 
                      removeElement={delCollection} token={token} />
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
    columnHelper.accessor('Referencia', {
      header: 'Referencia',
      id: 'referencia',
      cell: ({row}) => (
        <p className="cursor-pointer"
        onClick={() => window.location.replace( `/projects/estimates/${row.original.idProject}/collections/${row.original.id}?page=collections`)}
        >{row.original.Referencia}</p>
      ),
    }),
    columnHelper.accessor('Fecha', {
      header: 'Fecha',
      id: 'fecha',
      cell: ({row}) => (
        <p className="cursor-pointer"
        onClick={() => window.location.replace(`/projects/estimates/${row.original.idProject}/collections/${row.original.id}?page=collections`)}
        >{row.original.Fecha?.substring(0, 10)}</p>
      ),
    }),
    columnHelper.accessor('concept', {
      header: 'Concepto',
      id: 'concepto',
      cell: ({row}) => (
        <p className="cursor-pointer"
        onClick={() => window.location.replace(`/projects/estimates/${row.original.idProject}/collections/${row.original.id}?page=collections`)}
        >{row.original.concept}</p>
      ),
    }),
    columnHelper.accessor('confirm', {
      header: 'Confirmado',
      id: 'confirmado',
      cell: ({row}) => (
        <Toogle value={row.original.confirm} id={row.original.id} onClick={confirmCollection} />
      ),
    }),
    columnHelper.accessor('folioInvoice', {
      header: 'Facturas',
      id: 'facturas',
      cell: ({row}) => (
        <div>
          <Chip label={row.original.folioInvoice} color={'#466'} />
        </div>
      )
    }),
    columnHelper.accessor('nameStatus', {
      header: 'Estatus',
      id: 'estatus',
      cell: ({row}) => (
        <Chip label={row.original.nameStatus} color={row.original.colorStatus} />
      ),
    }),
    columnHelper.accessor('Cuenta', {
      header: 'Cuenta',
      id: 'cuenta',
      cell: ({row}) => (
        <p className="cursor-pointer"
        onClick={() => window.location.replace(`/projects/estimates/${row.original.idProject}/collections/${row.original.id}?page=collections`)}
        >{row.original.Cuenta}</p>
      ),
    }),
    columnHelper.accessor('Importe', {
      header: 'Importe depositado',
      id: 'importe',
      cell: ({row}) => (
        <p className="cursor-pointer"
        onClick={() => window.location.replace(`/projects/estimates/${row.original.idProject}/collections/${row.original.id}?page=collections`)}
        >{CurrencyFormatter({
          currency: 'MXN',
          value: row.original.Importe
        })}</p>
      ),
    }),
  ]

  const handleFilter = (dateS:Date, dateE:Date, arrStatuses:Array<string>) => {
    let statusesFil;

    console.log('sttuses rec => ', arrStatuses);
    if(arrStatuses.length > 0){
      statusesFil = collections.filter((c) => arrStatuses.includes(c.condition._id));
      console.log('stasuses fil => ', statusesFil);
    }else{
      statusesFil = collections;
    }

    const filtered = statusesFil.filter((c) => {
      let d = new Date(c.date).getTime();
      if(d >= dateS.getTime() && d <= dateE.getTime()){
        return c;
      }
    });

    console.log('filtered => ', filtered);

    setFilteredCollections(filtered);
    setIsFilter(true);
    updateTotal(getDate(dateS), getDate(dateE));
  }

  const updateTotal = async (dateI:string, dateF:string) => {
    const data={
      condition: statuses,
      conditionCharged:['678ed05cc5f08e8a0f36d5e1', '67d20e2959865f640af92682'],
      conditionAccountsReceivable:['67d20cb359865f640af92638'],
    }
    const rest = await getAllTotalAmountRecoveredCollection(token, dateI, dateF, data);
    if(typeof(rest)==='string'){
      showToastMessageError(rest);
    }else{
      setTotalCollections(rest);
    }
  }

  const addStatus = (status:string) => {
    const newStatus = [...statuses, status];
    setStatuses(newStatus);
    console.log('status => ', status);
    console.log('statuses => ', statuses);
    console.log('new est => ', newStatus);
    if(rangeDate.from && rangeDate.to){
      handleFilter(rangeDate.from, rangeDate.to, newStatus);
      // showToastMessageError('filtrearrr => ');
    }else{
      showToastMessageError('Seleccione un rango de fechas para filtrar');
    }
  }

  const deleteStatus = (status:string) => {
    const newStatus = statuses.filter((s) => s !== status);
    setStatuses(newStatus);
    if(rangeDate.from && rangeDate.to){
      handleFilter(rangeDate.from, rangeDate.to, newStatus);
      showToastMessageError('filtrarrrr');
    }else{
      showToastMessageError('Seleccione un rango de fechas para filtrar');
    }
  }

  const handleDate = (dateI: Date, dateF: Date) => {
    handleFilter(dateI, dateF, statuses);
    showToastMessageError('filtrar fechas => ');
    //actualizar total con el rango de fechas
  }

  let filterElemnts = <div className="flex gap-x-4 justify-end items-center">
                        <ChipStatus id="67e31aa81945c0b1e4c9bc76" addStatus={addStatus} removeStatus={deleteStatus} title="Depositado" />
                        <ChipStatus id="67e318171945c0b1e4c9bc72" addStatus={addStatus} removeStatus={deleteStatus} title="Confirmado" />
                        <ChipStatus id="67e318601945c0b1e4c9bc74" addStatus={addStatus} removeStatus={deleteStatus} title="Devuelto" />
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

  let data;
  // if(isFilter){
  //   console.log('is filter collections => ', filteredCollections);
  //   data = CollectionDataToTableDataFunction(filteredCollections);
  // }else{
  //   data = CollectionDataToTableDataFunction(collections);
  // }
data = CollectionDataToTableDataFunction(collections);
  console.log('data table => ', data);

  return (
    <>
      <div className="grid grid-cols-4 gap-x-3">
        <div className="p-3 flex gap-x-3 items-center bg-white shadow-md shadow-slate-300 rounded-md">
          <div>
            <p className="text-slate-600">Historial de cobranza</p>
          </div>
        </div>
        <Card amount={totalCollections?.amountRecovered? totalCollections.amountRecovered.amount: 0} title="Recuperado"></Card>
        <Card amount={totalCollections?.totalAccountsReceivable?.total || 0} title="Por cobrar"></Card>
        <Card amount={totalCollections?.totalCharged?.totalCharged || 0} title="Por cobrar vencido"></Card>
      </div>

      <div className="flex justify-between flex-wrap sm:flex-nowrap gap-x-5 gap-y-2 items-center mt-5">
        <div className="flex items-center w-full max-w-96">
          <Link href={'/'}>
            <div className="p-1 border border-slate-400 bg-white rounded-md">
              <TbArrowNarrowLeft className="w-9 h-9 text-slate-600" />
            </div>
          </Link>
          <p className="text-xl ml-4 font-medium">Recuperacion de cartera</p>
        </div>
        <div className={`flex gap-x-3 gap-y-3 w-full justify-end`}>
          <div className="">
            <SearchInTable placeH={"Buscar cobro.."} />
          </div>
          <div className={''}>
            <div className="flex gap-x-4 gap-y-4 justify-end items-center">
              {widthPage < 1080 && filterElemnts}
              <Button onClick={() => setShowNewCollection(true)}>Nuevo</Button>
            </div>
          </div>
        </div>
      </div>
      {widthPage > 1080 && filterElemnts}
      {/* <Table columns={columns} data={data} placeH="buscar cobro" /> */}
      {rangeDate.from && rangeDate.to ? (
        <ReactTableCollections columns={columns} data={data} arrStatuses={statuses} 
          dateE={rangeDate.to} dateS={rangeDate.from} isFiter={isFilter} />
      ): (
        <ReactTableCollections columns={columns} data={data} arrStatuses={statuses} 
          dateE={new Date()} dateS={new Date()} isFiter={false} />
      )}
    </>
  )
}

export const Card = ({amount, title}: {title:string, amount:number}) => {
  return(
    <div className="p-3 flex gap-x-3 items-center bg-white shadow-md shadow-slate-300 rounded-md">
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

function CollectionDataToTableDataFunction(collections:ICollectionMin[]){
  const table: ITableCollectionMin[] = [];
  collections.map((col) => {
    table.push({
      Cuenta: col.account,
      Estimacion: '',
      // Facturas: [col.invoices],
      Fecha: col.date,
      id: col._id,
      Importe: col.amount,
      Referencia: col.reference,
      // status: col.condition,
      concept: col.concept,
      confirm: col.condition.name.toLowerCase().includes('confirmado'),
      idProject: col.invoices.project._id,
      folioInvoice: col.invoices.invoices.folio,
      nameStatus: col.condition.name,
      colorStatus: col.condition.color,
      idStatus: col.condition._id
    })
  });

  return table;
}