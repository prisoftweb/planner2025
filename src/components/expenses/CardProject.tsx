import { useNewExpense } from "@/app/store/newExpense";
import { ReportParse } from "@/interfaces/Reports";

export default function CardProject({report}: {report:ReportParse}){
  
  const {updateIndexStepper, updateReport, 
    updateProject, updatePettyCash, category} = useNewExpense();

  const index = (category=="661eae12f642112488c85fb1" || category=="661eae4ef642112488c85fb4" 
          || category=="665f90b082c6db3d203cf093")? 1 : category=="66624d61db42d11d46b97ec1"? 2: 3;

  return(
    <>
      <div className="grid grid-cols-2 gap-x-2 p-3 border border-slate-700 
            rounded-xl bg-white shadow-md shadow-slate-500 hover:shadow-xl 
            hover:shadow-slate-600 hover:cursor-pointer"
        key={report._id + report.name}
        onClick={ () => {
          updateReport(report._id, report);
          updateProject(report.project._id);
          updatePettyCash(report.ispettycash);
          updateIndexStepper(index);
        }}
      >
        <div className="col-span-2">
          <div className="flex items-center justify-between">
            <div className="flex flex-col items-center gap-y-1">
              <img src={report.user.photo || '/img/users/default.jpg'} alt="logo" className="w-8 h-auto rounded-full" />
            </div>
            <div>
              <p>{report.name}</p>
              <p>{report.project.title}</p>
            </div>
            <div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}