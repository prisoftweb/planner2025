import { useRegFormContext } from "./StepperProjectProvider";

export default function NavProjectStepper({index}: {index:number}){
  
  const [state, dispatch] = useRegFormContext();
  
  const changeTab = (indextab: number) => {
    if(state.indexstepper !== 0){
      dispatch({type: 'INDEX_STEPPER', data: indextab})
    }
  }
  
  return(
    <>
      <div className="max-w-xl">
        <ol
          className="grid grid-cols-1 divide-x divide-gray-500 overflow-hidden rounded-lg 
            border border-gray-500 text-sm  sm:grid-cols-5"
        >
          <li className={`flex items-center border-b sm:border-b-0 sm:border-r border-gray-300 justify-center 
            gap-1 p-4 cursor-pointer ${index === 0? 'bg-blue-500 text-white': (index > 0? 'bg-green-500 text-white': 'text-gray-500')}`}
            onClick={() => changeTab(0)}
          >
            <span className="flex items-center justify-center w-8 h-8 border border-blue-600 rounded-full shrink-0 dark:border-blue-500">
              1
            </span>

            <p className="leading-none">
              <strong className="block font-medium"> Datos </strong>
              <small className="mt-1"> </small>
            </p>
          </li>

          <li className={`relative flex items-center justify-center gap-1 p-4 cursor-pointer
            ${index === 1? 'bg-blue-500 text-white': (index > 1? 'bg-green-500 text-white': 'bg-gray-50 text-gray-500')}`}
            onClick={() => changeTab(1)}
          >
            {/* <span
              className="absolute -left-2 top-1/2 hidden size-4 -translate-y-1/2 rotate-45 border border-gray-500 sm:block ltr:border-b-0 ltr:border-s-0 ltr:bg-gray-500 rtl:border-e-0 rtl:border-t-0 rtl:bg-gray-500"
            >
            </span>

            <span
              className="absolute -right-2 top-1/2 hidden size-4 -translate-y-1/2 rotate-45 border border-gray-500 sm:block ltr:border-b-0 ltr:border-s-0 ltr:bg-gray-500 rtl:border-e-0 rtl:border-t-0 rtl:bg-gray-500"
            >
            </span> */}

            <span className="flex items-center justify-center w-8 h-8 border border-blue-600 rounded-full shrink-0 dark:border-blue-500">
              2
            </span>

            <p className="leading-none">
              <strong className="block font-medium"> Extras </strong>
              <small className="mt-1">  </small>
            </p>
          </li>

          <li className={`relative flex items-center justify-center gap-1 p-4 cursor-pointer
            ${index === 2? 'bg-blue-500 text-white': (index > 2? 'bg-green-500 text-white': 'text-gray-500')}`}
            onClick={() => changeTab(2)}
          >
            {/* <span
              className="absolute -left-2 top-1/2 hidden size-4 -translate-y-1/2 rotate-45 border border-gray-500 sm:block ltr:border-b-0 ltr:border-s-0 ltr:bg-gray-500 rtl:border-e-0 rtl:border-t-0 rtl:bg-gray-500"
            >
            </span>

            <span
              className="absolute -right-2 top-1/2 hidden size-4 -translate-y-1/2 rotate-45 border border-gray-500 sm:block ltr:border-b-0 ltr:border-s-0 ltr:bg-gray-500 rtl:border-e-0 rtl:border-t-0 rtl:bg-gray-500"
            >
            </span> */}

            <span className="flex items-center justify-center w-8 h-8 border border-blue-600 rounded-full shrink-0 dark:border-blue-500">
              3
            </span>

            <p className="leading-none">
              <strong className="block font-medium"> Direccion </strong>
              <small className="mt-1">  </small>
            </p>
          </li>

          <li className={`relative flex items-center justify-center gap-1 p-4 cursor-pointer
            ${index === 3? 'bg-blue-500 text-white': (index > 3? 'bg-green-500 text-white': 'bg-gray-50 text-gray-500')}`}
            onClick={() => changeTab(3)}
          >
            {/* <span
              className="absolute -left-2 top-1/2 hidden size-4 -translate-y-1/2 rotate-45 border border-gray-500 sm:block ltr:border-b-0 ltr:border-s-0 ltr:bg-gray-500 rtl:border-e-0 rtl:border-t-0 rtl:bg-gray-500"
            >
            </span>

            <span
              className="absolute -right-2 top-1/2 hidden size-4 -translate-y-1/2 rotate-45 border border-gray-500 sm:block ltr:border-b-0 ltr:border-s-0 ltr:bg-gray-500 rtl:border-e-0 rtl:border-t-0 rtl:bg-gray-500"
            >
            </span> */}

            <span className="flex items-center justify-center w-8 h-8 border border-blue-600 rounded-full shrink-0 dark:border-blue-500">
              4
            </span>

            <p className="leading-none">
              <strong className="block font-medium"> Garantia </strong>
              <small className="mt-1">  </small>
            </p>
          </li>

          <li 
            onClick={() => changeTab(4)}
          >
            <div className={`flex items-center justify-center border-t sm:border-t-0 sm:border-l border-gray-300
                gap-2 p-4 cursor-pointer ${index === 4? 'bg-blue-500 text-white': (index > 4? 'bg-green-500 text-white': 'text-gray-500')}`}>

              <span className="flex items-center justify-center w-8 h-8 border border-blue-600 rounded-full shrink-0 dark:border-blue-500">
                5
              </span>

              <p className="leading-none">
                <strong className="block font-medium"> Amortizacion </strong>
                <small className="mt-1"> </small>
              </p>
            </div>
          </li>
        </ol>
      </div>
    </>
  )
}