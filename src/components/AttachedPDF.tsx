import {Document, Page, Text, Image, View, StyleSheet} from '@react-pdf/renderer'
import { Report } from '@/interfaces/Reports'
import { CurrencyFormatter } from '@/app/functions/Globals'

export default function AttachedPDF({report} :{report:Report}){
  
  const months = ['ENERO', 'FEBRERO', 'MARZO', 'ABRIL', 'MARZO', 'JUNIO', 'JULIO', 'AGOSTO', 'SEPTIEMBRE', 'OCTUBRE', 'NOVIEMBRE', 'DICIEMBRE'];
  const date = new Date(report.date);

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
          <View style={{justifyContent: 'center', marginTop: '10px'}}>
            <Image src={'/Palaciosconstrucciones_horizontal.png'} style={{width: '170px'}}></Image>
          </View>
          <Text style={{fontSize: '20px', textAlign: 'center', fontWeight: 'bold'}}>(FF ANEXO I)</Text>
          <Text style={{fontSize: '15px', textAlign: 'center', fontWeight: 'semibold'}}> OFICIO DE ENTREGA </Text>
          <View style={[style.textFlex, {justifyContent: 'flex-end', marginTop: '18px'}]}>
            <Text>SAN LUIS POTOSI S.L.P. </Text>
            <Text style={style.textBlue}>a {date.getDate()} DE {months[date.getMonth()]} DE {date.getFullYear()}</Text>
          </View>
          {/* <Text style={{fontSize: '11px', marginTop: '18px'}}>C. DIANA CAMACHO PALACIOS</Text> */}
          <Text style={{fontSize: '11px', marginTop: '18px'}}>C. {process.env.NEXT_PUBLIC_ADMINISTRATION_USER}</Text>
          <Text style={{fontSize: '11px'}}>DEPARTAMENTO DE ADMINISTRACION</Text>
          <View style={style.textFlex}>
            <Text>EMPRESA</Text>
            <Text style={style.textBlue}> {report.company.name}</Text>
          </View>
          <Text style={{fontSize: '11px'}}>PRESENTE:</Text>

          <View style={style.paragraph}>
            <Text>POR MEDIO DE LA PRESENTE, HAGO ENTREGA DE LAS COMPROBACIONES DEL FONDO FIJO
              QUE TENGO BAJO MI RESGUARDO COMO ENCARGADO DEL AREA DE  
              <Text style={style.textBlue}> {report.department.name}</Text>
              <Text> DE LA EMPRESA </Text>
              <Text style={style.textBlue}>{report.company.name}</Text>
              <Text> ( EL IMPORTE TOTAL COMPROBADO DE MI FONDO FIJO ES DE </Text>
              <Text style={style.textRed}>{CurrencyFormatter({
                  currency: 'MXN',
                  value: report.total
                })} </Text>
              <Text> ) </Text>
            </Text>
          </View>

          <View style={style.paragraph}>
            <Text>INGRESE A PLANNER LOS COMPROBANTES POR LA CANTIDAD MENCIONADA Y AL MISMO 
                TIEMPO SOLICITO ME SEA REPUESTO EL IMPORTE POR LA CANTIDAD DE: 
              <Text style={style.textBlue}> {CurrencyFormatter({
                  currency: 'MXN',
                  value: report.total
                })} </Text>
              <Text> QUE SE REFIERE A GASTOS REALIZADOS DURANTE EL PERIODO COMPRENDIDO DEL </Text>
              <Text style={style.textBlue}>DIA 23 al 25 DE MAYO DEL AÑO 2024.</Text>
            </Text>
          </View>

          <View style={style.paragraph}>
            <Text>SIRVA EL PRESENTE ESCRITO PARA FORMALIZAR EL CIERRE PARA LA COMPROBACION DE
                GASTOS EFECTUADOS EN OPERACIONES DEL PROYECTO DE
                <Text style={style.textBlue}> {report.project.title}</Text>
                <Text> A FAVOR DE LA EMPRESA </Text>
                <Text style={style.textBlue}>PALACIOS CONSTRUCCIONES</Text>
                <Text> Y QUE FUI ASIGNADO PARA REALIZAR LAS SIGUIENTES ACTIVIDADES: </Text>
            </Text>
          </View>

          <View style={style.container}>
            <Text style={style.textBlue}>{report.comment}</Text>
          </View>

          <View style={style.paragraph}>
            <Text>NO HABIENDO MAS QUE INFORMAR Y EN EL ENTENDIDO QUE TENGO CLARO LOS EFECTOS
                QUE PUDIERAN GENERARSE POR FALTA DE RECTITUD Y HONRADEZ DE MI PARTE COMO 
                ENCARGADO DEL FONDO FIJO Y CUMPLIENDO LAS POLITICAS DE FONDO FIJO DE LA 
                EMPRESA
              <Text style={style.textBlue}> {report.company.name}.</Text>
            </Text>
          </View>
          
          <Text style={{fontSize: '11px', marginTop: '20px'}}>ME DESPIDO DE USTED, QUEDANDO A SUS ORDENES PARA CUALQUIER ACLARACION</Text>
          <Text style={{fontSize: '11px', marginTop: '20px'}}>ATENTAMENTE</Text>

          <View style={{display:'flex', flexDirection: 'row', gap: '10px', marginTop: '40px', fontSize: '11px', justifyContent: 'space-between'}}>
            <View style={{borderTop: '1px solid black'}}>
              <Text>NOMBRE: 
                <Text style={style.textBlue}>{report.user.name}</Text>
              </Text>

              <Text>CARGO:  
                <Text style={style.textBlue}>{report.department.name}</Text>
              </Text>
            </View>

            <View style={{borderTop: '1px solid black', paddingLeft: '30px'}}>
              <Text>AUTORIZA DIRECCION </Text>
            </View>
          </View>

          <View style={{display:'flex', flexDirection: 'row', gap: '10px', fontSize: '11px', marginTop: '40px', alignItems: 'flex-end'}}>
            <Text>FIRMA DE RECIBIDO </Text>
            <View style={{borderBottom: '1px solid black', width: '175px'}}></View>
            <Text>FOLIO</Text>
            <View style={{width: '175px', borderBottom: '1px solid gray'}}>
              <Text style={[style.textRed, {fontSize: '15px'}]}> {report.account}</Text>
            </View>
          </View>
          <Text style={{fontSize: '11px'}}>DEPARTAMENTO DE ADMINISTRACION</Text>

        </View>
      </Page>
    </Document>
  )
}