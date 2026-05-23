import { IInvoiceByDateAndConditionMin, IInvoiceMinFull } from "@/interfaces/Invoices"
import {Document, Page, Text, Image, View} from '@react-pdf/renderer'
import { CurrencyFormatter } from '@/app/functions/Globals'
import { IInvoiceFull } from "@/interfaces/Invoices"
import { ISatCompany } from "@/interfaces/SatInvoice"

export default function DownloadInvoicePDF({invoicemin, invoicefull, satCompany}: 
  {invoicemin:IInvoiceMinFull, invoicefull:IInvoiceFull, satCompany:ISatCompany}) {

  // const orderInvoices = invoices.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  // const total = invoices.reduce((acc, item) => acc + item.cost.total, 0);
  // const vat = invoices.reduce((acc, item) => acc + item.cost.iva, 0);
  // const subtotal = invoices.reduce((acc, item) => acc + item.cost.subtotal, 0);

  // const months=['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];

  // console.log('company pdf => ', satCompany);
  console.log('invoice full => ', invoicefull);

  return(
    <Document>
      <Page>
        <View style={{padding: '15px', marginTop: '15px'}}>

          <View style={{display: 'flex', flexDirection: 'row', gap:'5px', justifyContent: 'space-between'}}>

            <View>
              <Text style={{fontSize:'15px', color:'black', fontWeight:'extrabold'}}>{invoicemin.client.name}</Text>
              <Text style={{fontSize:'11px', color:'gray', marginTop:'5px'}}>{invoicemin.client.tradename}</Text>
              <Text style={{fontSize:'11px', color:'gray'}}>{invoicemin.client.rfc}</Text>
              <Text style={{fontSize:'11px', color:'gray'}}>601- General de ley</Text>
              <Text style={{fontSize:'11px', color:'gray'}}>Codigo postal {invoicemin.client.location.cp}</Text>

              <Text style={{fontSize:'11px', color:'black', fontWeight:'extrabold', marginTop:'5px'}}>Proyecto: {invoicemin.project.title}</Text>
            </View>

            <View style={{display:'flex', flexDirection:'row'}}>
              <View style={{display:'flex', flexDirection:'column', alignItems:'flex-end'}}>
                
                <Text style={{fontSize:'15px', color:'black', fontWeight:'extrabold'}}>{invoicemin.company.name}</Text>
                
                <Text style={{fontSize:'11px', color:'gray', marginTop:'5px'}}>{satCompany.issuer.legalName}</Text>
                <Text style={{fontSize:'11px', color:'gray'}}>{satCompany.issuer.tin}</Text>
                <Text style={{fontSize:'11px', color:'gray'}}>{satCompany.issuer.taxRegimeCode}</Text>
                <Text style={{fontSize:'11px', color:'gray'}}>Lugar de expedicion {satCompany.issuer.expeditionZipCode}</Text>
              </View>

              <Image source={invoicemin.company.logo} style={{height: '57px', width:'auto'}}></Image>

            </View>

          </View>

          <View style={{display: 'flex', flexDirection: 'row', gap:'5px', justifyContent: 'space-between', marginTop:'15px', borderTop: '1px solid gray', paddingTop:'10px'}}>

            <View>
              <Text style={{fontSize:'11px', color:'black', fontWeight:'extrabold'}}>Folio fiscal:</Text>
              
              <View style={{marginTop:'5px', display:'flex', flexDirection:'row', justifyContent:'flex-start', alignItems:'center'}}>
                <Text style={{fontSize:'10px', color:'gray'}}>Uso de CFDI: </Text>
                <Text style={{fontSize:'10px', color:'gray'}}>{invoicemin.useCFDI} </Text>
              </View>

              <View style={{marginTop:'5px', display:'flex', flexDirection:'row', justifyContent:'flex-start', alignItems:'center'}}>
                <Text style={{fontSize:'10px', color:'gray'}}>Forma de pago: </Text>
                <Text style={{fontSize:'10px', color:'gray'}}>{invoicemin.paymentWay}</Text>
              </View>

              <View style={{marginTop:'5px', display:'flex', flexDirection:'row', justifyContent:'flex-start', alignItems:'center'}}>
                <Text style={{fontSize:'10px', color:'gray'}}>Metodo pago: </Text>
                <Text style={{fontSize:'10px', color:'gray'}}>{invoicemin.paymentMethod}</Text>
              </View>
              
            </View>

            <View>
              <Text style={{fontSize:'11px', color:'black', fontWeight:'extrabold'}}>{invoicemin.taxfolio}</Text>
              
              <View style={{marginTop:'5px', display:'flex', flexDirection:'row', justifyContent:'flex-start', alignItems:'center'}}>
                <Text style={{fontSize:'10px', color:'gray'}}>Tipo de comprobante: </Text>
                <Text style={{fontSize:'10px', color:'gray'}}>{invoicefull.typeofreceipts}</Text>
              </View>

              <View style={{marginTop:'5px', display:'flex', flexDirection:'row', justifyContent:'flex-start', alignItems:'center'}}>
                <Text style={{fontSize:'10px', color:'gray'}}>Condicion de pago: </Text>
                <Text style={{fontSize:'10px', color:'gray'}}>{invoicefull.termsofpayment}</Text>
              </View>

            </View>

            <View style={{display:'flex', flexDirection: 'column', alignItems:'flex-end'}}>
              <Text style={{fontSize:'11px', color:'gray', fontWeight:'extrabold', textAlign:'right'}}>Factura:</Text>
              <Text style={{fontSize:'11px', color:'gray', fontWeight:'extrabold', textAlign:'right'}}>F {invoicemin.folio}</Text>
              <Text style={{fontSize:'11px', color:'gray', textAlign:'right'}}>{invoicemin.estimate?.name?? ''}</Text>
              <Text style={{fontSize:'11px', color:'gray', textAlign:'right'}}>{invoicefull.sat.invoiceSignatureDate.substring(0, 10)} {invoicefull.sat.invoiceSignatureDate.substring(11, 19)}</Text>
              
            </View>

          </View>

          <View style={{backgroundColor:'blue', display: 'flex', flexDirection: 'row', justifyContent: 'center', marginTop:'15px'}}>
            <Text style={{color:'white', textAlign:'center'}}>FACTURA</Text>
          </View>

          <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', marginTop: '10px'}}>
            <Text style={{flex: 1, fontSize: '7px', padding: '2px', fontWeight: 'bold'}}>CANTIDAD</Text>
            <Text style={{flex: 4, fontSize: '7px', padding: '2px', fontWeight: 'bold'}}>DESCRIPCION</Text>
            <Text style={{flex: 1, fontSize: '7px', padding: '2px', fontWeight: 'bold'}}>PRECIO</Text>
            <Text style={{flex: 1, fontSize: '7px', padding: '2px', fontWeight: 'bold'}}>IMPORTE</Text>
          </View>

          {invoicemin.conceptsInvoiceInfo.map((c, index:number) => (
            <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', marginTop: '10px'}} key={c._id+index} >
              <Text style={{flex: 1, fontSize: '7px', padding: '2px', fontWeight: 'bold'}}>{c.quantity}</Text>
              <Text style={{flex: 4, fontSize: '7px', padding: '2px', fontWeight: 'bold'}}>{c.conceptEstimate.description}</Text>
              <Text style={{flex: 1, fontSize: '7px', padding: '2px', fontWeight: 'bold'}}>{CurrencyFormatter({
                currency: 'MXN',
                value: c.priceConcepEstimate.cost
              })}</Text>
              <Text style={{flex: 1, fontSize: '7px', padding: '2px', fontWeight: 'bold'}}>{CurrencyFormatter({
                currency: 'MXN',
                value: c.priceConcepEstimate.cost * c.quantity
              })}</Text>
            </View>
          ))}

          <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', borderTop:'1px solid blue', marginTop:'15px'}}>
            <Text style={{color:'gray', textAlign:'center', fontSize:'10px'}}>SUBTOTAL</Text>
            <Text style={{color:'blue', textAlign:'center', fontSize:'10px'}}>{CurrencyFormatter({
              currency: 'MXN',
              value: invoicemin.cost.subtotal
            })}</Text>
          </View>

          <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', borderTop:'1px solid blue', marginTop:'5px'}}>
            <Text style={{color:'gray', textAlign:'center', fontSize:'10px'}}>(+) IVA</Text>
            <Text style={{color:'blue', textAlign:'center', fontSize:'10px'}}>{CurrencyFormatter({
              currency: 'MXN',
              value: invoicemin.cost.iva
            })}</Text>
          </View>

          <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', borderTop:'1px solid blue', marginTop:'5px'}}>
            <Text style={{color:'gray', textAlign:'center', fontSize:'10px'}}>Total</Text>
            <Text style={{color:'blue', textAlign:'center', fontSize:'10px'}}>{CurrencyFormatter({
              currency: 'MXN',
              value: invoicemin.cost.total
            })}</Text>
          </View>

          <View style={{marginTop:'5px', display:'flex', flexDirection:'row', justifyContent:'flex-start', alignItems:'center'}}>
            <Text style={{fontSize:'10px', color:'black', fontWeight:'extrabold'}}>Numero del serie CSD del SAT: </Text>
            <Text style={{fontSize:'10px', color:'gray'}}>{invoicefull.sat.satCertificateNumber}</Text>
          </View>

          <View style={{marginTop:'5px', display:'flex', flexDirection:'row', justifyContent:'flex-start', alignItems:'center'}}>
            <Text style={{fontSize:'10px', color:'black', fontWeight:'extrabold'}}>Numero del serie CSD del emisor: </Text>
            <Text style={{fontSize:'10px', color:'gray'}}>{invoicefull.sat.invoiceCertificateNumber}</Text>
          </View>

          <Text style={{fontSize:'10px', color:'black', fontWeight:'extrabold', marginTop:'5px'}}>Sello digital del CFDI: </Text>
          <Text style={{fontSize:'7px', color:'black'}}> {invoicefull.sat.invoiceBase64Sello} </Text>

          <Text style={{fontSize:'10px', color:'black', fontWeight:'extrabold', marginTop:'5px'}}>Sello del SAT: </Text>
          <Text style={{fontSize:'7px', color:'black'}}> {invoicefull.sat.satBase64Sello} </Text>

          <Text style={{fontSize:'10px', color:'black', fontWeight:'extrabold', marginTop:'5px'}}>Cadena Original: </Text>
          <Text style={{fontSize:'7px', color:'black'}}> {invoicefull.sat.satBase64OriginalString} </Text>

        </View>
      </Page>
    </Document>
  )
}
