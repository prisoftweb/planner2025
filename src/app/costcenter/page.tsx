import WithOut from "@/components/WithOut";
import Navigation from "@/components/navigation/Navigation";
import { UsrBack } from "@/interfaces/User";
import { cookies } from "next/headers";
//import Header from "@/components/Header";
import Header from "@/components/HeaderPage";
import { getClients } from "../api/routeClients";
import { Options } from "@/interfaces/Common";
import { ClientBack } from "@/interfaces/Clients";
import { GlossaryCatalog } from "@/interfaces/Glossary";
import { getCatalogsByName } from "../api/routeCatalogs";
import { getCompanies } from "../api/routeCompany";
import { Company } from "@/interfaces/Companies";
import { getProjects } from "../api/routeProjects";
import { ProjectsTable, Project } from "@/interfaces/Projects";
import TableProjects from "@/components/projects/TableProjects";
import { CurrencyFormatter } from "../functions/Globals";
import ButtonNew from "@/components/costcenter/ButtonNew";

export default async function Page(){
  
  const cookieStore = cookies();
  const token = cookieStore.get('token')?.value || '';
  const user: UsrBack = JSON.parse(cookieStore.get('user')?.value ||'');

  let catalogs: GlossaryCatalog[];
  try {
    catalogs = await getCatalogsByName(token, 'projects');
    if(typeof(catalogs)==='string') return <h1 className="text-red-500 text-center text-lg">{catalogs}</h1>
  } catch (error) {
    return <h1>Error al consultar catalogos!!</h1>
  }

  const optCategories: Options[] = [];
  catalogs[0].categorys.map((category) => {
    optCategories.push({
      label: category.glossary.name,
      value: category.glossary._id
    })
  })

  let costs;
  
  if(!costs || costs){
    return (
      <>
        <Navigation user={user} />
        <div className="p-2 sm:p-3 md-p-5 lg:p-10 w-full">
          <WithOut img="/img/projects.jpg" subtitle="Centro de costos"
            text="Aqui se personalizan las categorias y
                    conceptos del centro de costos"
            title="Centro de costos">
              <ButtonNew token={token} id="" />
          </WithOut>
        </div>
      </>
    )
  }

  return(
    <>
      haber haber que paso aqui!!
    </>
  )
}