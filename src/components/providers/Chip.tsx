export default function Chip({label}: {label:string}){
  return(
    <>
      <div
        className="relative grid items-center px-1 py-1 font-sans text-xs text-white bg-gray-500 rounded-md select-none whitespace-nowrap">
        <span className="">{label}</span>
      </div>
    </>
  )
}