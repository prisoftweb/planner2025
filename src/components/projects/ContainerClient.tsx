'use client'
import ButtonNew from "./ButtonNew"
import TableProjects from "./TableProjects"
import { useState, useEffect } from "react"
import { Options } from "@/interfaces/Common"
import { ProjectsTable, ProjectMin, IProyectCostBen, ICosBen, ICostosTotales, IBeneficiosTotales } from "@/interfaces/Projects"
import { VscListUnordered } from "react-icons/vsc";
import { PiTableThin } from "react-icons/pi";
import Link from "next/link"
import { TbArrowNarrowLeft } from "react-icons/tb"
import SearchInTable from "../SearchInTable"
import { useProjectsStore } from "@/app/store/projectsStore"
import WithOut from "../WithOut"
import { UsrBack } from "@/interfaces/User"
import { showToastMessageError } from "../Alert"
import { ProjectDataToTableDataMin } from "@/app/functions/SaveProject"
import { getActiveProjectsMin, getProjectsByConditionMin, getProjectsMinFinishedUser, 
  getProjectsMinInEjecucionUser } from "@/app/api/routeProjects"
import TooltipContainerIcon from "../tooltipIcons/TooltipContainerIcon"
import TooltipFilterIcon from "../tooltipIcons/TooltipFilterIcon"
import { PDFDownloadLink } from "@react-pdf/renderer"
import { BsFileEarmarkPdf } from "react-icons/bs";
import DownloadReportCBPDF from "./DownloadReportCBPDF"

type Props = {
  token:string, 
  optClients:Options[], 
  user:UsrBack,
  optCategories:Options[], 
  optTypes:Options[],
  optCompanies: Options[], 
  data:ProjectsTable[], 
  projects: ProjectMin[], 
  optCategoriesFilter: Options[], 
  optTypesFilter: Options[], 
  optConditionsFilter: Options[], 
  condition: string,
  prjsCB:IProyectCostBen[], 
  cosBen:ICosBen, 
  costTot:ICostosTotales, 
  benTot:IBeneficiosTotales
}

