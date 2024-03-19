import StepperClientProvider from "./StepperClientProvider"
import NewClientContainer from "./NewClientContainer"
import { Options } from "@/interfaces/Common"

export default function NewClient({token, id, showForm, tags}: 
                      {token:string, id:string, showForm:Function, tags:Options[]}){
  return(
    <>
      <StepperClientProvider >
        <NewClientContainer tags={tags} id={id} showForm={showForm} token={token} />
      </StepperClientProvider>
    </>
  )
}