import { useNewExpense } from "@/app/store/newExpense";
import { useEffect } from "react";

export default function RefreshStepperComponent({category, isDeductible}: {category:string, isDeductible: boolean}) {
  const {updateIndexStepper, updateCategory} = useNewExpense();

  useEffect( () => {
    console.log('RefreshStepperComponent - useEffect - category:', category, ' isDeductible:', isDeductible);
    updateCategory(category)
    //categories
    //"661eae12f642112488c85fb1" mano de obra
    //"661eae4ef642112488c85fb4" xml y pdf
    //"665f90b082c6db3d203cf093" ticket
    //"66624d61db42d11d46b97ec1" xml
    //"66e0657bc6d95ffb8aa0ec9a" ninguno
    if(isDeductible){
      if(category==='661eae12f642112488c85fb1' || category==='661eae4ef642112488c85fb4' || 
        category==='665f90b082c6db3d203cf093'){
          updateIndexStepper(1);
      }else{
        if(category==='66624d61db42d11d46b97ec1'){
          updateIndexStepper(2);
        }else{
          updateIndexStepper(3);
        }
      }
    }else{
      if(category==='661eae12f642112488c85fb1' || category==='661eae4ef642112488c85fb4' || 
        category==='665f90b082c6db3d203cf093'){
          updateIndexStepper(1);
      }else{
        updateIndexStepper(2);
      }
    }
  }, []);

  return (
    <></>
  )
}
