import {Document, Page, Text, Image, View, StyleSheet} from '@react-pdf/renderer'
import { Report, DateReport } from '@/interfaces/Reports'
import { CurrencyFormatter } from '@/app/functions/Globals'
import { ResumenEstimateProject } from '@/interfaces/Estimate';
import { OneProjectMin } from '@/interfaces/Projects';

export default function DetailEstimatePDF({resumenEstimate, project}:
    {resumenEstimate: ResumenEstimateProject, project:OneProjectMin}){
  
  // const months = ['ENERO', 'FEBRERO', 'MARZO', 'ABRIL', 'MARZO', 'JUNIO', 'JULIO', 'AGOSTO', 'SEPTIEMBRE', 'OCTUBRE', 'NOVIEMBRE', 'DICIEMBRE'];
  // const date = new Date(report.date);

  // const dateIni = dates[0]?.minDate? new Date(dates[0].minDate): new Date();
  // const dateEnd = dates[0]?.maxDate? new Date(dates[0].maxDate): new Date();

  // const bandMonth = dateIni.getMonth() === dateEnd.getMonth()

  const style = StyleSheet.create({
    textBlue: {
      color: 'blue',
      fontSize: '11px',
      textDecoration: 'underline',
    },
    textRed: {
      color: 'red',
      fontSize: '11px',
      textDecoration: 'underline',
    },
    paragraph: {
      marginTop: '18px',
      display: 'flex',
      flexDirection: 'row',
      fontSize: '11px',
      gap: '5px',
      textAlign: 'justify',
      lineHeight: '1.5px'
    },
    container: {
      border: '1px solid gray',
      padding: '5px',
      fontSize: '11px',
      marginTop: '18px'
    },
    textFlex: {
      display: 'flex',
      flexDirection: 'row',
      fontSize: '11px',
    }
  })
  
  return(
    <Document>
      <Page>
        <View style={{padding: '15px'}}>
          {/* <View style={{justifyContent: 'center', marginTop: '10px'}}>
            <Image src={'/Palaciosconstrucciones_horizontal.png'} style={{width: '170px'}}></Image>
          </View>
          <Text style={{fontSize: '20px', textAlign: 'center', fontWeight: 'bold'}}>(FF ANEXO I)</Text>
          <Text style={{fontSize: '15px', textAlign: 'center', fontWeight: 'semibold'}}> OFICIO DE ENTREGA </Text>
          <View style={[style.textFlex, {justifyContent: 'flex-end', marginTop: '18px'}]}>
            <Text>SAN LUIS POTOSI S.L.P. </Text>
            <Text style={style.textBlue}>a {date.getDate()} DE {months[date.getMonth()]} DE {date.getFullYear()}</Text>
          </View> */}

          <View>
            <Text>CONTRATO</Text>
            <View style={{display:"flex", flexDirection:"row", justifyContent:"space-around"}}>
              <Text>Monto de contrato</Text>
              <Text>{CurrencyFormatter({
                  currency: "MXN",
                  value: project.amount
                })}
              </Text>
            </View>
            <View style={{display:"flex", flexDirection:"row", justifyContent:"space-around"}}>
              <Text>Estimado anterior</Text>
              <Text>{CurrencyFormatter({
                  currency: "MXN",
                  value: resumenEstimate.totalPrevious?.estimatedTotal || 0
                })}
              </Text>
            </View>

          </View>

        </View>
      </Page>
    </Document>
  )
}