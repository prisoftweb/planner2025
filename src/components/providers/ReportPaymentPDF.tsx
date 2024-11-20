import {Document, Page, Text, View, StyleSheet, Image} from '@react-pdf/renderer'
import { Report, CostReport } from '@/interfaces/Reports'
//import { Expense } from '@/interfaces/Expenses'
import { CurrencyFormatter } from '@/app/functions/Globals'
import { DetailExpensesTableProvider } from '@/interfaces/Providers'
import { Provider } from "@/interfaces/Providers"
import { OnePayment } from '@/interfaces/Payments'
import { UsrBack } from '@/interfaces/User'

export default function ReportPaymentPDF({costs, provider, payment, user}: 
    {costs: DetailExpensesTableProvider[], provider: Provider, user: UsrBack, payment: OnePayment}){
  
  const style = StyleSheet.create({
    table: {
      display: 'flex',
      flexDirection: 'row',
      margin: '3px'
    },
    containerTable: {
      paddingVertical: '10px',
      marginTop: '20px'
      // borderBottom: '1px solid gray',
      // borderTop: '1px solid gray'
    },
    header: {
      //flex: 1,
      fontSize: '8px',
      //textAlign: 'center',
      padding: '2px',
      borderBottom: '1px solid black',
    },
    element: {
      //flex: 1,
      fontSize: '8px',
      //textAlign: 'center',
      padding: '4px',
      //border: '1px solid black',
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
      // alignItems: 'center'
    },
    headerPage: {
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: '5px',
    },
    containerData: {
      //paddingLeft: '20px',
      marginTop: '3px',
      paddingTop: '9px',
      paddingBottom: '3px',
      border: '1px solid gray',
    },
    textLeft: {
      // width: '30%',
      // textAlign: 'right',
      margin: '2px',
      color: 'gray'
    }, 
    textRight: {
      // width: '30%',
      // textAlign: 'left',
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
    totalAllCosts += Number(c.total.replace(/[$,",", M, X]/g, ""));
  });
  
  return(
    <Document>
      <Page>
        <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: '30px', alignItems: 'center'}}>
          <View style={{display:'flex', flexDirection: 'row', alignItems: 'center'}}>
            <Image src={'/isologo_palacios.png'} style={{width: '90px'}} />
            <View>
              <Text style={{fontSize: '10px', color: 'gray'}}>Resumen de pago a proveedor</Text>
              <Text style={{fontSize: '14px', color: 'gray'}}>RESUMEN DE PAGO A PROVEEDOR</Text>
              <Text style={{fontSize: '10px', color: 'gray'}}>Palacios construcciones</Text>
            </View>
          </View>
          <View>
            <View style={{display: 'flex', flexDirection: 'row', border: '1px solid gray', width: '170px'}}>
              <View style={{backgroundColor: 'green', color: 'white', padding: '3px'}}><Text style={{textAlign: 'center'}}>Al corriente</Text></View>
              <View style={{padding: '3px'}}><Text style={{textAlign: 'center'}}>Pago</Text></View>
            </View>
            <View style={{ display:'flex', flexDirection: 'row', justifyContent: 'center', border: '1px solid gray', padding: '3px'}}><Text style={{textAlign: 'center'}}>
                {CurrencyFormatter({
                  currency: 'MXN',
                  value: totalAllCosts
                })}</Text></View>
          </View>
        </View>

        <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: '30px', paddingBottom: '10px', borderBottom: '1px solid gray'}}>
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
                })}</Text>
            </View>
          </View>

          <View style={{textAlign: 'right'}}>
            <View style={style.inLineText}>
              <Text style={style.textLeft}>Fecha:</Text>
              <Text style={style.textRight}>{payment.date.substring(0, 10)}</Text>
            </View>
            <View style={style.inLineText}>
              <Text style={style.textLeft}>Forma de pago:</Text>
              <Text style={style.textRight}>{payment.methodofpayment? (typeof(payment.methodofpayment)=='string'? payment.methodofpayment: payment.methodofpayment.name): 'sin metodo de pago'}</Text>
            </View>
            <View style={style.inLineText}>
              <Text style={style.textLeft}>Usuario:</Text>
              <Text style={style.textRight}>{user.name}</Text>
            </View>
          </View>
        </View>
        
        <View style={style.containerTable}>
          <View style={style.table}>
            <View style={[style.header, {flex: 1}]}><Text>PROYECTO</Text></View>
            <View style={[style.header, {flex: 1}]}><Text>INFORME</Text></View>
            <View style={[style.header, {flex: 3}]}><Text>DESCRIPCION</Text></View>
            <View style={[style.header, {flex: 1}]}><Text>FECHA</Text></View>
            <View style={[style.header, {flex: 1}]}><Text>IMPORTE</Text></View>
            <View style={[style.header, {flex: 1}]}><Text>TOTAL</Text></View>
          </View>
          {costs.map((cost) => (
            <View style={style.table} key={cost.id}>
              <View style={[style.element, {flex: 1}]}><Text>{cost.project}</Text></View>
              <View style={[style.element, {flex: 1}]}><Text>{cost.report }</Text></View>
              <View style={[style.element, {flex: 3}]}><Text>{cost.description}</Text></View>
              <View style={[style.element, {flex: 1}]}><Text>{cost.date.substring(0, 10)}</Text></View>
              <View style={[style.element, {flex: 1}]}>
                <Text>{cost.importe}</Text>
              </View>
              <View style={[style.element, {flex: 1}]}><Text>{cost.total}</Text></View>
            </View>
          ) )}
        </View>

        {/* <View style={[style.inLineText, {marginLeft: '30px', marginTop: '10px'}]}>
          <Text style={{textDecoration: 'underline'}}>Total del pago :</Text>
          <Text style={{textDecoration: 'underline'}}>{CurrencyFormatter({
              currency: 'MXN',
              // value: report.total
              value: totalAllCosts
            })}</Text>
        </View> */}
      </Page>
    </Document>
  )
}
