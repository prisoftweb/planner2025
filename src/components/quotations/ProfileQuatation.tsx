import { CurrencyFormatter } from "@/app/functions/Globals";
import { IOneQuotationMin } from "@/interfaces/Quotations";
import Chip from "../providers/Chip";
import RatingComponent from "./RatingComponent"
import Label from "../Label";

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import CardConfig from "../users/CardConfig";

export default function ProfileQuatation({quatation}: {quatation:IOneQuotationMin}){
// console.log('quatation min => ', quatation);
  return(
    <>
      <div className="w-full h-full mt-3">
        <div className="bg-white p-3 rounded-lg shadow-md">
          <div className="flex gap-x-2">
            <div>
              <img src={'/img/estimates/quotations.svg'} alt="logo" className="w-full max-w-28 h-auto rounded-sm" />
            </div>
            <div>
              <p className="text-slate-500">Cliente</p>
              <p className="text-blue-500 text-lg">{quatation?.client?.name || ''}</p>
            </div>
          </div>

          <div className="flex gap-x-2 justify-between items-end mt-2">
            <div>
              <p className="text-slate-500">Solicita</p>
              <p className="text-green-500 text-lg">{quatation.applicant.name}</p>
            </div>
            <div>
              <Chip label={quatation.condition[0].name} color={quatation.condition[0].color} />
            </div>
          </div>
        </div>

        <div className="bg-white p-3 rounded-lg shadow-md mt-2">
          <p className="text-blue-500">Proyecto</p>
          <p className="text-slate-500 text-xs mt-1">{quatation.description}</p>
        </div>
         
        <div className="my-2 bg-white p-3 rounded-lg shadow-md py-2">
          <div className="border border-slate-500 p-1">
            <div className="grid grid-cols-2 gap-x-2 gap-y-2 my-2">
              <div className="">
                <p className="text-slate-500">Monto cotizado</p>
                <p className="text-green-600">{CurrencyFormatter({
                  currency: 'MXN',
                  value: quatation.cost.total
                })}</p>
              </div>
              <div className="">
                <p className="text-slate-500">Tiempo de respuesta</p>
                <p>{''}</p>
              </div>
              <div className="">
                <p className="text-slate-500">Fecha solicitud</p>
                <p className="text-blue-500">{quatation?.applicationdate?.substring(0, 10) || 'sin fecha'}</p>
              </div>
              <div className="">
                <p className="text-slate-500">Fecha envio</p>
                <p className="text-blue-500">{quatation?.expirationdate?.substring(0, 10) || 'sin fecha'}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-3 rounded-lg shadow-md mt-2">
          <Label>Puntuacion</Label>
          <RatingComponent setValue={()=>{}} value={quatation.score} />
        </div>

        <div className="bg-white p-3 rounded-lg shadow-md mt-2">
          {/* <Label>Puntuacion</Label> */}
          <FormControl>
            <FormLabel id="demo-radio-buttons-group-label">Ubicacion</FormLabel>
            <RadioGroup
              row
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="LOCAL"
              name="radio-buttons-group"
              className="flex gap-x-2"
            >
              <FormControlLabel value="LOCAL" control={<Radio />} label={quatation?.location || "LOCAL"} />
            </RadioGroup>
          </FormControl>
        </div>

        <div className="bg-white p-3 rounded-lg shadow-md mt-2">
          <div className="flex gap-x-2">
            <div>
              <img src={quatation.user?.photo || '/img/users/default.jpg'} alt="logo" className="w-full rounded-3xl max-w-14 h-auto" />
            </div>
            <div>
              <p className="text-slate-400">Realiza</p>
              <p className="text-blue-500 text-lg">{quatation.user.name}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-3 rounded-lg shadow-md mt-2">
          <CardConfig text="SE FINALIZA LA COTIZACION, SOLO SE VISUALIZA EN HISTORIAL
              Y SE CONVIERTE EN NUEVO PROYECTO, VAMOS POR EL!" title="" >
            <button onClick={() => {}}
              className="bg-red-600 rounded-full text-white w-full py-2 hover:bg-red-400"
            >Convertir en proyecto</button>
          </CardConfig>
        </div>
      </div>
    </>
  )
}