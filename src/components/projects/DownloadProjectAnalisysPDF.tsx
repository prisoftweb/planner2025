import {Document, Page, Text, Image, View} from '@react-pdf/renderer'
import { CurrencyFormatter } from '@/app/functions/Globals'
import { OneProjectMin } from "@/interfaces/Projects"
import { IContractualControlProject, ProjectByBudgetedControl } from '@/interfaces/DashboardProjects';
import { Company } from "@/interfaces/Companies"

export default function DownloadProjectAnalisysPDF({project, token, contractualControl, budgetedControl, satCompany}:
  {project:OneProjectMin, token:string, contractualControl?: IContractualControlProject, 
    budgetedControl:ProjectByBudgetedControl, satCompany:Company}) {

  return(
    <Document>
      <Page>
        <View style={{padding: '15px'}}>

          <View style={{display: 'flex', flexDirection: 'row', gap:'5px', justifyContent: 'space-between'}}>

            <View style={{display:'flex', flexDirection:'column'}}>
              <View style={{display:'flex', flexDirection:'row', alignItems:'center', gap:'5px'}}>
                {/* <Image source={'/isologo_palacios.png'} style={{height: '57px', width:'67px'}}></Image> */}
                {/* <Image source={'/isologo_palacios.png'} style={{height: '57px', width:'auto'}}></Image> */}
                <Image source={satCompany?.isologo?? satCompany.logo} style={{height: '57px', width:'auto'}}></Image>
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
                {/* <Text style={{margin: '2px'}}>{new Date().toISOString().substring(0, 10)}</Text> */}
                <Text style={{margin: '2px'}}>{project.date?.substring(0, 10)}</Text>
              </View>

              <View style={{display:'flex', flexDirection:'row', gap: '2px', fontSize: '10px'}}>
                <Text style={{color:'gray', margin: '2px'}}>Fecha de termino:</Text>
                {/* <Text style={{margin: '2px'}}>{new Date().toISOString().substring(0, 10)}</Text> */}
                <Text style={{margin: '2px'}}>{project.endDate?.substring(0, 10)}</Text>
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
                      // value: project.amount * 1.16
                      value: project.amountotal?? 0
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

              {project.estimatedProject && (
                <>
                  <View style={{marginTop:'5px', display:'flex', flexDirection:'row', justifyContent:'flex-end', alignItems:'center', gap:'3px'}}>
                    <Text style={{fontSize:'10px', color:'gray'}}>Aplica fondo de garantia:  </Text>
                    <View style={{width: '5px', height: '5px', backgroundColor: project.hasguaranteefund? 'green': 'red'}}></View>
                  </View>

                  <View style={{marginTop:'5px', display:'flex', flexDirection:'row', justifyContent:'flex-end', alignItems:'center', gap:'3px'}}>
                    <Text style={{fontSize:'10px', color:'gray'}}>Aplica anticipo: </Text>
                    <View style={{width: '5px', height: '5px', backgroundColor: project.hasamountChargeOff? 'green': 'red'}}></View>
                  </View>
                </>
              )}

              <View style={{borderRadius: '3px', marginLeft: '35px', marginTop:'7px', width:'100px', backgroundColor: project?.category?.color ?? 'gray', textAlign: 'center', color:project?.category?.darktext? 'black': 'white'}}>
                <Text style={{fontSize: '7px', padding: '2px', borderBottom: '0.2px solid gray', fontWeight: 'bold', textAlign: 'center'}}>
                  {project.category.name}
                </Text>
              </View>

            </View>
          </View>

          <View style={{display: 'flex', flexDirection: 'row', gap: '5px', marginTop: '30px', fontSize:'10px'}}>
            {contractualControl && project.estimatedProject && (
              <View style={{width: '50%'}}>
                <Text style={{marginBottom: '15px', fontSize:'11px', color:'gray'}}>CONTROL CONTRACTUAL</Text>

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
            )}

            <View style={{width: '50%'}}>
              <Text style={{marginBottom: '15px', fontSize:'11px', color:'gray'}}>CONTROL PRESUPUESTAL</Text>

              <Text>Monto ({CurrencyFormatter({
                currency: 'MXN', 
                value: budgetedControl?.amountInfo?.amountotal || 0
              })})</Text>
              <View style={{ display: 'flex', flexDirection: 'row', gap: 5, alignItems: 'center' }}>
                <View style={{ width: 200, height: 7, backgroundColor: 'gray', position: 'relative' }}>
                  <View style={{ width: (budgetedControl?.amountInfo?.porcentageTotal || 0) > 100? 200: (budgetedControl?.amountInfo?.porcentageTotal || 0) * 2, height: 7, backgroundColor: '#E4D831', position: 'absolute', top: 0, left: 0 }} />
                </View>
                <Text>{budgetedControl?.amountInfo?.porcentageTotal || 0} %</Text>
              </View>

              <Text style={{marginTop: '10px'}}>Facturado ({CurrencyFormatter({
                currency: 'MXN', 
                value: budgetedControl?.billingInfo?.billedTotal || 0
              })})</Text>
              <View style={{ display: 'flex', flexDirection: 'row', gap: 5, alignItems: 'center' }}>
                <View style={{ width: 200, height: 7, backgroundColor: 'gray', position: 'relative' }}>
                  <View style={{ width: (budgetedControl?.billingInfo?.porcentage || 0) > 100? 200: (budgetedControl?.billingInfo?.porcentage || 0) * 2, height: 7, backgroundColor: '#71B2F2', position: 'absolute', top: 0, left: 0 }} />
                </View>
                <Text>{budgetedControl?.billingInfo?.porcentage || 0} %</Text>
              </View>

              <Text style={{marginTop: '10px'}}>Pagado ({CurrencyFormatter({
                currency: 'MXN', 
                value: budgetedControl?.paymentInfo?.paymentTotal || 0
              })})</Text>
              <View style={{ display: 'flex', flexDirection: 'row', gap: 5, alignItems: 'center' }}>
                <View style={{ width: 200, height: 7, backgroundColor: 'gray', position: 'relative' }}>
                  <View style={{ width: (budgetedControl?.paymentInfo?.porcentage || 0) > 100 ? 200 : (budgetedControl?.paymentInfo?.porcentage || 0) *2, height: 7, backgroundColor: '#ff5252', position: 'absolute', top: 0, left: 0 }} />
                </View>
                <Text>{budgetedControl?.paymentInfo?.porcentage || 0} %</Text>
              </View>

              <Text style={{marginTop: '10px'}}>Costo ({CurrencyFormatter({
                currency: 'MXN', 
                value: budgetedControl?.spentInfo?.spentTotal || 0
              })})</Text>
              <View style={{ display: 'flex', flexDirection: 'row', gap: 5, alignItems: 'center' }}>
                <View style={{ width: 200, height: 7, backgroundColor: 'gray', position: 'relative' }}>
                  <View style={{ width: (budgetedControl?.spentInfo?.porcentage || 0) > 100 ? 200: (budgetedControl?.spentInfo?.porcentage || 0) *2, height: 7, backgroundColor: '#FFA145', position: 'absolute', top: 0, left: 0 }} />
                </View>
                <Text>{budgetedControl?.spentInfo?.porcentage || 0} %</Text>
              </View>

              <Text style={{marginTop: '10px'}}>Presupuestado ({CurrencyFormatter({
                currency: 'MXN', 
                value: budgetedControl?.budgetedInfo?.budgetedTotal || 0
              })})</Text>
              <View style={{ display: 'flex', flexDirection: 'row', gap: 5, alignItems: 'center' }}>
                <View style={{ width: 200, height: 7, backgroundColor: 'gray', position: 'relative' }}>
                  <View style={{ width: ((budgetedControl?.budgetedInfo?.porcentageTotal || 0)*2) > 200 ? 200: ((budgetedControl?.budgetedInfo?.porcentageTotal || 0)*2), height: 7, backgroundColor: '#69f0ae', position: 'absolute', top: 0, left: 0 }} />
                </View>
                <Text>{budgetedControl?.budgetedInfo?.porcentageTotal || 0} %</Text>
              </View>

            </View>

          </View>

          <View style={{marginTop: '30px'}}>
            <Text style={{fontSize:'11px', color:'gray'}}>ANALISIS FINANCIERO</Text>

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
              <Text style={{flex: 1, fontSize: '7px', padding: '2px', borderBottom: '0.2px solid gray', fontWeight: 'bold'}}>{(100 - (budgetedControl?.budgetedInfo?.porcentageTotal || 0)).toFixed(2)}%</Text>
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
              <Text style={{flex: 1, fontSize: '7px', padding: '2px', borderBottom: '0.2px solid gray', fontWeight: 'bold'}}>{(100 - (budgetedControl?.spentInfo?.porcentage || 0)).toFixed(2)}%</Text>
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
              <Text style={{flex: 1, fontSize: '7px', padding: '2px', borderBottom: '0.2px solid gray', fontWeight: 'bold'}}>{(100 - (budgetedControl?.billingInfo?.porcentage || 0)).toFixed(2)}%</Text>
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
              <Text style={{flex: 1, fontSize: '7px', padding: '2px', borderBottom: '0.2px solid gray', fontWeight: 'bold'}}>{(100 - (budgetedControl?.paymentInfo?.porcentage || 0)).toFixed(2)}%</Text>
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
            <Text style={{fontSize:'11px', color:'gray'}}>ANALISIS DE COSTO-BENEFICIO</Text>

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
              <Text style={{flex: 1, fontSize: '7px', padding: '2px', fontWeight: 'bold'}}>Relación coste-beneficio (B/C) </Text>
              <Text style={{flex: 1, fontSize: '7px', padding: '2px', fontWeight: 'bold', color:'green'}}>
                {((budgetedControl?.paymentInfo?.paymentTotal || 0) / (budgetedControl?.spentInfo?.spentTotal || 0)).toFixed(2) }
              </Text>
            </View>

          </View>


        </View>
      </Page>
    </Document>
  )
}

const BarWithLabel = ({ label, value, percentage, color }: {label:string, value: number, percentage: number, color: string}) => (
  <View
    style={{
      flexDirection: 'row',
      alignItems: 'flex-end',
      gap: 2,
    }}
  >
    {/* Texto rotado */}
    <Text
      style={{
        transform: 'rotate(-90deg)',
        transformOrigin: 'left top',
        fontSize: 10,
        marginRight: -4, // Ajusta aquí para que se vea pegado
      }}
    >
      {label} ({CurrencyFormatter({ currency: 'MXN', value })})
    </Text>

    {/* Barra vertical */}
    <View
      style={{
        width: 10,
        height: 200,
        backgroundColor: 'gray',
        justifyContent: 'flex-end',
        alignItems: 'center',
      }}
    >
      {/* Barra de progreso */}
      <View
        style={{
          width: 10,
          height: (percentage / 100) * 200,
          backgroundColor: color,
        }}
      />
      {/* Porcentaje rotado */}
      <Text
        style={{
          transform: 'rotate(-90deg)',
          transformOrigin: 'left top',
          fontSize: 8,
          marginTop: 2,
        }}
      >
        {percentage.toFixed(0) + '%'}
      </Text>
    </View>
  </View>
)