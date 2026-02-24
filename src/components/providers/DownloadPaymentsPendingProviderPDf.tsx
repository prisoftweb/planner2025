import {Document, Page, Text, Image, View} from '@react-pdf/renderer'
import { CurrencyFormatter } from '@/app/functions/Globals'
import { Provider } from "@/interfaces/Providers";
import { IPendingPaymentResumeProviderPDF } from '@/interfaces/Payments';
import { useMemo } from 'react';

export default function DownloadPaymentsPendingProviderPDF({provider, costs}: 
  {provider:Provider, costs:IPendingPaymentResumeProviderPDF[]}) {

  // const appAdvance=costsRelAdvance.reduce((accum, item) => accum+= item.cost.total>0? item.cost.total: 0, 0);
  // const appAdvance=costsRelAdvance.reduce((accum, item) => accum+=item.invoiceUUID.cost.total, 0);

  // const costData = transformDataInvoicesInDataTable(costsRelAdvance);

  const total = useMemo(() => costs.reduce((accum, element) => accum += element.totalAcum, 0), costs);

  return(
    <Document>
      <Page>
        <View style={{padding: '15px', marginTop: '15px'}}>

          <View style={{display: 'flex', flexDirection: 'row', gap:'5px', justifyContent: 'space-between'}}>

            <View style={{display:'flex', flexDirection:'column'}}>
              <View style={{display:'flex', flexDirection:'row', alignItems:'center', gap:'5px'}}>
                {/* <Image source={'/isologo_palacios.png'} style={{height: '57px', width:'67px'}}></Image> */}
                <Image source={'/Palaciosconstrucciones-isologo.png'} style={{height: '57px', width:'auto'}}></Image>
              </View>

              <View>
                <Text style={{fontSize:'10px', width: '250px', marginTop: '5px'}}>Palacios Construcciones</Text>
                <Text style={{fontSize:'10px', color:'gray', width: '250px'}}>Cda. Monreal #120</Text>
                <Text style={{fontSize:'10px', color:'gray', width: '250px'}}>Col. Gral. I. Martinez</Text>
                <Text style={{fontSize:'10px', color:'gray', width: '250px'}}>San Luis Potosi S.L.P. </Text>
                <Text style={{fontSize:'10px', color:'gray', width: '250px'}}>Mexico</Text>
                {/* <Text style={{fontSize:'11px', color:'gray'}}>{project.title}</Text> */}
              </View>

              <View style={{marginTop:'7px'}}>
                <View style={{display:'flex', flexDirection:'row', justifyContent:'flex-start', alignItems:'center', gap:'3px'}}>
                  <Text style={{fontSize:'10px'}}>{provider.name}</Text>
                </View>

                <View style={{display:'flex', flexDirection:'row', justifyContent:'flex-start', alignItems:'center', gap:'3px'}}>
                  <Text style={{fontSize:'10px'}}>{provider.rfc}</Text>
                </View>
              </View>
              
{/* <View style={{marginTop:'5px', display:'flex', flexDirection:'row', gap: '2px', fontSize: '10px', justifyContent:'flex-start', alignItems:'center'}}></View> */}
            </View>

            <View style={{padding:'13px', paddingTop: '0px', width: '270px'}}>

              <Text style={{fontSize:'13px'}}>ESTADO DE CUENTA</Text>

              {/* <View style={{display:'flex', flexDirection:'row', justifyContent:'flex-start', alignItems:'center', gap:'3px', marginTop:'7px'}}>
                <Text style={{fontSize:'10px', color:'gray'}}>Folio: </Text>
                <Text style={{fontSize:'10px'}}>{advance.folio}</Text>
              </View>

              <View style={{display:'flex', flexDirection:'row', justifyContent:'flex-start', alignItems:'center', gap:'3px'}}>
                <Text style={{fontSize:'10px', color:'gray'}}>Fecha: </Text>
                <Text style={{fontSize:'10px'}}>{advance.date?.substring(0, 10)}</Text>
              </View>

              <View style={{display:'flex', flexDirection:'row', justifyContent:'flex-start', alignItems:'center', gap:'3px'}}>
                <Text style={{fontSize:'10px', color:'gray'}}>Facturas Relacionadas: </Text>
                <Text style={{fontSize:'10px'}}>
                  {costsRelAdvance.length}
                </Text>
              </View> */}

              <View style={{border:'1px solid gray', marginTop:'7px'}}>
                <View style={{display:'flex', flexDirection:'row'}}>
                  <Text style={{backgroundColor:'green', color:'white', width:'110px', textAlign:'center', fontSize:'13px', padding:'3px'}}>TOTAL</Text>
                  <Text style={{width:'100%', textAlign:'center', color:'black', fontSize:'13px', backgroundColor:'#D3D3D3', padding:'3px'}}>
                    {CurrencyFormatter({
                      currency: 'MXN',
                      value: total
                    })}
                  </Text>
                </View>
                {/* <View style={{textAlign:'center', padding:'5px'}}>
                  <Text style={{textAlign:'center', color:'gray', fontSize:'14px'}}>
                    {CurrencyFormatter({
                      currency: 'MXN',
                      value: advance.advancesToSuppliers?.currentbalance?? 0
                    })}
                  </Text>
                </View> */}
              </View>

            </View>
          </View>

          <View style={{marginTop:'10px'}}></View>

          <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', marginTop: '20px', margin: '3px'}}>
            <Text style={{flex: 1, fontSize: '7px', padding: '2px', borderBottom: '1px solid black', fontWeight: 'bold'}}></Text>
            <Text style={{flex: 1, fontSize: '7px', padding: '2px', borderBottom: '1px solid black', fontWeight: 'bold'}}>30 dias</Text>
            <Text style={{flex: 1, fontSize: '7px', padding: '2px', borderBottom: '1px solid black', fontWeight: 'bold'}}>45 dias </Text>
            <Text style={{flex: 1, fontSize: '7px', padding: '2px', borderBottom: '1px solid black', fontWeight: 'bold'}}>60 dias </Text>
            <Text style={{flex: 1, fontSize: '7px', padding: '2px', borderBottom: '1px solid black', fontWeight: 'bold'}}>Mas de 60 dias</Text>
            {/* <Text style={{flex: 1, fontSize: '7px', padding: '2px', borderBottom: '1px solid black', fontWeight: 'bold'}}>Pendiente</Text> */}
          </View>

          {costs.map((c, index:number) => (
            <View key={index} style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', marginTop: '10px', margin: '3px'}}>
              <Text style={{flex: 1, fontSize: '7px', padding: '2px', borderBottom: '0.2px solid gray', fontWeight: 'bold'}}>{}</Text>
              <Text style={{flex: 1, fontSize: '7px', padding: '2px', borderBottom: '0.2px solid gray', fontWeight: 'bold'}}>{CurrencyFormatter({
                currency: 'MXN',
                value: c?.groupExpirationDays?.days0_30?? 0
              })}</Text>
              <Text style={{flex: 1, fontSize: '7px', padding: '2px', borderBottom: '0.2px solid gray', fontWeight: 'bold'}}>{CurrencyFormatter({
                currency: 'MXN',
                value: c?.groupExpirationDays?.days30_45?? 0
              })}</Text>
              <Text style={{flex: 1, fontSize: '7px', padding: '2px', borderBottom: '0.2px solid gray', fontWeight: 'bold'}}>{CurrencyFormatter({
                currency: 'MXN',
                value: c?.groupExpirationDays?.days45_60?? 0
              })}</Text>
              <Text style={{flex: 1, fontSize: '7px', padding: '2px', borderBottom: '0.2px solid gray', fontWeight: 'bold'}}>{CurrencyFormatter({
                currency: 'MXN',
                value: c?.groupExpirationDays?.show ? c?.groupExpirationDays?.show: (c?.groupExpirationDays?.days60plus?? 0) 
              })}</Text>
              {/* <Text style={{flex: 1, fontSize: '7px', padding: '2px', borderBottom: '0.2px solid gray', fontWeight: 'bold'}}>{CurrencyFormatter({
                currency: 'MXN',
                value: p.pending
              })}</Text> */}
            </View>
          ))}

          {/* {costData.map((c, index:number) => {
            const esUltimoDelGrupo = index === costData.length - 1 || c.index !== costData[index + 1].index;

            return(
              <View key={c.id} style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', marginTop: '10px', margin: '3px'}}>
                <Text style={{flex: 1, fontSize: '7px', padding: '2px', borderBottom: esUltimoDelGrupo ? '0.2px solid gray' : 'none', fontWeight: 'bold'}}>{c.Comp}</Text>
                <Text style={{flex: 1, fontSize: '7px', padding: '2px', borderBottom: esUltimoDelGrupo ? '0.2px solid gray' : 'none', fontWeight: 'bold'}}>{c.Proyecto}</Text>
                <Text style={{flex: 3, fontSize: '7px', padding: '2px', borderBottom: esUltimoDelGrupo ? '0.2px solid gray' : 'none', fontWeight: 'bold'}}>{c.Descripcion} </Text>
                <Text style={{flex: 1, fontSize: '7px', padding: '2px', borderBottom: esUltimoDelGrupo ? '0.2px solid gray' : 'none', fontWeight: 'bold'}}>{c.Fecha?.substring(0, 10)} </Text>
                <Text style={{flex: 1, fontSize: '7px', padding: '2px', borderBottom: esUltimoDelGrupo ? '0.2px solid gray' : 'none', fontWeight: 'bold'}}>{c.Costocenter}</Text>
                <Text style={{flex: 1, fontSize: '7px', padding: '2px', borderBottom: esUltimoDelGrupo ? '0.2px solid gray' : 'none', fontWeight: 'bold'}}>{CurrencyFormatter({
                  currency: 'MXN',
                  value: c.Total
                })}</Text>
              </View>
            )
          })} */}

          {/* {costData.map((c, index: number) => {
            const esUltimoDelGrupo =
              index === costData.length - 1 ||
              c.index !== costData[index + 1].index

            return (
              <View
                key={c.id}
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  marginTop: 10,
                  marginBottom: 3,
                  borderBottomWidth: esUltimoDelGrupo ? 0.5 : 0,
                  borderBottomColor: 'gray',
                }}
              >
                <Text style={{ flex: 1, fontSize: 7, padding: 2, fontWeight: 'bold' }}>
                  {c.Comp}
                </Text>
                <Text style={{ flex: 1, fontSize: 7, padding: 2, fontWeight: 'bold' }}>
                  {c.Proyecto}
                </Text>
                <Text style={{ flex: 3, fontSize: 7, padding: 2, fontWeight: 'bold' }}>
                  {c.Descripcion}
                </Text>
                <Text style={{ flex: 1, fontSize: 7, padding: 2, fontWeight: 'bold' }}>
                  {c.Fecha?.substring(0, 10)}
                </Text>
                <Text style={{ flex: 1, fontSize: 7, padding: 2, fontWeight: 'bold' }}>
                  {c.Costocenter}
                </Text>
                <Text style={{ flex: 1, fontSize: 7, padding: 2, fontWeight: 'bold' }}>
                  {CurrencyFormatter({
                    currency: 'MXN',
                    value: c.Total,
                  })}
                </Text>
              </View>
            )
          })} */}

          {/* <View style={{marginTop:'5px', display:'flex', flexDirection:'row', justifyContent:'flex-end', alignItems:'center', gap:'3px'}}>
            <Text style={{fontSize:'10px', color:'gray'}}>Aplicacion de anticipo: </Text>
            <Text style={{fontSize:'10px'}}>{CurrencyFormatter({
              currency: 'MXN',
              value: appAdvance
            })}</Text>
          </View>

          <View style={{marginTop:'5px', display:'flex', flexDirection:'row', justifyContent:'flex-end', alignItems:'center', gap:'3px'}}>
            <Text style={{fontSize:'10px', color:'gray'}}>Total aplicado: </Text>
            <Text style={{fontSize:'10px'}}>{CurrencyFormatter({
              currency: 'MXN',
              value: appAdvance
            })}</Text>
          </View>

          <View style={{marginTop:'5px'}}>
            <Text style={{fontSize:'10px'}}>Notas:</Text>
            {advance.advancesToSuppliers?.notes?.map((n, index:number) => (
              <Text key={index} style={{fontSize:'10px', color:'gray'}}>{n}</Text>
            ))}
          </View> */}

        </View>
      </Page>
    </Document>
  )
}