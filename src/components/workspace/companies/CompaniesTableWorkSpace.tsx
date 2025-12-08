import Button from "@/components/Button"
import { useState } from "react"
import { createColumnHelper } from "@tanstack/react-table";
import Table from "@/components/Table";
import { ITableCompanyWorkSpace } from "@/interfaces/WorkSpaces";
import NewCompanyContainer from "./NewCompanyContainer";
import ContainerSideNav from "@/components/ContainerSideNav";
import { ICompanyWorkSpace } from "@/interfaces/WorkSpaces";
import { getCompanies } from "@/app/api/routeCompany";
import { showToastMessageError } from "@/components/Alert";

export default function CompaniesTableWorkSpace({companiesParam, token}: 
  {companiesParam: ICompanyWorkSpace[], token:string}) {

  const [companies, setCompanies]=useState(companiesParam);
  const [openNewCompany, setOpenNewCompany]=useState<boolean>(false);

  const handleOpenNewCompany = (value:boolean) => {
    setOpenNewCompany(value);
  }

  const handleFetchCompanies = async () => {
    const res = await getCompanies(token);
    if(typeof(res)==='string'){
      showToastMessageError(res);
    }else{
      setCompanies(res);
      setOpenNewCompany(false);
    }
  }

  const columnHelper = createColumnHelper<ITableCompanyWorkSpace>();
  
  const columns = [
    // columnHelper.accessor(row => row.id, {
    //   id: 'seleccion',
    //   cell: ({row}) => (
    //     <div className="flex gap-x-2">
    //       <input type="checkbox" 
    //         checked={row.getIsSelected()}
    //         onChange={row.getToggleSelectedHandler()}
    //       />
    //       <img src={row.original.logo} 
    //         className="w-12 h-auto rounded-full" 
    //         alt="logo" />
    //     </div>
    //   ),
    //   enableSorting:false,
    //   header: ({table}:any) => (a
    //     <input type="checkbox"
    //       checked={table.getIsAllRowsSelected()}
    //       onClick={()=> {
    //         table.toggleAllRowsSelected(!table.getIsAllRowsSelected())
    //       }}
    //     />
    //   )
    // }),
    columnHelper.accessor(row => row.id, {
      id: 'accion',
      cell: ({row}) => (
        <img src={row.original.logo} 
            className="w-12 h-auto rounded-full" 
            alt="logo" />
      ),
      enableSorting:false,
      header: () => (
        <p>Logotipo</p>
      )
    }),
    columnHelper.accessor('name', {
      header: 'Compañia',
      id: 'compania',
      cell: ({row}) => (
        <p className="py-2 font-semibold">{row.original.name}</p>
      )
    }),
    columnHelper.accessor('status', {
      header: 'Estatus',
      id: 'estatus',
      cell: ({row}) => (
        <div className="flex justify-center  items-center">
          <div className={`w-6 h-6 rounded-full ${row.original.status? 'bg-green-500': 'bg-red-500'}`}></div>
        </div>
      ),
    }),
    columnHelper.accessor('date', {
      header: 'Fecha',
      id: 'fecha',
      cell: ({row}) => (
        <p className="py-2 text-center text-slate-500">{row.original.date}</p>
      )
    }),
    columnHelper.accessor('fisica', {
      header: 'Fisica | Moral',
      id: 'fisica',
      cell: ({row}) => (
        <p className="py-2 text-center text-slate-500">pendiente</p>
      )
    }),
  ];

  const data=TransformCompaniesDataInDataCompaniesTable(companies);

  return (
    <div>
      <div className="flex justify-between items-center">
        <div className="flex mt-2 items-center">
          <img src={'/img/projects/default.jpg'} alt="logo" className="rounded-full w-14 h-auto" />
          <div className="ml-2">
            <p className="text-xl">Perfiles de compañias</p>
            <p className="text-gray-500 text-sm">Lista de compañias</p>
          </div>
        </div>

        <Button onClick={() => setOpenNewCompany(true)}>Nueva</Button>
      </div>

      <div className="pt-3 mt-2 border-t border-slate-600">
        <Table columns={columns} data={data} placeH="Buscar compañia.." />
      </div>

      {openNewCompany && (
        <ContainerSideNav width="w-full sm:max-w-lg">
          <NewCompanyContainer token={token} handleOpen={handleOpenNewCompany} 
              handleFetchCompanies={handleFetchCompanies} />
        </ContainerSideNav>
      )}

    </div>
  )
}


export function TransformCompaniesDataInDataCompaniesTable(companies:ICompanyWorkSpace[]){

  const companiesData: ITableCompanyWorkSpace[] = companies.map((c) => {
    return {
      date: '',
      fisica: true,
      id: c._id,
      logo: c.logo,
      name: c.name,
      rfc: '',
      status: true
    };
  })

  return companiesData;

}