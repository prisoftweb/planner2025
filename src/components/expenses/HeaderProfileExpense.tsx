'use client'
import Header from "../HeaderPage"
import Selectize from "../Selectize"
import { Options } from "@/interfaces/Common"
import { useNewExpense } from "@/app/store/newExpense"

export default function HeaderProfileExpense({options, subTotal, idProv, pending}: 
    {subTotal: string, options:Options[], idProv: string, pending: 1|0}){
  const {updateCurrentExpense} = useNewExpense();

  const handleExpense = () => {
    updateCurrentExpense(null);
  }

  return(
    <Header title={subTotal} previousPage={idProv && idProv != ''? `/providers/${idProv}/invoiceHistory`: (pending===0? `/expenses`: `/expenses/pending`)}>
          <Selectize options={options} routePage="expenses" subpath="/profile"
            onChangeFunction={handleExpense} />
        </Header>
  )
}