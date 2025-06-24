import { cookies } from "next/headers";
import { UsrBack } from "@/interfaces/User";
import Navigation from "@/components/navigation/Navigation";
import { ICodeMin } from "@/interfaces/Code"
import { getCodesMin } from "../api/routeCode";
import ContainerCodes from "@/components/codes/ContainerCodes";
import Header from "@/components/HeaderPage";
// import { TbArrowNarrowLeft } from "react-icons/tb";
// import Image from "next/image";

export default async function Page() {

  const cookieStore = cookies();
  const user: UsrBack = JSON.parse(cookieStore.get('user')?.value || '');
  const token: string = cookieStore.get('token')?.value || '';
  const codes: ICodeMin[] = await getCodesMin(token);
  
  if (typeof(codes) === 'string') {
    return (
      <div>
        <Navigation user={user} />
        <div className="p-2 sm:p-3 md:p-5">
          <h1 className="text-red-500 text-center text-lg">{codes}</h1>
        </div>
      </div>
    )
  }

  return (
    <div>
      <Navigation user={user} />
      <div className="p-2 sm:p-3 md:p-5">
        <Header previousPage="/" title="Codigos" >
          <></>
        </Header>
        <ContainerCodes codes={codes} />
      </div>
    </div>
  )
}
