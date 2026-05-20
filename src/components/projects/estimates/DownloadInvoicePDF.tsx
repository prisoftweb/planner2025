import { IInvoiceByDateAndConditionMin } from "@/interfaces/Invoices"
import {Document, Page, Text, Image, View} from '@react-pdf/renderer'
import { CurrencyFormatter } from '@/app/functions/Globals'

export default function DownloadInvoicePDF({}: 
  {}) {

  // const orderInvoices = invoices.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  // const total = invoices.reduce((acc, item) => acc + item.cost.total, 0);
  // const vat = invoices.reduce((acc, item) => acc + item.cost.iva, 0);
  // const subtotal = invoices.reduce((acc, item) => acc + item.cost.subtotal, 0);

  // const months=['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];

  return(
    <Document>
      <Page>
        <View style={{padding: '15px', marginTop: '15px'}}>

          <View style={{display: 'flex', flexDirection: 'row', gap:'5px', justifyContent: 'space-between'}}>

            <View>
              <Text style={{fontSize:'15px', color:'black', fontWeight:'extrabold'}}>Peasa</Text>
              <Text style={{fontSize:'11px', color:'gray', marginTop:'2px'}}>Grupo constructor peasa</Text>
              <Text style={{fontSize:'11px', color:'gray'}}>PEA900JHG</Text>
              <Text style={{fontSize:'11px', color:'gray'}}>601- General de ley</Text>
              <Text style={{fontSize:'11px', color:'gray'}}>Codigo postal 20290</Text>

              <Text style={{fontSize:'11px', color:'black', fontWeight:'extrabold', marginTop:'2px'}}>Proyecto: Edscha</Text>
            </View>

            <View style={{display:'flex', flexDirection:'row'}}>
              <View style={{display:'flex', flexDirection:'column', alignItems:'center', gap:'5px'}}>
                
                <Text style={{fontSize:'15px', color:'black', fontWeight:'extrabold'}}>Palacios construcciones</Text>
                
                <Text style={{fontSize:'11px', color:'gray', marginTop:'2px'}}>Samuel Palacios Hernandez</Text>
                <Text style={{fontSize:'11px', color:'gray'}}>PAHS7610243</Text>
                <Text style={{fontSize:'11px', color:'gray'}}>612-Personas fisicas</Text>
                <Text style={{fontSize:'11px', color:'gray'}}>Lugar de expedicion 78377</Text>
              </View>

              <Image source={'/Palaciosconstrucciones-isologo.png'} style={{height: '57px', width:'auto'}}></Image>

            </View>

          </View>

          <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', marginTop: '10px', margin: '3px'}}>
            <Text style={{flex: 1, fontSize: '7px', padding: '2px', borderBottom: '1px solid black', fontWeight: 'bold'}}>Folio</Text>
            <Text style={{flex: 1, fontSize: '7px', padding: '2px', borderBottom: '1px solid black', fontWeight: 'bold'}}>Fecha</Text>
            <Text style={{flex: 1, fontSize: '7px', padding: '2px', borderBottom: '1px solid black', fontWeight: 'bold'}}>Metodo|Forma de pago</Text>
            <Text style={{flex: 1, fontSize: '7px', padding: '2px', borderBottom: '1px solid black', fontWeight: 'bold'}}>Proyecto </Text>
            <Text style={{flex: 1, fontSize: '7px', padding: '2px', borderBottom: '1px solid black', fontWeight: 'bold'}}>Condicion</Text>
            <Text style={{flex: 1, fontSize: '7px', padding: '2px', borderBottom: '1px solid black', fontWeight: 'bold'}}>Monto</Text>
            <Text style={{flex: 1, fontSize: '7px', padding: '2px', borderBottom: '1px solid black', fontWeight: 'bold'}}>Cobrado</Text>
            <Text style={{flex: 1, fontSize: '7px', padding: '2px', borderBottom: '1px solid black', fontWeight: 'bold'}}>Pendiente</Text>
          </View>

        </View>
      </Page>
    </Document>
  )
}
