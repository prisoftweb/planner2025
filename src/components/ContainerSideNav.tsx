
export default function ContainerSideNav({children, width}: {children:JSX.Element, width:string}) {
  return (
    <div className="fixed inset-0 z-40 flex">
      <div className="fixed inset-0 bg-black bg-opacity-40">
        <div className={`relative z-50 ml-auto bg-white p-5 h-full overflow-y-auto ${width}`}>
          {children}
        </div>
      </div>
    </div>
  )
}
