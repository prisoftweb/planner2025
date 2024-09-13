import { FullBudget } from "@/interfaces/BudgetProfile";
import { CurrencyFormatter } from "@/app/functions/Globals";
import { BudgetDataToTableCostCenter } from "@/app/functions/SaveProject";

export default function ProfileBudget({budget}: {budget: FullBudget}) {

  const view = <div className="mt-3 w-full max-w-4xl bg-white rounded-lg shadow-md pl-2 px-3" 
                style={{borderColor:'#F8FAFC'}}>

              </div>;

  const amount = CurrencyFormatter({
    currency: 'MXN',
    value: budget.amount
  });

  const budgeted = CurrencyFormatter({
    currency: 'MXN',
    value: budget.budgeted
  });

  return (
    <div className="flex w-full px-2 flex-wrap space-x-2" 
        style={{backgroundColor:'#F8FAFC'}}>
      <div className={`w-full max-w-md`}>
        {/* <ProfileProject project={project} /> */}
        <div className="bg-white p-3 rounded-lg shadow-md">
          <div className="flex gap-x-2">
            <div>
              <img src={budget.project?.photo? budget.project?.photo: '/img/projects/default.svg'} alt="logo" 
                className="max-w-28 h-auto" />
            </div>
            <div>
              <p className="text-blue-500">{budget.project?.title || ''}</p>
              <p className="text-slate-500">{budget.project?.code || ''}</p>
              <p className="text-slate-500">{budget.project?.account || ''}</p>
            </div>
          </div>
          <div className="flex items-center">
            <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
              <div className="bg-purple-600 h-2.5 rounded-full dark:bg-purple-500" 
                style={{"width": budget.progressAverage ?? 0}}></div>
            </div>
            <p>{budget.progressAverage?? 0}%</p>
          </div>
        </div>
        
        <div>
          <div className="my-2 bg-white p-3 rounded-lg shadow-md py-2">
            <div className="flex gap-x-2">
              <div>
                <img src={ budget.project?.client? budget.project.client.logo: '/img/clients.svg'} alt="logo" className="w-20 h-20" />
              </div>
              <div>
                <p className="text-slate-500">{'Cliente'}</p>
                <p className="text-blue-500">{budget.project?.client? budget.project.client.name: ''}</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-x-2 my-2">
              <div className="">
                <p className="text-slate-500">Monto de obra</p>
                <p className="text-green-600">{amount}</p>
              </div>
              <div className="">
                <p className="text-slate-500">Presupuestado</p>
                <p>{budgeted}</p>
              </div>
            </div>
            <div className="my-2">
              <p className="text-slate-500">Fecha ({budget?.date?.substring(0, 10) || 'sin fecha'})</p>
            </div>
          </div>
        </div>
      </div>
      {view}
    </div>
  )
}
