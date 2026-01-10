import { cookies } from "next/headers";
import { UsrBack } from "@/interfaces/User";
import { GetProjectMin, getProjectsLV, getProjectsByUserLV, GetCostsByProjectMin } from "@/app/api/routeProjects";
import Navigation from "@/components/navigation/Navigation";
import Selectize from "@/components/Selectize";
import NavTabProject from "@/components/projects/NavTabProject";
import Header from "@/components/HeaderPage";
import ContainerCostsByProject from "@/components/projects/ContainerCostsByProject";
// import { GetAllCostsGroupByCOSTOCENTERCATEGORYONLYAndProject, GetAllCostsGroupByCOSTOCENTERCONCEPTONLYAndProject } from "@/app/api/routeCost"
// import { DonutChartJS } from "@/interfaces/DashboardProjects";

// interface OptionsDashboard {
//   label: string,
//   costo: number
// }

export default async function Page({ params }: 
  { params: { id: string }}){
  const cookieStore = cookies();
  const token: string = cookieStore.get('token')?.value || '';

  const user: UsrBack = JSON.parse(cookieStore.get('user')?.value ||'');

  let role = user.rol?.name || '';

  // const [project, options, costs, costsCategory, costsConcept] = await Promise.all([
  //   GetProjectMin(token, params.id),
  //   role.toLowerCase().includes('residente') ? getProjectsByUserLV(token, user._id) : getProjectsLV(token),
  //   GetCostsByProjectMin(token, params.id),
  //   GetAllCostsGroupByCOSTOCENTERCATEGORYONLYAndProject(token, new Date(new Date().getFullYear(), new Date().getMonth(), 1).toDateString(), new Date().toDateString(), params.id),
  //   GetAllCostsGroupByCOSTOCENTERCONCEPTONLYAndProject(token, new Date(new Date().getFullYear(), new Date().getMonth(), 1).toDateString(), new Date().toDateString(), params.id),
  // ]);

  const [project, options, costs] = await Promise.all([
    GetProjectMin(token, params.id),
    role.toLowerCase().includes('residente') ? getProjectsByUserLV(token, user._id) : getProjectsLV(token),
    GetCostsByProjectMin(token, params.id),
  ]);
  
  if(typeof(project) === "string")
    return(
      <>
        <Navigation user={user} />
        <div className="p-2 sm:p-3 md-p-5 lg:p-10">
          <h1 className="text-center text-red-500">{project}</h1>
        </div>
      </>
    )
  
  if(typeof(options) === "string")
    return(
      <>
        <Navigation user={user} />
        <div className="p-2 sm:p-3 md-p-5 lg:p-10">
          <h1 className="text-center text-red-500">{options}</h1>
        </div>
      </>
    )
  
  if(typeof(costs) === "string")
    return(
      <>
        <Navigation user={user} />
        <div className="p-2 sm:p-3 md-p-5 lg:p-10">
          <h1 className="text-center text-red-500">{costs}</h1>
        </div>
      </>
    )

  // if(typeof(costsCategory)==='string'){
  //   return(
  //     <>
  //       <Navigation user={user} />
  //       <div className="p-2 sm:p-3 md-p-5 lg:p-10">
  //         <h1>{costsCategory}</h1>
  //       </div>
  //     </>
  //   )
  // }
  
  // if(typeof(costsConcept)==='string'){
  //   return(
  //     <>
  //       <Navigation user={user} />
  //       <div className="p-2 sm:p-3 md-p-5 lg:p-10">
  //         <h1>{costsConcept}</h1>
  //       </div>
  //     </>
  //   )
  // }

  // const valuesCantegories: number[] = [];
  // const titlesCategories: string[] = [];

  // costsCategory.map((cc:any) => {
  //   valuesCantegories.push(cc.subtotalCost);
  //   titlesCategories.push(cc.costocenter.category ?? '');
  // });

  // const optCategories: DonutChartJS = {
  //   labels: titlesCategories,
  //   datasets: [
  //     {
  //       label: 'Costos por categoría',
  //       data: valuesCantegories,
  //       backgroundColor:[ '#E4D831', '#71B2F2', '#434348', '#6BF672', '#FFA145', '#8579F0', '#FF467A', '#ff4081', '#e040fb', '#448aff', '#ff5252', '#ff6e40', '#69f0ae', '#7c4dff', '#83b14e', '#458a3f', '#295ba0', '#2a4175', '#289399', '#289399', '#617178', '#8a9a9a', '#516f7d'],
  //       hoverOffset: 4
  //     }
  //   ]
  // };

  // const valuesConcepts: number[] = [];
  // const titlesConcepts: string[] = [];

  // costsConcept.map((cc:any) => {
  //   valuesConcepts.push(cc.subtotalCost);
  //   titlesConcepts.push(cc.costocenter.concept ?? '');
  // });

  // const optConcepts: DonutChartJS = {
  //   labels: titlesConcepts,
  //   datasets: [
  //     {
  //       label: 'Costos por concepto',
  //       data: valuesConcepts,
  //       backgroundColor:[ '#E4D831', '#71B2F2', '#434348', '#6BF672', '#FFA145', '#8579F0', '#FF467A', '#ff4081', '#e040fb', '#448aff', '#ff5252', '#ff6e40', '#69f0ae', '#7c4dff', '#83b14e', '#458a3f', '#295ba0', '#2a4175', '#289399', '#289399', '#617178', '#8a9a9a', '#516f7d'],
  //       hoverOffset: 4
  //     }
  //   ]
  // };
  
  return(
    <>
      <Navigation user={user} />
      <div className="p-2 sm:p-3 md-p-5 lg:p-10">
        <Header title={project.title} previousPage="/projects">
          <Selectize options={options} routePage="projects" subpath="/costs" />
        </Header>
        <NavTabProject idPro={params.id} tab='4' />
        <ContainerCostsByProject costs={costs} project={project} token={token} user={user._id}
            // costsCategories={optCategories} costsConcepts={optConcepts} 
          />
      </div>
    </>
  )
}