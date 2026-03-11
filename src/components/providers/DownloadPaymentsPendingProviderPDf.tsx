import {Document, Page, Text, Image, View} from '@react-pdf/renderer'
import { CurrencyFormatter } from '@/app/functions/Globals'
import { Provider } from "@/interfaces/Providers";
import { IPendingPaymentResumeProviderPDF, ITotalAcumulatedPendingPaymentResumeProviderPDF } from '@/interfaces/Payments';

type groupExpirationDays = {
  vigente: number
  days0_30: number
  days30_45: number
  days45_60: number
  days60plus: number
  show?: number
}

export default function DownloadPaymentsPendingProviderPDF({provider, costs, totalAccum, user}: 
  {provider:Provider, costs:IPendingPaymentResumeProviderPDF[], 
    totalAccum: ITotalAcumulatedPendingPaymentResumeProviderPDF[], user:string}) {

  // const total = useMemo(() => costs.reduce((accum, element) => accum += element.totalAcum, 0), costs);  

  let text = costs.length > 0 ? costs[0].groupTitleExpirationDays ?? '' : '';

  // const total30 = useMemo(() => costs.reduce((accum, element) => accum += element.groupExpirationDays.days0_30 ?? 0, 0), costs);
  // const total45 = useMemo(() => costs.reduce((accum, element) => accum += element.groupExpirationDays.days30_45 ?? 0, 0), costs);
  // const total60 = useMemo(() => costs.reduce((accum, element) => accum += element.groupExpirationDays.days45_60 ?? 0, 0), costs);
  // const total60plus = useMemo(() => costs.reduce((accum, element) => accum += element.groupExpirationDays.days60plus ?? 0, 0), costs);
  // const totalVigente = useMemo(() => costs.reduce((accum, element) => accum += element.groupExpirationDays.vigente ?? 0, 0), costs);
  // const total = useMemo(() => costs.reduce((accum, element) => accum += element.totalAcum, 0), costs);

  let total30 = 0;
  let total45 = 0;
  let total60 = 0;
  let total60plus = 0;
  let totalVigente = 0;
  let total = 0;



  // console.log('total acum => ', totalAccum);

  // console.log('unpaidbalanceamount => ', totalAccum[0]?.unpaidbalanceamount);
  // console.log('overdueamount => ', totalAccum[1]?.unpaidbalanceamount);

  return(
    <Document>
      <Page>
        <View style={{padding: '15px', marginTop: '15px'}}>

          <View style={{display: 'flex', flexDirection: 'row', gap:'5px', justifyContent: 'space-between'}}>

            <View style={{display:'flex', flexDirection:'column'}}>
              <View style={{display:'flex', flexDirection:'row', alignItems:'center', gap:'5px'}}>
                {/* <Image source={'/isologo_palacios.png'} style={{height: '57px', width:'67px'}}></Image> */}
                <Image source={'/Palaciosconstrucciones-isologo.png'} style={{height: '57px', width:'auto'}}></Image>
                <View style={{display:'flex', flexDirection:'column', gap:'2px'}}>
                  <Text style={{fontSize:'14px', fontWeight:'bold'}}>PROGRAMACION DE PAGOS</Text>
                  <Text style={{fontSize:'10px', color:'gray'}}>Lista de facturas por pagar</Text>
                </View>
              </View>

              <View style={{marginTop:'7px'}}>
                <View style={{display:'flex', flexDirection:'row', justifyContent:'flex-start', alignItems:'center', gap:'3px'}}>
                  <Text style={{fontSize:'10px', color:'gray'}}>Proveedor: </Text>
                  <Text style={{fontSize:'10px'}}>{provider.name}</Text>
                </View>

                <View style={{display:'flex', flexDirection:'row', justifyContent:'flex-start', alignItems:'center', gap:'3px'}}>
                  <Text style={{fontSize:'10px', color:'gray'}}>RFC: </Text>
                  <Text style={{fontSize:'10px'}}>{provider.rfc}</Text>
                </View>

                <View style={{display:'flex', flexDirection:'row', justifyContent:'flex-start', alignItems:'center', gap:'3px'}}>
                  <Text style={{fontSize:'10px', color:'gray'}}>Cuenta: </Text>
                  <Text style={{fontSize:'10px'}}>{provider.account}</Text>
                </View>

                <View style={{display:'flex', flexDirection:'row', justifyContent:'flex-start', alignItems:'center', gap:'3px'}}>
                  <Text style={{fontSize:'10px', color:'gray'}}>Por pagar: </Text>
                  <Text style={{fontSize:'10px'}}>{CurrencyFormatter({
                    currency: 'MXN',
                    value: totalAccum[0]?.unpaidbalanceamount ?? 0
                  })}</Text>
                </View>
              </View>
              
{/* <View style={{marginTop:'5px', display:'flex', flexDirection:'row', gap: '2px', fontSize: '10px', justifyContent:'flex-start', alignItems:'center'}}></View> */}
            </View>

            <View style={{padding:'13px', paddingTop: '0px', width: '270px'}}>

              <View style={{border:'1px solid gray', marginTop:'7px'}}>
                {/* <View style={{display:'flex', flexDirection:'row'}}>
                  <Text style={{backgroundColor:'green', color:'white', width:'100%', textAlign:'center', fontSize:'13px', padding:'3px'}}>TOTAL</Text>
                  <Text style={{width:'100%', textAlign:'center', color:'black', fontSize:'13px', backgroundColor:'#D3D3D3', padding:'3px'}}>
                    {CurrencyFormatter({
                      currency: 'MXN',
                      value: total
                    })}
                  </Text>
                </View> */}
                <View style={{textAlign:'center', padding:'5px', backgroundColor:'red'}}>
                  <Text style={{textAlign:'center', color:'white', fontSize:'14px', fontWeight:'bold'}}>
                    VENCIDO
                  </Text>
                </View>
                <View style={{textAlign:'center', padding:'5px'}}>
                  <Text style={{textAlign:'center', color:'gray', fontSize:'14px'}}>
                    {CurrencyFormatter({
                      currency: 'MXN',
                      value: totalAccum[1]?.unpaidbalanceamount ?? 0
                    })}
                  </Text>
                </View>
              </View>

              <View style={{display:'flex', flexDirection:'row', justifyContent:'flex-end', alignItems:'center', gap:'3px', marginTop:'5px'}}>
                <Text style={{fontSize:'10px', color:'gray'}}>Fecha: </Text>
                <Text style={{fontSize:'10px'}}>{new Date().toISOString().substring(0, 10)}</Text>
              </View>

              <View style={{display:'flex', flexDirection:'row', justifyContent:'flex-end', alignItems:'center', gap:'3px'}}>
                <Text style={{fontSize:'10px', color:'gray'}}>Usuario: </Text>
                <Text style={{fontSize:'10px'}}>
                  {user}
                </Text>
              </View>

            </View>
          </View>

          <View style={{marginTop:'10px'}}></View>

          <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', marginTop: '20px', margin: '3px'}}>
            <Text style={{flex: 1, fontSize: '7px', padding: '2px', borderBottom: '1px solid black', fontWeight: 'bold'}}>#</Text>
            <Text style={{flex: 2, fontSize: '7px', padding: '2px', borderBottom: '1px solid black', fontWeight: 'bold'}}>Folio</Text>
            <Text style={{flex: 2, fontSize: '7px', padding: '2px', borderBottom: '1px solid black', fontWeight: 'bold'}}>Fecha emision</Text>
            <Text style={{flex: 2, fontSize: '7px', padding: '2px', borderBottom: '1px solid black', fontWeight: 'bold'}}>Fecha vencimiento</Text>
            <Text style={{flex: 2, fontSize: '7px', padding: '2px', borderBottom: '1px solid black', fontWeight: 'bold'}}>Vigente</Text>
            <Text style={{flex: 2, fontSize: '7px', padding: '2px', borderBottom: '1px solid black', fontWeight: 'bold'}}>30 dias</Text>
            <Text style={{flex: 2, fontSize: '7px', padding: '2px', borderBottom: '1px solid black', fontWeight: 'bold'}}>45 dias </Text>
            <Text style={{flex: 2, fontSize: '7px', padding: '2px', borderBottom: '1px solid black', fontWeight: 'bold'}}>60 dias </Text>
            <Text style={{flex: 2, fontSize: '7px', padding: '2px', borderBottom: '1px solid black', fontWeight: 'bold'}}>+90 dias </Text>
            {/* <Text style={{flex: 2, fontSize: '7px', padding: '2px', borderBottom: '1px solid black', fontWeight: 'bold'}}>Mas de 60 dias</Text> */}
            <Text style={{flex: 2, fontSize: '7px', padding: '2px', borderBottom: '1px solid black', fontWeight: 'bold'}}>Total</Text>
            {/* <Text style={{flex: 1, fontSize: '7px', padding: '2px', borderBottom: '1px solid black', fontWeight: 'bold'}}>Pendiente</Text> */}
          </View>

          {costs.map((c, index:number) => {
            let b=0;
            // console.log('c.groupTitleExpirationDays => ', c.groupTitleExpirationDays);
            // console.log('text => ', text);
            if(c.groupTitleExpirationDays !== text){
              // console.log('entro al if');
              text = c.groupTitleExpirationDays ?? '';
              b=1;
            }
            const aging = normalizeAging(c.groupExpirationDays);

              total30 += aging.days0_30 ?? 0;
              total45 += aging.days30_45 ?? 0;
              total60 += aging.days45_60 ?? 0;
              total60plus += aging.days60plus ?? 0;
              totalVigente += aging.vigente ?? 0;
              total += c.totalAcum ?? 0;

            return(
              <View key={index} style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', marginTop: '10px', margin: '3px'}}>
                <Text style={{flex: 1, fontSize: '7px', padding: '2px', borderTop: b==1? '0.2px solid gray': '', fontWeight: 'bold'}}>{index + 1}</Text>
                {/* <Text style={{flex: 1, fontSize: '7px', padding: '2px', borderTop: b==1? '0.2px solid gray': '', fontWeight: 'bold'}}>{c.groupTitleExpirationDays}</Text> */}
                <Text style={{flex: 2, fontSize: '7px', padding: '2px', borderTop: b==1? '0.2px solid gray': '', fontWeight: 'bold'}}>{c.folio}</Text>
                <Text style={{flex: 2, fontSize: '7px', padding: '2px', borderTop: b==1? '0.2px solid gray': '', fontWeight: 'bold'}}>{c.date?.substring(0, 10)}</Text>
                <Text style={{flex: 2, fontSize: '7px', padding: '2px', borderTop: b==1? '0.2px solid gray': '', fontWeight: 'bold'}}>{c.expiredDate?.substring(0, 10)}</Text>
                <Text style={{flex: 2, fontSize: '7px', padding: '2px', borderTop: b==1? '0.2px solid gray': '', fontWeight: 'bold'}}>{CurrencyFormatter({
                  currency: 'MXN',
                  // value: aging.days0_30?? 0
                  value: aging.vigente ?? 0
                })}</Text>
                <Text style={{flex: 2, fontSize: '7px', padding: '2px', borderTop: b==1? '0.2px solid gray': '', fontWeight: 'bold'}}>{CurrencyFormatter({
                  currency: 'MXN',
                  // value: aging.days30_45?? 0
                  value: aging.days0_30 ?? 0
                })}</Text>
                <Text style={{flex: 2, fontSize: '7px', padding: '2px', borderTop: b==1? '0.2px solid gray': '', fontWeight: 'bold'}}>{CurrencyFormatter({
                  currency: 'MXN',
                  // value: aging.days45_60?? 0
                  value: aging.days30_45 ?? 0
                })}</Text>
                <Text style={{flex: 2, fontSize: '7px', padding: '2px', borderTop: b==1? '0.2px solid gray': '', fontWeight: 'bold'}}>{CurrencyFormatter({
                  currency: 'MXN',
                  value: aging.days45_60?? 0
                })}</Text>
                <Text style={{flex: 2, fontSize: '7px', padding: '2px', borderTop: b==1? '0.2px solid gray': '', fontWeight: 'bold'}}>{CurrencyFormatter({
                  currency: 'MXN',
                  value: aging.days60plus ?? 0
                  // value: aging.days45_60 ?? 0
                })}</Text>
                <Text style={{flex: 2, fontSize: '7px', padding: '2px', borderTop: b==1? '0.2px solid gray': '', fontWeight: 'bold'}}>{CurrencyFormatter({
                  currency: 'MXN',
                  value: c.totalAcum
                })}</Text>
              </View>
            )
          })}

          <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', marginTop: '10px', margin: '3px'}}>
            <Text style={{flex: 1, fontSize: '7px', padding: '2px', borderTop: '0.2px solid gray', fontWeight: 'bold'}}></Text>
            <Text style={{flex: 2, fontSize: '7px', padding: '2px', borderTop: '0.2px solid gray', fontWeight: 'bold'}}></Text>
            <Text style={{flex: 2, fontSize: '7px', padding: '2px', borderTop: '0.2px solid gray', fontWeight: 'bold'}}></Text>
            <Text style={{flex: 2, fontSize: '7px', padding: '2px', borderTop: '0.2px solid gray', fontWeight: 'bold'}}></Text>
            <Text style={{flex: 2, fontSize: '7px', padding: '2px', borderTop: '0.2px solid gray', fontWeight: 'bold'}}>{CurrencyFormatter({
              currency: 'MXN',
              // value: aging.days0_30?? 0
              value: totalVigente ?? 0
            })}</Text>
            <Text style={{flex: 2, fontSize: '7px', padding: '2px', borderTop: '0.2px solid gray', fontWeight: 'bold'}}>{CurrencyFormatter({
              currency: 'MXN',
              // value: aging.days30_45?? 0
              value: total30 ?? 0
            })}</Text>
            <Text style={{flex: 2, fontSize: '7px', padding: '2px', borderTop: '0.2px solid gray', fontWeight: 'bold'}}>{CurrencyFormatter({
              currency: 'MXN',
              // value: aging.days45_60?? 0
              value: total45 ?? 0
            })}</Text>
            <Text style={{flex: 2, fontSize: '7px', padding: '2px', borderTop: '0.2px solid gray', fontWeight: 'bold'}}>{CurrencyFormatter({
              currency: 'MXN',
              value: total60 ?? 0
            })}</Text>
            <Text style={{flex: 2, fontSize: '7px', padding: '2px', borderTop: '0.2px solid gray', fontWeight: 'bold'}}>{CurrencyFormatter({
              currency: 'MXN',
              value: total60plus ?? 0
              // value: aging.days45_60 ?? 0
            })}</Text>
            <Text style={{flex: 2, fontSize: '7px', padding: '2px', borderTop: '0.2px solid gray', fontWeight: 'bold'}}></Text>
          </View>

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

const normalizeAging = (data: groupExpirationDays): groupExpirationDays => {
  const result: groupExpirationDays = {
    vigente: 0,
    days0_30: 0,
    days30_45: 0,
    days45_60: 0,
    days60plus: 0,
    show: data.show
  }

  if ((data.show ?? 0) > 0) {
    result.days60plus = data.show!
    return result
  }

  const priority: (keyof groupExpirationDays)[] = [
    "days60plus",
    "days45_60",
    "days30_45",
    "days0_30",
    "vigente"
  ]

  const found = priority.find(key => (data[key] ?? 0) > 0)

  if (found) {
    result[found] = data[found] ?? 0
  }

  return result
}