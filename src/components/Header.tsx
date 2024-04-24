import Link from "next/link"
import { ArrowLeftIcon } from "@heroicons/react/24/solid"
import { TbArrowNarrowLeft } from "react-icons/tb";

export default function Header({children, title}: {children:JSX.Element, title:string}){
  return(
    <>
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <Link href={'/'}>
            <TbArrowNarrowLeft className="w-9 h-9 text-slate-600" />
          </Link>
          <p className="text-xl ml-4 font-medium">{title}</p>
        </div>
        {/* <ButtonNewProvider id={id} token={token} /> */}
        {children}
      </div>
    </>
  )
}