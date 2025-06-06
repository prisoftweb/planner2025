import {ICode} from '@/interfaces/Code'
import { TbArrowNarrowLeft } from 'react-icons/tb'

export default function NewCode({closeForm, returnForm, code, title, size}: 
  {closeForm: (id:string) => void, returnForm: (id:string) => void, code:ICode, title:string, size:number}) {

  const header = size < 500? <div className="flex justify-between items-center">
          <div className="flex items-center">
            <div className="p-1 border border-slate-400 bg-white rounded-md cursor-pointer" onClick={() => returnForm(code._id)}>
              <TbArrowNarrowLeft className="w-9 h-9 text-slate-600" 
              />
            </div>
            {/* <p className="text-xl ml-4 font-medium">{title}</p> */}
            <img src="/img/projects/default.svg" alt="proyecto" />
          </div>
          <></>
        </div> : <></>

  return (
    <div className={`${size < 500? 'z-10 absolute top-16 w-full max-w-xl bg-white space-y-5 p-3 right-0': ''} `}>
      {header}
      <p className="text-center text-xl p-5 font-bold">CODIGO PARA COMPRAS</p>
      <div className="p-5 bg-green-400">
        <p className="text-center text-3xl p-5 font-bold">{code.code}</p>
      </div>
      <div className="grid grid-cols-2 gap-x-3">
        <div className="p-5">
          <p className="text-xl font-bold">PROYECTO</p>
          <p className="text-lg text-slate-500">{title}</p>
        </div>

        <div className="p-5 text-right">
          <p className="text-xl font-bold">FECHA</p>
          <p className="text-lg text-slate-500">{code.date.substring(0, 10)}</p>
        </div>
      </div>
      <div className="bg-slate-600 w-full text-center p-5 cursor-pointer" onClick={() => closeForm(code._id)}>
        <p className="text-2xl">NO USO CODIGO</p>
      </div>
    </div>
  )
}
