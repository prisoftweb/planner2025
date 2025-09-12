import {ICode} from '@/interfaces/Code'
import { TbArrowNarrowLeft } from 'react-icons/tb'
import { useState, useEffect } from 'react';

type Props={
  closeForm: (id:string) => void, 
  returnForm: (id:string) => void, 
  code:ICode, 
  title:string, 
  size:number
}

export default function NewCode({closeForm, returnForm, code, title, size}: Props) {

  const [heightPage, setHeightPage] = useState<number>(900);

  const handleResize = () => {
    setHeightPage(Math.max(
      document.body.scrollHeight, document.documentElement.scrollHeight,
      document.body.offsetHeight, document.documentElement.offsetHeight,
      document.body.clientHeight, document.documentElement.clientHeight
    ));
  }

  useEffect(() => {
    window.addEventListener("resize", handleResize, false);
    setHeightPage(Math.max(
      document.body.scrollHeight, document.documentElement.scrollHeight,
      document.body.offsetHeight, document.documentElement.offsetHeight,
      document.body.clientHeight, document.documentElement.clientHeight
    ));
    return () => window.removeEventListener('scroll', handleResize);
  }, []);

  const header = <div className="flex gap-x-3 items-center border-slate-400 bg-slate-400 text-white cursor-pointer"
            onClick={() => returnForm(code._id)} >
          <div className="flex items-center gap-x-3">
            <div className="p-1 rounded-md ">
              <TbArrowNarrowLeft className="w-9 h-9 text-white" 
              />
            </div>
            <p className="text-xl ml-4 font-medium">REGRESAR</p>
            <img src="/img/projects/default.svg" className='rounded-full w-9 h-9' alt="proyecto" />
          </div>
          <></>
        </div>;

  return (
    <div className={`${size < 500? 'z-10 absolute top-16 w-full max-w-xl bg-white space-y-5 p-3 right-0': ''} `}
      style={{height: `${heightPage}px`}}      
    >
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
