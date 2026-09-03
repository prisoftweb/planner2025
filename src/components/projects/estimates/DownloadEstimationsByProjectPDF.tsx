import {Document, Page, Text, Image, View} from '@react-pdf/renderer'
import { CurrencyFormatter } from '@/app/functions/Globals'
import { OneProjectMin } from "@/interfaces/Projects"
import { useState, useEffect } from 'react';
import { IEstimateProject, TotalEstimatedByProject } from '@/interfaces/Estimate';
import { getTotalEstimatesByProjectMin } from '@/app/api/routeEstimates';
import { Company } from "@/interfaces/Companies"

export default function DownloadEstimatesByProjectPDF({estimates, project, token, anticipo, satCompany}:
  {estimates: IEstimateProject[], project:OneProjectMin, token:string, anticipo: number, satCompany:Company}) {

  const [totalEstimatedProjectState, setTotalEstimatedProjectState] = useState<TotalEstimatedByProject[]>([]);

  useEffect(() => {
    const fetch = async () => {
      let totalPaymentsResumen: TotalEstimatedByProject[];
      totalPaymentsResumen = await getTotalEstimatesByProjectMin(token, project._id);
      if(typeof(totalPaymentsResumen) !== "string"){
        setTotalEstimatedProjectState(totalPaymentsResumen);
      }
    }
    fetch();
  }, []);

  // let total = 0;
  // guarantees.map((g) => {
  //   total += g.cost.subtotal || 0;
  // });
// ya esta
  // const orderInvoices = invoices.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  const orderEstimates = estimates.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  return(
    <Document>
      <Page>
        <View style={{padding: '15px', marginTop: '5px'}}>

          <View style={{display: 'flex', flexDirection: 'row', gap:'5px', justifyContent: 'space-between'}}>

            <View style={{display:'flex', flexDirection:'column'}}>
              <View style={{display:'flex', flexDirection:'row', alignItems:'center', gap:'5px'}}>
                {/* <Image source={'/isologo_palacios.png'} style={{height: '57px', width:'67px'}}></Image> */}
                {/* <Image source={'/isologo_palacios.png'} style={{height: '57px', width:'auto'}}></Image> */}
                <Image source={satCompany?.isologo?? satCompany.logo} style={{height: '57px', width:'auto'}}></Image>
                <View style={{display:'flex', flexDirection:'row', gap:'9px'}}>
                  <View>
                    <Text style={{fontSize:'15px', color:'gray', width: '250px'}}>ACUMULADO DE ESTIMACIONES</Text>
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
                <Text style={{color:'gray', margin: '2px'}}>Fecha:</Text>
                <Text style={{margin: '2px'}}>{new Date().toISOString().substring(0, 10)}</Text>
              </View>

            </View>

            <View style={{padding:'13px'}}>
              <View style={{border:'1px solid gray'}}>
                <View style={{border:'1px solid gray', backgroundColor:'green', textAlign:'center', display:'flex', flexDirection:'row', justifyContent:'center'}}>
                  <Text style={{color:'white', textAlign:'center', fontSize:'10px'}}>ESTIMADO</Text>
                </View>
                <View style={{textAlign:'center', border:'1px solid gray', padding:'3px', display:'flex', flexDirection:'row', justifyContent:'center'}}>
                  <Text style={{textAlign:'center', color:'gray', fontSize:'11px'}}>
                    {CurrencyFormatter({
                      currency: 'USD',
                      // value: totalEstimatedProjectState?.length> 0? (totalEstimatedProjectState[0]?.amountGuaranteeFund + (totalEstimatedProjectState[0]?.estimatedTotal || 0)) || 0 : 0
                      // value: totalEstimatedProjectState?.length> 0? (totalEstimatedProjectState[0]?.estimatedTotal || 0) : 0
                      value: totalEstimatedProjectState.length> 0? totalEstimatedProjectState[0]?.amountEstimated || 0 : 0
                    })}
                  </Text>
                </View>
              </View>

              <View style={{marginTop:'5px', display:'flex', flexDirection:'row', justifyContent:'flex-end', alignItems:'center', gap:'3px'}}>
                <Text style={{fontSize:'10px', color:'gray'}}>Estimado acumulado: </Text>
                <Text style={{fontSize:'10px'}}>{CurrencyFormatter({
                  currency: 'USD',
                  value: totalEstimatedProjectState?.length> 0? (totalEstimatedProjectState[0]?.estimatedTotal || 0) : 0
                })}</Text>
              </View>
              <View style={{marginTop:'5px', display:'flex', flexDirection:'row', justifyContent:'flex-end', alignItems:'center', gap:'3px'}}>
                <Text style={{fontSize:'10px', color:'gray'}}>Anticipo {project.amountChargeOff?.porcentage || 0}%: </Text>
                <Text style={{fontSize:'10px'}}>{CurrencyFormatter({
                  currency: 'USD',
                  value: anticipo
                })}</Text>
              </View>
              <View style={{marginTop:'5px', display:'flex', flexDirection:'row', justifyContent:'flex-end', alignItems:'center', gap:'3px'}}>
                <Text style={{fontSize:'10px', color:'gray'}}>Amortizado: </Text>
                <Text style={{fontSize:'10px'}}>{CurrencyFormatter({
                  currency: 'USD',
                  value: totalEstimatedProjectState.length> 0? totalEstimatedProjectState[0]?.amountChargeOff || 0 : 0
                })}</Text>
              </View>

              <View style={{marginTop:'5px', display:'flex', flexDirection:'row', justifyContent:'flex-end', alignItems:'center', gap:'3px'}}>
                <Text style={{fontSize:'10px', color:'gray'}}>Fondo garantia {project.guaranteefund.porcentage}%:  </Text>
                <Text style={{fontSize:'10px', color:'black'}}>{CurrencyFormatter({
                  currency: 'USD',
                  value:  totalEstimatedProjectState.length> 0? totalEstimatedProjectState[0]?.amountGuaranteeFund || 0 : 0
                })}</Text>
              </View>

              <View style={{marginTop:'5px', display:'flex', flexDirection:'row', justifyContent:'flex-end', alignItems:'center', gap:'3px'}}>
                <Text style={{fontSize:'10px', color:'gray'}}>Pendiente de estimar: </Text>
                <Text style={{fontSize:'10px', color:'red'}}>{CurrencyFormatter({
                  currency: 'USD',
                  value:  totalEstimatedProjectState.length> 0? totalEstimatedProjectState[0]?.pendingEstimated || 0 : 0
                })}</Text>
              </View>

            </View>
          </View>

          <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', marginTop: '10px', margin: '3px'}}>
            <Text style={{flex: 1, fontSize: '7px', padding: '2px', borderBottom: '1px solid black', fontWeight: 'bold'}}>Titulo </Text>
            <Text style={{flex: 1, fontSize: '7px', padding: '2px', borderBottom: '1px solid black', fontWeight: 'bold'}}>Estimado</Text>
            <Text style={{flex: 1, fontSize: '7px', padding: '2px', borderBottom: '1px solid black', fontWeight: 'bold'}}>Amortizacion {project.amountChargeOff?.porcentage || 0}%</Text>
            <Text style={{flex: 1, fontSize: '7px', padding: '2px', borderBottom: '1px solid black', fontWeight: 'bold'}}>Fondo {project.guaranteefund.porcentage}% </Text>
            <Text style={{flex: 1, fontSize: '7px', padding: '2px', borderBottom: '1px solid black', fontWeight: 'bold'}}>Monto a pagar </Text>
            <Text style={{flex: 1, fontSize: '7px', padding: '2px', borderBottom: '1px solid black', fontWeight: 'bold'}}>Monto a pagar total </Text>
            <Text style={{flex: 1, fontSize: '7px', padding: '2px', borderBottom: '1px solid black', fontWeight: 'bold'}}>Condicion</Text>
            <Text style={{flex: 1, fontSize: '7px', padding: '2px', borderBottom: '1px solid black', fontWeight: 'bold'}}>Fecha</Text>
            <Text style={{flex: 1, fontSize: '7px', padding: '2px', borderBottom: '1px solid black', fontWeight: 'bold'}}>Orden</Text>
          </View>

          {orderEstimates.map((e) => (
            <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', marginTop: '10px', margin: '3px'}} key={e._id}>
              <Text style={{flex: 1, fontSize: '7px', padding: '2px', borderBottom: '0.2px solid gray', fontWeight: 'bold'}}>{e.name}</Text>
              <Text style={{flex: 1, fontSize: '7px', padding: '2px', borderBottom: '0.2px solid gray', fontWeight: 'bold'}}>{CurrencyFormatter({
                currency: 'USD',
                value: e.amount || 0
              })}</Text>
              <Text style={{flex: 1, fontSize: '7px', padding: '2px', borderBottom: '0.2px solid gray', fontWeight: 'bold'}}>{CurrencyFormatter({
                currency: 'USD',
                value: e.amountChargeOff || 0
              })}</Text>
              <Text style={{flex: 1, fontSize: '7px', padding: '2px', borderBottom: '0.2px solid gray', fontWeight: 'bold'}}>{CurrencyFormatter({
                currency: 'USD',
                value: e.amountGuaranteeFund || 0
              })} </Text>
              <Text style={{flex: 1, fontSize: '7px', padding: '2px', borderBottom: '0.2px solid gray', fontWeight: 'bold'}}>{CurrencyFormatter({
                currency: 'USD',
                value: e.amountPayable || 0
              })}</Text>
              <Text style={{flex: 1, fontSize: '7px', padding: '2px', borderBottom: '0.2px solid gray', fontWeight: 'bold'}}>{CurrencyFormatter({
                currency: 'USD',
                value: e.amountPayableVAT || 0
              })}</Text>
              <View style={{flex: 1}}>
                <View style={{borderRadius: '3px', backgroundColor: e.condition.color, textAlign: 'center'}}>
                  <Text style={{fontSize: '7px', padding: '2px', borderBottom: '0.2px solid gray', fontWeight: 'bold'}}>
                    {e.condition.name}
                    {/* {e.condition.color} */}
                  </Text>
                </View>
              </View>
              <Text style={{flex: 1, fontSize: '7px', padding: '2px', borderBottom: '0.2px solid gray', fontWeight: 'bold'}}>{e.date.substring(0, 10)}</Text>
              <Text style={{flex: 1, fontSize: '7px', padding: '2px', borderBottom: '0.2px solid gray', fontWeight: 'bold'}}>{e.purschaseOrder}</Text>
            </View>
          ))}

        </View>
      </Page>
    </Document>
  )
}
