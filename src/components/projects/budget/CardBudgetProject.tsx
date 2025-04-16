import DeleteElement from "@/components/DeleteElement";
import { RemoveProject } from "@/app/api/routeProjects";
import Link from "next/link";
import Chip from "@/components/providers/Chip";
import { BudgetMin } from "@/interfaces/Budget";
import { MoneyFormatter } from "@/app/functions/Globals";

export default function CardBudgetProject({budget, token}: {budget:BudgetMin, token:string}){
  return(
    <>
      <Link href={`/projects/budget/${budget._id}/profile`}>
        <div className="p-3 border border-slate-700 
                rounded-xl bg-white shadow-md shadow-slate-500 hover:shadow-xl 
                hover:shadow-slate-600">
          <div className="grid grid-cols-3 gap-x-2">
            <div className="flex flex-col items-center gap-y-1">
              <img src={'/img/projects/default.svg'} alt="logo" className="w-8 h-auto rounded-full" />
              <div>
                <DeleteElement id={budget._id} name={budget.title} 
                    token={token} remove={RemoveProject} />
              </div>
            </div>
            <div className="col-span-2 flex flex-col justify-between">
              <div>
                <p>{budget.title}</p>
                <p className="text-base font-bold">
                  {MoneyFormatter(budget.pending)}
                </p>
                <Chip label={budget.lastmove.condition.name} color={budget.lastmove.condition.color} />
              </div>
            </div>
          </div>
          <div className="flex items-center">
            <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
              <div className="bg-purple-600 h-2.5 rounded-full dark:bg-purple-500" 
                style={{"width": budget.progressAverage}}></div>
            </div>
            <p>{budget.progressAverage}%</p>
          </div>
        </div>
      </Link>
    </>
  )
}