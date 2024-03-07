import { cookies } from "next/headers"
import { getUser } from "@/app/api/routeUser";
import ContainerHeaderForm from "@/components/Forms/ContainerHeaderForm";
import ContainerForm from "@/components/Forms/ContainerForm";
import FormEditUser from "@/components/accounts/FormEditUser";
import Navigation from "@/components/navigation/Navigation";

export default async function EditUser({ params }: { params: { id: string } }) {

  const cookieStore = cookies();
  const token: string = cookieStore.get('token')?.value || '';

  const id:string = params.id
  let user;

  try {
    user = await getUser(id, token? token : '')
  } catch (error) {
    return <h1 className="text-center text-red-500">Ocurrio un error al obtener datos del usuario!!</h1>  
  }

  if(typeof(user) === "string")
    return <h1 className="text-center text-red-500">{user}</h1>

  const photo=user.photo
  const name=user.name
  const email=user.email

  return(
    <>
      {/* <Navigation />
      <ContainerHeaderForm email={email} photo={photo} name={name} />
      <ContainerForm img="/img/default.jpg" subtitle="Configuraci&oacute;n de su cuenta" title="Usuario" style="w-full max-w-sm">
            <FormEditUser usr={user} token={token} />        
      </ContainerForm> */}
    </>
  ) 
}