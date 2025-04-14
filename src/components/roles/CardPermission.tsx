export default function CardPermission({text, value, setValue, updatePermission}: 
  {text:string, value:boolean, setValue:Function, updatePermission:Function}){
  
  return(
    <div className="flex items-center gap-x-2">
      <p className="text-slate-500">{text}</p>
      <div className="relative inline-block w-8 h-4 rounded-full cursor-pointer">
        <input checked={value} 
          onClick={() => {updatePermission(true); setValue(!value)}} id={`${text}`} type="checkbox"
          onChange={() => console.log('')}
          className="absolute w-8 h-4 transition-colors duration-300 rounded-full 
            appearance-none cursor-pointer peer bg-blue-gray-100 checked:bg-green-500 
            peer-checked:border-green-500 peer-checked:before:bg-green-500
            border border-slate-300" />
        <label htmlFor={`${text}`}
          className="before:content[''] absolute top-2/4 -left-1 h-5 w-5 -translate-y-2/4 cursor-pointer rounded-full border border-blue-gray-100 bg-white shadow-md transition-all duration-300 before:absolute before:top-2/4 before:left-2/4 before:block before:h-10 before:w-10 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity hover:before:opacity-10 peer-checked:translate-x-full peer-checked:border-green-500 peer-checked:before:bg-green-500">
          <div className="inline-block p-5 rounded-full top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4"
            data-ripple-dark="true"></div>
        </label>
      </div>
    </div>
  )
}