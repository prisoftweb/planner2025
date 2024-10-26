
export default function NavStepperPaidExpenses({index, changeTab}: {index:number, changeTab: Function}){
  
  return(
    <>
      <div>
        <ol
          className="grid grid-cols-1 divide-x divide-gray-500 overflow-hidden rounded-lg 
            border border-gray-500 text-sm text-gray-500 sm:grid-cols-2"
        >
          <li className={`flex items-center border-b sm:border-b-0 sm:border-r border-gray-300 justify-center 
            gap-2 p-4 cursor-pointer ${index === 0? 'bg-blue-500 text-white': (index > 0? 'bg-green-500 text-white': 'text-gray-500')}`}
            onClick={() => changeTab(0)}
          >
            <span className="flex items-center justify-center w-8 h-8 border border-blue-600 rounded-full shrink-0 dark:border-blue-500">
                1
            </span>

            <p className="leading-none">
              <strong className="block font-medium"> Lista de facturas </strong>
            </p>
          </li>

          <li 
            onClick={() => changeTab(1)}
          >
            <div className={`flex items-center justify-center border-t sm:border-t-0 sm:border-l border-gray-300
                gap-2 p-4 cursor-pointer ${index === 1? 'bg-blue-500 text-white': (index > 1? 'bg-green-500 text-white': 'text-gray-500')}`}>
              <span className="flex items-center justify-center w-8 h-8 border border-blue-600 rounded-full shrink-0 dark:border-blue-500">
                2
              </span>

              <p className="leading-none">
                <strong className="block font-medium"> Datos de pago </strong>
              </p>
            </div>
          </li>
        </ol>
      </div>
    </>
  )
}