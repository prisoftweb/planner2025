import { useNewExpense } from "@/app/store/newExpense";
import { useEffect } from "react";

export default function RefreshStepperComponent() {
  const {updateIndexStepper} = useNewExpense();

  useEffect( () => {
    updateIndexStepper(1);
  }, []);

  return (
    <></>
  )
}
