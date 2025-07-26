import {Document, Page, Text, Image, View} from '@react-pdf/renderer'
import { CurrencyFormatter } from '@/app/functions/Globals'
import { OneProjectMin } from "@/interfaces/Projects"
import { useState, useEffect } from 'react';
import { getTotalEstimatesByProjectMin } from '@/app/api/routeEstimates';
import { IContractualControlProject, ProjectByBudgetedControl } from '@/interfaces/DashboardProjects';

export default function DownloadProjectAnalisysPDF({project, token, contractualControl, budgetedControl}:
  {project:OneProjectMin, token:string, contractualControl: IContractualControlProject, 
    budgetedControl:ProjectByBudgetedControl}) {

//   const [totalEstimatedProjectState, setTotalEstimatedProjectState] = useState<TotalEstimatedByProject[]>([]);

//   useEffect(() => {
//     const fetch = async () => {
//       let totalPaymentsResumen: TotalEstimatedByProject[];
//       totalPaymentsResumen = await getTotalEstimatesByProjectMin(token, project._id);
//       if(typeof(totalPaymentsResumen) !== "string"){
//         setTotalEstimatedProjectState(totalPaymentsResumen);
//       }
//     }
//     fetch();
//   }, []);

  // const orderEstimates = estimates.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  return(
    <Document>
      <Page>
        <View style={{padding: '15px'}}>

          <View style={{display: 'flex', flexDirection: 'row', gap:'5px', justifyContent: 'space-between'}}>

            <View style={{display:'flex', flexDirection:'column'}}>
              <View style={{display:'flex', flexDirection:'row', alignItems:'center', gap:'5px'}}>
                {/* <Image source={'/isologo_palacios.png'} style={{height: '57px', width:'67px'}}></Image> */}
                <Image source={'/isologo_palacios.png'} style={{height: '57px', width:'auto'}}></Image>
                <View style={{display:'flex', flexDirection:'row', gap:'9px'}}>
                  <View>
                    <Text style={{fontSize:'15px', color:'gray', width: '250px'}}>ANALISIS DE PROYECTO</Text>
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
                <Text style={{color:'gray', margin: '2px'}}>Fecha de inicio:</Text>
                <Text style={{margin: '2px'}}>{new Date().toISOString().substring(0, 10)}</Text>
              </View>

              <View style={{display:'flex', flexDirection:'row', gap: '2px', fontSize: '10px'}}>
                <Text style={{color:'gray', margin: '2px'}}>Fecha de termino:</Text>
                <Text style={{margin: '2px'}}>{new Date().toISOString().substring(0, 10)}</Text>
              </View>

            </View>

            <View style={{padding:'13px'}}>
              <View style={{border:'1px solid gray'}}>
                <View style={{border:'1px solid gray', backgroundColor:'green', textAlign:'center', display:'flex', flexDirection:'row', justifyContent:'center'}}>
                  <Text style={{color:'white', textAlign:'center', fontSize:'10px'}}>DESPUES DE IMPUESTOS</Text>
                </View>
                <View style={{textAlign:'center', border:'1px solid gray', padding:'3px', display:'flex', flexDirection:'row', justifyContent:'center'}}>
                  <Text style={{textAlign:'center', color:'gray', fontSize:'11px'}}>
                    {CurrencyFormatter({
                      currency: 'MXN',
                      value: project.amount * 1.16
                    })}
                  </Text>
                </View>
              </View>

              <View style={{marginTop:'5px', display:'flex', flexDirection:'row', justifyContent:'flex-end', alignItems:'center', gap:'3px'}}>
                <Text style={{fontSize:'10px', color:'gray'}}>Pagado: </Text>
                <Text style={{fontSize:'10px'}}>{CurrencyFormatter({
                  currency: 'MXN',
                  value: budgetedControl?.paymentInfo?.paymentTotal || 0
                })}</Text>
              </View>
              <View style={{marginTop:'5px', display:'flex', flexDirection:'row', justifyContent:'flex-end', alignItems:'center', gap:'3px'}}>
                <Text style={{fontSize:'10px', color:'gray'}}>Costo: </Text>
                <Text style={{fontSize:'10px'}}>{CurrencyFormatter({
                  currency: 'MXN',
                  value: budgetedControl?.spentInfo?.spentTotal || 0
                })}</Text>
              </View>
              <View style={{marginTop:'5px', display:'flex', flexDirection:'row', justifyContent:'flex-end', alignItems:'center', gap:'3px'}}>
                <Text style={{fontSize:'10px', color:'gray'}}>Utilidad neta: </Text>
                <Text style={{fontSize:'10px'}}>{CurrencyFormatter({
                  currency: 'MXN',
                  value: budgetedControl?.netprofitInfo?.netprofitTotal || 0
                })}</Text>
              </View>

              <View style={{marginTop:'5px', display:'flex', flexDirection:'row', justifyContent:'flex-end', alignItems:'center', gap:'3px'}}>
                <Text style={{fontSize:'10px', color:'gray'}}>Aplica fondo de garantia:  </Text>
                <View style={{width: '5px', height: '5px', backgroundColor: project.hasguaranteefund? 'green': 'red'}}></View>
              </View>

              <View style={{marginTop:'5px', display:'flex', flexDirection:'row', justifyContent:'flex-end', alignItems:'center', gap:'3px'}}>
                <Text style={{fontSize:'10px', color:'gray'}}>Aplica anticipo: </Text>
                <View style={{width: '5px', height: '5px', backgroundColor: project.hasamountChargeOff? 'green': 'red'}}></View>
              </View>

            </View>
          </View>

          <View style={{display: 'flex', flexDirection: 'row', gap: '5px', marginTop: '30px', fontSize:'10px'}}>
            <View style={{width: '50%'}}>
              <Text style={{marginBottom: '15px'}}>CONTROL CONTRACTUAL</Text>

              {/* <View style={{display: 'flex', flexDirection: 'row', gap: '5px', alignItems: 'center'}}>
                <View style={{width: '100%', height: '7px', backgroundColor: 'gray'}}>
                  <View style={{width: '30%', backgroundColor: 'blue'}}></View>
                </View>
                <Text>30 %</Text>
              </View> */}
              <Text>Contratado ({CurrencyFormatter({
                currency: 'MXN', 
                value: contractualControl?.estimateInfo?.amount || 0
              })})</Text>
              <View style={{ display: 'flex', flexDirection: 'row', gap: 5, alignItems: 'center' }}>
                <View style={{ width: 200, height: 7, backgroundColor: 'gray', position: 'relative' }}>
                  <View style={{ width: 200, height: 7, backgroundColor: '#E4D831', position: 'absolute', top: 0, left: 0 }} />
                </View>
                <Text>{100} %</Text>
              </View>

              <Text style={{marginTop: '10px'}}>Anticipo ({CurrencyFormatter({
                currency: 'MXN', 
                value: contractualControl?.estimateInfo?.cashAdvance || 0
              })})</Text>
              <View style={{ display: 'flex', flexDirection: 'row', gap: 5, alignItems: 'center' }}>
                <View style={{ width: 200, height: 7, backgroundColor: 'gray', position: 'relative' }}>
                  <View style={{ width: (contractualControl?.estimateInfo?.porcentageCashAdvance || 0) > 100? 200: (contractualControl?.estimateInfo?.porcentageCashAdvance || 0) * 2, height: 7, backgroundColor: '#71B2F2', position: 'absolute', top: 0, left: 0 }} />
                </View>
                <Text>{contractualControl?.estimateInfo?.porcentageCashAdvance || 0} %</Text>
              </View>

              <Text style={{marginTop: '10px'}}>Amortizado ({CurrencyFormatter({
                currency: 'MXN', 
                value: contractualControl?.estimateInfo?.amountChargeOff || 0
              })})</Text>
              <View style={{ display: 'flex', flexDirection: 'row', gap: 5, alignItems: 'center' }}>
                <View style={{ width: 200, height: 7, backgroundColor: 'gray', position: 'relative' }}>
                  <View style={{ width: (contractualControl?.estimateInfo?.porcentageChargeOff || 0) > 100 ? 200 : (contractualControl?.estimateInfo?.porcentageChargeOff || 0) *2, height: 7, backgroundColor: '#ff5252', position: 'absolute', top: 0, left: 0 }} />
                </View>
                <Text>{contractualControl?.estimateInfo?.porcentageChargeOff || 0} %</Text>
              </View>

              <Text style={{marginTop: '10px'}}>Estimado ({CurrencyFormatter({
                currency: 'MXN', 
                value: contractualControl?.estimateInfo?.estimatedTotal || 0
              })})</Text>
              <View style={{ display: 'flex', flexDirection: 'row', gap: 5, alignItems: 'center' }}>
                <View style={{ width: 200, height: 7, backgroundColor: 'gray', position: 'relative' }}>
                  <View style={{ width: (contractualControl?.estimateInfo?.porcentageEstimated || 0) > 100 ? 200: (contractualControl?.estimateInfo?.porcentageEstimated || 0) *2, height: 7, backgroundColor: '#FFA145', position: 'absolute', top: 0, left: 0 }} />
                </View>
                <Text>{contractualControl?.estimateInfo?.porcentageEstimated || 0} %</Text>
              </View>

              <Text style={{marginTop: '10px'}}>Garantia ({CurrencyFormatter({
                currency: 'MXN', 
                value: contractualControl?.estimateInfo?.amountGuaranteeFund || 0
              })})</Text>
              <View style={{ display: 'flex', flexDirection: 'row', gap: 5, alignItems: 'center' }}>
                <View style={{ width: 200, height: 7, backgroundColor: 'gray', position: 'relative' }}>
                  <View style={{ width: ((contractualControl?.estimateInfo?.porcentageGuaranteeFund || 0)*2) > 200 ? 200: ((contractualControl?.estimateInfo?.porcentageGuaranteeFund || 0)*2), height: 7, backgroundColor: '#69f0ae', position: 'absolute', top: 0, left: 0 }} />
                </View>
                <Text>{contractualControl?.estimateInfo?.porcentageGuaranteeFund || 0} %</Text>
              </View>
              
            </View>

            <View style={{width: '50%'}}>
              <Text style={{marginBottom: '15px'}}>CONTROL PRESUPUESTAL</Text>

              <View
                style={{
                  flexDirection: 'row', // esto alinea las barras horizontalmente
                  gap: 10, // espacio entre cada barra
                  // gap: 2, // espacio entre cada barra
                  alignItems: 'flex-end', // alinea todas las barras en la base
                }}
              >

                <View
                  style={{
                    flexDirection: 'row', // texto + barra
                    alignItems: 'flex-end',
                    // gap: 2,
                  }}
                >
                  {/* Texto vertical */}
                  <Text
                    style={{
                      transform: 'rotate(-90deg)',
                      transformOrigin: 'left top',
                      fontSize: 10,
                      marginRight: -1
                      // marginBottom: 5,
                    }}
                  >
                    Monto ({CurrencyFormatter({
                      currency: 'MXN',
                      value: budgetedControl?.amountInfo?.amountotal || 0
                    })})
                  </Text>

                  {/* Barra contenedora */}
                  <View
                    style={{
                      width: 10,
                      height: 200,
                      backgroundColor: 'gray',
                      position: 'relative',
                      justifyContent: 'flex-end',
                    }}
                  >
                    {/* Barra de progreso */}
                    <View
                      style={{
                        width: 10,
                        height: (30 / 100) * 200, // escalado dinámico
                        backgroundColor: '#7D9F2D',
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                      }}
                    />
                  </View>
                </View>

                <View
                  style={{
                    flexDirection: 'row', // texto + barra
                    alignItems: 'flex-end',
                    gap: 2,
                  }}
                >
                  {/* Texto vertical */}
                  <Text
                    style={{
                      transform: 'rotate(-90deg)',
                      transformOrigin: 'left top',
                      fontSize: 10,
                      marginBottom: 5,
                    }}
                  >
                    Facturado ({CurrencyFormatter({
                      currency: 'MXN',
                      value: budgetedControl?.billingInfo?.billedTotal || 0
                    })})
                  </Text>

                  {/* Barra contenedora */}
                  <View
                    style={{
                      width: 10,
                      height: 200,
                      backgroundColor: 'gray',
                      position: 'relative',
                      justifyContent: 'flex-end',
                    }}
                  >
                    {/* Barra de progreso */}
                    <View
                      style={{
                        width: 10,
                        height: (30 / 100) * 200, // escalado dinámico
                        backgroundColor: '#289399',
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                      }}
                    />
                  </View>
                </View>

                <View
                  style={{
                    flexDirection: 'row', // texto + barra
                    alignItems: 'flex-end',
                    gap: 2,
                  }}
                >
                  {/* Texto vertical */}
                  <Text
                    style={{
                      transform: 'rotate(-90deg)',
                      transformOrigin: 'left top',
                      fontSize: 10,
                      marginBottom: 5,
                    }}
                  >
                    Pagado ({CurrencyFormatter({
                      currency: 'MXN',
                      value: budgetedControl?.paymentInfo?.paymentTotal || 0
                    })})
                  </Text>

                  {/* Barra contenedora */}
                  <View
                    style={{
                      width: 10,
                      height: 200,
                      backgroundColor: 'gray',
                      position: 'relative',
                      justifyContent: 'flex-end',
                    }}
                  >
                    {/* Barra de progreso */}
                    <View
                      style={{
                        width: 10,
                        height: (30 / 100) * 200, // escalado dinámico
                        backgroundColor: '#f08080',
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                      }}
                    />
                  </View>
                </View>

                <View
                  style={{
                    flexDirection: 'row', // texto + barra
                    alignItems: 'flex-end',
                    gap: 2,
                  }}
                >
                  {/* Texto vertical */}
                  <Text
                    style={{
                      transform: 'rotate(-90deg)',
                      transformOrigin: 'left top',
                      fontSize: 10,
                      marginBottom: 5,
                    }}
                  >
                    Costo ({CurrencyFormatter({
                      currency: 'MXN',
                      value: budgetedControl?.spentInfo?.spentTotal || 0
                    })})
                  </Text>

                  {/* Barra contenedora */}
                  <View
                    style={{
                      width: 10,
                      height: 200,
                      backgroundColor: 'gray',
                      position: 'relative',
                      justifyContent: 'flex-end',
                    }}
                  >
                    {/* Barra de progreso */}
                    <View
                      style={{
                        width: 10,
                        height: (30 / 100) * 200, // escalado dinámico
                        backgroundColor: '#E4D831',
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                      }}
                    />
                  </View>
                </View>

                <View
                  style={{
                    flexDirection: 'row', // texto + barra
                    alignItems: 'flex-end',
                    gap: 2,
                  }}
                >
                  {/* Texto vertical */}
                  <Text
                    style={{
                      transform: 'rotate(-90deg)',
                      transformOrigin: 'left top',
                      fontSize: 10,
                      marginBottom: 5,
                    }}
                  >
                    Presupuestado ({CurrencyFormatter({
                      currency: 'MXN',
                      value: budgetedControl?.budgetedInfo?.budgetedTotal || 0
                    })})
                  </Text>

                  {/* Barra contenedora */}
                  <View
                    style={{
                      width: 10,
                      height: 200,
                      backgroundColor: 'gray',
                      position: 'relative',
                      justifyContent: 'flex-end',
                    }}
                  >
                    {/* Barra de progreso */}
                    <View
                      style={{
                        width: 10,
                        height: (30 / 100) * 200, // escalado dinámico
                        backgroundColor: '#71B2F2',
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                      }}
                    />
                  </View>
                </View>
                
              </View>

            </View>

          </View>

          <View style={{marginTop: '30px'}}>
            <Text>ANALISIS FINANCIERO</Text>

            <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', marginTop: '10px', margin: '3px'}}>
              <Text style={{flex: 1, fontSize: '7px', padding: '2px', borderBottom: '1px solid black', fontWeight: 'bold'}}>CONCEPTO </Text>
              <Text style={{flex: 1, fontSize: '7px', padding: '2px', borderBottom: '1px solid black', fontWeight: 'bold'}}>MONTO </Text>
              <Text style={{flex: 1, fontSize: '7px', padding: '2px', borderBottom: '1px solid black', fontWeight: 'bold'}}>PORCENTAJE </Text>
              <Text style={{flex: 1, fontSize: '7px', padding: '2px', borderBottom: '1px solid black', fontWeight: 'bold'}}>PENDIENTE | SOBRANTE </Text>
              <Text style={{flex: 1, fontSize: '7px', padding: '2px', borderBottom: '1px solid black', fontWeight: 'bold'}}>PORCENTAJE </Text>
            </View>

            <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', marginTop: '10px', margin: '3px'}} >
              <Text style={{flex: 1, fontSize: '7px', padding: '2px', borderBottom: '0.2px solid gray', fontWeight: 'bold'}}>Presupuestado</Text>
              <Text style={{flex: 1, fontSize: '7px', padding: '2px', borderBottom: '0.2px solid gray', fontWeight: 'bold'}}>{CurrencyFormatter({
                currency: 'MXN',
                value: budgetedControl?.budgetedInfo?.budgetedTotal || 0
              })}</Text>
              <Text style={{flex: 1, fontSize: '7px', padding: '2px', borderBottom: '0.2px solid gray', fontWeight: 'bold'}}>{budgetedControl?.budgetedInfo?.porcentageTotal || 0}%</Text>
              <Text style={{flex: 1, fontSize: '7px', padding: '2px', borderBottom: '0.2px solid gray', fontWeight: 'bold'}}>{CurrencyFormatter({
                currency: 'MXN',
                value: budgetedControl?.budgetedInfo?.pendingBugetedTotal || 0
              })} </Text>
              <Text style={{flex: 1, fontSize: '7px', padding: '2px', borderBottom: '0.2px solid gray', fontWeight: 'bold'}}>{100 - (budgetedControl?.budgetedInfo?.porcentageTotal || 0)}%</Text>
            </View>

            <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', marginTop: '10px', margin: '3px'}} >
              <Text style={{flex: 1, fontSize: '7px', padding: '2px', borderBottom: '0.2px solid gray', fontWeight: 'bold'}}>Costo</Text>
              <Text style={{flex: 1, fontSize: '7px', padding: '2px', borderBottom: '0.2px solid gray', fontWeight: 'bold'}}>{CurrencyFormatter({
                currency: 'MXN',
                value: budgetedControl?.spentInfo?.spentTotal || 0
              })}</Text>
              <Text style={{flex: 1, fontSize: '7px', padding: '2px', borderBottom: '0.2px solid gray', fontWeight: 'bold'}}>{budgetedControl?.spentInfo?.porcentage || 0}%</Text>
              <Text style={{flex: 1, fontSize: '7px', padding: '2px', borderBottom: '0.2px solid gray', fontWeight: 'bold'}}>{CurrencyFormatter({
                currency: 'MXN',
                value: budgetedControl?.spentInfo?.pendingSpentTotal || 0
              })} </Text>
              <Text style={{flex: 1, fontSize: '7px', padding: '2px', borderBottom: '0.2px solid gray', fontWeight: 'bold'}}>{100 - (budgetedControl?.spentInfo?.porcentage || 0)}%</Text>
            </View>

            <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', marginTop: '10px', margin: '3px'}} >
              <Text style={{flex: 1, fontSize: '7px', padding: '2px', borderBottom: '0.2px solid gray', fontWeight: 'bold'}}>Facturado</Text>
              <Text style={{flex: 1, fontSize: '7px', padding: '2px', borderBottom: '0.2px solid gray', fontWeight: 'bold'}}>{CurrencyFormatter({
                currency: 'MXN',
                value: budgetedControl?.billingInfo?.billedTotal || 0
              })}</Text>
              <Text style={{flex: 1, fontSize: '7px', padding: '2px', borderBottom: '0.2px solid gray', fontWeight: 'bold'}}>{budgetedControl?.billingInfo?.porcentage || 0}%</Text>
              <Text style={{flex: 1, fontSize: '7px', padding: '2px', borderBottom: '0.2px solid gray', fontWeight: 'bold'}}>{CurrencyFormatter({
                currency: 'MXN',
                value: budgetedControl?.billingInfo?.pendingBillingTotal || 0
              })} </Text>
              <Text style={{flex: 1, fontSize: '7px', padding: '2px', borderBottom: '0.2px solid gray', fontWeight: 'bold'}}>{100 - (budgetedControl?.billingInfo?.porcentage || 0)}%</Text>
            </View>

            <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', marginTop: '10px', margin: '3px'}} >
              <Text style={{flex: 1, fontSize: '7px', padding: '2px', borderBottom: '0.2px solid gray', fontWeight: 'bold'}}>Pagado</Text>
              <Text style={{flex: 1, fontSize: '7px', padding: '2px', borderBottom: '0.2px solid gray', fontWeight: 'bold'}}>{CurrencyFormatter({
                currency: 'MXN',
                value: budgetedControl?.paymentInfo?.paymentTotal || 0
              })}</Text>
              <Text style={{flex: 1, fontSize: '7px', padding: '2px', borderBottom: '0.2px solid gray', fontWeight: 'bold'}}>{budgetedControl?.paymentInfo?.porcentage || 0}%</Text>
              <Text style={{flex: 1, fontSize: '7px', padding: '2px', borderBottom: '0.2px solid gray', fontWeight: 'bold'}}>{CurrencyFormatter({
                currency: 'MXN',
                value: budgetedControl?.paymentInfo?.pendingPaymentTotal || 0
              })} </Text>
              <Text style={{flex: 1, fontSize: '7px', padding: '2px', borderBottom: '0.2px solid gray', fontWeight: 'bold'}}>{100 - (budgetedControl?.paymentInfo?.porcentage || 0)}%</Text>
            </View>

            <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', marginTop: '10px', margin: '3px'}} >
              <Text style={{flex: 1, fontSize: '7px', padding: '2px', borderBottom: '0.2px solid gray', fontWeight: 'bold'}}>Utilidad neta </Text>
              <Text style={{flex: 1, fontSize: '7px', padding: '2px', borderBottom: '0.2px solid gray', fontWeight: 'bold'}}>{CurrencyFormatter({
                currency: 'MXN',
                value: budgetedControl?.netprofitInfo?.netprofitTotal || 0
              })}</Text>
              <Text style={{flex: 1, fontSize: '7px', padding: '2px', borderBottom: '0.2px solid gray', fontWeight: 'bold'}}>{budgetedControl?.netprofitInfo?.porcentage || 0}%</Text>
              <Text style={{flex: 1, fontSize: '7px', padding: '2px', borderBottom: '0.2px solid gray', fontWeight: 'bold'}}></Text>
              <Text style={{flex: 1, fontSize: '7px', padding: '2px', borderBottom: '0.2px solid gray', fontWeight: 'bold'}}></Text>
            </View>

          </View>

          <View style={{marginTop: '20px', width: '60%'}}>
            <Text>ANALISIS DE COSTO-BENEFICIO</Text>

            <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', padding: '2px', margin: '0px', border: '1px solid black'}}>
              <Text style={{flex: 1, fontSize: '7px', padding: '2px', fontWeight: 'bold'}}>Costes totales </Text>
              <Text style={{flex: 1, fontSize: '7px', padding: '2px', fontWeight: 'bold'}}>{CurrencyFormatter({
                currency: 'MXN',
                value: budgetedControl?.spentInfo?.spentTotal || 0
              })}</Text>
            </View>

            <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', padding: '2px', margin: '0px', border: '1px solid black'}}>
              <Text style={{flex: 1, fontSize: '7px', padding: '2px', fontWeight: 'bold'}}>Beneficios totales </Text>
              <Text style={{flex: 1, fontSize: '7px', padding: '2px', fontWeight: 'bold'}}>{CurrencyFormatter({
                currency: 'MXN',
                value: budgetedControl?.paymentInfo?.paymentTotal || 0
              })}</Text>
            </View>

            <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', padding: '2px', margin: '0px', border: '1px solid black'}}>
              <Text style={{flex: 1, fontSize: '7px', padding: '2px', fontWeight: 'bold'}}>Beneficios totales </Text>
              <Text style={{flex: 1, fontSize: '7px', padding: '2px', fontWeight: 'bold', color:'green'}}>
                {(budgetedControl?.paymentInfo?.paymentTotal || 0) / (budgetedControl?.spentInfo?.spentTotal || 0) }
              </Text>
            </View>

          </View>


        </View>
      </Page>
    </Document>
  )
}
