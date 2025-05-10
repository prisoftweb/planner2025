
export default function NavEstimateStepper({indexStepper, setIndexStepper}: {indexStepper:number, setIndexStepper:Function}){
  
  const changeTab = (index: number) => {
    setIndexStepper(index);
  }
  
  return(
    <>
      <div className="w-full mt-2">
        <ol
          className="grid grid-cols-1 divide-x divide-gray-500 overflow-hidden rounded-lg 
            border border-gray-500 text-sm sm:grid-cols-2"
        >
          <li className={`flex items-center border-b sm:border-b-0 sm:border-r border-gray-300 justify-center 
            gap-2 p-4 cursor-pointer ${indexStepper === 0? 'bg-blue-500 text-white': (indexStepper > 0? 'bg-green-500 text-white': 'text-gray-500')}`}
            onClick={() => changeTab(0)}
          >
            <span className="flex items-center justify-center w-8 h-8 border border-blue-600 rounded-full shrink-0 dark:border-blue-500">
              1
            </span>

            <p className="leading-none">
              <strong className="block font-medium"> Proyectos </strong>
              <small className="mt-1"> </small>
            </p>
          </li>

          <li 
            onClick={() => changeTab(1)}
          >
            <div className={`flex items-center justify-center border-t sm:border-t-0 sm:border-l border-gray-300
                gap-2 p-4 cursor-pointer ${indexStepper === 1? 'bg-blue-500 text-white': (indexStepper > 1? 'bg-green-500 text-white': 'text-gray-500')}`}>

              <span className="flex items-center justify-center w-8 h-8 border border-blue-600 rounded-full shrink-0 dark:border-blue-500">
                2
              </span>

              <p className="leading-none">
                <strong className="block font-medium"> Estimacion </strong>
                <small className="mt-1"> </small>
              </p>
            </div>
          </li>
        </ol>
      </div>
    </>
  )
}