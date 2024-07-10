//import { Project } from "@/interfaces/Projects";
import { useNewExpense } from "@/app/store/newExpense";
import { ReportParse } from "@/interfaces/Reports";

export default function CardProject({report}:
                      {report:ReportParse}){
  
  const {updateIndexStepper, updateReport, 
    updateProject, updatePettyCash} = useNewExpense();

  return(
    <>
      <div className="grid grid-cols-2 gap-x-2 p-3 border border-slate-700 
            rounded-xl bg-white shadow-md shadow-slate-500 hover:shadow-xl 
            hover:shadow-slate-600 hover:cursor-pointer"
        key={report._id + report.name}
        onClick={ () => {
          //console.log('report card project => ', report.name);
          //console.log('rep id => ', report._id);
          updateReport(report._id);
          updateProject(report.project._id);
          updatePettyCash(report.ispettycash);
          updateIndexStepper(1);
        }}
      >
        <div className="col-span-2">
          <div className="flex items-center justify-between">
            <div className="flex flex-col items-center gap-y-1">
              <img src={report.user.photo || '/img/users/default.jpg'} alt="logo" className="w-8 h-auto rounded-full" />
              {/* <div className={`w-3 h-3 ${project.status? 'bg-green-500': 'bg-red-500'}`}></div> */}
            </div>
            <div>
              <p>{report.name}</p>
              <p>{report.project.title}</p>
            </div>
            <div>
            </div>
          </div>
          {/* <div className="flex items-center">
            <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
              <div className="bg-purple-600 h-2.5 rounded-full dark:bg-purple-500" 
                style={{"width": project.progress.length > 0? 
                      project.progress[project.progress.length - 1].progress : 0}}></div>
            </div>
            <p>{project.progress.length > 0? 
                      project.progress[project.progress.length - 1].progress : 0}%</p>
          </div> */}
        </div>
      </div>
    </>
  )
}