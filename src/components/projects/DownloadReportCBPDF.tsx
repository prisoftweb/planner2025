import {Document, Page, Text, Image, View} from '@react-pdf/renderer'
import { CurrencyFormatter } from '@/app/functions/Globals'
import { IProyectCostBen, ICosBen, ICostosTotales, IBeneficiosTotales } from "@/interfaces/Projects"
import { Company } from "@/interfaces/Companies"

type Props = {
  prjsCB:IProyectCostBen[], 
  cosBen:ICosBen, 
  costTot:ICostosTotales, 
  benTot:IBeneficiosTotales,
  order:string,
  type:string,
  dateIni:Date,
  dateEnd:Date,
  satCompany:Company
}

export default function DownloadReportCBPDF({benTot, cosBen, costTot, prjsCB, order, type, dateEnd, dateIni, satCompany}: Props) {

  const orderProjects = order==="Ganancia"? [...prjsCB].sort((a, b) => a.rentabilidad - b.rentabilidad) : [...prjsCB].sort((a, b) => a.costobeneficio - b.costobeneficio);

  const months=['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];

  const date=new Date();
  // const dateIni= new Date(new Date().getFullYear(), 0, 1);

  return(
    <Document>
      <Page>
        <View style={{padding: '15px'}}>

          <View style={{display: 'flex', flexDirection: 'row', gap:'5px', justifyContent: 'space-between'}}>

            <View style={{display:'flex', flexDirection:'column'}}>
              <View style={{display:'flex', flexDirection:'row', alignItems:'center', gap:'5px'}}>
                {/* <Image source={'/isologo_palacios.png'} style={{height: '57px', width:'67px'}}></Image> */}
                {/* <Image source={'/Palaciosconstrucciones-isologo.png'} style={{height: '57px', width:'auto'}}></Image> */}
                <Image source={satCompany.logo} style={{height: '57px', width:'auto'}}></Image>
                <View style={{display:'flex', flexDirection:'row', gap:'9px'}}>
                  <View>
                    <Text style={{fontSize:'15px', color:'gray', width: '250px'}}>COSTO-BENEFICIO</Text>
                    {/* <Text style={{fontSize:'11px', color:'gray'}}>POR PROYECTO</Text> */}
                    <Text style={{fontSize:'11px', color:'gray'}}>{type}</Text>
                  </View>
                </View>
              </View>
{/* <View style={{marginTop:'5px', display:'flex', flexDirection:'row', gap: '2px', fontSize: '10px', justifyContent:'flex-start', alignItems:'center'}}></View> */}
              <View style={{display:'flex', flexDirection:'row', gap: '2px', fontSize: '10px'}}>
                <Text style={{color:'gray', margin: '2px'}}>Fecha: </Text>
                <Text style={{margin: '2px'}}> {date.getDate()} de {months[date.getMonth()]} de {date.getFullYear()}</Text>
              </View>

              <View style={{display:'flex', flexDirection:'row', gap: '2px', fontSize: '10px'}}>
                <Text style={{color:'gray', margin: '2px'}}>Periodo:</Text>
                <Text style={{margin: '2px'}}> {dateIni.getDate()} de {months[dateIni.getMonth()]} de {dateIni.getFullYear()} al {dateEnd.getDate()} de {months[dateEnd.getMonth()]} de {dateEnd.getFullYear()}</Text>
              </View>

            </View>

            <View style={{padding:'13px'}}>
              <View style={{border:'1px solid gray'}}>
                <View style={{border:'1px solid gray', backgroundColor:'green', textAlign:'center', display:'flex', flexDirection:'row', justifyContent:'center'}}>
                  <Text style={{color:'white', textAlign:'center', fontSize:'10px', width:'100px', padding:'1px'}}>RENTABILIDAD</Text>
                  <Text style={{color:'white', textAlign:'center', fontSize:'10px', width:'100px', padding:'1px'}}>B/C</Text>
                </View>
                <View style={{textAlign:'center', padding:'3px', display:'flex', flexDirection:'row', justifyContent:'center'}}>
                  <Text style={{textAlign:'center', color:cosBen.rentabilidad>=0?'green':'red', fontSize:'11px', width:'100px'}}>
                    {CurrencyFormatter({
                      currency: 'MXN',
                      value: cosBen.rentabilidad?? 0
                    })}
                  </Text>
                  <Text style={{textAlign:'center', color:cosBen.costobeneficio>=1?'green':'red', fontSize:'11px', width:'100px'}}>
                    {cosBen.costobeneficio?.toFixed(2)}
                  </Text>
                </View>
              </View>

              <View style={{marginTop:'5px', display:'flex', flexDirection:'row', justifyContent:'flex-end', alignItems:'center', gap:'3px'}}>
                <Text style={{fontSize:'10px'}}>Costos totales: </Text>
                <Text style={{fontSize:'10px', color:'red'}}>{CurrencyFormatter({
                  currency: 'MXN',
                  value: costTot.totalCost?? 0
                })}</Text>
              </View>
              <View style={{marginTop:'5px', display:'flex', flexDirection:'row', justifyContent:'flex-end', alignItems:'center', gap:'3px'}}>
                <Text style={{fontSize:'10px'}}>Beneficios totales: </Text>
                <Text style={{fontSize:'10px', color:'green'}}>{CurrencyFormatter({
                  currency: 'MXN',
                  value: benTot.fullyCharged?? 0
                })}</Text>
              </View>
            </View>
          </View>

          <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', marginTop: '10px', margin: '3px'}}>
            <Text style={{flex: 1, fontSize: '7px', padding: '2px', borderBottom: '1px solid black', fontWeight: 'bold'}}>Proyecto</Text>
            <Text style={{flex: 1, fontSize: '7px', padding: '2px', borderBottom: '1px solid black', fontWeight: 'bold'}}>Fecha</Text>
            <Text style={{flex: 1, fontSize: '7px', padding: '2px', borderBottom: '1px solid black', fontWeight: 'bold'}}>Costos totales</Text>
            <Text style={{flex: 1, fontSize: '7px', padding: '2px', borderBottom: '1px solid black', fontWeight: 'bold'}}>Beneficios totales</Text>
            <Text style={{flex: 1, fontSize: '7px', padding: '2px', borderBottom: '1px solid black', fontWeight: 'bold'}}>Ganancia </Text>
            <Text style={{flex: 1, fontSize: '7px', padding: '2px', borderBottom: '1px solid black', fontWeight: 'bold'}}>Relacion costo-beneficio (B/C) </Text>
          </View>

          {orderProjects.map((c) => (
            <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', marginTop: '10px', margin: '3px'}} key={c.project}>
              <Text style={{flex: 1, fontSize: '7px', padding: '2px', borderBottom: '0.2px solid gray', fontWeight: 'bold'}}>{c.project}</Text>
              <Text style={{flex: 1, fontSize: '7px', padding: '2px', borderBottom: '0.2px solid gray', fontWeight: 'bold'}}>{c.date?.substring(0, 10)?? ''}</Text>
              <Text style={{flex: 1, fontSize: '7px', padding: '2px', borderBottom: '0.2px solid gray', fontWeight: 'bold'}}>{CurrencyFormatter({
                currency: 'MXN',
                value: c.totalCost || 0
              })}</Text>
              <Text style={{flex: 1, fontSize: '7px', padding: '2px', borderBottom: '0.2px solid gray', fontWeight: 'bold'}}>{CurrencyFormatter({
                currency: 'MXN',
                value: c.fullyCharged || 0
              })}</Text>
              <Text style={{flex: 1, fontSize: '7px', padding: '2px', borderBottom: '0.2px solid gray', fontWeight: 'bold'}}>{CurrencyFormatter({
                currency: 'MXN',
                value: c.rentabilidad || 0
              })} </Text>
              <Text style={{flex: 1, fontSize: '7px', padding: '2px', borderBottom: '0.2px solid gray', fontWeight: 'bold', color: c.costobeneficio>=1? 'green':'red'}}>{c.costobeneficio}</Text>
            </View>
          ))}

        </View>
      </Page>
    </Document>
  )
}
