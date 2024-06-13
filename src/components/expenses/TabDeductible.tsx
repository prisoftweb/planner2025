import { useNewExpense } from "@/app/store/newExpense"

export default function TabDeductible(){
  
  const {isDeductible, updateDeductible, updateIndexStepper, report} = useNewExpense();
  
  const onClick = (value: boolean) => {
    updateDeductible(value);
    //updateIndexStepper(0);
    if(report === ''){
      updateIndexStepper(0);
    }else{
      updateIndexStepper(1);
    }
  }

  return(
    <div className="grid grid-cols-2 w-full gap-x-3 mt-5 bg-white py-1 cursor-pointer">
      <div className={`w-full px-5 ${isDeductible? 'border-b-4 border-blue-600':''}`}
        onClick={() => onClick(true)}
      >
        <p className="text-center">Deducible</p>
      </div>
      <div className={`w-full px-5 ${!isDeductible? 'border-b-4 border-blue-600':''}`}
        onClick={() => onClick(false)}
      >
        <p className="text-center">No deducible</p>
      </div>
    </div>
  )
}