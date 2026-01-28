import {Document, Page, Text, Image, View} from '@react-pdf/renderer'
import { CurrencyFormatter } from '@/app/functions/Globals'
import { ICollectionMin, ITotalAmountRecoveredCollections } from '@/interfaces/Collections';
import { ProviderMin } from "@/interfaces/Providers";
import { OneExpense } from '@/interfaces/Expenses';
import { ICostRelAdvance } from '@/interfaces/Expenses';

export default function DownloadAdvancePDF({provider, advance, costsRelAdvance}: 
  {provider:ProviderMin, advance:OneExpense, costsRelAdvance:ICostRelAdvance[]}) {

  // const orderCollections = collections.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  // console.log('prov => ', provider);
  // console.log('data prov => ', JSON.stringify(provider));

  const total = costsRelAdvance.reduce((accum, item) => accum+=item.cost.total, 0);

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

              {/* <View>
                <Text style={{fontSize:'10px', width: '250px', marginTop:'5px'}}>{provider.name}</Text>
                <Text style={{fontSize:'10px', color:'gray', width: '250px'}}>Arquimedes #1234</Text>
                <Text style={{fontSize:'10px', color:'gray', width: '250px'}}>Col. Progreso</Text>
                <Text style={{fontSize:'10px', color:'gray', width: '250px'}}>San Luis Potosi S.L.P. </Text>
                <Text style={{fontSize:'10px', color:'gray', width: '250px'}}>Mexico</Text>
              </View> */}
{/* <View style={{marginTop:'5px', display:'flex', flexDirection:'row', gap: '2px', fontSize: '10px', justifyContent:'flex-start', alignItems:'center'}}></View> */}
            </View>

            <View style={{padding:'13px', paddingTop: '0px', width: '270px'}}>

              <View style={{marginTop:'5px', display:'flex', flexDirection:'row', justifyContent:'flex-start', alignItems:'center', gap:'3px'}}>
                <Text style={{fontSize:'10px', color:'gray'}}>Proveedor: </Text>
                <Text style={{fontSize:'10px'}}>{provider.name}</Text>
              </View>

              <View style={{marginTop:'5px', display:'flex', flexDirection:'row', justifyContent:'flex-start', alignItems:'center', gap:'3px'}}>
                <Text style={{fontSize:'10px', color:'gray'}}>RFC: </Text>
                <Text style={{fontSize:'10px'}}>{provider.rfc}</Text>
              </View>

              <View style={{marginTop:'5px', display:'flex', flexDirection:'row', justifyContent:'flex-start', alignItems:'center', gap:'3px'}}>
                <Text style={{fontSize:'10px', color:'gray'}}>Dias de credito: </Text>
                <Text style={{fontSize:'10px'}}>{provider.tradeline?.creditdays?? 0}</Text>
              </View>

              <View style={{marginTop:'5px', display:'flex', flexDirection:'row', justifyContent:'flex-start', alignItems:'center', gap:'3px'}}>
                <Text style={{fontSize:'10px', color:'gray'}}>Linea de credito: </Text>
                <Text style={{fontSize:'10px'}}>{CurrencyFormatter({
                  currency: 'MXN',
                  value: provider.tradeline?.creditlimit?? 0
                })}</Text>
              </View>

              <View style={{marginTop:'5px', display:'flex', flexDirection:'row', justifyContent:'flex-start', alignItems:'center', gap:'3px'}}>
                <Text style={{fontSize:'10px', color:'gray'}}>Folio: </Text>
                <Text style={{fontSize:'10px'}}>{advance.folio}</Text>
              </View>

              <View style={{marginTop:'5px', display:'flex', flexDirection:'row', justifyContent:'flex-start', alignItems:'center', gap:'3px'}}>
                <Text style={{fontSize:'10px', color:'gray'}}>Fecha: </Text>
                <Text style={{fontSize:'10px'}}>{advance.date?.substring(0, 10)}</Text>
              </View>

              <View style={{marginTop:'5px', display:'flex', flexDirection:'row', justifyContent:'flex-start', alignItems:'center', gap:'3px'}}>
                <Text style={{fontSize:'10px', color:'gray'}}>Facturas Relacionadas: </Text>
                <Text style={{fontSize:'10px'}}>
                  {CurrencyFormatter({
                    currency: 'MXN',
                    value: total
                  })}
                </Text>
              </View>

              {/* <View style={{border:'1px solid gray', marginTop: '5px'}}>
                <View style={{border:'1px solid gray', textAlign:'center', display:'flex', flexDirection:'row', justifyContent:'center'}}>
                  <Text style={{color:'white', backgroundColor:'green', textAlign:'center', fontSize:'10px', width:'75px'}}>Anticipo</Text>
                  <Text style={{color:'black', backgroundColor:'gray', textAlign:'center', fontSize:'10px'}}>
                    {CurrencyFormatter({
                      currency: 'MXN',
                      // value: total || 0
                      value: advance.cost.total
                    })}
                  </Text>
                </View>
                <View style={{textAlign:'center', border:'1px solid gray', padding:'3px', display:'flex', flexDirection:'row', justifyContent:'center'}}>
                  <Text style={{textAlign:'center', color:'gray', fontSize:'11px'}}>
                    {CurrencyFormatter({
                      currency: 'MXN',
                      // value: total || 0
                      value: total
                    })}
                  </Text>
                </View>
              </View> */}

              <View style={{border:'1px solid gray'}}>
                <View style={{display:'flex', flexDirection:'row', border:'1px solid gray'}}>
                  <Text style={{backgroundColor:'green', color:'white', width:'110px', textAlign:'center', fontSize:'10px'}}>Anticipo</Text>
                  <Text style={{width:'100%', textAlign:'center', color:'black', fontSize:'10px', backgroundColor:'#D3D3D3'}}>
                    {CurrencyFormatter({
                      currency: 'MXN',
                      // value: total || 0
                      value: advance.cost.total
                    })}
                  </Text>
                </View>
                <View style={{textAlign:'center', border:'1px solid gray', padding:'3px'}}>
                  <Text style={{textAlign:'center', color:'gray', fontSize:'11px'}}>
                    {CurrencyFormatter({
                      currency: 'MXN',
                      // value: total || 0
                      value: total
                    })}
                  </Text>
                </View>
              </View>

            </View>
          </View>

          <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', marginTop: '10px', margin: '3px'}}>
            <Text style={{flex: 1, fontSize: '7px', padding: '2px', borderBottom: '1px solid black', fontWeight: 'bold'}}>Comp.</Text>
            <Text style={{flex: 1, fontSize: '7px', padding: '2px', borderBottom: '1px solid black', fontWeight: 'bold'}}>Proyecto</Text>
            <Text style={{flex: 3, fontSize: '7px', padding: '2px', borderBottom: '1px solid black', fontWeight: 'bold'}}>Descripcion </Text>
            <Text style={{flex: 1, fontSize: '7px', padding: '2px', borderBottom: '1px solid black', fontWeight: 'bold'}}>Fecha </Text>
            <Text style={{flex: 1, fontSize: '7px', padding: '2px', borderBottom: '1px solid black', fontWeight: 'bold'}}>Centro de costos</Text>
            <Text style={{flex: 1, fontSize: '7px', padding: '2px', borderBottom: '1px solid black', fontWeight: 'bold'}}>Total</Text>
          </View>

          {costsRelAdvance.map((c) => (
            <View key={c._id} style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', marginTop: '10px', margin: '3px'}}>
              <Text style={{flex: 1, fontSize: '7px', padding: '2px', borderBottom: '1px solid black', fontWeight: 'bold'}}>{c.folio}</Text>
              <Text style={{flex: 1, fontSize: '7px', padding: '2px', borderBottom: '1px solid black', fontWeight: 'bold'}}>{c.project.title}</Text>
              <Text style={{flex: 3, fontSize: '7px', padding: '2px', borderBottom: '1px solid black', fontWeight: 'bold'}}>{c.description} </Text>
              <Text style={{flex: 1, fontSize: '7px', padding: '2px', borderBottom: '1px solid black', fontWeight: 'bold'}}>{c.date?.substring(0, 10)} </Text>
              <Text style={{flex: 1, fontSize: '7px', padding: '2px', borderBottom: '1px solid black', fontWeight: 'bold'}}>{c.costocenter.concept.name}</Text>
              <Text style={{flex: 1, fontSize: '7px', padding: '2px', borderBottom: '1px solid black', fontWeight: 'bold'}}>{CurrencyFormatter({
                currency: 'MXN',
                value: c.cost.total
              })}</Text>
            </View>
          ))}

          {/* <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', marginTop: '10px', margin: '3px'}}>
            
          </View> */}
          <View style={{marginTop:'5px', display:'flex', flexDirection:'row', justifyContent:'flex-end', alignItems:'center', gap:'3px'}}>
            <Text style={{fontSize:'10px', color:'gray'}}>Aplicacion de anticipo: </Text>
            <Text style={{fontSize:'10px'}}>{CurrencyFormatter({
              currency: 'MXN',
              value: advance.cost.total
            })}</Text>
          </View>

          <View style={{marginTop:'5px', display:'flex', flexDirection:'row', justifyContent:'flex-end', alignItems:'center', gap:'3px'}}>
            <Text style={{fontSize:'10px', color:'gray'}}>Total aplicado: </Text>
            <Text style={{fontSize:'10px'}}>{CurrencyFormatter({
              currency: 'MXN',
              value: total
            })}</Text>
          </View>

          <View style={{marginTop:'5px'}}>
            <Text style={{fontSize:'10px', width: '250px'}}>Notas:</Text>
            {advance.advancesToSuppliers?.notes?.map((n, index:number) => (
              <Text key={index} style={{fontSize:'10px', color:'gray', width: '250px'}}>{n}</Text>
            ))}
          </View>

        </View>
      </Page>
    </Document>
  )
}
