import Link from "next/link"
import { ArrowLeftIcon } from "@heroicons/react/24/solid"

export default function Header({children, title}: {children:JSX.Element, title:string}){
  return(
    <>
      <div className="flex justify-between items-center">
        <div className="flex">
          <Link href={'/'}>
            <ArrowLeftIcon className="w-8 h-8 text-slate-600" />
          </Link>
          <p className="text-2xl ml-3 font-semibold">{title}</p>
        </div>
        {/* <ButtonNewProvider id={id} token={token} /> */}
        {children}
      </div>
    </>
  )
}