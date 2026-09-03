import {Document, Page, Text, Image, View} from '@react-pdf/renderer'
import { CurrencyFormatter } from '@/app/functions/Globals'
import { IProviderMin } from "@/interfaces/Providers";
import { OneExpense } from '@/interfaces/Expenses';
import { ICostRelAdvanceInv } from '@/interfaces/Expenses';
import { Company } from "@/interfaces/Companies"

export default function DownloadAdvancePDF({provider, advance, costsRelAdvance, satCompany}: 
  {provider:IProviderMin, advance:OneExpense, costsRelAdvance:ICostRelAdvanceInv[], satCompany:Company}) {

  // const appAdvance=costsRelAdvance.reduce((accum, item) => accum+= item.cost.total>0? item.cost.total: 0, 0);
  const appAdvance=costsRelAdvance.reduce((accum, item) => accum+=item.invoiceUUID.cost.total, 0);

  const costData = transformDataInvoicesInDataTable(costsRelAdvance);

  // ya esta 

  return(
    <Document>
      <Page>
        <View style={{padding: '15px', marginTop: '15px'}}>

          <View style={{display: 'flex', flexDirection: 'row', gap:'5px', justifyContent: 'space-between'}}>

            <View style={{display:'flex', flexDirection:'column'}}>
              <View style={{display:'flex', flexDirection:'row', alignItems:'center', gap:'5px'}}>
                {/* <Image source={'/isologo_palacios.png'} style={{height: '57px', width:'67px'}}></Image> */}
                {/* <Image source={'/Palaciosconstrucciones-isologo.png'} style={{height: '57px', width:'auto'}}></Image> */}
                <Image source={satCompany?.isologo?? satCompany.logo} style={{height: '57px', width:'auto'}}></Image>
              </View>

              {/* <View>
                <Text style={{fontSize:'10px', width: '250px', marginTop: '5px'}}>Palacios Construcciones</Text>
                <Text style={{fontSize:'10px', color:'gray', width: '250px'}}>Cda. Monreal #120</Text>
                <Text style={{fontSize:'10px', color:'gray', width: '250px'}}>Col. Gral. I. Martinez</Text>
                <Text style={{fontSize:'10px', color:'gray', width: '250px'}}>San Luis Potosi S.L.P. </Text>
                <Text style={{fontSize:'10px', color:'gray', width: '250px'}}>Mexico</Text>
              </View> */}
              <View>
                <Text style={{fontSize:'10px', width: '250px', marginTop: '5px'}}>{satCompany.name}</Text>
                <Text style={{fontSize:'10px', color:'gray', width: '250px'}}>{satCompany.location?.stret}</Text>
                <Text style={{fontSize:'10px', color:'gray', width: '250px'}}>{satCompany.location?.community}</Text>
                <Text style={{fontSize:'10px', color:'gray', width: '250px'}}>{satCompany.location?.state} </Text>
                <Text style={{fontSize:'10px', color:'gray', width: '250px'}}>{satCompany.location?.country}</Text>
              </View>

              <View style={{marginTop:'7px'}}>
                <View style={{display:'flex', flexDirection:'row', justifyContent:'flex-start', alignItems:'center', gap:'3px'}}>
                  <Text style={{fontSize:'10px'}}>{provider.name}</Text>
                </View>

                <View style={{display:'flex', flexDirection:'row', justifyContent:'flex-start', alignItems:'center', gap:'3px'}}>
                  <Text style={{fontSize:'10px'}}>{provider.rfc}</Text>
                </View>
              </View>
              
{/* <View style={{marginTop:'5px', display:'flex', flexDirection:'row', gap: '2px', fontSize: '10px', justifyContent:'flex-start', alignItems:'center'}}></View> */}
            </View>

            <View style={{padding:'13px', paddingTop: '0px', width: '270px'}}>

              <Text style={{fontSize:'13px'}}>ESTADO DE CUENTA DE ANTICIPO</Text>

              <View style={{display:'flex', flexDirection:'row', justifyContent:'flex-start', alignItems:'center', gap:'3px', marginTop:'7px'}}>
                <Text style={{fontSize:'10px', color:'gray'}}>Folio: </Text>
                <Text style={{fontSize:'10px'}}>{advance.folio}</Text>
              </View>

              <View style={{display:'flex', flexDirection:'row', justifyContent:'flex-start', alignItems:'center', gap:'3px'}}>
                <Text style={{fontSize:'10px', color:'gray'}}>Fecha: </Text>
                <Text style={{fontSize:'10px'}}>{advance.date?.substring(0, 10)}</Text>
              </View>

              <View style={{display:'flex', flexDirection:'row', justifyContent:'flex-start', alignItems:'center', gap:'3px'}}>
                <Text style={{fontSize:'10px', color:'gray'}}>Facturas Relacionadas: </Text>
                <Text style={{fontSize:'10px'}}>
                  {costsRelAdvance.length}
                </Text>
              </View>

              <View style={{border:'1px solid gray', marginTop:'7px'}}>
                <View style={{display:'flex', flexDirection:'row'}}>
                  <Text style={{backgroundColor:'green', color:'white', width:'110px', textAlign:'center', fontSize:'13px', padding:'3px'}}>Anticipo</Text>
                  <Text style={{width:'100%', textAlign:'center', color:'black', fontSize:'13px', backgroundColor:'#D3D3D3', padding:'3px'}}>
                    {CurrencyFormatter({
                      currency: 'USD',
                      value: advance.cost.total
                    })}
                  </Text>
                </View>
                <View style={{textAlign:'center', padding:'5px'}}>
                  <Text style={{textAlign:'center', color:'gray', fontSize:'14px'}}>
                    {CurrencyFormatter({
                      currency: 'USD',
                      value: advance.advancesToSuppliers?.currentbalance?? 0
                    })}
                  </Text>
                </View>
              </View>

            </View>
          </View>

          <View style={{marginTop:'10px'}}></View>

          <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', marginTop: '20px', margin: '3px'}}>
            <Text style={{flex: 1, fontSize: '7px', padding: '2px', borderBottom: '1px solid black', fontWeight: 'bold'}}>Comp.</Text>
            <Text style={{flex: 1, fontSize: '7px', padding: '2px', borderBottom: '1px solid black', fontWeight: 'bold'}}>Proyecto</Text>
            <Text style={{flex: 3, fontSize: '7px', padding: '2px', borderBottom: '1px solid black', fontWeight: 'bold'}}>Descripcion </Text>
            <Text style={{flex: 1, fontSize: '7px', padding: '2px', borderBottom: '1px solid black', fontWeight: 'bold'}}>Fecha </Text>
            <Text style={{flex: 1, fontSize: '7px', padding: '2px', borderBottom: '1px solid black', fontWeight: 'bold'}}>Centro de costos</Text>
            <Text style={{flex: 1, fontSize: '7px', padding: '2px', borderBottom: '1px solid black', fontWeight: 'bold'}}>Total</Text>
          </View>

          {/* {costData.map((c, index:number) => (
            <View key={c.id} style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', marginTop: '10px', margin: '3px'}}>
              <Text style={{flex: 1, fontSize: '7px', padding: '2px', borderBottom: index%2===0? '':'0.2px solid gray', fontWeight: 'bold'}}>{c.Comp}</Text>
              <Text style={{flex: 1, fontSize: '7px', padding: '2px', borderBottom: index%2===0? '':'0.2px solid gray', fontWeight: 'bold'}}>{c.Proyecto}</Text>
              <Text style={{flex: 3, fontSize: '7px', padding: '2px', borderBottom: index%2===0? '':'0.2px solid gray', fontWeight: 'bold'}}>{c.Descripcion} </Text>
              <Text style={{flex: 1, fontSize: '7px', padding: '2px', borderBottom: index%2===0? '':'0.2px solid gray', fontWeight: 'bold'}}>{c.Fecha?.substring(0, 10)} </Text>
              <Text style={{flex: 1, fontSize: '7px', padding: '2px', borderBottom: index%2===0? '':'0.2px solid gray', fontWeight: 'bold'}}>{c.Costocenter}</Text>
              <Text style={{flex: 1, fontSize: '7px', padding: '2px', borderBottom: index%2===0? '':'0.2px solid gray', fontWeight: 'bold'}}>{CurrencyFormatter({
                currency: 'USD',
                value: c.Total
              })}</Text>
            </View>
          ))} */}

          {/* {costData.map((c, index:number) => {
            const esUltimoDelGrupo = index === costData.length - 1 || c.index !== costData[index + 1].index;

            return(
              <View key={c.id} style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', marginTop: '10px', margin: '3px'}}>
                <Text style={{flex: 1, fontSize: '7px', padding: '2px', borderBottom: esUltimoDelGrupo ? '0.2px solid gray' : 'none', fontWeight: 'bold'}}>{c.Comp}</Text>
                <Text style={{flex: 1, fontSize: '7px', padding: '2px', borderBottom: esUltimoDelGrupo ? '0.2px solid gray' : 'none', fontWeight: 'bold'}}>{c.Proyecto}</Text>
                <Text style={{flex: 3, fontSize: '7px', padding: '2px', borderBottom: esUltimoDelGrupo ? '0.2px solid gray' : 'none', fontWeight: 'bold'}}>{c.Descripcion} </Text>
                <Text style={{flex: 1, fontSize: '7px', padding: '2px', borderBottom: esUltimoDelGrupo ? '0.2px solid gray' : 'none', fontWeight: 'bold'}}>{c.Fecha?.substring(0, 10)} </Text>
                <Text style={{flex: 1, fontSize: '7px', padding: '2px', borderBottom: esUltimoDelGrupo ? '0.2px solid gray' : 'none', fontWeight: 'bold'}}>{c.Costocenter}</Text>
                <Text style={{flex: 1, fontSize: '7px', padding: '2px', borderBottom: esUltimoDelGrupo ? '0.2px solid gray' : 'none', fontWeight: 'bold'}}>{CurrencyFormatter({
                  currency: 'USD',
                  value: c.Total
                })}</Text>
              </View>
            )
          })} */}

          {costData.map((c, index: number) => {
            const esUltimoDelGrupo =
              index === costData.length - 1 ||
              c.index !== costData[index + 1].index

            return (
              <View
                key={c.id}
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  marginTop: 10,
                  marginBottom: 3,
                  borderBottomWidth: esUltimoDelGrupo ? 0.5 : 0,
                  borderBottomColor: 'gray',
                }}
              >
                <Text style={{ flex: 1, fontSize: 7, padding: 2, fontWeight: 'bold' }}>
                  {c.Comp}
                </Text>
                <Text style={{ flex: 1, fontSize: 7, padding: 2, fontWeight: 'bold' }}>
                  {c.Proyecto}
                </Text>
                <Text style={{ flex: 3, fontSize: 7, padding: 2, fontWeight: 'bold' }}>
                  {c.Descripcion}
                </Text>
                <Text style={{ flex: 1, fontSize: 7, padding: 2, fontWeight: 'bold' }}>
                  {c.Fecha?.substring(0, 10)}
                </Text>
                <Text style={{ flex: 1, fontSize: 7, padding: 2, fontWeight: 'bold' }}>
                  {c.Costocenter}
                </Text>
                <Text style={{ flex: 1, fontSize: 7, padding: 2, fontWeight: 'bold' }}>
                  {CurrencyFormatter({
                    currency: 'USD',
                    value: c.Total,
                  })}
                </Text>
              </View>
            )
          })}

          {/* <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', marginTop: '10px', margin: '3px'}}>
            
          </View> */}
          <View style={{marginTop:'5px', display:'flex', flexDirection:'row', justifyContent:'flex-end', alignItems:'center', gap:'3px'}}>
            <Text style={{fontSize:'10px', color:'gray'}}>Aplicacion de anticipo: </Text>
            <Text style={{fontSize:'10px'}}>{CurrencyFormatter({
              currency: 'USD',
              value: appAdvance
            })}</Text>
          </View>

          <View style={{marginTop:'5px', display:'flex', flexDirection:'row', justifyContent:'flex-end', alignItems:'center', gap:'3px'}}>
            <Text style={{fontSize:'10px', color:'gray'}}>Total aplicado: </Text>
            <Text style={{fontSize:'10px'}}>{CurrencyFormatter({
              currency: 'USD',
              value: appAdvance
            })}</Text>
          </View>

          <View style={{marginTop:'5px'}}>
            <Text style={{fontSize:'10px'}}>Notas:</Text>
            {advance.advancesToSuppliers?.notes?.map((n, index:number) => (
              <Text key={index} style={{fontSize:'10px', color:'gray'}}>{n}</Text>
            ))}
          </View>

        </View>
      </Page>
    </Document>
  )
}

