import {Document, Page, Text, Image, View} from '@react-pdf/renderer'
import { CurrencyFormatter } from '@/app/functions/Globals'
import { ICollectionMin, ITotalAmountRecoveredCollections } from '@/interfaces/Collections';
import { Company } from '@/interfaces/Companies';

export default function DownloadCollectionPDF({collections, fechaFin ,fechaIni, totalCollections, satCompany}:
  {collections: ICollectionMin[], fechaIni?:Date, fechaFin?:Date, totalCollections:ITotalAmountRecoveredCollections, 
    satCompany:Company}) {

  const orderCollections = collections.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  // este ya

  return(
    <Document>
      <Page>
        <View style={{padding: '15px', marginTop: '15px'}}>

          <View style={{display: 'flex', flexDirection: 'row', gap:'5px', justifyContent: 'space-between'}}>

            <View style={{display:'flex', flexDirection:'column'}}>
              <View style={{display:'flex', flexDirection:'row', alignItems:'center', gap:'5px'}}>
                {/* <Image source={'/isologo_palacios.png'} style={{height: '57px', width:'67px'}}></Image> */}
                {/* <Image source={'/isologo_palacios.png'} style={{height: '57px', width:'auto'}}></Image> */}
                <Image source={satCompany.logo} style={{height: '57px', width:'auto'}}></Image>
                <View style={{display:'flex', flexDirection:'row', gap:'9px'}}>
                  <View>
                    <Text style={{fontSize:'15px', color:'gray', width: '250px'}}>COBRANZA</Text>
                    {/* <Text style={{fontSize:'11px', color:'gray'}}>{project.title}</Text> */}
                  </View>
                </View>
              </View>
{/* <View style={{marginTop:'5px', display:'flex', flexDirection:'row', gap: '2px', fontSize: '10px', justifyContent:'flex-start', alignItems:'center'}}></View> */}
            </View>

            <View style={{padding:'13px'}}>
              <View style={{border:'1px solid gray'}}>
                <View style={{border:'1px solid gray', backgroundColor:'green', textAlign:'center', display:'flex', flexDirection:'row', justifyContent:'center'}}>
                  <Text style={{color:'white', textAlign:'center', fontSize:'10px'}}>Cobrado</Text>
                </View>
                <View style={{textAlign:'center', border:'1px solid gray', padding:'3px', display:'flex', flexDirection:'row', justifyContent:'center'}}>
                  <Text style={{textAlign:'center', color:'gray', fontSize:'11px'}}>
                    {CurrencyFormatter({
                      currency: 'MXN',
                      // value: total || 0
                      value: totalCollections?.amountcharged?? 0
                    })}
                  </Text>
                </View>
              </View>

              <View style={{marginTop:'5px', display:'flex', flexDirection:'row', justifyContent:'flex-end', alignItems:'center', gap:'3px'}}>
                <Text style={{fontSize:'10px', color:'gray'}}>Fecha: </Text>
                <Text style={{fontSize:'10px'}}>{new Date().toISOString().substring(0, 10)}</Text>
              </View>

              <View style={{marginTop:'5px', display:'flex', flexDirection:'row', justifyContent:'flex-end', alignItems:'center', gap:'3px'}}>
                <Text style={{fontSize:'10px', color:'gray'}}>Periodo: </Text>
                <Text style={{fontSize:'10px'}}>{fechaIni?.toISOString().substring(0, 10)} a {fechaFin?.toISOString().substring(0, 10)}</Text>
              </View>
              {/* <View style={{marginTop:'5px', display:'flex', flexDirection:'row', justifyContent:'flex-end', alignItems:'center', gap:'3px'}}>
                <Text style={{fontSize:'10px', color:'gray'}}>Pendiente de estimar/facturar: </Text>
                <Text style={{fontSize:'10px'}}>{CurrencyFormatter({
                  currency: 'MXN',
                  value: resumenPayment?.billedTotal?.pendingBillingTotal || 0
                })}</Text>
              </View>
              <View style={{marginTop:'5px', display:'flex', flexDirection:'row', justifyContent:'flex-end', alignItems:'center', gap:'3px'}}>
                <Text style={{fontSize:'10px', color:'gray'}}>Pendiente de pago:</Text>
                <Text style={{fontSize:'10px', color:'green'}}>{CurrencyFormatter({
                  currency: 'MXN',
                  value: resumenPayment?.totalPayments?.pendingPaymentTotal || 0
                })}</Text>
              </View> */}
            </View>
          </View>

          <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', marginTop: '10px', margin: '3px'}}>
            <Text style={{flex: 1, fontSize: '7px', padding: '2px', borderBottom: '1px solid black', fontWeight: 'bold'}}>Referencia</Text>
            <Text style={{flex: 1, fontSize: '7px', padding: '2px', borderBottom: '1px solid black', fontWeight: 'bold'}}>Fecha</Text>
            <Text style={{flex: 3, fontSize: '7px', padding: '2px', borderBottom: '1px solid black', fontWeight: 'bold'}}>Concepto</Text>
            {/* <Text style={{flex: 1, fontSize: '7px', padding: '2px', borderBottom: '1px solid black', fontWeight: 'bold'}}>Estatus </Text> */}
            <Text style={{flex: 1, fontSize: '7px', padding: '2px', borderBottom: '1px solid black', fontWeight: 'bold'}}>Proyecto </Text>
            <Text style={{flex: 1, fontSize: '7px', padding: '2px', borderBottom: '1px solid black', fontWeight: 'bold'}}>Factura </Text>
            <Text style={{flex: 1, fontSize: '7px', padding: '2px', borderBottom: '1px solid black', fontWeight: 'bold'}}>Importe </Text>
            <Text style={{flex: 1, fontSize: '7px', padding: '2px', borderBottom: '1px solid black', fontWeight: 'bold'}}>Importe pagado</Text>
          </View>

          {orderCollections.map((c, index:number) => (
            <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', marginTop: '10px', margin: '3px'}} key={`${c._id}_${index}`}>
              <Text style={{flex: 1, fontSize: '7px', padding: '2px', borderBottom: '0.2px solid gray', fontWeight: 'bold'}}>{c.reference}</Text>
              <Text style={{flex: 1, fontSize: '7px', padding: '2px', borderBottom: '0.2px solid gray', fontWeight: 'bold'}}>{c.date.substring(0, 10) || ''}</Text>
              <Text style={{flex: 3, fontSize: '7px', padding: '2px', borderBottom: '0.2px solid gray', fontWeight: 'bold'}}>{c.concept}</Text>
              {/* <Text style={{flex: 1, fontSize: '7px', padding: '2px', borderBottom: '0.2px solid gray', fontWeight: 'bold'}}>{c.condition.name} </Text> */}
              <Text style={{flex: 1, fontSize: '7px', padding: '2px', borderBottom: '0.2px solid gray', fontWeight: 'bold'}}>{c.invoices.project.title}</Text>
              <Text style={{flex: 1, fontSize: '7px', padding: '2px', borderBottom: '0.2px solid gray', fontWeight: 'bold'}}>{c.invoices.invoices.folio}</Text>
              <Text style={{flex: 1, fontSize: '7px', padding: '2px', borderBottom: '0.2px solid gray', fontWeight: 'bold'}}>{CurrencyFormatter({
                currency: 'MXN',
                value: c.amount || 0
              })}</Text>
              <Text style={{flex: 1, fontSize: '7px', padding: '2px', borderBottom: '0.2px solid gray', fontWeight: 'bold'}}>{CurrencyFormatter({
                currency: 'MXN',
                // value: c.amountcharged || 0
                value: c.invoices?.amountcharged?? 0
              })}</Text>
            </View>
          ))}

        </View>
      </Page>
    </Document>
  )
}
