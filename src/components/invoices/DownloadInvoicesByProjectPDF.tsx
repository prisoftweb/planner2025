import { IInvoiceByProject } from "@/interfaces/Invoices"
import {Document, Page, Text, Image, View} from '@react-pdf/renderer'
import { CurrencyFormatter } from '@/app/functions/Globals'
import { OneProjectMin } from "@/interfaces/Projects"
import { ITotalInvoiceResumen } from "@/interfaces/Invoices"
import { useEffect, useState } from "react"
import { ITotalResumentPayment } from "@/interfaces/Collections"
import { getAllTotalPaymentsResumeByProjectMin } from "@/app/api/routeCollections"

export default function DownloadInvoicesByProjectPDF({invoices, project, resumenInvoice, token}: 
  {invoices: IInvoiceByProject[], project:OneProjectMin, resumenInvoice:ITotalInvoiceResumen, token:string}) {
  // const months = ['ENERO', 'FEBRERO', 'MARZO', 'ABRIL', 'MARZO', 'JUNIO', 'JULIO', 'AGOSTO', 'SEPTIEMBRE', 'OCTUBRE', 'NOVIEMBRE', 'DICIEMBRE'];
  // const date = new Date(report.date);

  // const dateIni = dates[0]?.minDate? new Date(dates[0].minDate): new Date();
  // const dateEnd = dates[0]?.maxDate? new Date(dates[0].maxDate): new Date();

  // const bandMonth = dateIni.getMonth() === dateEnd.getMonth()

  const [totalPaymentsResumen, setTotalPaymentsResumen] = useState<ITotalResumentPayment>();

  useEffect(() => {
    const fetch = async () => {
      let totalPaymentsResumen: ITotalResumentPayment;
      totalPaymentsResumen = await getAllTotalPaymentsResumeByProjectMin(token, project._id);
      if(typeof(totalPaymentsResumen) !== "string"){
        setTotalPaymentsResumen(totalPaymentsResumen);
      }
    }
    fetch();
  }, []);

  const orderInvoices = invoices.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  console.log('order inv => ', orderInvoices);

  return(
    <Document>
      <Page>
        <View style={{padding: '15px', marginTop: '66px'}}>

          <View style={{display: 'flex', flexDirection: 'row', gap:'5px', justifyContent: 'space-between'}}>

            <View style={{display:'flex', flexDirection:'column'}}>
              <View style={{display:'flex', flexDirection:'row', alignItems:'center', gap:'5px'}}>
                {/* <Image source={'/isologo_palacios.png'} style={{height: '57px', width:'67px'}}></Image> */}
                <Image source={'/isologo_palacios.png'} style={{height: '57px', width:'auto'}}></Image>
                <View style={{display:'flex', flexDirection:'row', gap:'9px'}}>
                  <View>
                    <Text style={{fontSize:'15px', color:'gray'}}>ESTADO DE CUENTA</Text>
                    <Text style={{fontSize:'11px', color:'gray'}}>{project.title}</Text>
                  </View>
                </View>
              </View>
{/* <View style={{marginTop:'5px', display:'flex', flexDirection:'row', gap: '2px', fontSize: '10px', justifyContent:'flex-start', alignItems:'center'}}></View> */}
              <View style={{display:'flex', flexDirection:'row', gap: '2px', fontSize: '10px'}}>
                <Text style={{color:'gray', margin: '2px'}}>Cliente:</Text>
                <Text style={{margin: '2px'}}>{project.client.name}</Text>
              </View>

              <View style={{display:'flex', flexDirection:'row', gap: '2px', fontSize: '10px'}}>
                <Text style={{color:'gray', margin: '2px'}}>RFC:</Text>
                <Text style={{margin: '2px'}}>{project.client.rfc}</Text>
              </View>

              <View style={{display:'flex', flexDirection:'row', gap: '2px', fontSize: '10px'}}>
                <Text style={{color:'gray', margin: '2px'}}>Proyecto:</Text>
                <Text style={{margin: '2px'}}>{project.title}</Text>
              </View>

              <View style={{display:'flex', flexDirection:'row', gap: '2px', fontSize: '10px'}}>
                <Text style={{color:'gray', margin: '2px'}}>Monto total del proyecto:</Text>
                <Text style={{margin: '2px'}}>{CurrencyFormatter({
                  currency: 'MXN',
                  // value: project.amount
                  // value: project.amount * 1.16
                  value: project.amountotal || 0
                })}</Text>
              </View>

            </View>

            <View style={{padding:'13px'}}>
              <View style={{border:'1px solid gray'}}>
                <View style={{border:'1px solid gray', backgroundColor:'green', textAlign:'center', display:'flex', flexDirection:'row', justifyContent:'center'}}>
                  <Text style={{color:'white', textAlign:'center', fontSize:'10px'}}>Pagado</Text>
                </View>
                <View style={{textAlign:'center', border:'1px solid gray', padding:'3px', display:'flex', flexDirection:'row', justifyContent:'center'}}>
                  <Text style={{textAlign:'center', color:'gray', fontSize:'11px'}}>
                    {CurrencyFormatter({
                      currency: 'MXN',
                      value: totalPaymentsResumen?.totalPayments?.totalPayments || 0
                    })}
                  </Text>
                </View>
              </View>

              <View style={{marginTop:'5px', display:'flex', flexDirection:'row', justifyContent:'flex-end', alignItems:'center'}}>
                <Text style={{fontSize:'10px', color:'gray'}}>Fecha: </Text>
                <Text style={{fontSize:'10px', fontWeight: 'bold'}}>{new Date().toISOString().substring(0, 10)}</Text>
              </View>
              <View style={{marginTop:'5px', display:'flex', flexDirection:'row', justifyContent:'flex-end', alignItems:'center'}}>
                <Text style={{fontSize:'10px', color:'gray'}}>Pendiente de estimar/facturar:</Text>
                <Text style={{fontSize:'10px', fontWeight: 'bold'}}>{CurrencyFormatter({
                  currency: 'MXN',
                  value: totalPaymentsResumen?.billedTotal?.pendingBillingTotal || 0
                })}</Text>
              </View>
              <View style={{marginTop:'5px', display:'flex', flexDirection:'row', justifyContent:'flex-end', alignItems:'center'}}>
                <Text style={{fontSize:'10px', color:'gray'}}>Pendiente de pago:</Text>
                <Text style={{fontSize:'10px', color:'red', fontWeight: 'bold'}}>{CurrencyFormatter({
                  currency: 'MXN',
                  value: totalPaymentsResumen?.totalPayments?.pendingPaymentTotal || 0
                })}</Text>
              </View>
              <View style={{marginTop:'5px', display:'flex', flexDirection:'row', justifyContent:'flex-end', alignItems:'center'}}>
                <Text style={{fontSize:'10px', color:'gray'}}>Pendiente de pago total:</Text>
                <Text style={{fontSize:'10px', color:'red', fontWeight: 900}}>{CurrencyFormatter({
                  currency: 'MXN',
                  value: (totalPaymentsResumen?.billedTotal?.pendingBillingTotal || 0) + (totalPaymentsResumen?.totalPayments?.pendingPaymentTotal || 0)
                })}</Text>
              </View>
            </View>
          </View>

          <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', marginTop: '10px', margin: '3px'}}>
            <Text style={{flex: 1, fontSize: '7px', padding: '2px', borderBottom: '1px solid black', fontWeight: 'bold'}}>Folio</Text>
            <Text style={{flex: 1, fontSize: '7px', padding: '2px', borderBottom: '1px solid black', fontWeight: 'bold'}}>Fecha</Text>
            <Text style={{flex: 1, fontSize: '7px', padding: '2px', borderBottom: '1px solid black', fontWeight: 'bold'}}>Metodo|Forma de pago</Text>
            <Text style={{flex: 1, fontSize: '7px', padding: '2px', borderBottom: '1px solid black', fontWeight: 'bold'}}>Estimacion </Text>
            <Text style={{flex: 1, fontSize: '7px', padding: '2px', borderBottom: '1px solid black', fontWeight: 'bold'}}>Condicion</Text>
            <Text style={{flex: 1, fontSize: '7px', padding: '2px', borderBottom: '1px solid black', fontWeight: 'bold'}}>Importe saldo ant.</Text>
            <Text style={{flex: 1, fontSize: '7px', padding: '2px', borderBottom: '1px solid black', fontWeight: 'bold'}}>saldo pagado</Text>
            <Text style={{flex: 1, fontSize: '7px', padding: '2px', borderBottom: '1px solid black', fontWeight: 'bold'}}>Saldo pendiente pago</Text>
          </View>

          {orderInvoices.map((i) => (
            <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', marginTop: '10px', margin: '3px'}} key={i._id}>
              <Text style={{flex: 1, fontSize: '7px', padding: '2px', borderBottom: '0.2px solid gray', fontWeight: 'bold'}}>{i.folio}</Text>
              <Text style={{flex: 1, fontSize: '7px', padding: '2px', borderBottom: '0.2px solid gray', fontWeight: 'bold'}}>{i.date.substring(0, 10)}</Text>
              <Text style={{flex: 1, fontSize: '7px', padding: '2px', borderBottom: '0.2px solid gray', fontWeight: 'bold'}}>{i.paymentMethod} | {i.paymentWay} | {i.useCFDI}</Text>
              <Text style={{flex: 1, fontSize: '7px', padding: '2px', borderBottom: '0.2px solid gray', fontWeight: 'bold'}}>{i.estimate.name} </Text>
              <Text style={{flex: 1, fontSize: '7px', padding: '2px', borderBottom: '0.2px solid gray', fontWeight: 'bold'}}>{i.condition.name}</Text>
              <Text style={{flex: 1, fontSize: '7px', padding: '2px', borderBottom: '0.2px solid gray', fontWeight: 'bold'}}>{CurrencyFormatter({
                currency: 'MXN',
                value: i.lastpayment?.previousbalanceamount || 0
              })}</Text>
              <Text style={{flex: 1, fontSize: '7px', padding: '2px', borderBottom: '0.2px solid gray', fontWeight: 'bold'}}>{CurrencyFormatter({
                currency: 'MXN',
                // value: (i.lastpayment?.unchargedbalanceamount >= 0 && i.lastpayment?.unchargedbalanceamount <= 100? 
                //               i.cost.total: i.cost.total - i.lastpayment?.previousbalanceamount) || i.cost.total
                value: i.lastpayment?.charged || 0
              })}</Text>
              <Text style={{flex: 1, fontSize: '7px', padding: '2px', borderBottom: '0.2px solid gray', fontWeight: 'bold'}}>{CurrencyFormatter({
                currency: 'MXN',
                value: i.lastpayment?.unchargedbalanceamount || 0
              })}</Text>
            </View>
          ))}

        </View>
      </Page>
    </Document>
  )
}
