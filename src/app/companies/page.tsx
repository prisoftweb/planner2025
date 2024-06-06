import WithOut from "@/components/WithOut";
import Navigation from "@/components/navigation/Navigation";
import { UsrBack } from "@/interfaces/User";
import { cookies } from "next/headers";
import CompanyClient from "@/components/companies/CompanyClient";
import ButtonNew from "@/components/companies/ButttonNew";
import Header from "@/components/Header";
import { getCompanies } from "../api/routeCompany";
import { Company, CompanyTable } from "@/interfaces/Companies";
import TableCompany from "@/components/companies/TableCompany";

export default async function Page(){
  const cookieStore = cookies();
  const token = cookieStore.get('token')?.value || '';
  const user: UsrBack = JSON.parse(cookieStore.get('user')?.value ||'');

  let companies: Company[];
  try {
    companies = await getCompanies(token);
    if(typeof(companies)=== 'string'){
      return <h1 className="text-center text-red-500 text-lg">{companies}</h1>
    }
  } catch (error) {
    return <h1 className="text-center text-red-500 text-lg">Error al consultar compañias!!</h1>
  } 

  if(!companies || companies.length <= 0){
    return (
      <div>
        <Navigation user={user} />
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
      <Navigation user={user} />
      <CompanyClient option={2} >
        <div>
          <Header title="Compañias" placeHolder="Buscar compañia.." >
            <ButtonNew token={token} />
          </Header>
          <div className="mt-5">
            <TableCompany data={table} token={token} />
          </div>
        </div>
      </CompanyClient>
    </>
  )
}