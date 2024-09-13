//import { useRegFormContext } from "./StepperProjectProvider";
import { useNewBudget } from "@/app/store/budgetProject";

export default function NavBudgetStepper(){
  
  const {indexStepper, updateIndexStepper} = useNewBudget();
 
  const changeTab = (index: number) => {
    updateIndexStepper(index);
  }
  
  return(
    <>
      {/* <div className="max-w-md"> */}
      {/* <div className="max-w-lg"> */}
      <div className="w-full mt-2">
        <ol
          className="grid grid-cols-1 divide-x divide-gray-500 overflow-hidden rounded-lg 
            border border-gray-500 text-sm text-gray-500 sm:grid-cols-2"
        >
          <li className={`flex items-center border-b sm:border-b-0 sm:border-r border-gray-300 justify-center 
            gap-2 p-4 cursor-pointer ${indexStepper === 0? 'bg-blue-500': (indexStepper > 0? 'bg-green-500': '')}`}
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

          {/* <li className={`relative flex items-center justify-center gap-2 p-4 cursor-pointer
            ${indexStepper === 1? 'bg-blue-500': (indexStepper > 1? 'bg-green-500': 'bg-gray-50')}`}
            onClick={() => changeTab(1)}
          >
            <span
              className="absolute -left-2 top-1/2 hidden size-4 -translate-y-1/2 rotate-45 border border-gray-500 sm:block ltr:border-b-0 ltr:border-s-0 ltr:bg-gray-500 rtl:border-e-0 rtl:border-t-0 rtl:bg-gray-500"
            >
            </span>

            <span
              className="absolute -right-2 top-1/2 hidden size-4 -translate-y-1/2 rotate-45 border border-gray-500 sm:block ltr:border-b-0 ltr:border-s-0 ltr:bg-gray-500 rtl:border-e-0 rtl:border-t-0 rtl:bg-gray-500"
            >
            </span>

            <span className="flex items-center justify-center w-8 h-8 border border-blue-600 rounded-full shrink-0 dark:border-blue-500">
              2
            </span>

            <p className="leading-none">
              <strong className="block font-medium"> Pemdiente </strong>
              <small className="mt-1">  </small>
            </p>
          </li> */}

          <li 
            onClick={() => changeTab(1)}
          >
            <div className={`flex items-center justify-center border-t sm:border-t-0 sm:border-l border-gray-300
                gap-2 p-4 cursor-pointer ${indexStepper === 1? 'bg-blue-500': (indexStepper > 1? 'bg-green-500': '')}`}>

              <span className="flex items-center justify-center w-8 h-8 border border-blue-600 rounded-full shrink-0 dark:border-blue-500">
                2
              </span>

              <p className="leading-none">
                <strong className="block font-medium"> Datos </strong>
                <small className="mt-1"> </small>
              </p>
            </div>
          </li>
        </ol>
      </div>
    </>
  )
}