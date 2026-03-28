import Link from "next/link"
import { TbArrowNarrowLeft } from "react-icons/tb";
import SearchInTable from "./SearchInTable";
import {Tooltip} from "@nextui-org/react";
import { propsTooltip } from "@/libs/animations";
import { forwardRef } from "react";

// export default function Header({children, title, placeHolder}: 
//   {children:JSX.Element, title:string, placeHolder:string}){

//   return(
//     <>
//       <div className="flex justify-between items-center gap-x-5 gap-y-3 flex-wrap sm:flex-nowrap">
//         <div className="flex items-center gap-x-3 w-full max-w-96">
//           <div className="p-1 border border-slate-400 bg-white rounded-md hover:bg-blue-100">
//             <Link href={'/'}>
//               <Tooltip closeDelay={0} delay={100} motionProps={propsTooltip} content='Regresar' 
//                   placement="right" className="text-black bg-white rounded-md border border-slate-400">
//                 <span>
//                   <TbArrowNarrowLeft className="w-10 h-10 text-slate-600" />
//                 </span>
//               </Tooltip>
//             </Link>
//           </div>
//           <p className="text-xl ml-4 font-medium">{title}</p>
//         </div>
//         <div className="flex gap-x-3 justify-end w-full">
//           <SearchInTable placeH={placeHolder} />
//           <div className="w-36">
//             {children}
//           </div>
//         </div>
//       </div>
//     </>
//   )
// }

type HeaderProps = {
  children: JSX.Element;
  title: string;
  placeHolder: string;
  other?: boolean
};

const Header = forwardRef<HTMLInputElement, HeaderProps>(function Header( 
  { children, title, placeHolder }, ref ){

  return(
    <>
      <div className="flex justify-between items-center gap-x-5 gap-y-3 flex-wrap sm:flex-nowrap">
        <div className="flex items-center gap-x-3 w-full max-w-96">
          <div className="p-1 border border-slate-400 bg-white rounded-md hover:bg-blue-100">
            <Link href={'/'}>
              <Tooltip closeDelay={0} delay={100} motionProps={propsTooltip} content='Regresar' 
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
          <SearchInTable placeH={placeHolder} ref={ref} />
          <div className="w-36">
            {children}
          </div>
        </div>
      </div>
    </>
  )
})

export default Header;

const ResponsiveHeader = forwardRef<HTMLInputElement, HeaderProps>(function Header( 
  { children, title, placeHolder, other=false }, ref ){

  return(
    <>
      <div className="flex justify-between items-center gap-x-5 gap-y-3 flex-wrap sm:flex-nowrap">
        <div className="flex items-center gap-x-3 w-full sm:max-w-96">
          <div className="p-1 border border-slate-400 bg-white rounded-md hover:bg-blue-100">
            <Link href={'/'}>
              <Tooltip closeDelay={0} delay={100} motionProps={propsTooltip} content='Regresar' 
                  placement="right" className="text-black bg-white rounded-md border border-slate-400">
                <span>
                  <TbArrowNarrowLeft className="w-10 h-10 text-slate-600" />
                </span>
              </Tooltip>
            </Link>
          </div>
          <p className="flex-1 text-xl w-80 ml-4 font-medium">{title}</p>
          {/* w-full */}
          {!other && (
            <div className="sm:hidden flex justify-end mr-4">
              {children}
            </div>
          )}
        </div>
        {other && (
          <div className="sm:hidden w-full flex justify-end mr-4">
            {children}
          </div>
        )}
        {/* <div className="flex gap-x-3 justify-end w-full"> */}
        <div className="mt-2 md:mt-0 sm:flex gap-x-3 gap-y-2 pr-4 sm:pr-0 justify-end w-full">
          <SearchInTable placeH={placeHolder} ref={ref} />
          <div className="w-36 mt-2 sm:mt-0 hidden sm:block">
            {children}
          </div>
        </div>
      </div>
    </>
  )
})

export { ResponsiveHeader };