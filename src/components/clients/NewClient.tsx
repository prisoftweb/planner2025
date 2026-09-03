import StepperClientProvider from "./StepperClientProvider"
import NewClientContainer from "./NewClientContainer"
import { Options } from "@/interfaces/Common"

export default function NewClient({token, id, showForm, tags, company}: 
  {token:string, id:string, showForm:Function, tags:Options[], company:string}){

  // console.log('new client tags => ', tags);

  return(
    <>
      <StepperClientProvider >
        <NewClientContainer tags={tags} id={id} showForm={showForm} token={token} company={company} />
      </StepperClientProvider>
    </>
  )
}