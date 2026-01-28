import Label from "@/components/Label"
import TextArea from "@/components/TextArea"
import Button from "@/components/Button"
import { ICostRelAdvance } from "@/interfaces/Expenses"
import { useState, useMemo } from "react"
import { showToastMessage, showToastMessageError } from "@/components/Alert"
import { insertAdvanceInvoicesCfdisInCost } from "@/app/api/routeCost"
import { OneExpense } from "@/interfaces/Expenses"

export default function AddInvoicesInAdvance({costs, user, advance, token, handleClose, updateInvoices}: 
  {costs:ICostRelAdvance[], user:string, advance:OneExpense, token:string, handleClose: () => void, 
    updateInvoices: () => Promise<void>}) {

  const [notes, setNotes]=useState<string>();
  const [error, setError]=useState<boolean>(false);

  const [pares, impares] = useMemo(() => {
    return costs.reduce(
      ([p, i], value, index) => {
        index % 2 === 0 ? p.push(value) : i.push(value);
        return [p, i];
      },
      [[], []] as [ICostRelAdvance[], ICostRelAdvance[]]
    );
  }, [costs]);

  const saveData = async() => {
    if(notes && notes.trim() !== ''){
      setError(false);
      let validate = true;

      // console.log('costs => ', costs);
      // console.log('impares => ', impares);
      // console.log('pares => ', pares);

      for (let i = 0; i < pares.length; i++) {
        if (impares[i].cost.total > 0) {
          showToastMessageError(`El valor de la nota ${impares[i].folio} no es valido!!!!`);
          validate=false;
          break;
        }else{
          if(!impares[i].cfdisRelations.relatedUUIDs.includes(pares[i]._id)){
            showToastMessageError(`La nota no coincide con la factura ${pares[i].taxfolio}!!!!`);
            validate=false;
            break;
          }
        }
      }

      if(validate){
        const advanceInvoicesCfdis = [];

        for (let index = 0; index < pares.length; index++) {
          advanceInvoicesCfdis.push({
            invoiceUUID:pares[index]._id,
            applicationUUID:impares[index]._id,
          });
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

        // console.log('data => ', data);
        const res = await insertAdvanceInvoicesCfdisInCost(token, advance._id, data);
        if(typeof(res)==='string'){
          showToastMessageError(res);
        }
        else{
          showToastMessage('Se han agregado las facturas al anticipo correctamente!!!!');
          updateInvoices();
          handleClose();
        }
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

// update cost 
// {
//     "advancesToSuppliers": {
//         "currentbalance": 2733208.16,
//         "percentadvance": 100.0,
//         "user": "666243bfef1d807b24ed9a28",
//         "notes": ["Se agregaron 2 facturas al anticipo como pruebas"],
//         "advanceInvoicesCfdis":[
//             {
//                 "invoiceUUID":"693320ec8b2dff14f8c68778",
//                 "applicationUUID":"694ee783c180d3ed7a2e76e3",
//                 "date": "2026-01-22"
//             },
//             {
//                 "invoiceUUID":"693b04899f6656796271ceee",
//                 "applicationUUID":"696145cd01a1a2db0b93edc3",
//                 "date": "2026-01-22"
//             }
//         ]
//     }
// }

// insert advancesInvoices
// {{URL}}api/v1/costs/insertAdvanceInvoicesCfdisInCost/689a28097ceb2b3935f1f349

// {
//     "advancesToSuppliers": {
//         "currentbalance": 1528927.79,
//         "percentadvance": 55.94,
//         "user": "65d3836974045152c0c4378c",
//         "notes": ["Se agrega 1 factura al anticipo como pruebas"],
//         "advanceInvoicesCfdis":[
//             {
//                 "invoiceUUID":"693320ec8b2dff14f8c68778",
//                 "applicationUUID":"694ee7fcc180d3ed7a2e784f",
//                 "date": "2026-01-21"
//             }            
//         ]
//     }
// }