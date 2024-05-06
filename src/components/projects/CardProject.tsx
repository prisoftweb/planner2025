import { Project } from "@/interfaces/Projects";
import DeleteElement from "../DeleteElement";
import { RemoveProject } from "@/app/api/routeProjects";
import Link from "next/link";
import { CurrencyFormatter } from "@/app/functions/Globals";

export default function CardProject({project, token}:
                      {project:Project, token:string}){
  return(
    <>
      <Link href={`/projects/${project._id}/profile`}>
        <div className="grid grid-cols-3 gap-x-2 p-3 border border-slate-700 
              rounded-xl bg-white shadow-md shadow-slate-500 hover:shadow-xl 
              hover:shadow-slate-600">
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
              <div>
                <DeleteElement id={project._id} name={project.title} 
                    token={token} remove={RemoveProject} />
              </div>
            </div>
            <div className="flex items-center">
              <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                <div className="bg-purple-600 h-2.5 rounded-full dark:bg-purple-500" 
                  style={{"width": project.progress.length > 0? 
                        project.progress[project.progress.length - 1].progress : 0}}></div>
              </div>
              <p>{project.progress.length > 0? 
                        project.progress[project.progress.length - 1].progress : 0}%</p>
            </div>
          </div>
          <div className="text-right flex flex-col justify-between">
            <p className="text-base">{CurrencyFormatter({
                  currency: "MXN",
                  value: project.amount
                })}
            </p>
            <p>{ project.date? 
                    Math.round((new Date().getTime() - new Date(project.date).getTime()) 
                        / 86400000): 0 } dias</p>
          </div>
        </div>
      </Link>
    </>
  )
}