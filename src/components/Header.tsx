import Link from "next/link"
import { TbArrowNarrowLeft } from "react-icons/tb";
import SearchInTable from "./SearchInTable";

export default function Header({children, title, placeHolder}: 
          {children:JSX.Element, title:string, placeHolder:string}){
  return(
    <>
      <div className="flex justify-between items-center gap-x-5 gap-y-3 flex-wrap sm:flex-nowrap">
        <div className="flex items-center gap-x-3 w-full max-w-96">
          <div className="p-1 border border-slate-400 bg-white rounded-md">
            <Link href={'/'}>
              <TbArrowNarrowLeft className="w-9 h-9 text-slate-600" />
            </Link>
          </div>
          <p className="text-xl ml-4 font-medium">{title}</p>
        </div>
        {/* <ButtonNewProvider id={id} token={token} /> */}
        <div className="flex gap-x-3 justify-end w-full">
          <SearchInTable placeH={placeHolder} />
          <div className="w-36">
            {children}
          </div>
        </div>
      </div>
    </>
  )
}