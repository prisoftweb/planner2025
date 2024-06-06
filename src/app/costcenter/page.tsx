import WithOut from "@/components/WithOut";
import Navigation from "@/components/navigation/Navigation";
import { UsrBack } from "@/interfaces/User";
import { cookies } from "next/headers";
import Header from "@/components/Header";
//import Header from "@/components/HeaderPage";
import { Options } from "@/interfaces/Common";
import { GlossaryCatalog } from "@/interfaces/Glossary";
import { getCatalogsByName } from "../api/routeCatalogs";
import ButtonNew from "@/components/costcenter/ButtonNew";
import { CostCenterTable, CostCenter } from "@/interfaces/CostCenter";
import { getCostCenters } from "../api/routeCostCenter";
import TableCostCenter from "@/components/costcenter/TableCostCenter";

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

  let costs: CostCenter[];
  try {
    costs = await getCostCenters(token);
    if(typeof(costs)=== 'string')
      return <h1 className="text-lg text-red-500 text-center">{costs}</h1>
  } catch (error) {
    return <h1 className="text-lg text-red-500 text-center">Error al obtener centro de costos!!</h1>
  }

  
  if(!costs || costs.length <= 0){
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

  const table: CostCenterTable[] = [];
  costs.map((cost) => {
    let concept = '';
    cost.categorys.map((conc) => {
      concept += conc.name + ', ';
    })
    table.push({
      category: cost.name,
      code: cost.code,
      id: cost._id,
      status: cost.status,
      concept 
    })
  })
  
  return(
    <>
      <Navigation user={user} />
      
      <div className="p-2 sm:p-3 md:p-5 lg:p-10">
        <Header title="Centro de costos" placeHolder="Buscar centro de costos..">
          <ButtonNew token={token} id="" /></Header>
        <div className="mt-5">
          {/* <TableClients data={data} token={token} /> */}
          <TableCostCenter data={table} token={token} />
        </div>
      </div>
    </>
  )
}