'use client'
import { OneProjectMin } from "@/interfaces/Projects"
import { Options } from "@/interfaces/Common";
import { IEstimateProject, IEstimateMin } from "@/interfaces/Estimate";
import TableEstimatesWithoutInovice from "./TableEstimatesWithoutInvoice";
interface OptionsDashboard {
  label: string,
  costo: number
}

export default function ContainerEstimatesWithoutInvoice({ estimates, token, user }: 
  {estimates:IEstimateMin[], token: string, user: string }) {

  // const [openNewStimate, setOpenNewStimate] = useState<boolean>(false);
  // const [isfilterTable, setIsFilterTable] = useState<boolean>(false);
  // const [estimatesData, setEstimatesData] = useState<IEstimateProject[]>(estimates);

  // const [openNewInvoice, setOpenNewInvoice] = useState<boolean>(false);
  // const [selEstimate, setSelEstimate]=useState<TableEstimatesProject>();

  // const handleSelEstimate = (value: TableEstimatesProject) => {
  //   setSelEstimate(value);
  // }

  // const [totalEstimatedProjectState, setTotalEstimatedProjectState] = useState<TotalEstimatedByProject[]>(totalEstimatedProject);

  // const handleFilterTable = (value: boolean) => {
  //   setIsFilterTable(value);
  // }

  // const handleShowForm = (value: boolean) => {
  //   setOpenNewStimate(value);
  // }

  // const handleShowFormInvoice = (value: boolean) => {
  //   setOpenNewInvoice(value);
  // }

  // const updateEstimatesProject = async () => {
  //   let estimates: IEstimateProject[];
  //   try {
  //     estimates = await getEstimatesByProject(token, project._id);
  //     console.log('estimates min => ', estimates);
  //     if(typeof(estimates) === "string"){
  //       showToastMessageError(estimates);
  //     }else{
  //       setEstimatesData(estimates);
  //     }
  //   } catch (error) {
  //     showToastMessageError('Ocurrio un error al actualizar las estimaciones del proyecto!!');  
  //   }

  //   let totalEstimated: TotalEstimatedByProject[];
  //   try {
  //     totalEstimated = await getTotalEstimatesByProjectMin(token, project._id);
  //     if(typeof(totalEstimated) === "string"){
  //       showToastMessageError(totalEstimated);
  //     }else{
  //       setTotalEstimatedProjectState(totalEstimated);
  //     }
  //   } catch (error) {
  //     showToastMessageError('Ocurrio un error al actualizar el total de las estimaciones del proyecto!!')
  //   }

  //   setIsFilterTable(false);
  // }

  // const delEstimate = (id:string) => {
  //   updateEstimatesProject();
  // }

  // const colors = ['blue', 'red', 'green', 'orange', 'cyan', 'indigo', 'amber', 'violet', 'lime', 'fuchsia', 'blue', 'red', 'cyan', 'green', 'orange', 'indigo', 'amber', 'violet', 'lime', 'fuchsia'];

  // const categoriesEstimates: string[] = [];
  // const dataEstimatesDashboard: OptionsDashboard[] = [];  

  // let advance = 0;

  // estimatesData.map((e) => {
  //   dataEstimatesDashboard.push({
  //     costo: (e.amount / project.amount) * 100,
  //     label: e.name
  //   });
  //   categoriesEstimates.push(e.name);
  //   if(e.ismoneyadvance){
  //     advance+=e.amount;
  //   }
  // });
  // console.log('data estimated dashboard => ', dataEstimatesDashboard);

  // const overflow = totalEstimatedProjectState[0]?.amountChargeOff >= advance;

  // let component = tab===1? <TableInvoicesComponent token={token} project={project} />: (tab===2? <></>: 
  //                   <TableEstimatesByProject project={project} optConditions={optConditions} optProjects={optProjects} 
  //                     estimates={estimatesData} handleFilterTable={handleFilterTable} isFilterTable={isfilterTable} 
  //                     delEstimate={delEstimate} showNewInvoice={handleShowFormInvoice} token={token} 
  //                     selEstimate={handleSelEstimate}  />)

  const delEstimate = () => {

  }

  return (
    <>
      <TableEstimatesWithoutInovice estimates={estimates} delEstimate={delEstimate} token={token} />
    </>
  )
}
