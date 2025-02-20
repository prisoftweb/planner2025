import { getEstimatesWithoutInvoiceMin } from "@/app/api/routeEstimates";
import Navigation from "@/components/navigation/Navigation";
import { UsrBack } from "@/interfaces/User";
import { cookies } from "next/headers";
import { IEstimateMin } from "@/interfaces/Estimate";
import ContainerEstimatesWithoutInvoice from "@/components/projects/estimates/ContainerEstimatesWithoutInvoice";
import Link from "next/link";
import SearchInTable from "@/components/SearchInTable";
import { TbArrowNarrowLeft } from "react-icons/tb";

export default async function Page(){
  const cookieStore = cookies();
  const token = cookieStore.get('token')?.value || '';
  const user: UsrBack = JSON.parse(cookieStore.get('user')?.value ||'');

  let estimates: IEstimateMin[];
  try {
    estimates = await getEstimatesWithoutInvoiceMin(token);
    console.log('estimates min => ', estimates);
    if(typeof(estimates) === "string")
      return <h1 className="text-center text-red-500">{estimates}</h1>
  } catch (error) {
    return <h1 className="text-center text-red-500">Ocurrio un error al obtener las estimaciones sin factura!!</h1>  
  }

  return (
    <>
      <Navigation user={user} />
      <div className="p-2 sm:p-3 md-p-5 lg:p-10 w-full">
        <div className="flex gap-y-3 gap-x-5 justify-between items-center flex-wrap md:flex-nowrap">
          <div className="flex items-center w-96">
            <Link href={'/'}>
              <div className="p-1 border border-slate-400 bg-white rounded-md">
                <TbArrowNarrowLeft className="w-9 h-9 text-slate-600" />
              </div>
            </Link>
            <p className="text-xl ml-4 font-medium">Estimaciones sin factura</p>
          </div>
          <div className="flex w-full gap-x-3 gap-y-3 flex-wrap-reverse sm:flex-nowrap justify-end">
            <SearchInTable placeH="Buscar estimacion.." />
            <div>
              <div className="flex gap-x-3 items-center">
                {/* <GiSettingsKnobs onClick={() => handleFilter(true)}
                  className="text-slate-600 w-8 h-8 cursor-pointer hover:text-slate-300"
                /> */}
              </div>
            </div>
          </div>
        </div>
        <ContainerEstimatesWithoutInvoice estimates={estimates} token={token} user={user._id} />
      </div>
    </>
  )
}