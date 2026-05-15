'use client'
import StepperProvider from "./StepperProvider";
import NewProviderContainer from "./NewProviderContainer";

export default function NewProvider({showForm, token, id, user, open, company}: 
  {showForm:Function, token:string, id:string, user: string, open:boolean, company:string}){

  return(
    <>    
      <StepperProvider >
        <NewProviderContainer id={id} showForm={showForm} token={token} user={user} open={open}
            company={company} />
      </StepperProvider>
    </>
  )
}