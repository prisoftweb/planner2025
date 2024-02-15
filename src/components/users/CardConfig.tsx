import { LockClosedIcon } from "@heroicons/react/24/solid"

export default function CardConfig({title, text, buttonText, styleButton}: 
                {title:string, text:string, buttonText:string, styleButton:string}){
  return(
    <>
      <div className="my-4">
          <p className="my-2 text-slate-600 font-semibold">{title}</p>
          <div className="flex items-center">
            <LockClosedIcon className="w-8 h-8 mx-2" />
            <p className="text-slate-400 text-sm">{text}</p>
            <button className={styleButton}>{buttonText}</button>
          </div>
        </div>
    </>
  )
}