import {Document, Page, Text, View, StyleSheet, Image} from '@react-pdf/renderer'
import { CurrencyFormatter } from '@/app/functions/Globals'
import { CostsByConceptAndCategory } from '@/interfaces/DashboardsCosts';
import { DateRangePickerValue } from '@tremor/react';
import { Company } from "@/interfaces/Companies"

export default function ReportCostsCategoryAndConceptPDF({data, type, endDate, startDate, projectTitle, satCompany}: 
  {data: CostsByConceptAndCategory[], type:boolean, startDate: string, endDate: string, projectTitle:string, satCompany:Company}) {
  
  const style = StyleSheet.create({
    table: {
      display: 'flex',
      flexDirection: 'row',
      margin: '3px'
    },
    containerTable: {
      paddingVertical: '10px',
      borderBottom: '1px solid gray',
    },
    header: {
      fontSize: '8px',
      padding: '2px',
      borderBottom: '1px solid black',
      fontWeight: 'bold'
    },
    element: {
      fontSize: '8px',
      padding: '4px',
    },
    subTitle: {
      fontSize: '8px',
      textAlign: 'right',
      margin: '1px',
      color: 'black',
    },
  })

  const totalCosts = data.reduce((acc, curr) => acc + curr.totalCost, 0);
  // const totalCosts = data.reduce((acc, curr) => acc + curr.subtotalCost, 0);

  const months = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
  const currentDate = new Date();

  const [yearS, monthS, dayS] = startDate.split('-');
  const [yearE, monthE, dayE] = endDate.split('-');
  
  return(
    <Document>
      <Page>
        <View style={{paddingVertical: '30px', paddingLeft: '30px'}}>
          <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}} >
            {/* <Image src={'/Palaciosconstrucciones_horizontal.png'} style={{width: '130px'}} /> */}
            <Image src={satCompany?.isologo?? satCompany.logo} style={{width: '130px'}} />
            <View style={{margin:'0px'}}>
              <Text style={[{fontSize: '13px', margin: '1px', color: 'black', fontWeight:'semibold'}]}>
                Costos por {type? 'categorias':'conceptos'}
              </Text>
              <Text style={[{fontSize: '13px', margin: '1px', color: 'black', fontWeight:'semibold'}]}>
                {projectTitle}
              </Text>
            </View>
            <View style={{textAlign: 'right', display: 'flex', alignItems: 'flex-end'}} >
              {/* <Text style={[style.subTitle, {textAlign:'right', marginTop:'17px'}]}>
                Del {rangeDate.from?.getDate()} de {months[rangeDate.from?.getMonth() || 0]} de {rangeDate.from?.getFullYear()} {' '}  al {rangeDate.to?.getDate()} de {months[rangeDate.to?.getMonth() || 0]} de {rangeDate.to?.getFullYear()}  
              </Text> */}
              <Text style={[style.subTitle, {textAlign:'right', marginTop:'17px'}]}>
                Del {dayS} de {months[Number(monthS) - 1]} de {yearS}
                {' '}
                al {dayE} de {months[Number(monthE) - 1]} de {yearE}
              </Text>
              <Text style={[style.subTitle, {textAlign:'right'}]}>
              {currentDate.getDate()} de {months[currentDate.getMonth() || 0]} de {currentDate.getFullYear()}
              </Text>
              <Text style={[style.subTitle, {textAlign:'right'}]}>
              {CurrencyFormatter({
                  currency: 'USD',
                  value: totalCosts
                })}
              </Text>
            </View>
          </View>
          
          <View style={style.containerTable}>
            <View style={style.table}>
              {type? 
                <View style={[style.header, {flex: 1}]}><Text style={{fontWeight: 'bold'}}>Categoria</Text></View>: 
                <View style={[style.header, {flex: 1}]}><Text>Concepto</Text></View>
              }
              <View style={[style.header, {flex: 1}]}><Text>Cuenta</Text></View>
              <View style={[style.header, {flex: 1}]}><Text>Total</Text></View>
            </View>
            {data.map((cost, index:number) => (
              <View style={[style.table, {borderTop: '1px solid gray'}]} key={index}>
                {type? 
                  <View style={[style.element, {flex: 1}]}><Text >{cost.costocenter.category}</Text></View>:
                  <View style={[style.element, {flex: 1}]}><Text >{cost.costocenter.concept}</Text></View>
                }
                <View style={[style.element, {flex: 1}]}><Text >{cost.costocenter.account}</Text></View>
                <View style={[style.element, {flex: 1}]}><Text>{CurrencyFormatter({
                  currency: 'USD',
                  value: cost.totalCost
                  // value: cost.subtotalCost
                })}</Text></View>                
              </View>
            ) )}
          </View>
        </View>
      </Page>
    </Document>
  )
}