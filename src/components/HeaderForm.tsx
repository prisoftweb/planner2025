import Image from "next/image"

export default function HeaderForm({img, title, subtitle}: 
                {img:string, title:string, subtitle:string}){
  return(
    <>
      <div className="flex mt-2">
        {/* <Image    
          className="rounded-full"                      
          src={img}
          alt={'img'}
          width={50}
          height={50}                                    
          priority={true}
        /> */}
        <img src={img} alt="logo" className="rounded-full w-14 h-auto" />
        <div className="ml-2">
          <p className="text-xl">{title}</p>
          <p className="text-gray-500 text-sm">{subtitle}</p>
        </div>
      </div>
    </>
  )
}