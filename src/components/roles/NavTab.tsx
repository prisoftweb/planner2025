import { ChartBarIcon, AdjustmentsVerticalIcon, TableCellsIcon, 
  GlobeAmericasIcon } from "@heroicons/react/24/solid"
import { useEffect, useState } from "react";
import {Tooltip} from "@nextui-org/react";
import Link from "next/link";

export default function NavTab(){

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

  const [nav, setNav] = useState<JSX.Element>(<div>
                      <Link href='/roles/role'>
                        <Tooltip closeDelay={0} delay={100} motionProps={props} content='Rol'><ChartBarIcon className="w-8 h-8 sm:w-12 sm:h-12 cursor-pointer 
                            text-slate-500 pb-2 sm:pb-4 border-b border-slate-300" />
                        </Tooltip>
                      </Link>
                      <Link href='/roles/routes'>
                        <Tooltip closeDelay={0} delay={100} motionProps={props} content='Ruta'><AdjustmentsVerticalIcon className="w-8 h-8 sm:w-12 sm:h-12 cursor-pointer 
                            text-slate-500 pb-2 sm:pb-4 border-b border-slate-300" />
                        </Tooltip>
                      </Link>
                      <Link href='/roles/sub-path'>
                        <Tooltip closeDelay={0} delay={100} motionProps={props} content='Sub Ruta'><TableCellsIcon className="w-8 h-8 sm:w-12 sm:h-12 cursor-pointer 
                            text-slate-500 pb-2 sm:pb-4 border-b border-slate-300" />
                        </Tooltip>
                      </Link>
                      <Link href='/roles/components'>
                        <Tooltip closeDelay={0} delay={100} motionProps={props} content='Components'><GlobeAmericasIcon className="w-8 h-8 sm:w-12 sm:h-12 cursor-pointer 
                            text-slate-500 pb-2 sm:pb-4 border-b border-slate-300" />
                        </Tooltip>
                      </Link>
                    </div>);

  // useEffect(() => {
  //   setNav (
  //     <div>
  //       <Link href='/roles/rol'>
  //         <Tooltip closeDelay={0} delay={100} motionProps={props} content='Rol'><ChartBarIcon className="w-8 h-8 sm:w-12 sm:h-12 cursor-pointer 
  //             text-slate-500 pb-2 sm:pb-4 border-b border-slate-300" />
  //         </Tooltip>
  //       </Link>
  //       <Link href='/roles/route'>
  //         <Tooltip closeDelay={0} delay={100} motionProps={props} content='Ruta'><AdjustmentsVerticalIcon className="w-8 h-8 sm:w-12 sm:h-12 cursor-pointer 
  //             text-slate-500 pb-2 sm:pb-4 border-b border-slate-300" />
  //         </Tooltip>
  //       </Link>
  //       <Link href='/roles/'>
  //         <Tooltip closeDelay={0} delay={100} motionProps={props} content='Permiso'><TableCellsIcon className="w-8 h-8 sm:w-12 sm:h-12 cursor-pointer 
  //             text-slate-500 pb-2 sm:pb-4 border-b border-slate-300" />
  //         </Tooltip>
  //       </Link>
  //       <Link href='/roles/components'>
  //         <Tooltip closeDelay={0} delay={100} motionProps={props} content='Components'><GlobeAmericasIcon className="w-8 h-8 sm:w-12 sm:h-12 cursor-pointer 
  //             text-slate-500 pb-2 sm:pb-4 border-b border-slate-300" />
  //         </Tooltip>
  //       </Link>
  //     </div>
  //   )
  // }, [option])

  return(
    <>
      {nav}
    </>
  )
}