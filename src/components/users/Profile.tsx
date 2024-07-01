import Image from "next/image"
import { useUserStore } from "@/app/store/userStore"

export default function Profile(){

  const {photo, name, email} = useUserStore();
  
  return(
    <>
      <div className="bg-white p-3 rounded-lg shadow-md mt-3">
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
      </div>
    </>
  )
}