interface ICostsOfAdvance{
  Comp: string
  Proyecto: string
  Descripcion: string
  Fecha: string
  Costocenter: string,
  Total: number
  id: string
  index: number
}

function transformDataInvoicesInDataTable(dataBack:ICostRelAdvanceInv[]){
  const table: ICostsOfAdvance[]=[];

  let index=0;

  console.log('data to table => ', dataBack);

  dataBack.forEach(element => {
    table.push({
      Comp: element.invoiceUUID.folio,
      Proyecto: element.invoiceUUID.project.title,
      Descripcion: element.invoiceUUID.description,
      Fecha: element.invoiceUUID.date,
      Costocenter: element.invoiceUUID.costocenter.concept.name,
      Total: element.invoiceUUID.cost.total,
      id: element.invoiceUUID._id,
      index: index
    });

    // element.applicationUUID.forEach(element => {
    //   table.push({
    //     Comp: element.folio,
    //     Proyecto: element.project.title,
    //     Descripcion: element.description,
    //     Fecha: element.date,
    //     Costocenter: element.costocenter.concept.name,
    //     Total: element.cost.total,
    //     id: element._id,
    //     index: index
    //   });
    // });

    (Array.isArray(element.applicationUUID) ? element.applicationUUID : [])
    .forEach(app => {
      table.push({
        Comp: app.folio,
        Proyecto: app.project.title,
        Descripcion: app.description,
        Fecha: app.date,
        Costocenter: app.costocenter.concept.name,
        Total: app.cost.total,
        id: app._id,
        index: index
      });
    });

    index++;
  });
  return table;
}