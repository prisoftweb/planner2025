import Label from "../Label"
import Button from "../Button";
import CurrencyInput from "react-currency-input-field";
import Input from "../Input";
import TextArea from "../TextArea";
import { useState, useEffect, useCallback } from "react";
import { useDropzone} from 'react-dropzone';
import { createPayments, createPaymentsWithVoucher } from "@/app/api/routePayments";
import { showToastMessage, showToastMessageError } from "../Alert";
import { pendingPaymentProvider, CostInPayment } from "@/interfaces/Payments";
import { getPendingPaymentProvider } from "@/app/api/routePayments";
import { Options } from "@/interfaces/Common";
import SelectReact from "../SelectReact";
import { CostsPaymentTable } from "@/interfaces/Providers";

type Props = {
  token:string, 
  id:string, 
  user:string, 
  costs: string[], 
  condition: string, 
  minDate:string, 
  maxDate: string, 
  showForm: Function, 
  updateTable: Function, 
  optTypes: Options[], 
  costsPayment: CostsPaymentTable[], 
  paymentPlugin:string, 
  datePayment:string, 
  commentsPayment:string
}

export default function PaidExpensesHistory({token, id, user, costs, maxDate, 
  minDate, showForm, updateTable, condition, optTypes, costsPayment, commentsPayment, 
  datePayment, paymentPlugin}: Props) {

  let a = 0;
  costsPayment.map((c) => {
    a += c.paid;
  });
              
  const [amount, setAmount] = useState<string>(a.toString());
  const [reference, setReference] = useState<string>('');
  const [date, setDate] = useState<string>('');
  const [comments, setComments] = useState<string>('');
  const [pre, setPre] = useState<(File | undefined)>();

  const [amountLabel, setAmountLabel] = useState<string>('');
  const [referenceLabel, setReferenceLabel] = useState<string>('');
  const [dateLabel, setDateLabel] = useState<string>('');
  const [commentsLabel, setCommentsLabel] = useState<string>('');

  const [pending, setPending] = useState<number>(-1);
  const [paidMethod, setPaidMethod] = useState<string>(optTypes[0].value);

  const handlePaidMethod = (value: string) => {
    setPaidMethod(value);
  }

  useEffect(() => {
    const fetch = async () => {
      const res :(pendingPaymentProvider[] | string) = await getPendingPaymentProvider(id, token);
      if(typeof(res) !== 'string'){
        setPending(res[0].totalPendingPayment);
      }else{
        showToastMessageError(res);
      }
    }
    fetch();
  }, []);

  const validationData = () => {
    let band = true;

    setAmountLabel('');
    setReferenceLabel('');
    setDateLabel('');
    setCommentsLabel('');

    if(!amount || amount===''){
      band=false;
      setAmountLabel('El monto es obligatorio!!!');
    }

    if(!date || date===''){
      band=false;
      setDateLabel('La fecha es obligatoria!!!');
    }

    if(!comments || comments===''){
      band=false;
      setCommentsLabel('Los comentarios son obligatorios!!!');
    }

    if(!reference || reference===''){
      band=false;
      setReferenceLabel('La referencia es obligatoria!!!');
    }

    if(band){
      if(pending===-1){
        showToastMessageError('Error al calcular pendiente por pagar, intente otra vez!!!')
      }else{
        paidExpenses();
      }
    }
  }

  const paidExpenses = async() => {
    let pen = pending - Number(amount.replace(/[$,","]/g, ""));

    const paymentplugin = {
      plugin: Number(paymentPlugin.replace(/[$,","]/g, "")),
      date: datePayment,
      notes: commentsPayment
    }

    const arrCosts: CostInPayment[] = [];
    
    costsPayment.map((c) => {
      console.log('cost p => ', c);
      arrCosts.push({
        cost: c.id,
        previousbalanceamount: Number(c.Total.replace(/[$,",", M, X]/g, "")),
        payout: c.paid,
        unpaidbalanceamount: c.pending,
        partialitynumber: c.parciality,
        paymentelements: 1
      });
    });

    if(acceptedFiles.length > 0){
      const data = new FormData();
      data.append("reference",reference);
      data.append("payout",amount.replace(/[$]/g, ""));
      data.append("date",date);
      arrCosts.map((c) => {
        data.append("paymentInCosts", JSON.stringify(c));
      });
      costs.map((c) => data.append('costs', c));
      data.append("notes",comments);
      data.append("pending", pen.toString());
      data.append("provider",id);
      data.append("user",user);
      data.append("voucher", acceptedFiles[0]);
      data.append("condition", JSON.stringify([{
        glossary: condition,
        user
      }]));
      data.append("conditionpartial", JSON.stringify([{
        glossary: "67378f77d846bbd16e1a8714",
        user
      }]));
      data.append("conditioncurrent", JSON.stringify([{
        glossary: '6746442a734d5ab78ab98ddd',
        user
      }]));
      data.append("methodofpayment", paidMethod);
      data.append("paymentplugin", JSON.stringify(paymentplugin));

      const res = await createPaymentsWithVoucher(token, data);
      if(typeof(res) === 'string'){
        showToastMessageError(res);
      }else{ 
        showToastMessage('Costos pagados exitosamente!!!');
        updateTable();
        showForm(false);
      }
    }else{
      const data = {
        reference:reference,
        payout:Number(amount.replace(/[$,","]/g, "")),
        pending:pen,
        date,
        range: {
            min:minDate,
            max:maxDate
        },
        costs,
        paymentInCosts: arrCosts,
        notes:comments,
        provider:id,
        user,
        condition: [{
          glossary: condition,
          user
        }],
        conditioncurrent: [{
          glossary: '6746442a734d5ab78ab98ddd',
          user
        }],
        conditionpartial: [{                        
            glossary: "67378f77d846bbd16e1a8714",
            user                    
        }],
        methodofpayment: paidMethod,
        paymentplugin
      }

      const res = await createPayments(token, data);
      if(typeof(res) === 'string'){
        showToastMessageError(res);
      }else{ 
        showToastMessage('Costos pagados exitosamente!!!');
        updateTable();
        showForm(false);
      }
    }
  }

  const onDrop = useCallback((acceptedFiles: Array<File>) => {
    const file = new FileReader;
    file.readAsDataURL(acceptedFiles[0])
  }, [])

  const { acceptedFiles, getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop
  });

  useEffect(() => {
    if ( typeof acceptedFiles[0] !== 'undefined' ){
      setPre(acceptedFiles[0]);
    }else{
      setPre(undefined);
    }
  },[acceptedFiles]);

  return (
    <>
      <div className="grid grid-cols-2 gap-x-3 gap-y-3">
        <div>
          <Label htmlFor="creditlimit">Monto</Label>
          <CurrencyInput
            id="creditlimit"
            name="creditlimit"
            className="w-full border border-slate-300 rounded-md px-2 py-1 mt-2 bg-white 
              focus:border-slate-700 outline-0"
            onChange={(e) => setAmount(e.target.value.replace(/[$]/g, ""))}
            defaultValue={amount.replace(/[$,","]/g, "") || 0}
            decimalsLimit={2}
            prefix="$"
            autoFocus
          />
          <p className="text-red-500" >{amountLabel}</p>
        </div>
        <div>
          <Label htmlFor="ref">Referencia</Label>
          <Input type="text" name="ref" 
            value={reference}
            onChange={(e) => setReference(e.target.value)}
          />
          <p className="text-red-500" >{referenceLabel}</p>
        </div>
        <div>
          <Label htmlFor="date">Fecha </Label>
          <Input type="date" onChange={(e) => setDate(e.target.value)} />
          <p className="text-red-500" >{dateLabel}</p>
        </div>
        <div>
          <Label htmlFor="paidMethod">Forma de pago </Label>
          <SelectReact index={0} opts={optTypes} setValue={handlePaidMethod} />
        </div>
      </div>
      <div>
        <Label htmlFor="notes">Notas </Label>
        <TextArea value={comments} onChange={(e) => setComments(e.target.value)} />
        <p className="text-red-500" >{commentsLabel}</p>
      </div>
      <div className="mt-4">
        <Label>Subir voucher (PDF o imagen)</Label>
        <div {...getRootProps()} className="flex flex-col items-center justify-center w-full p-4 h-24 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
          <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
          </svg>
          <input {...getInputProps()} className="w-full h-8 p-6" />
          {
            isDragActive ?
              <p>Suelte sus archivos aqui ...</p> :
              <p>Arrastra los archivos, o click para seleccionar archivos</p>
          }
        </div>
        { pre && <iframe className="w-full h-80 mt-4" src={URL.createObjectURL(pre)} /> }
      </div>
      <div className="flex justify-center space-x-5 mt-8">
        <Button 
          onClick={validationData} 
          type="button">Guardar</Button>
      </div>
    </>
  )
}