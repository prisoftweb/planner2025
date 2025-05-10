import {Document, Page, Text, View, StyleSheet, Image} from '@react-pdf/renderer'
import { Report, CostReport } from '@/interfaces/Reports'
import { CurrencyFormatter } from '@/app/functions/Globals'

export default function ReportPDF({report, costs}: 
  {report: Report, costs: CostReport[]}){
  
  const style = StyleSheet.create({
    table: {
      display: 'flex',
      flexDirection: 'row',
      margin: '3px'
    },
    containerTable: {
      paddingVertical: '10px',
      borderBottom: '1px solid gray',
      borderTop: '1px solid gray'
    },
    header: {
      fontSize: '8px',
      padding: '2px',
      borderBottom: '1px solid black',
    },
    element: {
      fontSize: '8px',
      padding: '4px',
    },
    title: {
      fontSize: '20px',
      textAlign: 'center',
      margin: '5px',
      color: '#056FBA',
    },
    subTitle: {
      fontSize: '15px',
      textAlign: 'center',
      margin: '2px',
      color: '#056FBA',
    },
    date: {
      color: '#6C7175',
      textAlign: 'right',
      margin: '2px'
    },
    inLineText: {
      display: 'flex',
      flexDirection: 'row',
      gap: '2px',
      fontSize: '10px',
      alignItems: 'center'
    },
    headerPage: {
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: '5px',
    },
    containerData: {
      marginTop: '3px',
      paddingTop: '9px',
      paddingBottom: '3px',
      border: '1px solid gray',
    },
    textLeft: {
      width: '30%',
      textAlign: 'right',
      margin: '2px',
    }, 
    textRight: {
      width: '30%',
      textAlign: 'left',
      margin: '2px',
    },
    chip: {
      borderRadius: '30px',
      backgroundColor: '#056FBA',
      color: 'white',
      padding: '3px',
      width: '150px',
    }
  })

  let totalAllCosts = 0;
  costs.map((c) => {
    totalAllCosts += c.costo.total;
  });
  
  return(
    <Document>
      <Page>
        <View style={style.headerPage}>
          <Image src={'/isologo_palacios.png'} style={{width: '40px'}} />
          <Text style={style.subTitle}>Informe de gastos</Text>
          <Text style={style.title}>{report.name}</Text>
        </View>

        <View style={style.containerData}>
          <View style={style.inLineText}>
            <Text style={style.textLeft}>Numero de informe:</Text>
            <Text style={style.textRight}>{report.account}</Text>
          </View>
          <View style={style.inLineText}>
            <Text style={style.textLeft}>Importe del informe:</Text>
            <Text style={style.textRight}>{CurrencyFormatter({
              currency: 'MXN',
              value: totalAllCosts
            })}</Text>
          </View>
          <View style={style.inLineText}>
            <Text style={style.textLeft}>Nombre del empleado:</Text>
            <Text style={style.textRight}>{report.user.name}</Text>
          </View>
          <View style={style.inLineText}>
            <Text style={style.textLeft}>Fecha de creacion:</Text>
            <Text style={style.textRight}>{report.date.substring(0, 10)}</Text>
          </View>
          <View style={style.inLineText}>
            <Text style={style.textLeft}>Fecha:</Text>
            <Text style={style.textRight}>{report.date.substring(0, 10)}</Text>
          </View>
          <View style={style.inLineText}>
            <Text style={style.textLeft}>Estado del informe: </Text>
            <View style={[{ textAlign: 'center', margin: '2px', }, style.chip]}>
              <Text>{report.moves[report.moves.length -1].condition.name}</Text>
            </View>
          </View>
          <View style={style.inLineText}>
            <Text style={style.textLeft}>Empresa:</Text>
            <Text style={style.textRight}>{report.company.name}</Text>
          </View>
          <View style={style.inLineText}>
            <Text style={style.textLeft}>Proyecto:</Text>
            <Text style={style.textRight}>{report.project.title}</Text>
          </View>
          <View style={style.inLineText}>
            <Text style={style.textLeft}>Departamento:</Text>
            <Text style={style.textRight}>{report.department.name}</Text>
          </View>
        </View>
        
        <View style={style.containerTable}>
          <View style={style.table}>
            <View style={[style.header, {flex: 1}]}><Text>#</Text></View>
            <View style={[style.header, {flex: 3}]}><Text>PROYECTO</Text></View>
            <View style={[style.header, {flex: 4}]}><Text>CENTRO DE COSTO</Text></View>
            <View style={[style.header, {flex: 4}]}><Text>PROVEEDOR</Text></View>
            <View style={[style.header, {flex: 5}]}><Text>DESCRIPCION</Text></View>
            <View style={[style.header, {flex: 3}]}><Text>TOTAL</Text></View>
            <View style={[style.header, {flex: 3}]}><Text>FECHA</Text></View>
          </View>
          {costs.map((cost, index:number) => (
            <View style={style.table} key={cost._id}>
              <View style={[style.element, {flex: 1}]}><Text>{index + 1}</Text></View>
              <View style={[style.element, {flex: 3}]}><Text>{cost.project?.title}</Text></View>
              <View style={[style.element, {flex: 4}]}><Text>{cost.costocenter.concept.name + ' ( ' + cost.costocenter.category + ' )' }</Text></View>
              <View style={[style.element, {flex: 4}]}><Text>{cost.provider.name}</Text></View>
              <View style={[style.element, {flex: 5}]}><Text>{cost.description}</Text></View>
              <View style={[style.element, {flex: 3}]}>
                <Text>{CurrencyFormatter({
                    currency: 'MXN',
                    value: (cost.costo.total) || 0
                  })}</Text>
              </View>
              <View style={[style.element, {flex: 3}]}><Text>{cost.date.substring(0, 10)}</Text></View>
            </View>
          ) )}
        </View>
      </Page>
    </Document>
  )
}
