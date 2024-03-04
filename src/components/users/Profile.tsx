import Image from "next/image"
import { UserIcon, Cog6ToothIcon, PhotoIcon, StarIcon}
  from "@heroicons/react/24/solid"
import Link from "next/link"

export default function Profile({photo, name, email, setOption}: 
                        {photo:string, name:string, email:string, setOption:Function}){
  
  const changeOption = (opt:number) => {
    setOption(opt);
  }
  
  // console.log('photo profile');
  // console.log(photo);
  console.log('nada');
  return(
    <>
      <div className="flex flex-col items-center w-1/2 mb-2">
        <Image    
          className="rounded-full"                      
          src={photo}
          //src={'/img/default.jpg'}
          alt={name}
          width={126}
          height={126}                                    
          priority={true}                                    
        />
        <p className="text-xl text-gray-800 tracking-wide leading-5 md:leading-6">{name}</p>
        <p className="text-sm text-gray-500 leading-5 md:leading-6">{email}</p>
      </div>
      <Link href={``} onClick={() => changeOption(1)} className="py-1 hover:text-gray-900 hover:bg-gray-200">
        <div className="flex p-2 items-center">
          <UserIcon className="w-4 h-4 mr-2 text-slate-500" />
          Editar Perfil
        </div>
      </Link>
      <Link href={``} onClick={() => changeOption(2)} className="py-1 hover:text-gray-900 hover:bg-gray-200">
        <div className="flex p-2 items-center">
          <PhotoIcon className="w-4 h-4 mr-2 text-slate-500" />
          Cambiar foto
        </div>
      </Link>
      <Link href={``} onClick={() => changeOption(3)} className="py-1 hover:text-gray-900 hover:bg-gray-200">
        <div className="flex p-2 items-center">
          <StarIcon className="w-2 h-2 text-slate-500" />
          <StarIcon className="w-2 h-2 mr-2 text-slate-500" />
          Cambiar Contrasena
        </div>
      </Link>
      <Link href={``} onClick={() => changeOption(4)} className="py-1 hover:text-gray-900 hover:bg-gray-200">
        <div className="flex p-2 items-center">
          <Cog6ToothIcon className="w-4 h-4 mr-2 text-slate-500" />
          Configuracion
        </div>
      </Link>
    </>
  )
}