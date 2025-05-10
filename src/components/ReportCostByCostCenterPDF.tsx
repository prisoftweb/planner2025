import {Document, Page, Text, View, StyleSheet, Image} from '@react-pdf/renderer'
import { CurrencyFormatter } from '@/app/functions/Globals'

export default function ReportCostByCostCenterPDF(){
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
      fontSize: '10px',
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
            <View style={{textAlign: 'right'}} >
              <Text style={[style.subTitle, {textAlign:'right'}]}>Detalle de costo agrupado por centro de costos</Text>
              <Text style={[style.subTitle, {textAlign:'right'}]}>Del dia 01 al 31 de mayo 2024</Text>
              <Text style={[style.subTitle, {textAlign:'right'}]}>San luis Potosi, S.L.P. a 03 de junio de 2024</Text>
            </View>
          </View>
          
          <View style={style.containerTable}>
            <View style={style.table}>
            <View style={[style.header, {flex: 1}]}><Text style={{fontWeight: 'bold'}}>Deducible</Text></View>
            <View style={[style.header, {flex: 1}]}><Text>Clave Obra</Text></View>
              <View style={[style.header, {flex: 1}]}><Text>Obra</Text></View>
              <View style={[style.header, {flex: 1}]}><Text>Concepto</Text></View>
              <View style={[style.header, {flex: 1}]}><Text>Cuenta</Text></View>
              <View style={[style.header, {flex: 1}]}><Text>Total</Text></View>
              <View style={[style.header, {flex: 1}]}><Text>Cuantos</Text></View>
            </View>
            {costs.map((cost, index:number) => (
              <View style={style.table} key={index}>
                <View style={[style.element, {flex: 1}, {fontWeight: 'bold'}]}><Text style={{fontWeight: 'bold'}}>{cost.deductible}</Text></View>
                <View style={[style.element, {flex: 1}]}><Text>{cost.claveProject}</Text></View>
                <View style={[style.element, {flex: 1}]}><Text>{cost.project}</Text></View>
                <View style={[style.element, {flex: 1}]}><Text>{cost.concept}</Text></View>
                <View style={[style.element, {flex: 1}]}><Text>{cost.account}</Text></View>
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
              </View>
            ) )}
          </View>
        </View>
      </Page>
    </Document>
  )
}

export interface CostByCostCenter{
  deductible: string,
  claveProject: string,
  project: string,
  concept: string,
  account: string,
  total: number,
  accumulated: number,
}

const costs: CostByCostCenter[] = [{
    project: 'AMADO NERVO 996',
    deductible: 'F',
    total: 2499.00,
    accumulated: 1,
    account: '502-01-000',
    claveProject: 'AMADONERVO',
    concept: 'MATERIALES, PINTURA'
  }, 
  {
    project: 'BMW 2024',
    deductible: 'F',
    total: 2499.00,
    accumulated: 2,
    account: '601-01-000',
    claveProject: 'BMW 2024',
    concept: 'CONSUMIBLES, COMBUSTIBLES Y LUBRICANTES'
  },
  {
    project: 'BMW PEASA 2024',
    deductible: 'F',
    total: 2499.00,
    accumulated: 1,
    account: '502-01-000',
    claveProject: 'BMW PEASA 2024',
    concept: 'MATERIALES, MATERIALES DIRECTOS'
  }
]