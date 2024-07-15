'use client'
//import Header from "../Header"
import Header from "../HeaderPage"
import Selectize from "../Selectize"
import { Options } from "@/interfaces/Common"
import { useNewExpense } from "@/app/store/newExpense"

export default function HeaderProfileExpense({options, subTotal}: {subTotal: string, options:Options[]}){
  const {updateCurrentExpense} = useNewExpense();

  const handleExpense = () => {
    updateCurrentExpense(null);
  }

  return(
    <Header title={subTotal} previousPage="/expenses">
          <Selectize options={options} routePage="expenses" subpath="/profile"
            onChangeFunction={handleExpense} />
        </Header>
  )
}