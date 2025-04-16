'use client'
import StepperProvider from "./StepperProvider";
import NewProviderContainer from "./NewProviderContainer";

export default function NewProvider({showForm, token, id, user}: 
  {showForm:Function, token:string, id:string, user: string}){

  return(
    <>    
      <StepperProvider >
        <NewProviderContainer id={id} showForm={showForm} token={token} user={user} />
      </StepperProvider>
    </>
  )
}