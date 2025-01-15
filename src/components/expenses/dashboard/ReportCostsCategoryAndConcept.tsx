import {Document, Page, Text, View, StyleSheet, Image} from '@react-pdf/renderer'
import { CurrencyFormatter } from '@/app/functions/Globals'
// import { ReportCostsByProjectOnly } from '@/interfaces/ReportsOfCosts';
import { CostsByConceptAndCategory } from '@/interfaces/DashboardsCosts';

export default function ReportCostsCategoryAndConceptPDF({data}: {data: CostsByConceptAndCategory[]}){
  
  const style = StyleSheet.create({
    table: {
      display: 'flex',
      flexDirection: 'row',
      margin: '3px'
    },
    containerTable: {
      paddingVertical: '10px',
      borderBottom: '1px solid gray',
      //borderTop: '1px solid gray'
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

  const months = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
  const date = new Date();
  // let total = 0;
  // reports.map((cost) => {
  //   total += cost.totalCost;
  // });
  return(
    <Document>
      <Page>
        {/* <View style={{padding: '30px'}}> */}
        <View style={{paddingVertical: '30px', paddingLeft: '30px'}}>
          <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems:'center'}} >
            <Image src={'/Palaciosconstrucciones_horizontal.png'} style={{width: '130px'}} />
            <View style={{textAlign: 'right', display: 'flex', alignItems: 'flex-end'}} >
              {/* <Text style={[style.subTitle, {textAlign:'right'}]}>Detalle de costo agrupado por proyectos</Text> */}
              {/* <Text style={[style.subTitle, {textAlign:'right'}]}>Del dia 01 al 30 de junio 2024</Text> */}
              <Text style={[style.subTitle, {textAlign:'right'}]}>San luis Potosi, S.L.P. a {date.getDate()} de {months[date.getMonth()]} de {date.getFullYear()}</Text>
            </View>
          </View>
          
          <View style={style.containerTable}>
            <View style={style.table}>
              <View style={[style.header, {flex: 1}]}><Text style={{fontWeight: 'bold'}}>Categoria</Text></View>
              <View style={[style.header, {flex: 1}]}><Text>Concepto</Text></View>
              <View style={[style.header, {flex: 1}]}><Text>Cuenta</Text></View>
              <View style={[style.header, {flex: 1}]}><Text>Total</Text></View>
            </View>
            {data.map((cost, index:number) => (
              <View style={[style.table, {borderTop: '1px solid gray'}]} key={index}>
                <View style={[style.element, {flex: 1}]}><Text >{cost.costocenter.category}</Text></View>
                <View style={[style.element, {flex: 1}]}><Text >{cost.costocenter.concept}</Text></View>
                <View style={[style.element, {flex: 1}]}><Text >{'cuenta'}</Text></View>
                <View style={[style.element, {flex: 1}]}><Text>{CurrencyFormatter({
                  currency: 'MXN',
                  value: cost.totalCost
                })}</Text></View>                
              </View>
            ) )}
          </View>
          {/* <View> <Text style={{marginTop: '7px', fontSize: '14px'}}> Total acumulado:  {CurrencyFormatter({
                  currency: 'MXN',
                  value: Number(total.toFixed(2))
                })} </Text> </View> */}
        </View>
      </Page>
    </Document>
  )
}