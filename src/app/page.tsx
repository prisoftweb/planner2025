import Navigation from "@/components/navigation/Navigation";
import { User } from "@/interfaces/User";
import { cookies } from "next/headers";

export default function Home() {
  const cookieStore = cookies();
  
  const user: User = JSON.parse(cookieStore.get('user')?.value ||'');

  return (
    <>
      <Navigation user={user} />
    </>
  );
}
