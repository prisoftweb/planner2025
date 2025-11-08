import { useNewExpense } from "@/app/store/newExpense";
import { useEffect } from "react";

export default function RefreshStepperComponent({category, isDeductible}: {category:string, isDeductible: boolean}) {
  const {updateIndexStepper, updateCategory} = useNewExpense();

  useEffect( () => {
    updateCategory(category)
    //categories
    //"661eae12f642112488c85fb1" mano de obra
    //"661eae4ef642112488c85fb4" xml y pdf
    //"665f90b082c6db3d203cf093" ticket
    //"66624d61db42d11d46b97ec1" xml
    //"66e0657bc6d95ffb8aa0ec9a" ninguno

    console.log('is deductible => ', isDeductible);
    console.log('category ref => ', category);

    if(isDeductible){
      if(category==='661eae12f642112488c85fb1' || category==='661eae4ef642112488c85fb4' || 
        category==='665f90b082c6db3d203cf093'){
          console.log('is 1');
          updateIndexStepper(1);
      }else{
        if(category==='66624d61db42d11d46b97ec1'){
          console.log('is 2');
          updateIndexStepper(2);
        }else{
          console.log('is 3');
          updateIndexStepper(3);
        }
      }
    }else{
      if(category==='661eae12f642112488c85fb1' || category==='661eae4ef642112488c85fb4' || 
        category==='665f90b082c6db3d203cf093'){
          console.log('no 1');
          updateIndexStepper(1);
      }else{
        console.log('no 2');
        updateIndexStepper(2);
      }
    }

    // updateIndexStepper(1);
  }, []);

  return (
    <></>
  )
}
