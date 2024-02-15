import Navigation from "@/components/navigation/Navigation"
import ContainerForm from "@/components/Forms/ContainerForm"
import FormNewAccount from "@/components/accounts/NewAccount"
import { cookies } from "next/headers"

export default function NewAccount(){
  
  const cookiestore = cookies();
  const token = cookiestore.get('token')?.value || '';
  
  return(
    <>
      <Navigation />
      <div className="p-2 md:p-8">
        <ContainerForm img="/img/default.jpg" style="w-full md:w-2/3" subtitle="Creacion de nueva cuenta" 
          title="Nueva Cuenta">
          <FormNewAccount token={token} />
        </ContainerForm>
      </div>
    </>
  )
}