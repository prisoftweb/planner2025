import NewProjectContainer from "./NewProjectContainer"
import StepperProjectProvider from "./StepperProjectProvider"
import { Options } from "@/interfaces/Common"

export default function NewProject({token, showForm, optClients, optCategories,
                        optTypes, user, optCompanies }: 
                      {token:string, showForm:Function, optClients:Options[], 
                        optCategories:Options[], optTypes:Options[], user:string,
                        optCompanies: Options[]}){
  return(
    <>
      <StepperProjectProvider >
        <NewProjectContainer showForm={showForm} 
          token={token} optClients={optClients} optCategories={optCategories} 
           optTypes={optTypes} user={user} optCompanies={optCompanies} />
      </StepperProjectProvider>
    </>
  )
}