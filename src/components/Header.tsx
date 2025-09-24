import Link from "next/link"
import { TbArrowNarrowLeft } from "react-icons/tb";
import SearchInTable from "./SearchInTable";
import {Tooltip} from "@nextui-org/react";

export default function Header({children, title, placeHolder}: 
  {children:JSX.Element, title:string, placeHolder:string}){

  let props = {
    variants: {
      exit: {
        opacity: 0,
        transition: {
          duration: 0.1,
          ease: "easeIn",
        }
      },
      enter: {
        opacity: 1,
        transition: {
          duration: 0.15,
          ease: "easeOut",
        }
      },
    },
  }
  
  return(
    <>
      <div className="flex justify-between items-center gap-x-5 gap-y-3 flex-wrap sm:flex-nowrap">
        <div className="flex items-center gap-x-3 w-full max-w-96">
          <div className="p-1 border border-slate-400 bg-white rounded-md hover:bg-blue-100">
            <Link href={'/'}>
              <Tooltip closeDelay={0} delay={100} motionProps={props} content='Regresar' 
                  placement="right" className="text-black bg-white rounded-md border border-slate-400">
                <span>
                  <TbArrowNarrowLeft className="w-10 h-10 text-slate-600" />
                </span>
              </Tooltip>
            </Link>
          </div>
          <p className="text-xl ml-4 font-medium">{title}</p>
        </div>
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