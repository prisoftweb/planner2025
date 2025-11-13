export default function Chip({label, color='bg-gray-500', width='', darktext}: {label:string, color?:string, width?:string, darktext:boolean}){
  return(
    <>
      <div
        className={`relative ${color} ${width} ${darktext? 'text-black': 'text-white'} grid items-center text-center px-1 py-1 font-thin text-xs rounded-lg select-none whitespace-nowrap`}
        style={{backgroundColor: color}}
      >
        <span className="">{label}</span>
      </div>
    </>
  )
}