import { Squares2X2Icon, CalendarDaysIcon, CreditCardIcon, IdentificationIcon}
  from "@heroicons/react/24/solid"
import Link from "next/link"
import IconText from "./IconText";

export default function ProfileProvider({photo, name, email, setOption}: 
                        {photo:string, name:string, email:string, setOption:Function}){
  
  const changeOption = (opt:number) => {
    setOption(opt);
  }
  
  return(
    <>
      <div className="flex flex-col items-center w-1/2 mb-2">
        <IconText text="P" />
        <p className="text-xl text-gray-800 tracking-wide leading-5 md:leading-6">Plaforama</p>
        <p className="text-sm text-gray-500 leading-5 md:leading-6">Plaforama SA de CV</p>
        <p className="text-sm text-gray-500 leading-5 md:leading-6">AMA0512139J5</p>
        <p className="text-sm text-gray-500 leading-5 md:leading-6">201-026-0002</p>
      </div>
      <div className="flex pl-4 text-center">
        <div className="w-40 border border-slate-300">
          <div className="flex w-40">
            <div className="w-1/2 bg-green-600">
              <p className="text-white">60 dias</p>
            </div>
            <div className="w-1/2 bg-slate-100">
              <p>5%</p>
            </div>
          </div>
          <div className="w-40">
            <p>$500,000</p>
          </div>
        </div>
      </div>
      <Link href={``} onClick={() => changeOption(1)} className="py-1 hover:text-gray-900 hover:bg-gray-200">
        <div className="flex p-2 items-center">
          <Squares2X2Icon className="w-4 h-4 mr-2 text-slate-500" />
          Resumen
        </div>
      </Link>
      <Link href={``} onClick={() => changeOption(2)} className="py-1 hover:text-gray-900 hover:bg-gray-200">
        <div className="flex p-2 items-center">
          <CalendarDaysIcon className="w-4 h-4 mr-2 text-slate-500" />
          Datos basicos
        </div>
      </Link>
      <Link href={``} onClick={() => changeOption(3)} className="py-1 hover:text-gray-900 hover:bg-gray-200">
        <div className="flex p-2 items-center">
        <CreditCardIcon className="w-4 h-4 mr-2 text-slate-500" />
          Linea de credito
        </div>
      </Link>
      <Link href={``} onClick={() => changeOption(4)} className="py-1 hover:text-gray-900 hover:bg-gray-200">
        <div className="flex p-2 items-center">
          <IdentificationIcon className="w-4 h-4 mr-2 text-slate-500" />
          Contactos
        </div>
      </Link>
    </>
  )
}