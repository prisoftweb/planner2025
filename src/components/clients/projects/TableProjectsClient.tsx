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
        // <p className="cursor-pointer"
        //   onClick={() => window.location.replace(`/projects/estimates/${row.original.id}`)}
        // >{row.original.category}</p>
        <Chip label={row.original.category} color={row.original.condition} />
      ),
    }),
    // columnHelper.accessor('client', {
    //   header: 'Cliente',
    //   id: 'cliente',
    //   cell: ({row}) => (
    //     <p className="cursor-pointer"
    //       onClick={() => window.location.replace(`/projects/estimates/${row.original.id}`)}
    //     >{row.original.client}</p>
    //   ),
    // }),
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
  
  // const [maxAmount, setMaxAmount] = useState<number>(0);
  // useEffect(() => {
  //   const projectMax = projects.reduce(((previous, current) => {
  //     return current.amount > previous.amount ? current: previous;
  //   }));
  //   setMaxAmount(projectMax.amount);
  // }, [])

  // const [filteredProjects, setFilteredProjects] = useState<IProjectWithEstimateMin[]>(projects);
  const dataTable: ProjectsTable[] = ProjectsClientDataToTableDataMin(projects);

  // let view = <></>;
  // if(isTable){
  //   view = (<Table columns={columns} data={dataTable} placeH="Buscar proyecto.." />);
  // }else{
  //   view = (<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-x-4 gap-y-3">
  //             {projects.map((project, index:number) => (
  //               <CardProject project={project} token={token} key={index} deleteIcon={false} 
  //                 url={`/projects/estimates/${project._id}`}  />
  //             ))}
  //           </div>)
  // }

  let view = <Table columns={columns} data={dataTable} placeH="Buscar proyecto.." />;

  // const dateValidation = (date:string, startDate:number, endDate:number) => {
  //   let d = new Date(date).getTime();
  //   if(d >= startDate && d <= endDate){
  //     return true;
  //   }
  //   return false;
  // }

  // const amountValidation = (project:IProjectWithEstimateMin, startDate:number, endDate:number, 
  //       minAmount:number, maxAmount:number) => {
  //   if(project.amount >= minAmount && project.amount <= maxAmount){
  //     // if(dateValidation(project.date, startDate, endDate)){
  //     //   return true;
  //     // }
  //     if(dateValidation(new Date().toISOString(), startDate, endDate)){
  //       return true;
  //     }
  //   }
  //   return false;
  // }

  // const categoriesValidation = (project:IProjectWithEstimateMin, startDate:number, endDate:number, 
  //           minAmount:number, maxAmount:number, categories:string[]) => {
  //   if(categories.includes('all')){
  //     if(amountValidation(project, startDate, endDate, minAmount, maxAmount))
  //       return true
  //     return false;
  //   }else{
  //     if(project.segment)
  //       if(categories.includes(project.segment._id))
  //         if(amountValidation(project, startDate, endDate, minAmount, maxAmount))
  //           return true
  //     return false;
  //   }
  // }

  // const typesValidation = (project:IProjectWithEstimateMin, startDate:number, endDate:number, 
  //   minAmount:number, maxAmount:number, categories:string[], types:string[]) => {
  //   if(types.includes('all')){
  //     if(categoriesValidation(project, startDate, endDate, minAmount, maxAmount, categories))
  //       return true;
  //     return false;
  //   }else{
  //     if(project.type)
  //       if(types.includes(project.type._id))
  //         if(categoriesValidation(project, startDate, endDate, minAmount, maxAmount, categories))
  //           return true;
  //     return false;
  //   }
  // }

  // const conditionsValidation = (project:IProjectWithEstimateMin, startDate:number, endDate:number, 
  //       minAmount:number, maxAmount:number, categories:string[], 
  //       types:string[], conditions:string[]) => {
  //   if(conditions.includes('all')){
  //     if(typesValidation(project, startDate, endDate, minAmount, maxAmount, categories, types))
  //       return true;
  //     return false;
  //   }else{
  //     if(conditions.includes(project.category._id))
  //       if(typesValidation(project, startDate, endDate, minAmount, maxAmount, categories, types))
  //         return true;
  //     return false;
  //   }
  // }

  const filterData = (conditions:string[], types:string[], 
    categories:string[], minAmount:number, maxAmount:number, startDate:number, endDate:number) => {
  
    // let filtered: IProjectWithEstimateMin[] = [];
    // projects.map((project) => {
    //   if(conditionsValidation(project, startDate, endDate, minAmount, maxAmount, categories, types, conditions)){
    //     filtered.push(project);
    //   }
    // });
    // setFilteredProjects(filtered);
    // setDataProjects(ProjectDataToTableDataMin(filtered));
    // setFilter(true); usar setIsFilter() => parametro
  }

  return(
    <>
      {/* <div className="flex justify-end mb-5">
        {isFilter && <Filtering showForm={setIsFilter} optCategories={optCategories} 
                                  optTypes={optTypes} optConditions={optConditions} 
                                  FilterData={filterData} maxAmount={maxAmount}  />}
      </div> */}
      {view}
    </>
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
                currency: "MXN",
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
      total: project.amountotal
    })
  });

  return table;
}