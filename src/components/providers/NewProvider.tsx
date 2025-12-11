'use client'
import StepperProvider from "./StepperProvider";
import NewProviderContainer from "./NewProviderContainer";

export default function NewProvider({showForm, token, id, user, open}: 
  {showForm:Function, token:string, id:string, user: string, open:boolean}){

  return(
    <>    
      <StepperProvider >
        <NewProviderContainer id={id} showForm={showForm} token={token} user={user} open={open} />
      </StepperProvider>
    </>
  )
}