import { ChartBarIcon, AdjustmentsVerticalIcon, TableCellsIcon, 
  GlobeAmericasIcon, AdjustmentsHorizontalIcon } from "@heroicons/react/24/solid"
import { useState } from "react";
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
                        <Tooltip closeDelay={0} delay={100} motionProps={props} content='Roles'>
                          <ChartBarIcon className="w-8 h-8 sm:w-12 sm:h-12 cursor-pointer 
                            text-slate-500 pb-2 sm:pb-4 border-b border-slate-300" />
                        </Tooltip>
                      </Link>
                      <Link href='/roles/resources'>
                        <Tooltip closeDelay={0} delay={100} motionProps={props} content='Recursos'>
                          <AdjustmentsVerticalIcon className="w-8 h-8 sm:w-12 sm:h-12 cursor-pointer 
                            text-slate-500 pb-2 sm:pb-4 border-b border-slate-300" />
                        </Tooltip>
                      </Link>
                      <Link href='/roles/sub-path'>
                        <Tooltip closeDelay={0} delay={100} motionProps={props} content='Rutas'>
                          <TableCellsIcon className="w-8 h-8 sm:w-12 sm:h-12 cursor-pointer 
                            text-slate-500 pb-2 sm:pb-4 border-b border-slate-300" />
                        </Tooltip>
                      </Link>
                      <Link href='/roles/components'>
                        <Tooltip closeDelay={0} delay={100} motionProps={props} content='Componentes'>
                          <GlobeAmericasIcon className="w-8 h-8 sm:w-12 sm:h-12 cursor-pointer 
                            text-slate-500 pb-2 sm:pb-4 border-b border-slate-300" />
                        </Tooltip>
                      </Link>
                      <Link href='/roles/trees'>
                        <Tooltip closeDelay={0} delay={100} motionProps={props} content='Arboles'>
                          <AdjustmentsHorizontalIcon className="w-8 h-8 sm:w-12 sm:h-12 cursor-pointer 
                            text-slate-500 pb-2 sm:pb-4 border-b border-slate-300" />
                        </Tooltip>
                      </Link>
                    </div>);

  return(
    <>
      {nav}
    </>
  )
}