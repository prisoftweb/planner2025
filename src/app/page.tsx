import Navigation from "@/components/navigation/Navigation";
import { UsrBack } from "@/interfaces/User";
import { cookies } from "next/headers";
import ContainerNewCode from "@/components/codes/ContainerNewCode";
// import DragAndDropComponent from "@/components/DragAndDropComponent";

export default function Home() {
  const cookieStore = cookies();
  
  const user: UsrBack = JSON.parse(cookieStore.get('user')?.value ||'');
  const token: string = cookieStore.get('token')?.value || '';

  // const depto = typeof(user.department)==='string'? user.department:  user.department.name;
  const role = user.rol?.name || '';
  const depto='direccion';

  return (
    <>
      <div className="bg-white">
        {role.toLowerCase().includes('invitado')? <></>: (
          <Navigation user={user} />
        )}
        <div className="p-2 sm:p-3 md:p-5 flex justify-center">
          {depto.toLowerCase().includes('direccion') || role.toLowerCase().includes('invitado') || user._id === '679ac44767135227cd14d1e9' ? (
            <ContainerNewCode token={token} user={user._id} />
          ): (
          <img src="/img/Palaciosconstrucciones horizontal.svg" alt="logo" 
            className="w-auto h-96"
          />)}
        </div>
      </div>
      {/* <DragAndDropComponent /> */}
    </>
  );
}