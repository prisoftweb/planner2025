import NewProjectContainer from "./NewProjectContainer"
import StepperProjectProvider from "./StepperProjectProvider"
import { Options } from "@/interfaces/Common"

export default function NewProject({token, showForm, optClients, optCategories,
                        optTypes, user, optCompanies, condition }: 
                      {token:string, showForm:Function, optClients:Options[], 
                        optCategories:Options[], optTypes:Options[], user:string,
                        optCompanies: Options[], condition: string}){
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