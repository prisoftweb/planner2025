import Image from "next/image"

export default function ContainerForm({children, title, subtitle, img, style}: 
          {children:JSX.Element, title:string, subtitle:string, img:string, style:string}){
  
  let header;

  if(img !== ''){
    header =  <div className="flex mt-2 pl-7">
                <Image    
                  className="rounded-full"                      
                  src={img}
                  alt={'img'}
                  width={50}
                  height={50}                                    
                  priority={true}                                    
                />
                <div className="ml-2">
                  <p className="text-xl">{title}</p>
                  <p className="text-gray-500 text-sm">{subtitle}</p>
                </div>
              </div>
  }else{
    header = <></>
  }

  return(
    <>
      <div className="flex justify-center mt-6">
        <div className={`shadow-2xl shadow-slate-300 ${style}`}>
          {header}                   
          {children}
        </div>                        
      </div>
    </>
  )
}