export default function ContainerClient({token, optClients, optCategories, 
  optTypes, user, optCompanies, data, optCategoriesFilter, optConditionsFilter, 
  optTypesFilter, projects, condition, benTot, cosBen, costTot, prjsCB}: Props){

  const [isFilter, setIsFilter] = useState<boolean>(false);
  const [isTable, setIsTable] = useState<boolean>(true);
  const [dataTable, setDataTable] = useState<ProjectsTable[]>(data);

  const [selected, setSelected] = useState("Ganancia");

  const options = ["Ganancia", "Costo-Beneficio"];

  let role = user.rol?.name || '';

  const {haveNewProject, projectStore, 
    updateProjectStore, updateHaveNewProject} = useProjectsStore();

  useEffect(() => {
    updateProjectStore(projects);
  }, []);

  const handleFilter = (value:boolean) => {
    setIsFilter(value);
  }

  if( haveNewProject && projects.length <= 0 && projectStore.length <= 0){
    const aux = async () =>{
      let projs: ProjectMin[] = [];
      try {
        let rol = user.rol?.name || '';
        if(rol.toLowerCase().includes('residente')){
          const prj1 = await getProjectsMinInEjecucionUser(token, user._id);
          const prj2 = await getProjectsMinFinishedUser(token, user._id);

          if(typeof(prj1)==='string'){
            showToastMessageError(prj1);
            if(typeof(prj2)==='string'){
              showToastMessageError(prj2);
            }else{
              projs=prj2;
            }
          }else{
            if(typeof(prj2)==='string'){
              showToastMessageError(prj2);
              projs=prj1;
            }else{
              projs=[...prj1, ...prj2];
            }
          }
        }else{
          projs = await getActiveProjectsMin(token);
        }
        if(typeof(projs)==='string') showToastMessageError(projs);
        else{
          const d = ProjectDataToTableDataMin(projs);
          updateProjectStore(projs);
          setDataTable(d);
        }
      } catch (error) {
        showToastMessageError('Ocurrio un error al actualizar datos de la tabla!!');
      }
    }
    aux();
    updateHaveNewProject(false);
  }

  if(projects.length <= 0 && projectStore.length <= 0){
    return (
      <>
        <div className="p-2 sm:p-3 md-p-5 lg:p-10 w-full">
          <WithOut img="/img/projects.jpg" subtitle="Proyectos"
            text="Aqui puedes agregar nuevos proyectos
                    para la gestion desde Planner"
            title="Proyectos">
              <ButtonNew token={token} optClients={optClients} 
                      optCategories={optCategories} optTypes={optTypes}
                      user={user._id} optCompanies={optCompanies} 
                      condition={condition}  />
          </WithOut>
        </div>
      </>
    )
  }

  return(
    <div className="p-2 sm:p-3 md-p-5 lg:p-10 w-full">
      <div className="flex gap-y-3 gap-x-5 justify-between items-center flex-wrap md:flex-nowrap print:hidden">
        <div className="flex items-center print:hidden">
          <Link href={'/'}>
            <TooltipContainerIcon label="Regresar">
              <div className="p-1 border border-slate-400 bg-white rounded-md print:hidden hover:bg-blue-100">
                <TbArrowNarrowLeft className="w-10 h-10 text-slate-600 print:hidden" />
              </div>
            </TooltipContainerIcon>
          </Link>
          <p className="text-xl ml-4 font-medium">Proyectos</p>
        </div>
        <div className="flex w-full gap-x-3 gap-y-3 flex-wrap-reverse sm:flex-nowrap justify-end print:hidden">
          <SearchInTable placeH="Buscar proyecto.." />
          <div>
            <div className="flex gap-x-3 items-center print:hidden">
              {role.toLowerCase().includes('super') && (
                <>
                  <div className="inline-flex rounded-md shadow-sm" role="group">
                    {options.map((opt, index) => (
                      <button
                        key={opt}
                        onClick={() => setSelected(opt)}
                        className={`
                          px-4 py-2 text-sm font-medium border border-gray-300
                          ${index === 0 ? "rounded-l-lg" : ""}
                          ${index === options.length - 1 ? "rounded-r-lg" : ""}
                          ${selected === opt ? "bg-blue-600 text-white" : "bg-white hover:bg-gray-100"}
                        `}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                  {selected==='Ganancia'? (
                    <PDFDownloadLink document={<DownloadReportCBPDF key={'ganancia'} prjsCB={prjsCB} benTot={benTot} cosBen={cosBen} costTot={costTot} order={'Ganancia'} />} fileName={`Relacion de ganancias por proyectos`} >
                      {({loading, url, error, blob}) => 
                        loading? (
                          <TooltipContainerIcon label="Ganancia">
                            <BsFileEarmarkPdf className="w-8 h-8 text-slate-500" />
                          </TooltipContainerIcon>
                        ) : (
                          <TooltipContainerIcon label="Ganancia">
                            <BsFileEarmarkPdf className="w-8 h-8 text-green-500" />
                          </TooltipContainerIcon>
                        ) }
                    </PDFDownloadLink>
                  ): (
                    <PDFDownloadLink document={<DownloadReportCBPDF key={'cb'} prjsCB={prjsCB} benTot={benTot} cosBen={cosBen} costTot={costTot} order={'B/C'} />} fileName={`Relacion de costo beneficio B-C por proyectos`} >
                      {({loading, url, error, blob}) => 
                        loading? (
                          <TooltipContainerIcon label="costo beneficio">
                            <BsFileEarmarkPdf className="w-8 h-8 text-slate-500" />
                          </TooltipContainerIcon>
                        ) : (
                          <TooltipContainerIcon label="costo beneficio">
                            <BsFileEarmarkPdf className="w-8 h-8 text-green-500" />
                          </TooltipContainerIcon>
                        ) }
                    </PDFDownloadLink>
                  )}
                </>
              )}
              <TooltipContainerIcon label="Tabla">
                <VscListUnordered className="text-slate-600 w-10 h-10 cursor-pointer print:hidden hover:bg-blue-100" 
                  onClick={() => setIsTable(true)}
                />
              </TooltipContainerIcon>
              <TooltipContainerIcon label="Tarjeta">
                <PiTableThin onClick={() => setIsTable(false)} 
                  className="text-slate-600 w-10 h-10 cursor-pointer hover:slate-slate-300 print:hidden hover:bg-blue-100"
                />
              </TooltipContainerIcon>
              <TooltipFilterIcon handleFilter={handleFilter} />
              <ButtonNew token={token} optClients={optClients} 
                      optCategories={optCategories} optTypes={optTypes}
                      user={user._id} optCompanies={optCompanies} condition={condition} />
            </div>
          </div>
        </div>
      </div>
      <div className="mt-5">
        <TableProjects data={dataTable} token={token} projects={projectStore.length > 0? projectStore: projects} 
          optCategories={optCategoriesFilter} optTypes={optTypesFilter}
          optConditions={optConditionsFilter} isFilter={isFilter} 
          setIsFilter={handleFilter} isTable={isTable} user={user}>            
        </TableProjects>        
      </div>
    </div>
  )
}