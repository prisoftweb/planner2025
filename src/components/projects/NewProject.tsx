import NewProjectContainer from "./NewProjectContainer"
import StepperProjectProvider from "./StepperProjectProvider"
import { Options } from "@/interfaces/Common"

type Props = {
  token:string, 
  showForm:Function, 
  optClients:Options[], 
  optCategories:Options[], 
  optTypes:Options[], 
  user:string,
  optCompanies: Options[], 
  condition: string
}

export default function NewProject({token, showForm, optClients, optCategories,
  optTypes, user, optCompanies, condition }: Props){
  
  return(
    <>
      <StepperProjectProvider >
        <NewProjectContainer showForm={showForm} 
          token={token} optClients={optClients} optCategories={optCategories} 
           optTypes={optTypes} user={user} optCompanies={optCompanies} condition={condition} />
      </StepperProjectProvider>
    </>
  )
}