import Label from "@/components/Label"
import TextArea from "@/components/TextArea"
import Button from "@/components/Button"
import { ICostRelAdvanceInv } from "@/interfaces/Expenses"
import { useState } from "react"
import { showToastMessage, showToastMessageError } from "@/components/Alert"
import { insertAdvanceInvoicesCfdisInCost } from "@/app/api/routeCost"
import { OneExpense } from "@/interfaces/Expenses"

export default function AddInvoicesInAdvance({costs, user, advance, token, handleClose, updateInvoices}: 
  {costs:ICostRelAdvanceInv[], user:string, advance:OneExpense, token:string, handleClose: () => void, 
    updateInvoices: () => Promise<void>}) {

  const [notes, setNotes]=useState<string>();
  const [error, setError]=useState<boolean>(false);

  const saveData = async() => {
    if(notes && notes.trim() !== ''){
      setError(false);

      const advanceInvoicesCfdis = [];
      for (let index = 0; index < costs.length; index++) {
        const applicationUUID = (Array.isArray(costs[index].applicationUUID)? costs[index].applicationUUID: []).map((c) => c._id);
        advanceInvoicesCfdis.push({
          invoiceUUID:costs[index].invoiceUUID._id,
          applicationUUID
        })
      }

      const data ={
        advancesToSuppliers: {
          currentbalance: advance.advancesToSuppliers?.currentbalance,
          percentadvance: advance.advancesToSuppliers?.percentadvance,
          user,
          notes: [notes],
          advanceInvoicesCfdis
        }
      }

      console.log('data insertAdvanceInvoicesCfdisInCost => ', JSON.stringify(data));

      const res = await insertAdvanceInvoicesCfdisInCost(token, advance._id, data);
      if(typeof(res)==='string'){
        showToastMessageError(res);
      }
      else{
        showToastMessage('Se han agregado las facturas al anticipo correctamente!!!!');
        updateInvoices();
        handleClose();
      }
    }else{
      setError(true);
    }
  }

  return (
    <div>
      <Label>Notas:</Label>
      <TextArea onChange={(e) => setNotes(e.target.value)} value={notes}></TextArea>
      {error && (
        <div className="my-1 bg-red-100 border-l-4 font-light text-sm border-red-500 text-red-700 p-2">
          <p>Las notas no pueden ir vacias!!!!</p>
        </div>
      )}
      <div className="flex justify-center mt-5">
        <Button type="button" onClick={saveData}>Guardar</Button>
      </div>
    </div>
  )
}
