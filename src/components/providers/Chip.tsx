export default function Chip({label}: {label:string}){
  return(
    <>
      <div
        className="relative grid items-center px-1 py-1 font-thin text-xs text-white bg-gray-500 rounded-lg select-none whitespace-nowrap">
        <span className="">{label}</span>
      </div>
    </>
  )
}