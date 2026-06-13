import {Document, Page, Text, Image, View} from '@react-pdf/renderer'
import { CurrencyFormatter } from '@/app/functions/Globals'
import { OneProjectMin } from "@/interfaces/Projects"
import { ICollectionMin } from '@/interfaces/Collections';
import { useState, useEffect } from 'react';
import { ITotalResumentPayment } from '@/interfaces/Collections';
import { getAllTotalPaymentsResumeByProjectMin } from "@/app/api/routeCollections";
import { Company } from '@/interfaces/Companies';
import { Provider } from '@/interfaces/Providers';

export default function DownloadProvidersReportPDF({providers, satCompany}:
  {providers:Provider[], satCompany:Company}) {

  // const [resumenPayment, setResumenPayment] = useState<ITotalResumentPayment>();

  // useEffect(() => {
  //   const fetch = async () => {
  //     let totalPaymentsResumen: ITotalResumentPayment;
  //     totalPaymentsResumen = await getAllTotalPaymentsResumeByProjectMin(token, project._id);
  //     if(typeof(totalPaymentsResumen) !== "string"){
  //       setResumenPayment(totalPaymentsResumen);
  //     }
  //   }
  //   fetch();
  // }, []);

  // const orderCollections = Array.isArray(collections)? collections.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()): [];

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
                    <Text style={{fontSize:'15px', color:'gray', width: '250px'}}>PROVEEDORES</Text>
                    {/* <Text style={{fontSize:'11px', color:'gray'}}>{project.title}</Text> */}
                  </View>
                </View>
              </View>
{/* <View style={{marginTop:'5px', display:'flex', flexDirection:'row', gap: '2px', fontSize: '10px', justifyContent:'flex-start', alignItems:'center'}}></View> */}
              {/* <View style={{display:'flex', flexDirection:'row', gap: '2px', fontSize: '10px'}}>
                <Text style={{color:'gray', margin: '2px'}}>Cliente:</Text>
                <Text style={{margin: '2px'}}>{project.client.name}</Text>
              </View> */}

              {/* <View style={{display:'flex', flexDirection:'row', gap: '2px', fontSize: '10px'}}>
                <Text style={{color:'gray', margin: '2px'}}>RFC:</Text>
                <Text style={{margin: '2px'}}>{project.client.rfc}</Text>
              </View> */}

              {/* <View style={{display:'flex', flexDirection:'row', gap: '2px', fontSize: '10px'}}>
                <Text style={{color:'gray', margin: '2px'}}>Proyecto:</Text>
                <Text style={{margin: '2px'}}>{project.title}</Text>
              </View> */}

            </View>

            {/* <View style={{padding:'13px'}}>
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
            </View> */}
          </View>

          <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', marginTop: '10px', margin: '3px'}}>
            <Text style={{flex: 1, fontSize: '7px', padding: '2px', borderBottom: '1px solid black', fontWeight: 'bold'}}>NOMBRE</Text>
            <Text style={{flex: 1, fontSize: '7px', padding: '2px', borderBottom: '1px solid black', fontWeight: 'bold'}}>NOMBRE COMERCIAL</Text>
            <Text style={{flex: 1, fontSize: '7px', padding: '2px', borderBottom: '1px solid black', fontWeight: 'bold'}}>RFC</Text>
            <Text style={{flex: 1, fontSize: '7px', padding: '2px', borderBottom: '1px solid black', fontWeight: 'bold'}}>TIPO </Text>
            <Text style={{flex: 1, fontSize: '7px', padding: '2px', borderBottom: '1px solid black', fontWeight: 'bold'}}>LINEA CREDITO </Text>
            <Text style={{flex: 1, fontSize: '7px', padding: '2px', borderBottom: '1px solid black', fontWeight: 'bold'}}>DATOS BANCARIOS</Text>
            <Text style={{flex: 1, fontSize: '7px', padding: '2px', borderBottom: '1px solid black', fontWeight: 'bold'}}>TELEFONO / CORREO</Text>
          </View>

          {providers.map((c) => (
            <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', marginTop: '10px', margin: '3px'}} key={c._id}>
              <Text style={{flex: 1, fontSize: '7px', padding: '2px', borderBottom: '0.2px solid gray', fontWeight: 'bold'}}>{c?.name}</Text>
              <Text style={{flex: 1, fontSize: '7px', padding: '2px', borderBottom: '0.2px solid gray', fontWeight: 'bold'}}>{c?.tradename}</Text>
              <Text style={{flex: 1, fontSize: '7px', padding: '2px', borderBottom: '0.2px solid gray', fontWeight: 'bold'}}>{c?.rfc}</Text>
              <Text style={{flex: 1, fontSize: '7px', padding: '2px', borderBottom: '0.2px solid gray', fontWeight: 'bold'}}>{c?.type?? ''} </Text>
              <Text style={{flex: 1, fontSize: '7px', padding: '2px', borderBottom: '0.2px solid gray', fontWeight: 'bold'}}>{c?.suppliercredit? 'SI':'NO'}</Text>
              <Text style={{flex: 1, fontSize: '7px', padding: '2px', borderBottom: '0.2px solid gray', fontWeight: 'bold'}}>{c?.bankdetails? 'SI':'NO'}</Text>
              <View style={{flex:1, fontSize: '7px', padding: '2px', borderBottom: '0.2px solid gray', fontWeight: 'bold'}}>
                <Text>{c?.phone}</Text>
                <Text>{c?.email}</Text>
              </View>
            </View>
          ))}

        </View>
      </Page>
    </Document>
  )
}
