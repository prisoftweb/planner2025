import TooltipContainerIcon from "../tooltipIcons/TooltipContainerIcon";

import { PencilIcon } from "@heroicons/react/24/solid";

export default function TabReports({option, setOption}: {option: number, setOption: Function}){
  
  const onClick = (value: number) => {
    setOption(value);
  }

  return(
    <>
      <div className="hidden sm:grid grid-cols-4 w-full gap-x-3 mt-5 py-1 cursor-pointer border-b border-blue-300">
        <div className={`w-full px-5 ${option===0? 'border-b-4 border-blue-600':''}`}
          onClick={() => onClick(0)}
        >
          <p className="text-center text-blue-600">X PROYECTO</p>
        </div>
        <div className={`w-full px-5 ${option===1? 'border-b-4 border-blue-600':''}`}
          onClick={() => onClick(1)}
        >
          <p className="text-center text-blue-600">X TIPO</p>
        </div>
        <div className={`w-full px-5 ${option===2? 'border-b-4 border-blue-600':''}`}
          onClick={() => onClick(2)}
        >
          <p className="text-center text-blue-600">X CATEGORIAS</p>
        </div>
        <div className={`w-full px-5 ${option===3? 'border-b-4 border-blue-600':''}`}
          onClick={() => onClick(3)}
        >
          <p className="text-center text-blue-600">X CENTRO DE COSTOS</p>
        </div>
      </div>

      {/* <div className="flex items-center gap-x-3 sm:hidden mt-2"> */}
      {/* <div className="bg-white pt-1 p-2 flex flex-row items-center mt-2 
                      space-x-4 rounded-md shadow-md w-full h-auto sm:hidden">
        <TooltipContainerIcon label="Proyecto">
          <div className="p-1 rounded-full" style={{backgroundColor: option===0? '#178DE1': ''}}>
            <PencilIcon className="w-5 h-5 sm:w-6 sm:h-6 cursor-pointer text-slate-500 my-1 bg-white rounded-md" 
              onClick={() => onClick(0)}
              // style={{backgroundColor: isHover===3 ? '#0075c9' : (option===3? '#178DE1': ''), 
              //                       color: isHover===3 || option===3 ? 'white' : '',}} />
              style={{backgroundColor: option!==0? '#0075c9': '', 
                      // color: option!==0 ? 'white' : ''
                      }} />
          </div>
        </TooltipContainerIcon>
        <TooltipContainerIcon label="Tipo">
          <div className="p-1 rounded-full" style={{backgroundColor: option===1? '#178DE1': ''}}>
            <PencilIcon className="w-5 h-5 sm:w-6 sm:h-6 cursor-pointer text-slate-500 my-1 bg-white rounded-md" 
              onClick={() => onClick(1)}
              style={{backgroundColor: option!==1? '#0075c9': '', 
                      // color: option===1 ? 'white' : ''
                      }} />
          </div>
        </TooltipContainerIcon>
        <TooltipContainerIcon label="Categoria">
          <div className="p-1 rounded-full" style={{backgroundColor: option===2? '#178DE1': ''}}>
            <PencilIcon className="w-5 h-5 sm:w-6 sm:h-6 cursor-pointer text-slate-500 my-1 bg-white rounded-md" 
              onClick={() => onClick(2)}
              style={{backgroundColor: option!==2? '#0075c9': '', 
                      // color: option===2 ? 'white' : ''
                      }} />
          </div>
        </TooltipContainerIcon>
        <TooltipContainerIcon label="Centro de costos">
          <div className="p-1 rounded-full" style={{backgroundColor: option===3? '#178DE1': ''}}>
            <PencilIcon className="w-5 h-5 sm:w-6 sm:h-6 cursor-pointer text-slate-500 my-1 bg-white rounded-md" 
              onClick={() => onClick(3)}
              style={{backgroundColor: option!==3? '#0075c9': '', 
                      // color: option===3 ? 'white' : ''
                      }} />
          </div>
        </TooltipContainerIcon>       
      </div> */}

      <div className="grid grid-cols-4 mt-3 border-t pt-2 sm:hidden">
        <div className="flex flex-col items-center">
          <PencilIcon 
            className={`w-6 h-6 cursor-pointer ${option===0 ? 'text-green-500' : 'text-slate-500'}`}
            onClick={() => onClick(0)} />
          <span className="text-xs">Proyecto</span>
        </div>

        <div className="flex flex-col items-center">
          <PencilIcon 
            className={`w-6 h-6 cursor-pointer ${option===1 ? 'text-green-500' : 'text-slate-500'}`}
            onClick={() => onClick(1)} />
          <span className="text-xs">Tipo</span>
        </div>

        <div className="flex flex-col items-center">
          <PencilIcon 
            className={`w-6 h-6 cursor-pointer ${option===2 ? 'text-green-500' : 'text-slate-500'}`}
            onClick={() => onClick(2)} />
          <span className="text-xs">Categoria</span>
        </div>

        <div className="flex flex-col items-center">
          <PencilIcon 
            className={`w-6 h-6 cursor-pointer ${option===3 ? 'text-green-500' : 'text-slate-500'}`}
            onClick={() => onClick(3)} />
          <span className="text-xs">Concepto</span>
        </div>
      </div>
    </>
  )
}