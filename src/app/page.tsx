import Navigation from "@/components/navigation/Navigation";
import { UsrBack } from "@/interfaces/User";
import { cookies } from "next/headers";

export default function Home() {
  const cookieStore = cookies();
  
  const user: UsrBack = JSON.parse(cookieStore.get('user')?.value ||'');

  return (
    <>
      <Navigation user={user} />
      <div className="p-2 sm:p-3 md:p-5 flex justify-center">
        <img src="/img/Palaciosconstrucciones horizontal.svg" alt="logo" 
          className="w-auto h-96"
        />
      </div>
    </>
  );
}
