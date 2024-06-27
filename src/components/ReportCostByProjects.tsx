import {Document, Page, Text, View, StyleSheet, Image} from '@react-pdf/renderer'
import { CurrencyFormatter } from '@/app/functions/Globals'

export default function ReportCostByProjects(){
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
  
  return(
    <Document>
      <Page>
        <View style={{padding: '7px'}}>
          <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems:'center'}} >
            <Image src={'/Palaciosconstrucciones_horizontal.png'} style={{width: '130px'}} />
            <View style={{textAlign: 'right', display: 'flex', alignItems: 'flex-end'}} >
              <Text style={[style.subTitle, {textAlign:'right'}]}>Resumen de costos por obras</Text>
              <Text style={[style.subTitle, {textAlign:'right'}]}>Del dia 01 al 31 de mayo 2024</Text>
              <Text style={[style.subTitle, {textAlign:'right'}]}>San luis Potosi, S.L.P. a 03 de junio de 2024</Text>
            </View>
          </View>
          
          <View style={style.containerTable}>
            <View style={style.table}>
              <View style={[style.header, {flex: 1}]}><Text style={{fontWeight: 'bold'}}>Obra</Text></View>
              <View style={[style.header, {flex: 1}]}><Text>Tipo</Text></View>
              <View style={[style.header, {flex: 1}]}><Text>Monto de obra</Text></View>
              <View style={[style.header, {flex: 1}]}><Text>Total</Text></View>
              <View style={[style.header, {flex: 1}]}><Text>Acumulado</Text></View>
              <View style={[style.header, {flex: 1}]}><Text>Porcentaje %</Text></View>
            </View>
            {costs.map((cost, index:number) => (
              <View style={style.table} key={index}>
                <View style={[style.element, {flex: 1}, {fontWeight: 'bold'}]}><Text style={{fontWeight: 'bold'}}>{cost.project}</Text></View>
                <View style={[style.element, {flex: 1}]}><Text>{cost.type}</Text></View>
                <View style={[style.element, {flex: 1}]}><Text>{CurrencyFormatter({
                  currency: 'MXN',
                  value: cost.amount
                })}</Text></View>
                <View style={[style.element, {flex: 1}]}><Text>{CurrencyFormatter({
                  currency: 'MXN',
                  value: cost.total
                })}</Text></View>
                <View style={[style.element, {flex: 1}]}>
                  <Text>{CurrencyFormatter({
                      currency: 'MXN',
                      value: cost.accumulated
                    })}</Text>
                </View>
                <View style={[style.element, {flex: 1}]}><Text>{cost.percentage}</Text></View>
              </View>
            ) )}
          </View>
        </View>
      </Page>
    </Document>
  )
}

export interface CostByProjects{
  project: string,
  type: string,
  amount: number,
  total: number,
  accumulated: number,
  percentage: number,
}

const costs: CostByProjects[] = [{
    project: 'BMW 2024',
    type: 'MO',
    amount: 847613.71,
    total: 37035.19,
    accumulated: 142492.59,
    percentage: 37.035
  }, 
  {
    project: 'BMW PEASA',
    type: 'F',
    amount: 22042.71,
    total: 49000.19,
    accumulated: 4905.32,
    percentage: 4.9
  },
  {
    project: 'BUENAVISTA',
    type: 'MO',
    amount: 25000.71,
    total: 43035.19,
    accumulated: 43504.59,
    percentage: 17.035
  }
]