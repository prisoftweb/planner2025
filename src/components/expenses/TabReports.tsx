
export default function TabReports({option, setOption}: {option: number, setOption: Function}){
  
  const onClick = (value: number) => {
    setOption(value);
  }

  return(
    <div className="grid grid-cols-4 w-full gap-x-3 mt-5 py-1 cursor-pointer border-b border-blue-300">
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
  )
}