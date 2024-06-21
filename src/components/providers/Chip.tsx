export default function Chip({label, color='bg-gray-500'}: {label:string, color?:string}){
  return(
    <>
      <div
        className={`relative ${color} grid items-center text-center px-1 py-1 font-thin text-xs text-white rounded-lg select-none whitespace-nowrap`}
        style={{backgroundColor: color}}
      >
        <span className="">{label}</span>
      </div>
    </>
  )
}