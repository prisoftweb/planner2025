import {Document, Page, Text, Image, View} from '@react-pdf/renderer'
import { CurrencyFormatter } from '@/app/functions/Globals'
import { OneProjectMin } from "@/interfaces/Projects"
import { ICollectionMin } from '@/interfaces/Collections';
import { useState, useEffect } from 'react';
import { ITotalResumentPayment } from '@/interfaces/Collections';
import { getAllTotalPaymentsResumeByProjectMin } from "@/app/api/routeCollections";
import { Company } from '@/interfaces/Companies';

export default function DownloadCollectionsByProjectPDF({collections, project, token, satCompany}:
  {collections: ICollectionMin[], project:OneProjectMin, token:string, satCompany:Company}) {

  const [resumenPayment, setResumenPayment] = useState<ITotalResumentPayment>();

  useEffect(() => {
    const fetch = async () => {
      let totalPaymentsResumen: ITotalResumentPayment;
      totalPaymentsResumen = await getAllTotalPaymentsResumeByProjectMin(token, project._id);
      if(typeof(totalPaymentsResumen) !== "string"){
        setResumenPayment(totalPaymentsResumen);
      }
    }
    fetch();
  }, []);

  const orderCollections = Array.isArray(collections)? collections.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()): [];

  return(
    <Document>
      <Page>
        <View style={{padding: '15px', marginTop: '5px'}}>

          <View style={{display: 'flex', flexDirection: 'row', gap:'5px', justifyContent: 'space-between'}}>

            <View style={{display:'flex', flexDirection:'column'}}>
              <View style={{display:'flex', flexDirection:'row', alignItems:'center', gap:'5px'}}>
                <Image source={satCompany?.isologo?? satCompany.logo} style={{height: '57px', width:'auto'}}></Image>
                <View style={{display:'flex', flexDirection:'row', gap:'9px'}}>
                  <View>
                    <Text style={{fontSize:'15px', color:'gray', width: '250px'}}>COBRANZA</Text>
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
                      value: resumenPayment?.totalPayments?.totalPayments || 0
                    })}
                  </Text>
                </View>
              </View>

              <View style={{marginTop:'5px', display:'flex', flexDirection:'row', justifyContent:'flex-end', alignItems:'center', gap:'3px'}}>
                <Text style={{fontSize:'10px', color:'gray'}}>Fecha: </Text>
                <Text style={{fontSize:'10px'}}>{new Date().toISOString().substring(0, 10)}</Text>
              </View>
              <View style={{marginTop:'5px', display:'flex', flexDirection:'row', justifyContent:'flex-end', alignItems:'center', gap:'3px'}}>
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
              </View>
            </View>
          </View>

          <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', marginTop: '10px', margin: '3px'}}>
            <Text style={{flex: 1, fontSize: '7px', padding: '2px', borderBottom: '1px solid black', fontWeight: 'bold'}}>Referencia</Text>
            <Text style={{flex: 1, fontSize: '7px', padding: '2px', borderBottom: '1px solid black', fontWeight: 'bold'}}>Fecha</Text>
            <Text style={{flex: 3, fontSize: '7px', padding: '2px', borderBottom: '1px solid black', fontWeight: 'bold'}}>Concepto</Text>
            <Text style={{flex: 1, fontSize: '7px', padding: '2px', borderBottom: '1px solid black', fontWeight: 'bold'}}>Estatus </Text>
            <Text style={{flex: 1, fontSize: '7px', padding: '2px', borderBottom: '1px solid black', fontWeight: 'bold'}}>Factura </Text>
            <Text style={{flex: 1, fontSize: '7px', padding: '2px', borderBottom: '1px solid black', fontWeight: 'bold'}}>Importe pagado</Text>
          </View>

          {orderCollections.map((c) => (
            <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', marginTop: '10px', margin: '3px'}} key={c._id}>
              <Text style={{flex: 1, fontSize: '7px', padding: '2px', borderBottom: '0.2px solid gray', fontWeight: 'bold'}}>{c.reference}</Text>
              <Text style={{flex: 1, fontSize: '7px', padding: '2px', borderBottom: '0.2px solid gray', fontWeight: 'bold'}}>{c.date.substring(0, 10) || ''}</Text>
              <Text style={{flex: 3, fontSize: '7px', padding: '2px', borderBottom: '0.2px solid gray', fontWeight: 'bold'}}>{c.concept}</Text>
              <Text style={{flex: 1, fontSize: '7px', padding: '2px', borderBottom: '0.2px solid gray', fontWeight: 'bold'}}>{c.condition.name} </Text>
              <Text style={{flex: 1, fontSize: '7px', padding: '2px', borderBottom: '0.2px solid gray', fontWeight: 'bold'}}>{c.invoices.invoices.folio}</Text>
              <Text style={{flex: 1, fontSize: '7px', padding: '2px', borderBottom: '0.2px solid gray', fontWeight: 'bold'}}>{CurrencyFormatter({
                currency: 'MXN',
                value: c.amount || 0
              })}</Text>
            </View>
          ))}

        </View>
      </Page>
    </Document>
  )
}
