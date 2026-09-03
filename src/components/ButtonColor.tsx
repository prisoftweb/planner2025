interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement>{}

export default function ButtonColor({children, ...Props}:Props){
  return(
    <>
      <button
        {...Props}
      >
        {children}
      </button>
    </>
  )
}