import WithOut from "@/components/WithOut";
import Navigation from "@/components/navigation/Navigation";
import { UsrBack } from "@/interfaces/User";
import { cookies } from "next/headers";

import CompanyClient from "@/components/companies/CompanyClient";
import Header from "@/components/Header";
import ButtonNew from "@/components/catalogs/ButtonNew";
import TableCatalogs from "@/components/catalogs/TableCatalogs";
import { getCatalogs } from "../api/routeCatalogs";
import { Catalog, CatalogTable } from "@/interfaces/Catalogs";
import ListClient from "@/components/catalogs/ListClient";

export default async function Page(){
  const cookieStore = cookies();
  const token = cookieStore.get('token')?.value || '';
  const user: UsrBack = JSON.parse(cookieStore.get('user')?.value ||'');

  let catalogs: Catalog[];
  try {
    catalogs = await getCatalogs(token);
    if(typeof(catalogs)=== 'string'){
      return <h1 className="text-center text-red-500 text-lg">{catalogs}</h1>
    }
  } catch (error) {
    return <h1 className="text-center text-red-500 text-lg">Ocurrio un error al consultar catalogos!!</h1>
  } 

  // if(!catalogs || catalogs.length <= 0){
  //   return (
  //     <div>
  //       <Navigation user={user} />
  //       <CompanyClient option={3} >
  //         <WithOut img="/img/clientes.svg" subtitle="Catalogos"
  //           text="Aqui puedes agregar los catalogos"
  //           title="Catalogos">
  //               <ButtonNew token={token} catalog={''} />
  //         </WithOut>
  //       </CompanyClient>
  //     </div>
  //   )
  // }

  // const table: CatalogTable[] = [];

  // catalogs.map((cat) => {
  //   table.push({
  //     id: cat._id,
  //     name: cat.name,
  //     collection: cat.collection
  //   })
  // })

  return(
    <>
      <Navigation user={user} />
      <ListClient lists={catalogs} token={token} />
      {/* <CompanyClient option={3} >
        <div>
          <Header title="Catalogos" placeHolder="Buscar Catalogo.." >
            <ButtonNew token={token} catalog={''} />
          </Header>
          <div className="mt-5">
            <TableCatalogs  data={table}  token={token} />
          </div>
        </div>
      </CompanyClient> */}
    </>
  )
}