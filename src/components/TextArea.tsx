interface Props extends React.TextareaHTMLAttributes<HTMLTextAreaElement>{}

export default function TextArea({...props}:Props){
  return(
    <>
    <textarea 
      className="border border-gray-200 rounded-lg w-full text-sm text-gray-900 bg-white dark:bg-gray-800 
              focus:ring-0 dark:text-white dark:placeholder-gray-400 my-2 p-2 outline-0 outline-none"
      rows={4}
      {...props}
    />
    </>
  )
}