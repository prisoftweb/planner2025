import NavTab from "./NavTab"

export default function CompanyClient({option, children}: {option:number, children:JSX.Element}){
  return(
    <>
      <div className="w-full pl-10 pt-2 sm:pt-3 md:pt-5 pr-2 sm:pr-3 md:pr-5 lg:pr-10">  
        <div className="block sm:hidden">
          <NavTab option={option} />
        </div>
        <div className="flex mt-5 gap-x-3">
          <div className="hidden sm:block">
            <NavTab option={option} />
          </div>
          <div className="w-full">
            {children}
          </div>
        </div>
      </div>
    </>
  )
}