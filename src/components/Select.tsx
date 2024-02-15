interface Props extends React.SelectHTMLAttributes<HTMLSelectElement>{}

export default function Select({children, ...props}: Props) {
  return(
    <>
      <select
        // className="w-16 p-1 text-lg text-gray-900 border border-gray-300 rounded-lg 
        //   bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 
        //   dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 
        //   dark:focus:border-blue-500 outline-green-500 "
        className="w-full p-2 text-lg mt-2 text-gray-900 border border-slate-300 rounded-lg 
          bg-gray-50 focus:ring-blue-500 focus:border-slate-700 outline-0 my-2" 
        {...props}
      >
        {children}
      </select>
    </>
  )
}