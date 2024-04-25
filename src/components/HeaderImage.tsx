import Link from "next/link"
import { TbArrowNarrowLeft } from "react-icons/tb";
import Image from "next/image";

export default function HeaderImage({children, title, previousPage, image}: 
                    {children:JSX.Element, title:string, 
                      previousPage:string, image:string}){
  return(
    <>
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <Link href={previousPage}>
            <TbArrowNarrowLeft className="w-9 h-9 text-slate-600" />
          </Link>
          <Image 
              src={image}
              alt="profile"
              width={50}
              height={50}
              className="rounded-full mx-3"
            />
          <p className="text-xl ml-4 font-medium">{title}</p>
        </div>
        {children}
      </div>
    </>
  )
}