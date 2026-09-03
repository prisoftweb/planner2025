import Header from "./Header"

export default function WithOut({text, subtitle, title, children, img}: 
  {text:string, subtitle:string, title:string, children:JSX.Element, img:string}){
  return(
    <>
      <Header title={title} placeHolder="No hay registros..">{children}</Header>
      <div className="flex flex-col items-center">
        <p className="text-5xl mt-20 font-bold">{subtitle}</p>
        <p className="text-xl mt-10 text-slate-700 font-bold">{text}</p>
        <img src={img} alt="image" className="w-60 h-auto" />
      </div>
    </>
  )
}