import {Document, Page, Text, View, StyleSheet, Image} from '@react-pdf/renderer'
import { CurrencyFormatter } from '@/app/functions/Globals'
import { DetailExpensesTableProvider } from '@/interfaces/Providers'
import { ProviderMin } from "@/interfaces/Providers"
import { OnePayment } from '@/interfaces/Payments'
import { UsrBack } from '@/interfaces/User'

export default function ReportPaymentPDF({costs, provider, payment, user}: 
    {costs: DetailExpensesTableProvider[], provider: ProviderMin, user: UsrBack, payment: OnePayment}){
  
  const style = StyleSheet.create({
    table: {
      display: 'flex',
      flexDirection: 'row',
      margin: '3px'
    },
    containerTable: {
      paddingVertical: '10px',
      marginTop: '20px'
    },
    header: {
      fontSize: '8px',
      padding: '2px',
      borderBottom: '1px solid black',
    },
    element: {
      fontSize: '8px',
      padding: '4px',
    },
    title: {
      fontSize: '20px',
      textAlign: 'center',
      margin: '5px',
      color: '#056FBA',
    },
    subTitle: {
      fontSize: '15px',
      textAlign: 'center',
      margin: '2px',
      color: '#056FBA',
    },
    date: {
      color: '#6C7175',
      textAlign: 'right',
      margin: '2px'
    },
    inLineText: {
      display: 'flex',
      flexDirection: 'row',
      gap: '2px',
      fontSize: '10px',
    },
    headerPage: {
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: '5px',
    },
    containerData: {
      marginTop: '3px',
      paddingTop: '9px',
      paddingBottom: '3px',
      border: '1px solid gray',
    },
    textLeft: {
      margin: '2px',
      color: 'gray'
    }, 
    textRight: {
      margin: '2px',
    },
    chip: {
      borderRadius: '30px',
      backgroundColor: '#056FBA',
      color: 'white',
      padding: '3px',
      width: '60px',
    }
  })

  let totalAllCosts = 0;
  costs.map((c) => {
    totalAllCosts += c.payout;
  });
  
  return(
    <Document>
      <Page>
        <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: '30px', alignItems: 'center'}}>
          <View style={{display:'flex', flexDirection: 'row', alignItems: 'center', gap: '10px'}}>
            <Image src={'/Palaciosconstrucciones-isologo.png'} style={{width: '40px'}} />
            <View>
              <Text style={{fontSize: '10px', color: 'gray'}}>Resumen de pago a proveedor</Text>
              <Text style={{fontSize: '12px', color: 'gray'}}>RESUMEN DE PAGO</Text>
              <Text style={{fontSize: '10px', color: 'gray'}}>Palacios construcciones</Text>
            </View>
          </View>
          <View>
            <View style={{display: 'flex', flexDirection: 'row', border: '1px solid gray', width: '170px'}}>
              <View style={{backgroundColor: 'green', color: 'white', padding: '3px', width: '50%'}}><Text style={{textAlign: 'center', fontSize: '12px'}}>
                {provider.estatus? (typeof(provider.estatus)==='string'? provider.estatus : provider.estatus.name) : 'Sin condicion'}
                </Text></View>
              <View style={{padding: '3px', width: '50%'}}>
                <View style={{display:'flex', flexDirection:'row', justifyContent:'center'}}>
                  <Text style={{textAlign: 'center', fontSize: '12px'}}>Pago</Text>
                </View>
                <View style={{display:'flex', flexDirection:'row', justifyContent:'center'}}>
                  <Text style={{textAlign: 'center', fontSize: '12px', color:'green'}}>{payment.paymentplugin.plugin}</Text>
                </View>
              </View>
            </View>
            <View style={{ border: '1px solid gray', padding: '3px'}}>
              <View style={{display:'flex', flexDirection: 'row', justifyContent: 'center',}} >
                <Text style={{textAlign: 'center', fontSize: '12px'}}>
                  {CurrencyFormatter({
                    currency: 'MXN',
                    value: totalAllCosts
                  })}
                </Text>
              </View>
              <View style={[style.inLineText, {justifyContent: 'flex-end', borderTop: '1px solid gray'}]}>
                <Text style={style.textLeft}>Fecha:</Text>
                <Text style={style.textRight}> {payment.paymentplugin?.date?.substring(0, 10) || 'sin fecha'}</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: '30px', paddingBottom: '10px', borderBottom: '1px solid gray', marginTop: '7px'}}>
          <View >
            <View style={style.inLineText}>
              <Text style={style.textLeft}>Proveedor:</Text>
              <Text style={style.textRight}>{provider.name}</Text>
            </View>
            <View style={style.inLineText}>
              <Text style={style.textLeft}>RFC:</Text>
              <Text style={style.textRight}>{provider.rfc}</Text>
            </View>
            <View style={style.inLineText}>
              <Text style={style.textLeft}>CUENTA:</Text>
              <Text style={style.textRight}>{provider.account}</Text>
            </View>
            <View style={style.inLineText}>
              <Text style={style.textLeft}>Por pagar:</Text>
              <Text style={style.textRight}>
                {CurrencyFormatter({
                  currency: 'MXN',
                  value: payment.pending
                })}
              </Text>
            </View>
          </View>

          <View style={{textAlign: 'right'}}>
            <View style={[style.inLineText, {justifyContent: 'flex-end'}]}>
              <Text style={style.textLeft}>Fecha de pago:</Text>
              <Text style={style.textRight}>{payment.date.substring(0, 10)}</Text>
            </View>
            <View style={[style.inLineText, {justifyContent: 'flex-end'}]}>
              <Text style={style.textLeft}>Referencia:</Text>
              <Text style={style.textRight}>{payment.reference}</Text>
            </View>
            <View style={[style.inLineText, {justifyContent: 'flex-end'}]}>
              <Text style={style.textLeft}>Forma de pago:</Text>
              <Text style={style.textRight}>{payment.methodofpayment? (typeof(payment.methodofpayment)=='string'? payment.methodofpayment: payment.methodofpayment.name): 'sin metodo de pago'}</Text>
            </View>
            <View style={[style.inLineText, {justifyContent: 'flex-end'}]}>
              <Text style={style.textLeft}>Usuario:</Text>
              <Text style={style.textRight}>{user.name}</Text>
            </View>
          </View>
        </View>
        
        <View style={style.containerTable}>
          <View style={style.table}>
          <View style={[style.header, {flex: 1}]}><Text>#</Text></View>
            <View style={[style.header, {flex: 3}]}><Text>PROYECTO</Text></View>
            <View style={[style.header, {flex: 7}]}><Text>DESCRIPCION</Text></View>
            <View style={[style.header, {flex: 3}]}><Text>FECHA</Text></View>
            <View style={[style.header, {flex: 3}]}><Text>SALDO ANTERIOR</Text></View>
            <View style={[style.header, {flex: 3}]}><Text>PAGADO</Text></View>
            <View style={[style.header, {flex: 3}]}><Text>SALDO PENDIENTE</Text></View>
            <View style={[style.header, {flex: 1}]}><Text>DIF</Text></View>
          </View>
          {costs.map((cost, index: number) => (
            <View style={style.table} key={cost.id}>
              <View style={[style.element, {flex: 1}]}><Text>{index + 1}</Text></View>
              <View style={[style.element, {flex: 3}]}><Text>{cost.project}</Text></View>
              <View style={[style.element, {flex: 7}]}><Text>{cost.description}</Text></View>
              <View style={[style.element, {flex: 3}]}><Text>{cost.date.substring(0, 10)}</Text></View>
              <View style={[style.element, {flex: 3}]}><Text>{CurrencyFormatter({
                currency: 'MXN',
                value: cost.previoudbalanceamount
              })}</Text></View>
              <View style={[style.element, {flex: 3}]}><Text>{CurrencyFormatter({
                currency: 'MXN',
                value: cost.payout
              })}</Text></View>
              <View style={[style.element, {flex: 3}]}><Text>{CurrencyFormatter({
                currency: 'MXN',
                value: cost.unpaidbalanceamount
              })}</Text></View>
              <View style={[style.element, {flex: 1}]}><Text>{cost.partitialnumber}</Text></View>
            </View>
          ) )}
        </View>
      </Page>
    </Document>
  )
}
