import Link from "next/link"
import { ArrowLeftIcon } from "@heroicons/react/24/solid"
import ButtonNewProvider from "./ButtonNewProvider"

export default function HeaderProvider({id, token}: {id:string, token: string}){
  return(
    <>
      <div className="flex justify-between items-center">
        <div className="flex">
          <Link href={'/'}>
            <ArrowLeftIcon className="w-8 h-8 text-slate-600" />
          </Link>
          <p className="text-2xl ml-3 font-semibold">Proveedores</p>
        </div>
        <ButtonNewProvider id={id} token={token} />
      </div>
    </>
  )
}