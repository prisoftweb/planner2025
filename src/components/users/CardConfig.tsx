import { LockClosedIcon } from "@heroicons/react/24/solid"

export default function CardConfig({title, text, children}: 
        {title:string, text:string, children:JSX.Element}){
  return(
    <>
      <div className="my-4 w-full">
          <p className="my-2 text-slate-600 font-semibold">{title}</p>
          <div className="flex items-center flex-wrap gap-y-2">
            <div className="flex items-center w-full">
              <LockClosedIcon className="w-8 h-8 mx-2" />
              <p className="text-slate-400 text-sm pr-3">{text}</p>
            </div>
            {children}
          </div>
        </div>
    </>
  )
}