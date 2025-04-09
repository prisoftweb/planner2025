import {Document, Page, Text, Image, View, StyleSheet} from '@react-pdf/renderer'
import { CurrencyFormatter } from '@/app/functions/Globals'
import { ResumenEstimateProject } from '@/interfaces/Estimate';
import { OneProjectMin } from '@/interfaces/Projects';
import { IEstimate } from '@/interfaces/Estimate';

export default function DetailEstimatePDF({resumenEstimate, project, estimate, numEstimate}:
    {resumenEstimate: ResumenEstimateProject, project:OneProjectMin, estimate:IEstimate, numEstimate:number}){
  
  const style = StyleSheet.create({
    paragraph: {
      display:"flex", 
      flexDirection:"row", 
      justifyContent:"space-around", 
      marginTop:'5px'
    },
    textLeft: {
      width:'150px', 
      color: 'gray', 
      fontSize: '10px'
    },
    textRight: {
      width:'150px', 
      color: 'gray', 
      fontSize: '10px',
      textAlign: 'right'
    },
    container: {
      border:'1px solid black', 
      padding: '5px',
      marginTop: '5px'
    },
    title: {
      textAlign: 'center', 
      color:'blue',
      marginTop: '14px',
      fontSize: '13px'
    }
  })
  
  return(
    <Document>
      <Page>
        <View style={{padding: '15px'}}>
          <View style={{display: 'flex', flexDirection: 'row', gap:'5px'}}>
            <View style={{width:'33%', textAlign:'center', display:'flex', flexDirection:'column', alignItems:'center'}}>
              <Image source={'/isologo_palacios.png'} style={{height: '57px', width:'67px'}}></Image>
              <View style={{display:'flex', flexDirection:'row', gap:'9px'}}>
                <View>
                  <Text style={{fontSize:'11px', color:'blue'}}>{project.title}</Text>
                  <Text style={{fontSize:'11px', color:'green'}}>{CurrencyFormatter({
                      currency: 'MXN',
                      value: project.amount
                    })}
                  </Text>
                  <Text style={{color:project.category.color, borderRadius:'5px', padding:'3px', fontSize:'9px'}}>
                    {project.category.name}
                  </Text>
                </View>
              </View>
            </View>

            <View style={{display:'flex', alignItems:'center', padding:'13px', width:'33%'}}>
              <Image src={'/Logotipo_principal.png'} style={{width: 'auto', height:'70px'}} />
              <Text style={{color:'#3b82f6', fontSize:'10px'}}>Samuel Palacios Hernandez</Text>
            </View>

            <View style={{padding:'13px', width:'33%'}}>
              <View style={{border:'1px solid gray'}}>
                <View style={{display:'flex', flexDirection:'row', border:'1px solid gray'}}>
                  <Text style={{backgroundColor:'green', color:'white', width:'80px', textAlign:'center', fontSize:'10px'}}>{numEstimate}</Text>
                  <Text style={{width:'100%', textAlign:'center', color:'#3b82f6', fontSize:'10px'}}>{estimate?.name}</Text>
                </View>
                <View style={{textAlign:'center', border:'1px solid gray', padding:'3px'}}>
                  <Text style={{textAlign:'center', color:'gray', fontSize:'11px'}}>
                    {CurrencyFormatter({
                      currency: 'MXN',
                      value: estimate?.amount || 0
                    })}
                  </Text>
                </View>
              </View>

              <View style={{marginTop:'5px', display:'flex', flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
                <Text style={{fontSize:'9px', color:'gray'}}>Fecha</Text>
                <Text style={{fontSize:'11px'}}>{estimate?.date?.substring(0, 10)}</Text>
              </View>
              <View style={{marginTop:'5px', display:'flex', flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
                <Text style={{fontSize:'9px', color:'gray'}}>Orden de compra</Text>
                <Text style={{fontSize:'11px', color:'gray'}}>{estimate?.purschaseOrder}</Text>
              </View>
            </View>

          </View>

          <View>
            <Text style={style.title}>CONTRATO</Text>
            <View style={style.container}>
              <View style={style.paragraph}>
                <Text style={style.textLeft}>Monto de contrato</Text>
                <Text style={style.textRight}>{CurrencyFormatter({
                    currency: "MXN",
                    value: project.amount
                  })}
                </Text>
              </View>
              <View style={style.paragraph}>
                <Text style={style.textLeft}>Estimado anterior</Text>
                <Text style={style.textRight}>{CurrencyFormatter({
                    currency: "MXN",
                    value: resumenEstimate.totalPrevious?.estimatedTotal || 0
                  })}
                </Text>
              </View>
              <View style={style.paragraph}>
                <Text style={style.textLeft}>Esta estimacion</Text>
                <Text style={style.textRight}>{CurrencyFormatter({
                      currency: 'MXN',
                      value: estimate?.amount || 0
                    })}
                </Text>
              </View>
              <View style={style.paragraph}>
                <Text style={style.textLeft}>Acumulado estimado</Text>
                <Text style={style.textRight}>{CurrencyFormatter({
                    currency: "MXN",
                    value: resumenEstimate?.totalAccumulated?.amountPayable || 0
                  })}
                </Text>
              </View>
              <View style={style.paragraph}>
                <Text style={style.textLeft}>Saldo pendiente por estimar</Text>
                <Text style={style.textRight}>{CurrencyFormatter({
                    currency: "MXN",
                    value: 0
                  })}
                </Text>
              </View>
            </View>

          </View>

          <View>
            <Text style={style.title}>ANTICIPO</Text>
            <View style={style.container}>
              <View style={style.paragraph}>
                <Text style={style.textLeft}>Anticipo recibido</Text>
                <Text style={style.textRight}>{CurrencyFormatter({
                    currency: "MXN",
                    value: 0
                  })}
                </Text>
              </View>
              <View style={style.paragraph}>
                <Text style={style.textLeft}>Amortizado anterior</Text>
                <Text style={style.textRight}>{CurrencyFormatter({
                    currency: "MXN",
                    value: resumenEstimate?.totalPrevious?.amountChargeOff || 0
                  })}
                </Text>
              </View>
              <View style={style.paragraph}>
                <Text style={style.textLeft}>Esta estimacion</Text>
                <Text style={style.textRight}>{CurrencyFormatter({
                    currency: "MXN",
                    value: resumenEstimate?.totalActual?.amountChargeOff || 0
                  })}
                </Text>
              </View>
              <View style={style.paragraph}>
                <Text style={style.textLeft}>Acumulado amortizado</Text>
                <Text style={style.textRight}>{CurrencyFormatter({
                    currency: "MXN",
                    value: resumenEstimate?.totalAccumulated?.amountChargeOff || 0
                  })}
                </Text>
              </View>
              <View style={style.paragraph}>
                <Text style={style.textLeft}>Saldo pendiente por amortizar</Text>
                <Text style={style.textRight}>{CurrencyFormatter({
                    currency: "MXN",
                    value: 0
                  })}
                </Text>
              </View>
            </View>

          </View>

          <View>
            <Text style={style.title}>FONDO DE GARANTIA {project.guaranteefund.porcentage}%</Text>
            <View style={style.container}>
              <View style={style.paragraph}>
                <Text style={style.textLeft}>Retenido anterior</Text>
                <Text style={style.textRight}>{CurrencyFormatter({
                    currency: "MXN",
                    value: resumenEstimate.totalPrevious?.amountGuaranteeFund
                  })}
                </Text>
              </View>
              <View style={style.paragraph}>
                <Text style={style.textLeft}>Esta estimacion</Text>
                <Text style={style.textRight}>{CurrencyFormatter({
                    currency: "MXN",
                    value: resumenEstimate?.totalActual?.amountGuaranteeFund || 0
                  })}
                </Text>
              </View>
              <View style={style.paragraph}>
                <Text style={style.textLeft}>Total retenido</Text>
                <Text style={style.textRight}>{CurrencyFormatter({
                    currency: "MXN",
                    value: resumenEstimate?.totalAccumulated?.amountGuaranteeFund || 0
                  })}
                </Text>
              </View>
            </View>

          </View>
          
          <View>
            <Text style={style.title}>ESTA ESTIMACION</Text>
            <View style={style.container}>
              <View style={style.paragraph}>
                <Text style={style.textLeft}>Importe esta estimacion</Text>
                <Text style={style.textRight}>{CurrencyFormatter({
                    currency: "MXN",
                    value: resumenEstimate?.estimateResume?.amount || 0
                  })}
                </Text>
              </View>
              <View style={style.paragraph}>
                <Text style={style.textLeft}>Amortizacion de anticipo</Text>
                <Text style={style.textRight}>{CurrencyFormatter({
                    currency: "MXN",
                    value: resumenEstimate.estimateResume?.amountChargeOff || 0
                  })}
                </Text>
              </View>
              <View style={style.paragraph}>
                <Text style={style.textLeft}>Fondo de garantia</Text>
                <Text style={style.textRight}>{CurrencyFormatter({
                    currency: "MXN",
                    value: resumenEstimate?.estimateResume?.amountGuaranteeFund || 0
                  })}
                </Text>
              </View>
              <View style={style.paragraph}>
                <Text style={style.textLeft}>Acumulado Total sin impuestos</Text>
                <Text style={style.textRight}>{CurrencyFormatter({
                    currency: "MXN",
                    value: resumenEstimate?.estimateResume?.amount || 0
                  })}
                </Text>
              </View>
              <View style={style.paragraph}>
                <Text style={style.textLeft}>Acumulado Total con impuestos</Text>
                <Text style={style.textRight}>{CurrencyFormatter({
                    currency: "MXN",
                    value: resumenEstimate?.estimateResume?.estimatedTotalVAT || 0
                  })}
                </Text>
              </View>
            </View>

          </View>

        </View>
      </Page>
    </Document>
  )
}