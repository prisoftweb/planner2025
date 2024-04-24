'use client'
import { BuildingOffice2Icon, BuildingOfficeIcon, 
  NewspaperIcon, FolderOpenIcon, Battery50Icon } from "@heroicons/react/24/solid"
import  { SiAwsorganizations } from "react-icons/si"
import  { GoOrganization } from "react-icons/go"
import { LiaListAlt } from "react-icons/lia";
import { GrCatalog } from "react-icons/gr";
import { TfiLayoutAccordionList } from "react-icons/tfi";
import { useState } from "react";
import {Tooltip} from "@nextui-org/react";
import Link from "next/link";

export default function NavTab({option}: {option:number}){

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

  const [isHover, setIsHover] = useState<number>(-1);

  const nav =(<div>
                <div className="bg-white fixed top-12 left-0  p-3 space-y-4 flex flex-col items-center align-top rounded-md h-full shadow-md ">
                  <Link href='/departments'>
                    <Tooltip closeDelay={0} delay={100} motionProps={props} 
                      className="text-blue-500 text-sm font-thin bg-white mx-3" content='Departamentos'
                      placement="right" 
                    >
                      <SiAwsorganizations className="w-5 h-5 sm:w-6 sm:h-6 cursor-pointer 
                        text-slate-500 my-1 bg-white rounded-md" 
                        onMouseEnter={() => setIsHover(1)} onMouseLeave={() => setIsHover(-1)}
                        style={{backgroundColor: isHover===1 ? '#0075c9' : (option===1? '#178DE1': ''), 
                                color: isHover===1 || option===1 ? 'white' : '',}}
                      />
                    </Tooltip>
                  </Link>
                  <Link href='/companies'>
                    <Tooltip closeDelay={0} delay={100} motionProps={props} 
                      className="text-blue-500 text-sm font-thin bg-white rounded-md" content='Compañia'
                      placement="right"
                    >
                      <GoOrganization className="w-5 h-5 sm:w-6 sm:h-6 cursor-pointer 
                        text-slate-500 my-1 bg-white rounded-md" 
                        onMouseEnter={() => setIsHover(2)} onMouseLeave={() => setIsHover(-1)}
                        style={{backgroundColor: isHover===2 ? '#0075c9' : (option===2? '#178DE1': ''), 
                                color: isHover===2 || option===2 ? 'white' : '',}}
                      />
                    </Tooltip>
                  </Link>
                  <Link href='/catalogs'>
                    <Tooltip closeDelay={0} delay={100} motionProps={props} 
                      className="text-blue-500 text-sm font-thin bg-white mx-3 rounded-md" content='Catalogos'
                      placement="right"
                    >
                      <GrCatalog className="w-5 h-5 sm:w-6 sm:h-6 cursor-pointer 
                        text-slate-500 my-1 bg-white rounded-md" 
                        onMouseEnter={() => setIsHover(3)} onMouseLeave={() => setIsHover(-1)}
                        style={{backgroundColor: isHover===3 ? '#0075c9' : (option===3? '#178DE1': ''), 
                                color: isHover===3 || option===3 ? 'white' : '',}}
                      />
                    </Tooltip>
                  </Link>
                  <Link href='/glossary'>
                    <Tooltip closeDelay={0} delay={100} motionProps={props} 
                      className="text-blue-500 text-sm font-thin bg-white mx-3" content='Glosarios'
                      placement="right"
                    >
                      <LiaListAlt className="w-5 h-5 sm:w-6 sm:h-6 cursor-pointer 
                        text-slate-500 my-1 bg-white rounded-md" 
                        onMouseEnter={() => setIsHover(4)} onMouseLeave={() => setIsHover(-1)}
                        style={{backgroundColor: isHover===4 ? '#0075c9' : (option===4? '#178DE1': ''), 
                                color: isHover===4 || option===4 ? 'white' : '',}}
                      />
                    </Tooltip>
                  </Link>
                  <Link href='/status'>
                    <Tooltip closeDelay={0} delay={100} motionProps={props} 
                      className="text-blue-500 text-sm font-thin bg-white" content='Estatus'
                      placement="right"  
                    >
                      <TfiLayoutAccordionList className="w-5 h-5 sm:w-6 sm:h-6 cursor-pointer 
                        text-slate-500 my-1 bg-white rounded-md" 
                        onMouseEnter={() => setIsHover(5)} onMouseLeave={() => setIsHover(-1)}
                        style={{backgroundColor: isHover===5 ? '#0075c9' : (option===5? '#178DE1': ''), 
                                color: isHover===5 || option===5 ? 'white' : '',}}
                      />
                    </Tooltip>
                  </Link>
                </div>
              </div>);
  return(
    <>
      {nav}
    </>
  )
}