interface Props extends React.SelectHTMLAttributes<HTMLSelectElement>{}

export default function Select({children, ...props}: Props) {
  return(
    <>
      <select
        className="w-full p-2 text-lg mt-2 text-gray-900 border border-slate-300 rounded-lg 
          bg-gray-50 focus:ring-blue-500 focus:border-slate-700 outline-0 my-2" 
        {...props}
      >
        {children}
      </select>
    </>
  )
}