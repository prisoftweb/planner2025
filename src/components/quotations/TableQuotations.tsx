'use client'
import { createColumnHelper } from "@tanstack/react-table";
import Table from "@/components/Table";
import { IQuotationTable, IQuotationMin } from "@/interfaces/Quotations";
// import DeleteElement from "../DeleteElement";
import RemoveElement from "../RemoveElement";
import Chip from "../providers/Chip";
import { CurrencyFormatter } from "@/app/functions/Globals";
import { removeQuotation } from "@/app/api/routeQuotations";
import RatingComponent from "./RatingComponent";

export default function TableQuotations({quotationsData, token, deleteQuatation}:
  {quotationsData: IQuotationTable[], token:string, deleteQuatation: Function}){
  
  const columnHelper = createColumnHelper<IQuotationTable>();

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
      size: 300,
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
    columnHelper.accessor('Detalle', {
      id: 'Detalle',
      cell: ({row}) => (
        <div className="flex gap-x-1 items-center">
          <img src={row.original.Detalle.photo} alt="foto" className="w-8 h-8" />
          <RemoveElement id={row.original.id} name={row.original.Titulo} remove={removeQuotation} 
              token={token} removeElement={deleteQuatation} />
        </div>
      ),
      enableSorting:false,
      header: () => (
        <p>accion</p>
      )
    }),
    columnHelper.accessor('Folio', {
      header: 'Folio',
      id: 'folio',
      cell: ({row}) => (
        <p className="py-2 font-semibold cursor-pointer"
          onClick={() => window.location.replace(`/quotations/${row.original.id}`)}
        >{row.original.Folio}</p>
      )
    }),
    columnHelper.accessor('score', {
      header: 'Puntuacion',
      id: 'puntuacion',
      cell: ({row}) => (
        <p className="cursor-pointer"
          onClick={() => window.location.replace(`/quotations/${row.original.id}`)}
        ><RatingComponent setValue={() => {}} 
            value={row.original.score} isDisabled={true} size="small" /></p>
      ),
    }),
    columnHelper.accessor('Titulo', {
      header: 'Titulo',
      id: 'titulo',
      cell: ({row}) => (
        <p className="cursor-pointer"
          onClick={() => window.location.replace(`/quotations/${row.original.id}`)}
        >{row.original.Titulo}</p>
      ),
    }),
    columnHelper.accessor('Cliente', {
      header: 'Cliente',
      id: 'cliente',
      cell: ({row}) => (
        <p className="cursor-pointer"
          onClick={() => window.location.replace(`/quotations/${row.original.id}`)}
        >{row.original.Cliente.name}</p>
      ),
    }),
    columnHelper.accessor('Estatus', {
      header: 'Estatus',
      id: 'estatus',
      cell: ({row}) => (
        <p className="cursor-pointer"
          onClick={() => window.location.replace(`/quotations/${row.original.id}`)}
        ><Chip label={row.original.Estatus.name} color={row.original.Estatus.color} /></p>
      ),
    }),
    columnHelper.accessor('Fechasol', {
      header: 'Fecha Sol',
      id: 'fechasol',
      cell: ({row}) => (
        <p className="cursor-pointer"
          onClick={() => window.location.replace(`/quotations/${row.original.id}`)}
        >{row.original.Fechasol?.substring(0, 10) || ''}</p>
      ),
    }),
    columnHelper.accessor('Fechaenv', {
      header: 'Fecha Env',
      id: 'fechaenv',
      cell: ({row}) => (
        <p className="cursor-pointer"
          onClick={() => window.location.replace(`/quotations/${row.original.id}`)}
        >{row.original.Fechaenv?.substring(0, 10) || ''}</p>
      ),
    }),
    columnHelper.accessor('Monto', {
      header: 'Monto',
      id: 'monto',
      cell: ({row}) => (
        <p className="cursor-pointer"
          onClick={() => window.location.replace(`/quotations/${row.original.id}`)}
        >{CurrencyFormatter({
          currency: 'MXN',
          value: row.original.Monto
        })}</p>
      ),
    }),
  ]

  // let view = <></>;
  // if(isTable){
  //   view = (<Table columns={columns} data={dataProjects} placeH="Buscar proyecto.." typeTable="projects" />);
  // }else{
  //   view = (<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-x-4 gap-y-3">
  //             {filteredProjects.map((project, index:number) => (
  //               <CardProject project={project} token={token} key={index} />
  //             ))}
  //           </div>)
  // }

  return(
    <>
      <Table columns={columns} data={quotationsData} placeH="Buscar cotizacions.." typeTable="quotations" />
    </>
  )
}