interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement>{}

export default function Button({children, ...Props}:Props){
  return(
    <>
      <button
        // className="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 
        //   to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none 
        //   focus:ring-cyan-300 dark:focus:ring-cyan-800 shadow-lg shadow-cyan-500/50 
        //   dark:shadow-lg dark:shadow-cyan-800/80 font-medium rounded-lg text-sm px-5 py-2.5 
        //   text-center me-2"
        className="text-white font-normal text-sm bg-black rounded-xl w-36 h-9 py-2 hover:bg-slate-600"
        {...Props}
      >
        {children}
      </button>
    </>
  )
}