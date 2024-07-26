import {Document, Page, Text, View, StyleSheet, Image} from '@react-pdf/renderer'
import { CurrencyFormatter } from '@/app/functions/Globals'
import { Expense } from '@/interfaces/Expenses'

export default function ReportCostsByFilter({costs}: {costs:Expense[]}){
  
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
      fontSize: '7px',
      padding: '2px',
      borderBottom: '1px solid black',
      fontWeight: 'bold'
    },
    element: {
      fontSize: '7px',
      padding: '4px',
    },
    subTitle: {
      fontSize: '8px',
      textAlign: 'right',
      margin: '1px',
      color: 'black',
    },
  })

  let totalTypes: number = 0;
  let totalCosts: number = 0;
  let totalIva: number = 0;
  costs.map((cost) => {
    totalTypes += cost.cost?.total || 0;
    totalCosts += cost.cost?.subtotal || 0;
    totalIva += cost.cost?.iva || 0;
  });

  const months = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
  const date = new Date();
  return(
    <Document>
      <Page>
        {/* <View style={{padding: '30px'}}> */}
        <View style={{paddingVertical: '30px', paddingLeft: '30px'}}>
          <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems:'center'}} >
            <Image src={'/Palaciosconstrucciones_horizontal.png'} style={{width: '130px'}} />
            <View style={{textAlign: 'right', display: 'flex', alignItems: 'flex-end'}} >
              <Text style={[style.subTitle, {textAlign:'right'}]}>Resumen de costos detalle</Text>
              {/* <Text style={[style.subTitle, {textAlign:'right'}]}>Del dia 01 al 30 de junio 2024</Text> */}
              <Text style={[style.subTitle, {textAlign:'right'}]}>San luis Potosi, S.L.P. a {date.getDate()} de {months[date.getMonth()]} de {date.getFullYear()}</Text>
            </View>
          </View>
          
          <View style={style.containerTable}>
            <View style={style.table}>
              <View style={[style.header, {flex: 1}]}><Text style={{fontWeight: 'bold'}}>Obra</Text></View>
              <View style={[style.header, {flex: 1}]}><Text>Informe</Text></View>
              <View style={[style.header, {flex: 1}]}><Text>Centro de costos</Text></View>
              <View style={[style.header, {flex: 2}]}><Text>Descripcion</Text></View>
              <View style={[style.header, {flex: 1}]}><Text>Fecha</Text></View>
              <View style={[style.header, {flex: 1}]}><Text>Importe</Text></View>
              <View style={[style.header, {flex: 1}]}><Text>Total</Text></View>
              {/* <View style={[style.header, {flex: 1}]}><Text>Acumulado</Text></View> */}
            </View>
            {costs.map((cost, index:number) => (
              <View style={[style.table, {borderTop: '1px solid gray'}]} key={index}>
                <View style={[style.element, {flex: 1}, {fontWeight: 'bold'}]}><Text style={{fontWeight: 'bold'}}>{cost.project?.title || ''}</Text></View>
                <View style={[style.element, {flex: 1}]}><Text>{cost.report?.name ?? ''}</Text></View>
                <View style={[style.element, {flex: 1}]}><Text>{cost.costocenter?.concept?.name || ''}</Text></View>
                <View style={[style.element, {flex: 2}]}><Text>{cost.description ?? ''}</Text></View>
                <View style={[style.element, {flex: 1}]}><Text>{cost.date?.substring(0, 10) ?? ''}</Text></View>
                <View style={[style.element, {flex: 1}]}><Text>{CurrencyFormatter({
                  currency: 'MXN',
                  value: cost.cost.subtotal
                })}</Text></View>
                <View style={[style.element, {flex: 1}]}><Text>{CurrencyFormatter({
                  currency: 'MXN',
                  value: cost.cost?.total || 0
                })}</Text></View>
              </View>
            ) )}
            
            <View style={[style.table, {borderTop: '1px solid gray'}]}>
              <View style={[style.element, {flex: 1}]}><Text style={{fontWeight: 'semibold'}}>COSTO</Text></View>
              <View style={[style.element, {flex: 1}]}><Text></Text></View>
              <View style={[style.element, {flex: 1}]}><Text></Text></View>
              <View style={[style.element, {flex: 1}]}><Text style={{fontSize: '14px', fontWeight:'semibold'}}>{CurrencyFormatter({
                currency: 'MXN',
                value: totalCosts
              })}</Text></View>
              <View style={[style.element, {flex: 1}]}><Text></Text></View>
              <View style={[style.element, {flex: 1}]}><Text></Text></View>
            </View>

            <View style={[style.table, {borderTop: '1px solid gray'}]}>
              <View style={[style.element, {flex: 1}]}><Text style={{fontWeight: 'semibold'}}>IVA</Text></View>
              <View style={[style.element, {flex: 1}]}><Text></Text></View>
              <View style={[style.element, {flex: 1}]}><Text></Text></View>
              <View style={[style.element, {flex: 1}]}><Text style={{fontSize: '14px', fontWeight:'semibold'}}>{CurrencyFormatter({
                currency: 'MXN',
                value: totalIva
              })}</Text></View>
              <View style={[style.element, {flex: 1}]}><Text></Text></View>
              <View style={[style.element, {flex: 1}]}><Text></Text></View>
            </View>
            
            <View style={[style.table, {borderTop: '1px solid gray'}]}>
              <View style={[style.element, {flex: 1}]}><Text style={{fontWeight: 'semibold'}}>TOTAL</Text></View>
              <View style={[style.element, {flex: 1}]}><Text></Text></View>
              <View style={[style.element, {flex: 1}]}><Text></Text></View>
              <View style={[style.element, {flex: 1}]}><Text style={{fontSize: '14px', fontWeight:'semibold'}}>{CurrencyFormatter({
                currency: 'MXN',
                value: totalTypes
              })}</Text></View>
              <View style={[style.element, {flex: 1}]}><Text></Text></View>
              <View style={[style.element, {flex: 1}]}><Text></Text></View>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  )
}
