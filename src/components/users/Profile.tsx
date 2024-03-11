import Image from "next/image"
import { UserIcon, Cog6ToothIcon, PhotoIcon, StarIcon}
  from "@heroicons/react/24/solid"

export default function Profile({photo, name, email, setOption, option}: 
              {photo:string, name:string, email:string, setOption:Function, option:number}){
  
  const changeOption = (opt:number) => {
    setOption(opt);
  }
  
  return(
    <>
      <div className="flex flex-col items-center w-full mb-2">
        <Image    
          className="rounded-full"                      
          src={photo? photo: '/img/default.jpg'}
          alt={name}
          width={126}
          height={126}                                    
          priority={true}                                    
        />
        <p className="text-xl text-gray-800 text-center">{name}</p>
        <p className="text-sm text-gray-500 text-center">{email}</p>
      </div>
      <div className={`hover:text-gray-900 hover:bg-gray-100 cursor-pointer
        flex py-2 items-center mt-3 ${option===1? 'bg-slate-200': ''}`}
        onClick={() => changeOption(1)}
      >
        <UserIcon className="w-4 h-4 mr-2 text-slate-500" />
        Editar Perfil
      </div>
      <div className={`hover:text-gray-900 hover:bg-gray-100 cursor-pointer
        flex py-2 items-center ${option===2? 'bg-slate-200': ''}`}
        onClick={() => changeOption(2)}
      >
        <PhotoIcon className="w-4 h-4 mr-2 text-slate-500" />
        Cambiar foto
      </div>
      <div className={`hover:text-gray-900 hover:bg-gray-100 cursor-pointer
        flex py-2 items-center ${option===3? 'bg-slate-200': ''}`}
        onClick={() => changeOption(3)}
      >
        <StarIcon className="w-2 h-2 text-slate-500" />
        <StarIcon className="w-2 h-2 mr-2 text-slate-500" />
        Cambiar Contraseña
      </div>
      <div className={`hover:text-gray-900 hover:bg-gray-100 cursor-pointer
        flex py-2 items-center ${option===4? 'bg-slate-200': ''}`}
        onClick={() => changeOption(4)}
      >
        <Cog6ToothIcon className="w-4 h-4 mr-2 text-slate-500" />
        Configuracion
      </div>
    </>
  )
}