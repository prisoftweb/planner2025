import {Document, Page, Text, Image, View} from '@react-pdf/renderer'
import { CurrencyFormatter } from '@/app/functions/Globals'
import { OneProjectMin } from "@/interfaces/Projects"
import { useState, useEffect } from 'react';
import { ITotalResumentPayment } from '@/interfaces/Collections';
import { getAllTotalPaymentsResumeByProjectMin } from "@/app/api/routeCollections";
import { ICollectionByClientMin } from "@/interfaces/Clients";
import Chip from '../providers/Chip';
import { Company } from "@/interfaces/Companies"

export default function DownloadCollectionByClientPDF({collections, client, rfc, company}:
  {collections: ICollectionByClientMin[], client:string, rfc:string, company:Company}) {

  // const [resumenPayment, setResumenPayment] = useState<ITotalResumentPayment>();

  const orderCollections = collections.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  let pendingBilling=0;
  let pendingCollection=0;
  let pendingTotal=0;

  for (const item of orderCollections) {
    pendingBilling+=item.pendingBilling;
    pendingCollection+=item.pendingPayment;
    pendingTotal+=item.pendingTotal;
  }

  return(
    <Document>
      <Page>
        <View style={{padding: '15px', marginTop: '15px'}}>

          <View style={{display: 'flex', flexDirection: 'row', gap:'5px', justifyContent: 'space-between'}}>

            <View style={{display:'flex', flexDirection:'column'}}>
              <View style={{display:'flex', flexDirection:'row', alignItems:'center', gap:'5px'}}>
                {/* <Image source={'/isologo_palacios.png'} style={{height: '57px', width:'67px'}}></Image> */}
                {/* <Image source={'/isologo_palacios.png'} style={{height: '57px', width:'auto'}}></Image> */}
                <Image source={company.logo} style={{height: '57px', width:'auto'}}></Image>
                <View style={{display:'flex', flexDirection:'row', gap:'9px'}}>
                  <View>
                    <Text style={{fontSize:'15px', color:'gray', width: '250px'}}>COBRANZA PENDIENTE</Text>
                    <Text style={{fontSize:'11px', color:'gray'}}>POR PROYECTOS</Text>
                  </View>
                </View>
              </View>
{/* <View style={{marginTop:'5px', display:'flex', flexDirection:'row', gap: '2px', fontSize: '10px', justifyContent:'flex-start', alignItems:'center'}}></View> */}
              <View style={{display:'flex', flexDirection:'row', gap: '2px', fontSize: '10px'}}>
                <Text style={{color:'gray', margin: '2px'}}>Cliente:</Text>
                <Text style={{margin: '2px'}}>{client}</Text>
              </View>

              <View style={{display:'flex', flexDirection:'row', gap: '2px', fontSize: '10px'}}>
                <Text style={{color:'gray', margin: '2px'}}>RFC:</Text>
                <Text style={{margin: '2px'}}>{rfc}</Text>
              </View>

              <View style={{display:'flex', flexDirection:'row', gap: '2px', fontSize: '10px'}}>
                <Text style={{color:'gray', margin: '2px'}}>Fecha:</Text>
                <Text style={{margin: '2px'}}>{new Date().toISOString().substring(0, 10)}</Text>
              </View>

            </View>

            <View style={{padding:'13px'}}>
              <View style={{border:'1px solid gray'}}>
                <View style={{border:'1px solid gray', backgroundColor:'green', textAlign:'center', display:'flex', flexDirection:'row', justifyContent:'center'}}>
                  <Text style={{color:'white', textAlign:'center', fontSize:'10px'}}>PENDIENTE</Text>
                </View>
                <View style={{textAlign:'center', border:'1px solid gray', padding:'3px', display:'flex', flexDirection:'row', justifyContent:'center'}}>
                  <Text style={{textAlign:'center', color:'red', fontSize:'11px'}}>
                    {CurrencyFormatter({
                      currency: 'MXN',
                      value: pendingTotal || 0
                    })}
                  </Text>
                </View>
              </View>

              <View style={{marginTop:'5px', display:'flex', flexDirection:'row', justifyContent:'flex-end', alignItems:'center', gap:'3px'}}>
                <Text style={{fontSize:'10px', color:'gray'}}>Por cobrar: </Text>
                <Text style={{fontSize:'10px'}}>{CurrencyFormatter({
                  currency: 'MXN',
                  value: pendingCollection
                })}</Text>
              </View>
              <View style={{marginTop:'5px', display:'flex', flexDirection:'row', justifyContent:'flex-end', alignItems:'center', gap:'3px'}}>
                <Text style={{fontSize:'10px', color:'gray'}}>Por facturar: </Text>
                <Text style={{fontSize:'10px'}}>{CurrencyFormatter({
                  currency: 'MXN',
                  value: pendingBilling || 0
                })}</Text>
              </View>
              <View style={{marginTop:'5px', display:'flex', flexDirection:'row', justifyContent:'flex-end', alignItems:'center', gap:'3px'}}>
                <Text style={{fontSize:'10px', color:'gray'}}>Total proyectos:</Text>
                <Text style={{fontSize:'10px', color:'green'}}>{collections.length}</Text>
              </View>
            </View>
          </View>

          <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', marginTop: '10px', margin: '3px'}}>
            <Text style={{flex: 1, fontSize: '7px', padding: '2px', borderBottom: '1px solid black', fontWeight: 'bold'}}>Proyecto</Text>
            <Text style={{flex: 1, fontSize: '7px', padding: '2px', borderBottom: '1px solid black', fontWeight: 'bold'}}>Condicion</Text>
            <Text style={{flex: 1, fontSize: '7px', padding: '2px', borderBottom: '1px solid black', fontWeight: 'bold'}}>Por cobrar</Text>
            <Text style={{flex: 1, fontSize: '7px', padding: '2px', borderBottom: '1px solid black', fontWeight: 'bold'}}>Por facturar </Text>
            <Text style={{flex: 1, fontSize: '7px', padding: '2px', borderBottom: '1px solid black', fontWeight: 'bold'}}>Pendiente acum </Text>
            <Text style={{flex: 1, fontSize: '7px', padding: '2px', borderBottom: '1px solid black', fontWeight: 'bold'}}>Ultimo</Text>
            <Text style={{flex: 1, fontSize: '7px', padding: '2px', borderBottom: '1px solid black', fontWeight: 'bold'}}>% Pendiente</Text>
          </View>

          {orderCollections.map((c, index:number) => (
            <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', marginTop: '10px', margin: '3px'}} key={index}>
              <Text style={{flex: 1, fontSize: '7px', padding: '2px', borderBottom: '0.2px solid gray', fontWeight: 'bold'}}>{c.project.title}</Text>
              <View style={{flex: 1, fontSize: '7px', padding: '2px', borderBottom: '0.2px solid gray', fontWeight: 'bold'}}>
                <View style={{borderRadius: '3px', backgroundColor: `${c.project.estatus.color}`, textAlign: 'center'}}>
                  <Text style={{fontSize: '7px', padding: '2px', borderBottom: '0.2px solid gray', fontWeight: 'bold', 
                        color:`${c.project.estatus.darktext? 'black':'white'}`}}>
                    {c.project.estatus.name}
                  </Text>
                </View>
              </View>
              <Text style={{flex: 1, fontSize: '7px', padding: '2px', borderBottom: '0.2px solid gray', fontWeight: 'bold'}}>{CurrencyFormatter({
                currency: 'MXN',
                value: c.pendingPayment
              })}</Text>
              <Text style={{flex: 1, fontSize: '7px', padding: '2px', borderBottom: '0.2px solid gray', fontWeight: 'bold'}}>{CurrencyFormatter({
                currency: 'MXN',
                value: c.pendingBilling
              })} </Text>
              <Text style={{flex: 1, fontSize: '7px', padding: '2px', borderBottom: '0.2px solid gray', fontWeight: 'bold'}}>{CurrencyFormatter({
                currency: 'MXN',
                value: c.pendingTotal
              })}</Text>
              <Text style={{flex: 1, fontSize: '7px', padding: '2px', borderBottom: '0.2px solid gray', fontWeight: 'bold'}}>{'0 dias'}</Text>
              <Text style={{flex: 1, fontSize: '7px', padding: '2px', borderBottom: '0.2px solid gray', fontWeight: 'bold'}}>{c.porcentagePendingPAY}%</Text>
            </View>
          ))}

        </View>
      </Page>
    </Document>
  )
}
