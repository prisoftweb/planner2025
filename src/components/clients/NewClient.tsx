import StepperClientProvider from "./StepperClientProvider"
import NewClientContainer from "./NewClientContainer"

export default function NewClient({token, id, showForm}: 
                      {token:string, id:string, showForm:Function}){
  return(
    <>
      <StepperClientProvider >
        <NewClientContainer id={id} showForm={showForm} token={token} />
      </StepperClientProvider>
    </>
  )
}