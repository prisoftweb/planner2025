'use client'
import { createColumnHelper } from "@tanstack/react-table";
import Table from "@/components/Table";
import { ProjectsTable, ProjectMin } from "@/interfaces/Projects";
import { MoneyFormatter } from "@/app/functions/Globals";
import { CurrencyFormatter } from "@/app/functions/Globals";
import Link from "next/link";
import DeleteElement from "@/components/DeleteElement";
import { RemoveProject } from "@/app/api/routeProjects";
import Chip from "@/components/providers/Chip";

export default function TableProjectsClient({projects}:{projects: ProjectMin[]}){
  
  const columnHelper = createColumnHelper<ProjectsTable>();

  const columns = [
    // columnHelper.accessor(row => row.id, {
    //   id: 'seleccion',
    //   cell: ({row}) => (
    //     <div className="flex gap-x-2">
    //       <input type="checkbox" 
    //         checked={row.getIsSelected()}
    //         onChange={row.getToggleSelectedHandler()}
    //       />
    //     </div>
    //   ),
    //   size: 300,
    //   enableSorting:false,
    //   header: ({table}:any) => (
    //     <input type="checkbox"
    //       checked={table.getIsAllRowsSelected()}
    //       onClick={()=> {
    //         table.toggleAllRowsSelected(!table.getIsAllRowsSelected())
    //       }}
    //     />
    //   )
    // }),
    columnHelper.accessor('condition', {
      id: 'accion',
      cell: ({row}) => (
        <div className="flex gap-x-1 items-center">
          <img src={row.original.imgProject} alt="foto" className="w-8 h-8" />
          <div className={`w-5 h-5`} style={{'backgroundColor': row.original.condition}}></div>
        </div>
      ),
      enableSorting:false,
      header: () => (
        <p>accion</p>
      )
    }),
    columnHelper.accessor('percentage', {
      header: 'Avance',
      id: 'avance',
      cell: ({row}) => (
        <div className="">
          <p>{row.original.percentage}</p>
          <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
            <div className="bg-purple-600 h-2.5 rounded-full dark:bg-purple-500" 
              style={{"width": row.original.percentage}}></div>
          </div>
        </div>
      )
    }),
    columnHelper.accessor('account', {
      header: 'Cuenta',
      id: 'cuenta',
      cell: ({row}) => (
        <p className="py-2 font-semibold cursor-pointer"
          onClick={() => window.location.replace(`/projects/estimates/${row.original.id}`)}
        >{row.original.account}</p>
      )
    }),
    columnHelper.accessor('project', {
      header: 'Proyecto',
      id: 'proyecto',
      cell: ({row}) => (
        <p className="cursor-pointer"
          onClick={() => window.location.replace(`/projects/estimates/${row.original.id}`)}
        >{row.original.project}</p>
      ),
    }),
    columnHelper.accessor('category', {
      header: 'Estatus',
      id: 'categoria',
      cell: ({row}) => (
        <Chip label={row.original.category} color={row.original.condition} darktext={row.original.darktext} />
      ),
    }),
    columnHelper.accessor('date', {
      header: 'Fecha',
      id: 'fecha',
      cell: ({row}) => (
        <p className="cursor-pointer"
          onClick={() => window.location.replace(`/projects/estimates/${row.original.id}`)}
        >{row.original.date?.substring(0, 10) || ''}</p>
      ),
    }),
    columnHelper.accessor('amount', {
      header: 'Monto',
      id: 'monto',
      cell: ({row}) => (
        <p className="cursor-pointer"
          onClick={() => window.location.replace(`/projects/estimates/${row.original.id}`)}
        >
          {MoneyFormatter(row.original.amount)}
        </p>
      ),
    }),
  ]
  
  const dataTable: ProjectsTable[] = ProjectsClientDataToTableDataMin(projects);

  let view = <Table columns={columns} data={dataTable} placeH="Buscar proyecto.." />;

  return(
    <>
      <div className="hidden md:block w-full">
        {view}
      </div>
      <div className="block md:hidden w-full">
        <ListData data={dataTable} />
      </div>
    </>
  )
}

const ListData = ({data}: {data: ProjectsTable[]}) => {

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

  return(
    <div>
      <div className="relative flex flex-col text-gray-700 bg-white shadow-md w-full rounded-xl bg-clip-border] h-[calc(100vh-264px)]">
        <nav className="flex w-full flex-col gap-1 p-2 font-sans text-base font-normal text-blue-gray-700
          overflow-scroll overflow-y-auto overflow-x-hidden" style={{scrollbarColor: '#ada8a8 white', scrollbarWidth: 'thin'}}>

          {data.map((p) => (
            <CardProjectResponsive project={p} key={p.id} />
          ))}

        </nav>
      </div>
    </div>
  )
}

