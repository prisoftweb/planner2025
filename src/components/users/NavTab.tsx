import Link from "next/link"
import { UserCircleIcon, CurrencyDollarIcon, QuestionMarkCircleIcon } from "@heroicons/react/24/solid"

export default function NavTab({tab, idUser}: {tab:string, idUser:string}){
  return(
    <>
      <div className="flex mt-5">
        <Link href={`/users/${idUser}?tab=1`}>
          <div className={`flex justify-around w-40 items-center border border-slate-400 ${tab==='1'? 'bg-green-500 text-white':''}`}>
            <p>Perfil</p>
            <UserCircleIcon className="w-8 h-8" />
          </div>
        </Link>
        <Link href={`/users/${idUser}?tab=2`}>
          <div className={`flex justify-around border border-slate-400 w-40 items-center ${tab==='2'? 'bg-green-500 text-white':''}`}>
            <p>Costos</p>
            <CurrencyDollarIcon className="w-8 h-8" />
          </div>
        </Link>
        <Link href={`/users/${idUser}?tab=3`}>
          <div className={`flex justify-around border border-slate-400 w-40 items-center ${tab==='3'? 'bg-green-500 text-white':''}`}>
            <p>Estadisticas</p>
            <QuestionMarkCircleIcon className="w-8 h-8" />
          </div>
        </Link>
        <Link href={`/users/${idUser}?tab=4`}>
          <div className={`flex justify-around border border-slate-400 w-40 items-center ${tab==='4'? 'bg-green-500 text-white':''}`}>
            <p>Logs</p>
            <QuestionMarkCircleIcon className="w-8 h-8" />
          </div>
        </Link>
      </div>
    </>
  )
}