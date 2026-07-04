import WithOut from "@/components/WithOut";
import Navigation from "@/components/navigation/Navigation";
import { UsrBack } from "@/interfaces/User";
import { cookies } from "next/headers";
import { ResponsiveHeader } from "@/components/Header";
import { Options } from "@/interfaces/Common";
import { getCatalogsByName } from "../api/routeCatalogs";
import ButtonNew from "@/components/costcenter/ButtonNew";
import { CostCenterTable } from "@/interfaces/CostCenter";
import { getCostoCenters } from "../api/routeCostCenter";
import TableCostCenter from "@/components/costcenter/TableCostCenter";
import ComponentError from "@/components/ComponentError";
import { getAllResourcesByROL, getAllComponentsByROUTESAndRESOURCESAndROLFULL } from "@/app/api/routeRoles";
import { IAllComponentsByROUTESAndRESOURCESAndROLFULL } from "@/interfaces/Roles";

export default async function Page(){
  
  const cookieStore = cookies();
  const token = cookieStore.get('token')?.value || '';
  const user: UsrBack = JSON.parse(cookieStore.get('user')?.value ||'');

  const perm=((user.rol?._id?? '') + ('/providers/id%2Fadvances'));
  
  console.log('per => ', perm);

  const [catalogs, costs, resresource, rescomponents] = await Promise.all([
    getCatalogsByName(token, 'projects'), 
    getCostoCenters(token),
    getAllResourcesByROL(token, user.rol?._id?? ''),
    getAllComponentsByROUTESAndRESOURCESAndROLFULL(token, (user.rol?._id?? ''), 'costcenter', ''),
  ]);

  if(typeof(resresource)==='string'){
    return (
      <>
        <ComponentError page="/" message={resresource} />
      </>
    )
  }

  if(typeof(rescomponents) === "string"){
    return(
      <>
        <Navigation user={user} token={token} resources={resresource} />
        <ComponentError page={`/catalogs`} message={rescomponents} />
      </>
    )
  }

  if(typeof(catalogs)==='string'){
    return(
      <>
        <Navigation user={user} token={token} resources={resresource} />
        {/* <div className="p-2 sm:p-3 md-p-5 lg:p-10">
          <h1 className="text-red-500 text-center text-lg">{catalogs}</h1>
        </div> */}
        <ComponentError page="/costcenter" message={catalogs} />
      </>
    )
  }

  const optCategories: Options[] = [];
  catalogs[0].categorys.map((category:any) => {
    optCategories.push({
      label: category.glossary.name,
      value: category.glossary._id
    })
  })

  if(typeof(costs)=== 'string'){
    return(
      <>
        <Navigation user={user} token={token} resources={resresource} />
        {/* <div className="p-2 sm:p-3 md-p-5 lg:p-10">
          <h1 className="text-lg text-red-500 text-center">{costs}</h1>
        </div> */}
        <ComponentError page="/costcenter" message={costs} />
      </>
    )
  }

  if(!costs || costs.length <= 0){
    return (
      <>
        <Navigation user={user} token={token} resources={resresource} />
        <div className="p-2 sm:p-3 md-p-5 lg:p-10 w-full">
          <WithOut img="/img/projects.jpg" subtitle="Centro de costos"
            text="Aqui se personalizan las categorias y
                    conceptos del centro de costos"
            title="Centro de costos">
              <ButtonNew token={token} id="" company={user.profile} />
          </WithOut>
        </div>
      </>
    )
  }

  const table: CostCenterTable[] = [];
  costs.map((cost:any) => {
    let concept = '';
    cost.categorys.map((conc:any) => {
      concept += conc.concept.name + ', ';
    })
    table.push({
      category: cost.name,
      code: cost.code,
      id: cost._id,
      status: cost.status,
      concept 
    })
  })

  // const result = {
  //   permission: rescomponents[0]?.permission ?? {},
  //   components: rescomponents.map((item: IAllComponentsByROUTESAndRESOURCESAndROLFULL) => item.component)
  // };
  
  return(
    <>
      <Navigation user={user} token={token} resources={resresource} />     
      <div className="p-2 sm:p-3 md:p-5 lg:p-10">
        <ResponsiveHeader other={false} title="Centro de costos" placeHolder="Buscar centro de costos..">
          <ButtonNew token={token} id="" company={user.profile} />
        </ResponsiveHeader>
        <div className="mt-5">
          <TableCostCenter data={table} token={token} company={user.profile} />
        </div>
      </div>
    </>
  )
}