const CardProjectResponsive = ({project }: 
  {project:ProjectsTable }) => {

  return(
    <div role="button"
      key={project.id}
      // onClick={() => window.location.replace(`/reports/${report.id}/profile`)}
      className={`flex items-center justify-between w-full p-3 leading-tight transition-all rounded-lg 
        outline-none text-start hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 
        focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 
        active:bg-opacity-80 active:text-blue-gray-900 border-b border-slate-300 
        bg-white`}
    >
      <div className="flex items-center w-full ">
        <div className="grid mr-4 place-items-center">
          <img alt="responsable" src={ project.imgProject ?? '/img/users/default.jpg'}
            className="relative inline-block h-12 w-12 !rounded-full  object-cover object-center" />
          {/* <DeleteElement id={project.id} name={project.name} remove={RemoveCompany} token={token} /> */}
        </div>
        <div className="w-full">
          <div className="flex gap-x-3 w-full justify-between items-center p-3"
            onClick={() => window.location.replace(`/projects/estimates/${project.id}`)}
          >
            <div>
              <h6
                className="block font-sans text-sm antialiased font-semibold leading-relaxed tracking-normal text-gray-600 ">
                {project.project}
              </h6>
              <p className="block font-sans text-sm antialiased font-normal leading-normal text-gray-600">
                {project.date.substring(0, 10)}
              </p>
            </div>
            <div className="text-right">
              <p className="block font-sans text-2xl antialiased font-normal leading-normal text-blue-600">
                <Chip label={project.category} color={project.condition} darktext={project.darktext} />  
              </p>
              <p className="block font-sans text-xs antialiased font-normal leading-normal text-gray-600">
                {CurrencyFormatter({
                  currency: "USD",
                  value: project.amount
                })}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export function CardProject({project, token, deleteIcon=true, url=`/projects/${project._id}/profile`}:
  {project:ProjectMin, token:string, deleteIcon?:boolean, url?:string}){

return(
  <>
    <Link href={url}>
      <div className="grid grid-cols-3 gap-x-2 p-3 border border-slate-700 
          rounded-xl bg-white shadow-md shadow-slate-500 hover:shadow-xl 
          hover:shadow-slate-600">
        <div className="col-span-2">
          <div className="flex items-center justify-between">
            <div className="flex flex-col items-center gap-y-1">
              <img src={'/img/projects/default.svg'} alt="logo" className="w-8 h-auto rounded-full" />
              <div className={`w-3 h-3 bg-green-500`}></div>
            </div>
            <div>
              <p>{project.title}</p>
              <p>{project.account}</p>
            </div>
            <div>
              {deleteIcon && <DeleteElement id={project._id} name={project.title} 
                                token={token} remove={RemoveProject} />}
            </div>
          </div>
          <div className="flex items-center">
            <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
              <div className="bg-purple-600 h-2.5 rounded-full dark:bg-purple-500" 
                    style={{"width": project.progress?? 0}}></div>
              </div>
              <p>{project.progress?? 0}%</p>
            </div>
          </div>
          <div className="text-right flex flex-col justify-between">
            <p className="text-base">{CurrencyFormatter({
                currency: "USD",
                value: project.amount
              })}
            </p>
          </div>
        </div>
      </Link>
    </>
  )
}

function ProjectsClientDataToTableDataMin(projects:ProjectMin[]){
  const table: ProjectsTable[] = [];
  projects.map((project) => {
    let p: string;
    if(project.progress){
      p = project.progress.toString() + '%';
    }else{
      p = '0%';
    }
    
    let cond: string;

    if(project?.category){
      cond = project.category.color || '#f00';
    }else{
      cond = '#f00';
    }

    table.push({
      amount: project.amount,
      category: project?.category?.name ?? 'NA',
      client: 'Sin cliente',
      code: 'codigo',
      date: project.date.substring(0, 10),
      id: project._id,
      project:project.title,
      condition: cond,
      percentage: p,
      imgProject: '/img/projects/default.svg',
      account: project.account,
      total: project.amountotal,
      hasamountChargeOff: project.hasamountChargeOff?? false, 
      hasguaranteefund: project.hasguaranteefund, 
      includesTaxes: project.includesTaxes?? false,
      imgUser: '/img/users/default.jpg',
      darktext: project.category?.darktext ?? false
    })
  });

  return table;
}