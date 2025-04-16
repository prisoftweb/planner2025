import { ProjectMin } from "@/interfaces/Projects";
import { MoneyFormatter } from "@/app/functions/Globals";
import { useNewBudget } from "@/app/store/budgetProject";

export default function CardProject({project, token}: {project:ProjectMin, token:string}){

  const {updateProject, updateIndexStepper} = useNewBudget();

  return(
    <>
      <div className="grid grid-cols-3 gap-x-2 p-3 border border-slate-700 
            rounded-xl bg-white shadow-md shadow-slate-500 hover:shadow-xl 
            hover:shadow-slate-600 cursor-pointer"
        onClick={() => {
          updateProject(project);
          updateIndexStepper(1);
        }}
      >
        <div className="col-span-2">
          <div className="flex items-center justify-between">
            <div className="flex flex-col items-center gap-y-1">
              <img src={project.photo} alt="logo" className="w-8 h-auto rounded-full" />
              <div className={`w-3 h-3 ${project.status? 'bg-green-500': 'bg-red-500'}`}></div>
            </div>
            <div>
              <p>{project.title}</p>
              <p>{project.account}</p>
            </div>
          </div>
          <div className="flex items-center">
            <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
              <div className="bg-purple-600 h-2.5 rounded-full dark:bg-purple-500" 
                style={{"width": project.progress?? 0}}></div>
            </div>
            <p>{project.progress?? 0}%</p>
          </div>
        </div>
        <div className="text-right flex flex-col justify-between">
          <p className="text-base">
            {MoneyFormatter(project.amount)}
          </p>
          <p>{ project.date? 
                  Math.round((new Date().getTime() - new Date(project.date).getTime()) 
                      / 86400000): 0 } dias</p>
        </div>
      </div>
    </>
  )
}