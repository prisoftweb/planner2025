'use client'

import { useState, useEffect } from "react"
import { showToastMessage, showToastMessageError } from "@/components/Alert";
import Table from "@/components/Table";
import { createColumnHelper } from "@tanstack/react-table";
import { CurrencyFormatter } from "@/app/functions/Globals";
import RemoveElement from "@/components/RemoveElement";
import Chip from "@/components/providers/Chip";
import { getCollectionsMin, deleteCollection } from "@/app/api/routeCollections";
import { ICollectionMin, ITableCollection } from "@/interfaces/Collections";
import { CollectionDataToTableData } from "@/app/functions/CollectionsFunctions";
import Button from "../Button";
import { GiSettingsKnobs } from "react-icons/gi";
import SearchInTable from "../SearchInTable";
import Link from "next/link";
import { TbArrowNarrowLeft } from "react-icons/tb";
import AddNewCollectionComponent from "./AddNewCollection";
import FilteringCollectionsComponent from "./FilteringCollectionsComponent";

export default function TableCollectionsComponent({token, user}: {token:string, user:string}) {

  const [collections, setCollections] = useState<ICollectionMin[]>([]);
  const [filteredCollections, setFilteredCollections] = useState<ICollectionMin[]>([]);
  const [showNewCollection, setShowNewCollection]= useState<boolean>(false);
  const [isFilter, setIsFilter]=useState<boolean>(false);
  const [showIsFilter, setShowIsFilter]=useState<boolean>(false);

  useEffect(() => {
    const fetch = async() => {
      const res = await getCollectionsMin(token);
      if(typeof(res)==='string'){
        showToastMessageError(res);
      }else{
        setCollections(res);
        setFilteredCollections(res);
      }
    }

    fetch();
  }, []);

  const updateCollections = async() => {
    const res = await getCollectionsMin(token);
    if(typeof(res)==='string'){
      showToastMessageError(res);
    }else{
      setCollections(res);
      setIsFilter(false);
      // setFilteredCollections(res);
    }
  }

  const handleShowCollection = (value: boolean) => {
    setShowNewCollection(value);
  }

  // const handleIsFilter = (value:boolean) => {
  //   setIsFilter(value);
  // }

  const handleShowIsFilter = (value:boolean) => {
    setShowIsFilter(value);
  }

  if(collections.length <= 0){
    return (
      <>
        <div className="flex flex-col items-center">
          <p className="text-5xl mt-20 font-bold">Cobranza</p>
          <p className="text-xl mt-10 text-slate-700 font-bold" 
            >Gestiona las cuentas por cobrar,
            recuperacion de cobranza y mas
            desde Planner</p>
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

  const columnHelper = createColumnHelper<ITableCollection>();
  
  const columns = [
    columnHelper.accessor(row => row.id, {
      id: 'Accion',
      cell: ({row}) => (
        <div className="flex gap-x-2">
          {/* <input type="checkbox" 
            checked={row.getIsSelected()}
            onChange={row.getToggleSelectedHandler()}
          /> */}
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
        onClick={() => window.location.replace( `/projects/estimates/${row.original.Facturas[0].project._id}/collections/${row.original.id}?page=collections`)}
        >{row.original.Referencia}</p>
      ),
    }),
    columnHelper.accessor('Fecha', {
      header: 'Fecha',
      id: 'fecha',
      cell: ({row}) => (
        <p className="cursor-pointer"
        onClick={() => window.location.replace(`/projects/estimates/${row.original.Facturas[0].project._id}/collections/${row.original.id}?page=collections`)}
        >{row.original.Fecha.substring(0, 10)}</p>
      ),
    }),
    columnHelper.accessor('concept', {
      header: 'Concepto',
      id: 'concepto',
      cell: ({row}) => (
        <p className="cursor-pointer"
        onClick={() => window.location.replace(`/projects/estimates/${row.original.Facturas[0].project._id}/collections/${row.original.id}?page=collections`)}
        >{row.original.concept}</p>
      ),
    }),
    columnHelper.accessor('Facturas', {
      header: 'Facturas',
      id: 'facturas',
      cell: ({row}) => (
        <div>
          {row.original.Facturas.map((f) => (
            <Chip label={f.invoices.folio} color={'#466'} key={f._id} />
          ))}
        </div>
      )
    }),
    columnHelper.accessor('status', {
      header: 'Estatus',
      id: 'estatus',
      cell: ({row}) => (
        <Chip label={row.original.status.name} color={row.original.status.color} />
      ),
    }),
    columnHelper.accessor('Cuenta', {
      header: 'Cuenta',
      id: 'cuenta',
      cell: ({row}) => (
        <p className="cursor-pointer"
        onClick={() => window.location.replace(`/projects/estimates/${row.original.Facturas[0].project._id}/collections/${row.original.id}?page=collections`)}
        >{row.original.Cuenta}</p>
      ),
    }),
    columnHelper.accessor('Importe', {
      header: 'Importe depositado',
      id: 'importe',
      cell: ({row}) => (
        <p className="cursor-pointer"
        onClick={() => window.location.replace(`/projects/estimates/${row.original.Facturas[0].project._id}/collections/${row.original.id}?page=collections`)}
        >{CurrencyFormatter({
          currency: 'MXN',
          value: row.original.Importe
        })}</p>
      ),
    }),
  ]

  const collectionM = collections.reduce((previous, current) => {
    return current.amount > previous.amount ? current : previous;
  });

  const maxAmount = collectionM.amount;

  const dateValidation = (date:string, startDate:number, endDate:number) => {
    let d = new Date(date).getTime();
    if(d >= startDate && d <= endDate){
      console.log('date true => ');
      return true;
    }
    console.log('date false');
    return false;
  }

  const amountValidation = (collection:ICollectionMin, startDate:number, endDate:number, 
        minAmount:number, maxAmount:number) => {
    if(collection.amount >= minAmount && collection.amount <= maxAmount){
      console.log('min amout ', minAmount, ' max amount => ', maxAmount);
      if(dateValidation(collection.date, startDate, endDate)){
        return true;
      }
      // if(dateValidation(new Date().toISOString(), startDate, endDate)){
      //   return true;
      // }
    }
    return false;
  }

  
  const clientsValidation = (collection:ICollectionMin, startDate:number, endDate:number, 
    minAmount:number, maxAmount:number, clients:string[]) => {
    if(clients.includes('all')){
      console.log('clients all => ', clients);
      if(amountValidation(collection, startDate, endDate, minAmount, maxAmount))
        return true;
      return false;
    }else{
      if(collection.client._id)
        console.log('client id => ', clients);
        if(clients.includes(collection.client._id))
          if(amountValidation(collection, startDate, endDate, minAmount, maxAmount))
            return true;
      return false;
    }
  }

  const conditionsValidation = (collection:ICollectionMin, startDate:number, endDate:number, 
        minAmount:number, maxAmount:number, clients:string[], conditions:string[]) => {
    if(conditions.includes('all')){
      console.log('consitions all => ', conditions);
      if(clientsValidation(collection, startDate, endDate, minAmount, maxAmount, clients))
        return true;
      return false;
    }else{
      console.log('conditions id => ', conditions);
      if(conditions.includes(collection.condition._id))
        if(clientsValidation(collection, startDate, endDate, minAmount, maxAmount, clients))
          return true;
      return false;
    }
  }

  const filterData = (conditions:string[], minAmount:number, 
    maxAmount:number, startDate:number, endDate:number, clients:string[]) => {
  
    let filtered: ICollectionMin[] = [];
    collections.map((collection) => {
      if(conditionsValidation(collection, startDate, endDate, minAmount, maxAmount, clients, conditions)){
        filtered.push(collection);
      }
    });
    console.log('collections => ', collections);
    console.log('filtered => ', filtered);
    // setFilteredProjects(filtered);
    setFilteredCollections(filtered);
    setIsFilter(true);
    // setDataProjects(ProjectDataToTableDataMin(filtered));
    // setFilter(true); usar setIsFilter() => parametro
  }

  let data;
  if(isFilter){
    data = CollectionDataToTableData(filteredCollections);
  }else{
    data = CollectionDataToTableData(collections);
  }
  // const data = CollectionDataToTableData(collections);
  console.log('data => ', data);

  return (
    <>
      <div className="grid grid-cols-4 gap-x-3">
        <div className="p-3 flex gap-x-3 items-center bg-white shadow-md shadow-slate-300 rounded-md">
          <div>
            <p className="text-slate-600">Historial de cobranza</p>
          </div>
        </div>
        <Card amount={2345136.90} title="Recuperado"></Card>
        <Card amount={456938.07} title="Por cobrar"></Card>
        <Card amount={356938.07} title="Por cobrar vencido"></Card>
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
          <SearchInTable placeH={"Buscar cobro.."} />
          <div className={''}>
            <div className="flex gap-x-4 justify-end items-center">
              <GiSettingsKnobs 
                onClick={() => setShowIsFilter(true)}
                className="text-slate-600 w-8 h-8 cursor-pointer hover:text-slate-300"
              />  
              <Button onClick={() => setShowNewCollection(true)}>Nuevo</Button>
            </div>
          </div>
        </div>
      </div>
      <Table columns={columns} data={data} placeH="buscar cobro" />
      {showNewCollection && <AddNewCollectionComponent showForm={handleShowCollection} token={token} 
                                user="" updateCollections={updateCollections} />}
      {showIsFilter && <FilteringCollectionsComponent FilterData={filterData} maxAmount={maxAmount} showForm={handleShowIsFilter} token={token} />}
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