'use client'
import Header from "../HeaderPage"
import Selectize from "../Selectize"
import { Options } from "@/interfaces/Common"
import { useNewExpense } from "@/app/store/newExpense"

export default function HeaderProfileExpense({options, subTotal, idProv}: 
    {subTotal: string, options:Options[], idProv: string}){
  const {updateCurrentExpense} = useNewExpense();

  const handleExpense = () => {
    updateCurrentExpense(null);
  }

  return(
    <Header title={subTotal} previousPage={idProv && idProv != ''? `/providers/${idProv}/invoiceHistory`: `/expenses`}>
          <Selectize options={options} routePage="expenses" subpath="/profile"
            onChangeFunction={handleExpense} />
        </Header>
  )
}