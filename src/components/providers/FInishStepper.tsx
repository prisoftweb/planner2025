import { useRegFormContext } from "./StepperProvider"
import { useEffect } from "react";
import { createProvider } from "@/app/api/routeProviders";

export default function FinishStepper({token, id}: {token:string, id:string}){
  
  const [state,] = useRegFormContext();  
  
  console.log(state);

  useEffect(() => {
    const provider = async () => {
      
      const {name, account, rfc, suppliercredit, tradename} = state.databasic;
      const {creditdays, creditlimit, currentbalance, percentoverduedebt} = state.creditline;
      
      const data = {
        name,
        account,
        rfc,
        suppliercredit,
        tradename,
        tradeline: {
          creditdays,
          creditlimit,
          currentbalance,
          percentoverduedebt
        },
        user: id,
      }

      console.log('dataaaa');
      console.log(data);

      try {
        const res = await createProvider(data, token);
        if(res === 201){
          console.log('proveedor creado!!');
        }
        else{
          console.log(res);
        }
      } catch (error) {
        console.log('Error al crear proveedor');
        console.log(error);
        console.log(typeof(error));
      }
    }

    provider();
  }, [])

  return(
    <>
      Final del formulario
    </>
  )
}