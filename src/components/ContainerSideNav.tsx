
export default function ContainerSideNav({children, width, open=true}: 
  {children:JSX.Element, width:string, open?:boolean}) {
  return (
    // <div className="fixed inset-0 z-40 flex">
    //   <div className="fixed inset-0 bg-black bg-opacity-40">
    //     <div className={`relative z-50 ml-auto bg-white p-5 h-full overflow-y-auto ${width}`}>
    //       {children}
    //     </div>
    //   </div>
    // </div>
    <div className="fixed inset-0 z-40 flex pointer-events-none">
      <div className={`fixed inset-0 bg-black bg-opacity-40 transition-opacity duration-300
      ${open ? "opacity-100 pointer-events-auto" : "opacity-0"}`}>
        <div className={`relative z-50 ml-auto bg-white p-5 h-full overflow-y-auto ${width} 
                        transform transition-transform duration-300
                        ${open ? "translate-x-0" : "translate-x-full"}`}>
          {children}
        </div>
      </div>
    </div>
  )
}