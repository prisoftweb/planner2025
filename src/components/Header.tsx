import Link from "next/link"
import { TbArrowNarrowLeft } from "react-icons/tb";
import SearchInTable from "./SearchInTable";

export default function Header({children, title, placeHolder}: 
          {children:JSX.Element, title:string, placeHolder:string}){
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
        <div className="flex gap-x-3">
          <SearchInTable placeH={placeHolder} />
          <div className="w-36">
            {children}
          </div>
        </div>
      </div>
    </>
  )
}