interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement>{}

export default function Button({children, ...Props}:Props){
  return(
    <>
      <button
        className="text-white font-normal text-sm bg-black rounded-xl w-36 h-9 py-2 hover:bg-slate-600"
        {...Props}
      >
        {children}
      </button>
    </>
  )
}