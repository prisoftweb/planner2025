import WithOut from "@/components/WithOut";
import Navigation from "@/components/navigation/Navigation";
import { UsrBack } from "@/interfaces/User";
import { cookies } from "next/headers";
import CompanyClient from "@/components/companies/CompanyClient";
import ButtonNew from "@/components/companies/ButttonNew";
import { ResponsiveHeader } from "@/components/Header";
import { getCompanies } from "../api/routeCompany";
import { Company, CompanyTable } from "@/interfaces/Companies";
import TableCompany from "@/components/companies/TableCompany";
import ComponentError from "@/components/ComponentError";

export default async function Page(){
  const cookieStore = cookies();
  const token = cookieStore.get('token')?.value || '';
  const user: UsrBack = JSON.parse(cookieStore.get('user')?.value ||'');

  let companies: Company[];
  try {
    companies = await getCompanies(token);
    if(typeof(companies)=== 'string'){
      return(
        <>
          <Navigation user={user} token={token} />
          {/* <div className="w-full pl-10 pt-2 sm:pt-3 md:pt-5 pr-2 sm:pr-3 md:pr-5 lg:pr-10">
            <h1 className="text-center text-red-500 text-lg">{companies}</h1>
          </div> */}
          <ComponentError page="/companies" message={companies} />
        </>
      )
    }
  } catch (error) {
    return(
      <>
        <Navigation user={user} token={token} />
        {/* <h1 className="text-center text-red-500 text-lg">Error al consultar compañias!!</h1> */}
        <ComponentError page="/companies" message="Error al consultar compañias!!" />
      </>
    )
  } 

  if(!companies || companies.length <= 0){
    return (
      <div>
        <Navigation user={user} token={token} />
        <CompanyClient option={2} >
          <WithOut img="/img/clientes.svg" subtitle="Compañias"
            text="Aqui puedes agregar las compañias
                      para gestionar sus gastos desde Planner"
            title="Compañias">
                <ButtonNew token={token} />
          </WithOut>
        </CompanyClient>
      </div>
    )
  }

  const table: CompanyTable[] = [];

  companies.map((company) => {
    table.push({
      id: company._id,
      name: company.name,
      status: company.status,
      address: company.address,
      email: company.email,
      phoneNumber: company.phoneNumber,
      logo: company.logo
    })
  })

  return(
    <>
      <Navigation user={user} token={token} />
      <CompanyClient option={2} >
        <div className="absolute sm:static left-2 sm:left-0 mt-4 sm:mt-0 w-full">
          <ResponsiveHeader title="Compañias" placeHolder="Buscar compañia.." >
            <ButtonNew token={token} />
          </ResponsiveHeader>
          <div className="mt-5">
            <TableCompany data={table} token={token} />
          </div>
        </div>
      </CompanyClient>
    </>
  )
}