import Image from "next/image"

export default function ContainerHeaderForm({photo, name, email}: 
              {photo:string, name:string, email:string}){
  return(
    <>
      <div className="flex justify-center">
        <div className="h-auto flex justify-end w-full max-w-sm shadow-2xl shadow-slate-300">
          <div className="flex flex-col items-center w-1/2">
            <Image    
              className="rounded-full"                      
              src={photo}
              //src={'/img/default.jpg'}
              alt={name}
              width={156}
              height={156}                                    
              priority={true}                                    
            />
            <p className="text-sm text-gray-500 leading-5 md:leading-6">{email}</p>
            <p className="text-xl text-gray-800 tracking-wide leading-5 md:leading-6">{name}</p>
          </div>  
          <div className="w-1/3 flex flex-col">
            <Image    
              className=""                      
              //src='/nuevoIcono.jpg'
              src={'/logoActualizado.jpg'}
              alt={name}
              width={120}
              height={50}                                    
              priority={true}                                    
            />
          </div>
        </ div>
      </div>
    </>
  )
}