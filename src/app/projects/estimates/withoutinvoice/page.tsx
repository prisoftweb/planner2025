import { getEstimatesWithoutInvoiceMin } from "@/app/api/routeEstimates";
import Navigation from "@/components/navigation/Navigation";
import { UsrBack } from "@/interfaces/User";
import { cookies } from "next/headers";
import { IEstimateMin } from "@/interfaces/Estimate";
import ContainerEstimatesWithoutInvoice from "@/components/projects/estimates/ContainerEstimatesWithoutInvoice";
import Link from "next/link";
import SearchInTable from "@/components/SearchInTable";
import { TbArrowNarrowLeft } from "react-icons/tb";
import TooltipContainerIcon from "@/components/tooltipIcons/TooltipContainerIcon";
import ComponentError from "@/components/ComponentError";
import { getAllResourcesByROL, getAllComponentsByROUTESAndRESOURCESAndROLFULL } from "@/app/api/routeRoles";
import { IAllComponentsByROUTESAndRESOURCESAndROLFULL } from "@/interfaces/Roles";

export default async function Page(){
  const cookieStore = cookies();
  const token = cookieStore.get('token')?.value || '';
  const user: UsrBack = JSON.parse(cookieStore.get('user')?.value ||'');
  
  const [estimates, resresource, rescomponents] = await Promise.all([
    getEstimatesWithoutInvoiceMin(token),
    getAllResourcesByROL(token, user.rol?._id?? ''),
    getAllComponentsByROUTESAndRESOURCESAndROLFULL(token, (user.rol?._id?? ''), 'projects', 'estimates/withoutinvoice'),
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
        <ComponentError page={`/projects/budget`} message={rescomponents} />
      </>
    )
  }

  const result = {
    permission: rescomponents[0]?.permission ?? {},
    components: rescomponents.map((item: IAllComponentsByROUTESAndRESOURCESAndROLFULL) => item.component)
  };

  return (
    <>
      <Navigation user={user} token={token} resources={resresource} />
      <div className="p-2 sm:p-3 md-p-5 lg:p-10 w-full">
        <div className="flex gap-y-3 gap-x-5 justify-between items-center flex-wrap md:flex-nowrap">
          <div className="flex items-center w-96">
            <Link href={'/'}>
              <TooltipContainerIcon label="Regresar">
                <div className="p-1 border border-slate-400 bg-white rounded-md hover:bg-blue-100">
                  <TbArrowNarrowLeft className="w-10 h-10 text-slate-600" />
                </div>
              </TooltipContainerIcon>
            </Link>
            <p className="text-xl ml-4 font-medium">Estimaciones sin factura</p>
          </div>
          <div className="flex w-full gap-x-3 gap-y-3 flex-wrap-reverse sm:flex-nowrap justify-end">
            <SearchInTable placeH="Buscar estimacion.." />
            <div>
              <div className="flex gap-x-3 items-center">
              </div>
            </div>
          </div>
        </div>
        <ContainerEstimatesWithoutInvoice estimates={estimates} token={token} user={user._id} company={user.profile} />
      </div>
    </>
  )
}