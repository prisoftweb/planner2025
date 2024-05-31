interface Props extends React.TextareaHTMLAttributes<HTMLTextAreaElement>{}

export default function TextArea({...props}:Props){
  return(
    <>
    <textarea 
      // className="w-full border border-slate-300 rounded-md px-2 py-1 my-2 bg-slate-100 
      // focus:border-slate-700 outline-0 resize-none overflow-hidden" rows={4}
      className="border border-gray-200 rounded-lg w-full px-0 text-sm text-gray-900 bg-white dark:bg-gray-800 
              focus:ring-0 dark:text-white dark:placeholder-gray-400 my-2"
      rows={4}
      {...props}
    />
    </>
  )
}