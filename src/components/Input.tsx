interface Props extends React.InputHTMLAttributes<HTMLInputElement>{}

export default function Input({...props}:Props){
  return(
    <>
      <input 
        // className="peer w-full border-b-2 border-blue-400 bg-transparent 
        //   pt-2 pb-1.5 pl-3 font-sans text-sm font-normal text-blue-700 outline outline-0 
        //   transition-all duration-700 placeholder-shown:border-blue-gray-200 focus:border-blue-900 
        //   focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
        className="w-full border border-slate-300 rounded-md px-2 py-1 my-2 
          focus:border-slate-700 outline-0"
        {...props}
      />
    </>
  )
}