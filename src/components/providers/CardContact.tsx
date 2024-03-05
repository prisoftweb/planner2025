import IconText from "./IconText"

export default function CardContact({name, phone}: {name:string, phone:string}){
  
  return(
    <>
      <div className="flex flex-col items-center">
        <IconText size="w-8 h-8" sizeText="" text={name} />
        <p className="text-sm text-slate-400">{name}</p>
        <p className="text-sm text-slate-400">{phone}</p>
      </div>
    </>
  )
}