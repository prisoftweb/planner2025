interface Props extends React.TextareaHTMLAttributes<HTMLTextAreaElement>{}

export default function TextArea({...props}:Props){
  return(
    <>
    <textarea 
      className="w-full border border-slate-300 rounded-md px-2 py-1 my-2 bg-slate-100 
      focus:border-slate-700 outline-0 resize-none overflow-hidden" rows={3}
      {...props}
    />
    </>
  )
}