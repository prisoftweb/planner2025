import Label from "../Label"
import Button from "../Button";
import Input from "../Input";
import TextArea from "../TextArea";
import { useState } from "react";

type Props = {
  paymentPlugin:string, 
  setPaymentPlugin:Function, 
  date:string, 
  setDate:Function, 
  comments:string, 
  setComments: Function, 
  nextStep:Function
}

export default function PaymentPlugin({comments, date, paymentPlugin, setComments, setDate, 
  setPaymentPlugin, nextStep}: Props) {

  const [paymentPluaginLabel, setPaymentPluginLabel] = useState<string>('');
  const [dateLabel, setDateLabel] = useState<string>('');
  const [commentsLabel, setCommentsLabel] = useState<string>('');
  
  const validationData = () => {
    let band = true;

    setPaymentPluginLabel('');
    setDateLabel('');
    setCommentsLabel('');

    if(!paymentPlugin || paymentPlugin===''){
      band=false;
      setPaymentPluginLabel('El complemento de pago es obligatorio!!!');
    }

    if(!date || date===''){
      band=false;
      setDateLabel('La fecha es obligatoria!!!');
    }

    if(!comments || comments===''){
      band=false;
      setCommentsLabel('Los comentarios son obligatorios!!!');
    }

    if(band){
      nextStep(2);
    }
  }

  return (
    <>
      <div className="grid grid-cols-2 gap-x-3 gap-y-3">
        <div>
          <Label htmlFor="payment">Complemento de pago</Label>
          <Input
            onChange={(e) => setPaymentPlugin(e.target.value)}
            value={paymentPlugin.replace(/[$,","]/g, "") || ''}
            autoFocus
          />
          <p className="text-red-500" >{paymentPluaginLabel}</p>
        </div>
        <div>
          <Label htmlFor="date">Fecha </Label>
          <Input type="date" onChange={(e) => setDate(e.target.value)} />
          <p className="text-red-500" >{dateLabel}</p>
        </div>
      </div>
      <div>
        <Label htmlFor="notes">Notas </Label>
        <TextArea value={comments} onChange={(e) => setComments(e.target.value)} />
        <p className="text-red-500" >{commentsLabel}</p>
      </div>
      <div className="flex justify-center space-x-5 mt-8">
        <Button 
          onClick={validationData} 
          type="button">Siguiente</Button>
      </div>
    </>
  )
}