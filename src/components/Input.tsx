interface Props extends React.InputHTMLAttributes<HTMLInputElement>{}

export default function Input({...props}:Props){
  return(
    <>
      <input 
        className="w-full border border-slate-300 rounded-md px-2 py-1 my-2 bg-white 
          focus:border-slate-700 outline-0"
        {...props}
      />
    </>
  )
}