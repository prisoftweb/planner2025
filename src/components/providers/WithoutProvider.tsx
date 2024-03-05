import HeaderProvider from "./HeaderProvider"

export default function WithOutProvider({id, token}: {id:string, token:string}){
  return(
    <>
      <HeaderProvider id={id} token={token} />
      <div className="flex flex-col items-center">
        <p className="text-5xl mt-20 font-bold">Proveedores</p>
        <p className="text-xl mt-10 text-slate-700 font-bold">Aqui puedes gestionar tus proveedores con toda su informacion</p>
        <img src="/img/provider.svg" alt="provider" className="w-40 h-40" />
      </div>
    </>
  )
}