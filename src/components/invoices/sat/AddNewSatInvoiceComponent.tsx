import HeaderForm from "@/components/HeaderForm"
import { useState, useEffect } from "react"
import { showToastMessage, showToastMessageError } from "@/components/Alert"
import { createInvoice, getFOLIONEXT } from "@/app/api/routeInvoices"
// import DataBasicInvoiceStepper from "../DataBasicInvoiceStepper"
import DataBasicSatInvoiceStepper from "./DataBasicSatInvoiceStepper"
// import InvoicesConditionsStepper from "@/components/projects/estimates/InvoicesConditionsStepper"
import SatInvoicesConditionsStepper from "./SatInvoicesConditionsStepper"
import NavInvoiceStepper from "@/components/projects/estimates/NavInvoiceStepper"
// import ConceptsInvoiceStepperComponent from "../ConceptsInvoiceStepperComponent"
import ConceptsSatInvoiceStepperComponent from "./ConceptsSatInvoiceStepperComponent"
import TooltipCloseIcon from "@/components/tooltipIcons/TooltipCloseIcon"
import { ISatCLient } from "@/interfaces/Clients";
import { getClientTAXProfileMIN } from "@/app/api/routeClients";
import { IConceptsInvoice } from "@/interfaces/Invoices"
import ConfirmSatInvoiceComponent from "./ConfirmSatInvoiceComponent"
import { IResponseSatInvoice, ISatCompany, ISatConcept } from "@/interfaces/SatInvoice"
import { createFiscalApiInvoice } from "@/app/api/routeSatInvoices"

type Params = {
  showForm:(value: boolean) => void,
  isNew:boolean, 
  user:string, 
  token:string, 
  company:string,
  step:number,
  handleStep: (value: number) => void,
}

export default function AddNewSatInvoiceComponent({showForm, user, token, isNew, company, 
  handleStep, step}: Params) {

  const [folio, setFolio] = useState<string>('');
  // const [taxFolio, setTaxFolio] = useState<string>('');
  const [date, setDate] = useState<string>(new Date().toISOString().substring(0, 10));
  const [client, setClient] = useState<string>('');
  const [type, setType] = useState<string>();
  const [methodPaid, setMethodPaid] = useState<string>();
  const [formPaid, setFormPaid] = useState<string>();
  const [conditionPayment, setConditionPayment] = useState<string>('');
  const [condicionTPayment, setCondicionTPayment] = useState<string>('');
  const [odc, setOdc] = useState<string>('');
  const [project, setProject] = useState<string>('');

  const [labeFormPaid, setLabelFormPaid] = useState<string>('');
  const [labelMethodPaid, setLabelMethodPaid] = useState<string>('');
  const [labelType, setLabelType] = useState<string>('');
  const [labelConditionPayment, setLabelConditionPayment] = useState<string>('');
  const [labelCondicionPayment, setLabelCondicionPayment] = useState<string>('');

  const [bandFolio, setBandFolio] = useState<boolean>(false);
  const [bandTaxFolio, setBandTaxFolio] = useState<boolean>(false);
  const [bandDate, setBandDate] = useState<boolean>(false);
  const [bandOdc, setBandOdc] = useState<boolean>(false);

  // const [step, setStep]=useState<number>(0);
  const [isVat, setIsVat]=useState<boolean>(true);

  const [subtotalInvoice, setSubtotalInvoice]=useState<number>(0);
  const [totalInvoice, setTotalInvoice]=useState<number>(0);
  const [vatT, setVatT]=useState<number>(0);
  const [discount, setDiscount]=useState<string>('0');
  const [vat, setVat]=useState<string>('16');

  const [satClient, setSatClient]=useState<ISatCLient>();
  // const [conceptsInvoice, setConceptsInvoice]=useState<IConceptsInvoice[]>([]);
  const [conceptsInvoice, setConceptsInvoice]=useState<ISatConcept[]>([]);


  const handleLabelType = (value: string) => {
    setLabelType(value); 
  }

  const handleLabelMethodPaid = (value: string) => {
    setLabelMethodPaid(value);
  }

  const handleLabelFormPaid = (value: string) => {
    setLabelFormPaid(value);
  }

  const handleLabelConditionPayment = (value: string) => {
    setLabelConditionPayment(value);
    console.log('label condition payment => ', value);
  }

  const handleLabelCondicionPayment = (value: string) => {
    setLabelCondicionPayment(value);
  }

  const handleAddNewConcept = (concept: any) => {
    console.log('concept => ', JSON.stringify(concept));
    setConceptsInvoice((prev) => [...prev, concept]);
    const nConcept=[...conceptsInvoice, concept];
    const t = nConcept.reduce((acumulador, item) => {
                return acumulador + (item.amount * item.quantity);
              }, 0);

    setSubtotalInvoice(t);
    const tinv= (t * Number(vat.replace(/[$,%]/g, "")?? 0.1)) / 100;
    setVatT(tinv);
    const totI= tinv + t - Number(discount.replace(/[$,%]/g, "")?? 0);
    setTotalInvoice(totI);
  }

  const [heightPage, setHeightPage] = useState<number>(900);

  const handleDiscount=(value:string) => {
    setDiscount(value);
  }

  const handleVat=(value:string) => {
    setVat(value);
  }

  async function handleSatCLient(idc:string){
    const res = await getClientTAXProfileMIN(token, idc);
    // const res = await getClientTAXProfileMIN(token, '69f2ccb13b1b0672ab310b04');
    // const res = await getClientTAXProfileMIN(token, '69fbf97f3b1b0672ab319543');
    if(typeof(res)=='string'){
      showToastMessageError(res);
    }else{
      console.log('res sat cli => ', res[0]);
      setSatClient(res[0]);
    }
  }

  const handleClient = (value: string) => {
    setClient(value);
    handleSatCLient(value);
  }

  const handleProject = (value: string) => {
    setProject(value);
  }

  const handleType = (value: string) => {
    console.log('type => ', value);
    setType(value);
  }

  const handleMethodPaid = (value: string) => {
    setMethodPaid(value);
  }

  const handleFormPaid = (value: string) => {
    setFormPaid(value);
  }

  // const handleStep = (value: number) => {
  //   setStep(value);
  // }

  const handleDate = (value:string) => {
    setDate(value);
  }

  // const handleFolio = (value:string) => {
  //   setFolio(value);
  // }

  // const handleTaxFolio = (value:string) => {
  //   setTaxFolio(value);
  // }

  const handleConditionPayment = (value:string) => {
    setConditionPayment(value);
  }

  const handleCondicionTPayment = (value:string) => {
    setCondicionTPayment(value);
  }

  const handleOdc = (value:string) => {
    setOdc(value);
  }

  const handleBandDate = (value:boolean) => {
    setBandDate(value);
  }
  
  const handleBandOdc = (value:boolean) => {
    setBandOdc(value);
  }

  // const handleBandFolio = (value:boolean) => {
  //   setBandFolio(value);
  // }

  // const handleBandTaxFolio = (value:boolean) => {
  //   setBandTaxFolio(value);
  // }

  // const handleIsVat = (value:boolean) => {
  //   setIsVat(value);
  // }

  const handleResize = () => {
    setHeightPage(Math.max(
      document.body.scrollHeight, document.documentElement.scrollHeight,
      document.body.offsetHeight, document.documentElement.offsetHeight,
      document.body.clientHeight, document.documentElement.clientHeight
    ));
  }

  useEffect(() => {
    window.addEventListener("resize", handleResize, false);
    setHeightPage(Math.max(
      document.body.scrollHeight, document.documentElement.scrollHeight,
      document.body.offsetHeight, document.documentElement.offsetHeight,
      document.body.clientHeight, document.documentElement.clientHeight
    ));
    return () => window.removeEventListener('scroll', handleResize);
  }, []);

  useEffect(() => {
    const fetch = async() => {
      const [resfolio] = await Promise.all([
        getFOLIONEXT(token, '65d3813c74045152c0c4377e')
      ]);

      // console.log('res folio => ', resfolio);
      setFolio(resfolio);
    }

    if(isNew){
      fetch();
    }
  }, [isNew]);

  const validationData = () =>{
    let validation = true;
    if(!folio || folio===''){
      setBandFolio(true);
      validation = false;
      return false;
    }else{
      setBandFolio(false);
    }
    // if(!taxFolio || taxFolio==='' || taxFolio.length < 30 || taxFolio.length > 40){
    //   setBandTaxFolio(true);
    //   validation = false;
    //   return false;
    // }else{
    //   setBandTaxFolio(false);
    // }
    if(!date || date===''){
      setBandDate(true);
      validation = false;
      return false;
    }else{
      setBandDate(false);
    }
    return validation;
  }

  const saveInvoice = async (companySatData:ISatCompany) => {
    // const val = validationData();
    const val = true;

    // showToastMessage('Timbrar factura...');

    // console.log('items => ', conceptsInvoice);
    const items = conceptsInvoice.map((c: ISatConcept) => {
        return {
          itemCode: c.conceptEstimate.codesat.toString(),
          quantity: c.quantity,
          unitOfMeasurementCode: c.conceptEstimate.unitsat.id,
          description: c.conceptEstimate.description,
          unitPrice: c.priceConcepEstimate.cost,
          taxObjectCode: "02",
          itemSku: "7506022301697",
          discount: 0,
          itemTaxes: [
            {
              taxCode: "002",      // IVA
              taxTypeCode: "Tasa", // Tasa
              taxRate: "0.160000", // 16%
              taxFlagCode: "T"     // Traslado
            }
          ]
        }
      });

    // const items=[{
    //   itemCode: "01010101",
    //   quantity: 9.5,
    //   unitOfMeasurementCode: "E48",
    //   description: "Invoicing software as a service",
    //   unitPrice: 3587.75,
    //   taxObjectCode: "02",
    //   itemSku: "7506022301697",
    //   discount: 255.85,
    //   itemTaxes: [{
    //     taxCode: "002",      // IVA
    //     taxTypeCode: "Tasa", // Tasa
    //     taxRate: "0.160000", // 16%
    //     taxFlagCode: "T"     // Traslado
    //   }]
    // }]

    // console.log('items 2 => ', items);

    if(val){
      // const invoice = {
      //   // versionCode: "4.0",
      //   series: "F",
      //   // date: DateTime.now().toFormat("yyyy-MM-dd'T'HH:mm:ss"),
      //   date: new Date(date).toISOString().slice(0, 19),
      //   paymentFormCode: "01",
      //   paymentMethodCode: "PUE",
      //   currencyCode: "MXN",
      //   typeCode: "I",
      //   expeditionZipCode: companySatData?.issuer.expeditionZipCode,
      //   exchangeRate: 1,
      //   exportCode: "01",
      //   issuer: {
      //     tin: companySatData?.issuer.tin,
      //     legalName: companySatData?.issuer.legalName,
      //     taxRegimeCode: "621",
      //     taxCredentials: companySatData?.issuer.taxCredentials,
      //   },
      //   // recipient: {
      //   //   tin: satClient?.tin,
      //   //   legalName: satClient?.legalName,
      //   //   zipCode: satClient?.zipCode,
      //   //   taxRegimeCode: satClient?.taxRegimeCode,
      //   //   cfdiUseCode: "G01",
      //   //   // email: "someone@somewhere.com"
      //   // },
      //   recipient: {
      //     tin: "EKU9003173C9",
      //     legalName: "ESCUELA KEMPER URGATE",
      //     zipCode: "42501",
      //     taxRegimeCode: "601",
      //     cfdiUseCode: "G01",
      //     email: "someone@somewhere.com"
      //   },
      //   items
      //   // items: [
      //   //   {
      //   //     itemCode: "01010101",
      //   //     quantity: 9.5,
      //   //     unitOfMeasurementCode: "E48",
      //   //     description: "Invoicing software as a service",
      //   //     unitPrice: 3587.75,
      //   //     taxObjectCode: "02",
      //   //     itemSku: "7506022301697",
      //   //     discount: 255.85,
      //   //     itemTaxes: [
      //   //       {
      //   //         taxCode: "002",      // IVA
      //   //         taxTypeCode: "Tasa", // Tasa
      //   //         taxRate: "0.160000", // 16%
      //   //         taxFlagCode: "T"     // Traslado
      //   //       }
      //   //     ]
      //   //   }
      //   // ]
      // };

      // const invoice = {
      //   versionCode: "4.0",
      //   series: "F",
      //   date: "2026-05-01T14:56:40Z",
      //   paymentFormCode: "01",
      //   paymentMethodCode: "PUE",
      //   currencyCode: "MXN",
      //   typeCode: "I",
      //   expeditionZipCode: "42501",
      //   exchangeRate: 1,
      //   exportCode: "01",
      //   issuer: {
      //     tin: "FUNK671228PH6",
      //     legalName: "KARLA FUENTE NOLASCO",
      //     taxRegimeCode: "621",
      //     taxCredentials: [
      //       {
      //         base64File: "MIIFgDCCA2igAwIBAgIUMzAwMDEwMDAwMDA1MDAwMDM0NDYwDQYJKoZIhvcNAQELBQAwggErMQ8wDQYDVQQDDAZBQyBVQVQxLjAsBgNVBAoMJVNFUlZJQ0lPIERFIEFETUlOSVNUUkFDSU9OIFRSSUJVVEFSSUExGjAYBgNVBAsMEVNBVC1JRVMgQXV0aG9yaXR5MSgwJgYJKoZIhvcNAQkBFhlvc2Nhci5tYXJ0aW5lekBzYXQuZ29iLm14MR0wGwYDVQQJDBQzcmEgY2VycmFkYSBkZSBjYWxpejEOMAwGA1UEEQwFMDYzNzAxCzAJBgNVBAYTAk1YMRkwFwYDVQQIDBBDSVVEQUQgREUgTUVYSUNPMREwDwYDVQQHDAhDT1lPQUNBTjERMA8GA1UELRMIMi41LjQuNDUxJTAjBgkqhkiG9w0BCQITFnJlc3BvbnNhYmxlOiBBQ0RNQS1TQVQwHhcNMjMwNTE4MTQzNTM3WhcNMjcwNTE4MTQzNTM3WjCBpzEdMBsGA1UEAxMUS0FSTEEgRlVFTlRFIE5PTEFTQ08xHTAbBgNVBCkTFEtBUkxBIEZVRU5URSBOT0xBU0NPMR0wGwYDVQQKExRLQVJMQSBGVUVOVEUgTk9MQVNDTzEWMBQGA1UELRMNRlVOSzY3MTIyOFBINjEbMBkGA1UEBRMSRlVOSzY3MTIyOE1DTE5MUjA1MRMwEQYDVQQLEwpTdWN1cnNhbCAxMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAhNXbTSqGX6+/3Urpemyy5vVG2IdP2v7v001+c4BoMxEDFDQ32cOFdDiRxy0Fq9aR+Ojrofq8VeftvN586iyA1A6a0QnA68i7JnQKI4uJy+u0qiixuHu6u3b3BhSpoaVHcUtqFWLLlzr0yBxfVLOqVna/1/tHbQJg9hx57mp97P0JmXO1WeIqi+Zqob/mVZh2lsPGdJ8iqgjYFaFn9QVOQ1Pq74o1PTqwfzqgJSfV0zOOlESDPWggaDAYE4VNyTBisOUjlNd0x7ppcTxSi3yenrJHqkq/pqJsRLKf6VJ/s9p6bsd2bj07hSDpjlDC2lB25eEfkEkeMkXoE7ErXQ5QCwIDAQABox0wGzAMBgNVHRMBAf8EAjAAMAsGA1UdDwQEAwIGwDANBgkqhkiG9w0BAQsFAAOCAgEAHwYpgbClHULXYhK4GNTgonvXh81oqfXwCSWAyDPiTYFDWVfWM9C4ApxMLyc0XvJte75Rla+bPC08oYN3OlhbbvP3twBL/w9SsfxvkbpFn2ZfGSTXZhyiq4vjmQHW1pnFvGelwgU4v3eeRE/MjoCnE7M/Q5thpuog6WGf7CbKERnWZn8QsUaJsZSEkg6Bv2jm69ye57ab5rrOUaeMlstTfdlaHAEkUgLX/NXq7RbGwv82hkHY5b2vYcXeh34tUMBL6os3OdRlooN9ZQGkVIISvxVZpSHkYC20DFNh1Bb0ovjfujlTcka81GnbUhFGZtRuoVQ1RVpMO8xtx3YKBLp4do3hPmnRCV5hCm43OIjYx9Ov2dqICV3AaNXSLV1dW39Bak/RBiIDGHzOIW2+VMPjvvypBjmPv/tmbqNHWPSAWOxTyMx6E1gFCZvi+5F+BgkdC3Lm7U0BU0NfvsXajZd8sXnIllvEMrikCLoI/yurvexNDcF1RW/FhMsoua0eerwczcNm66pGjHm05p9DR6lFeJZrtqeqZuojdxBWy4vH6ghyJaupergoX+nmdG3JYeRttCFF/ITI68TeCES5V3Y0C3psYAg1XxcGRLGd4chPo/4xwiLkijWtgt0/to5ljGBwfK7r62PHZfL1Dp+i7V3w7hmOlhbXzP+zhMZn1GCk7KY=",
      //         fileType: 0,
      //         password: "12345678a"
      //       },
      //       {
      //         base64File: "MIIFDjBABgkqhkiG9w0BBQ0wMzAbBgkqhkiG9w0BBQwwDgQIAgEAAoIBAQACAggAMBQGCCqGSIb3DQMHBAgwggS9AgEAMASCBMh4EHl7aNSCaMDA1VlRoXCZ5UUmqErAbucRBAKNQXH8t8gVCl/ItHMI2hMJ76QOECOqEi1Y89cDpegDvh/INXyMsXbzi87tfFzgq1O+9ID6aPWGg+bNGADXyXxDVdy7Nq/SCdoXvo66MTYwq8jyJeUHDHEGMVBcmZpD44VJCvLBxDcvByuevP4Wo2NKqJCwK+ecAdZc/8Rvd947SjbMHuS8BppfQWARVUqA5BLOkTAHNv6tEk/hncC7O2YOGSShart8fM8dokgGSyewHVFe08POuQ+WDHeVpvApH/SP29rwktSoiHRoL6dK+F2YeEB5SuFW9LQgYCutjapmUP/9TC3Byro9Li6UrvQHxNmgMFGQJSYjFdqlGjLibfuguLp7pueutbROoZaSxU8HqlfYxLkpJUxUwNI1ja/1t3wcivtWknVXBd13R06iVfU1HGe8Kb4u5il4a4yP4p7VT4RE3b1SBLJeG+BxHiE8gFaaKcX/Cl6JV14RPTvk/6VnAtEQ66qHJex21KKuiJo2JoOmDXVHmvGQlWXNjYgoPx28Xd5WsofL+n7HDR2Ku8XgwJw6IXBJGuoday9qWN9v/k7DGlNGB6Sm4gdVUmycMP6EGhB1vFTiDfOGQO42ywmcpKoMETPVQ5InYKE0xAOckgcminDgxWjtUHjBDPEKifEjYudPwKmR6Cf4ZdGvUWwY/zq9pPAC9bu423KeBCnSL8AQ4r5SVsW6XG0njamwfNjpegwh/YG7sS7sDtZ8gi7r6tZYjsOqZlCYU0j7QTBpuQn81Yof2nQRCFxhRJCeydmIA8+z0nXrcElk7NDPk4kYQS0VitJ2qeQYNENzGBglROkCl2y6GlxAG80IBtReCUp/xOSdlwDR0eim+SNkdStvmQM5IcWBuDKwGZc1A4v/UoLl7niV9fpl4X6bUX8lZzY4gidJOafoJ30VoY/lYGkrkEuz3GpbbT5v8fF3iXVRlEqhlpe8JSGu7Rd2cPcJSkQ1Cuj/QRhHPhFMF2KhTEf95c9ZBKI8H7SvBi7eLXfSW2Y0ve6vXBZKyjK9whgCU9iVOsJjqRXpAccaWOKi420CjmS0+uwj/Xr2wLZhPEjBA/G6Od30+eG9mICmbp/5wAGhK/ZxCT17ZETyFmOMo49jl9pxdKocJNuzMrLpSz7/g5Jwp8+y8Ck5YP7AX0R/dVA0t37DO7nAbQT5XVSYpMVh/yvpYJ9WR+tb8Yg1h2lERLR2fbuhQRcwmisZR2W3Sr2b7hX9MCMkMQw8y2fDJrzLrqKqkHcjvnI/TdzZW2MzeQDoBBb3fmgvjYg07l4kThS73wGX992w2Y+a1A2iirSmrYEm9dSh16JmXa8boGQAONQzQkHh7vpw0IBs9cnvqO1QLB1GtbBztUBXonA4TxMKLYZkVrrd2RhrYWMsDp7MpC4M0p/DA3E/qscYwq1OpwriewNdx6XXqMZbdUNqMP2viBY2VSGmNdHtVfbN/rnaeJetFGX7XgTVYD7wDq8TW9yseCK944jcT+y/o0YiT9j3OLQ2Ts0LDTQskpJSxRmXEQGy3NBDOYFTvRkcGJEQJItuol8NivJN1H9LoLIUAlAHBZxfHpUYx66YnP4PdTdMIWH+nxyekKPFfAT7olQ=",
      //         fileType: 1,
      //         password: "12345678a"
      //       }
      //     ]
      //   },
      //   recipient: {
      //     tin: "EKU9003173C9",
      //     legalName: "ESCUELA KEMPER URGATE",
      //     zipCode: "42501",
      //     taxRegimeCode: "601",
      //     cfdiUseCode: "G01",
      //     email: "someone@somewhere.com"
      //   },
      //   items: [
      //     {
      //       itemCode: "01010101",
      //       quantity: 9.5,
      //       unitOfMeasurementCode: "E48",
      //       description: "Invoicing software as a service",
      //       unitPrice: 3587.75,
      //       taxObjectCode: "02",
      //       itemSku: "7506022301697",
      //       discount: 255.85,
      //       itemTaxes: [
      //         {
      //           taxCode: "002",
      //           taxTypeCode: "Tasa",
      //           // taxRate: 0.16,
      //           "taxRate": "0.160000",
      //           taxFlagCode: "T"
      //         }
      //       ]
      //     }
      //   ]
      // };

      // const now = new Date();
      // const fechaConHora = new Date(`${date}T${now.getHours().toString().padStart(2,'0')}:${now.getMinutes().toString().padStart(2,'0')}:${now.getSeconds().toString().padStart(2,'0')}`);

      // // Obtener ISO string
      // const isoString = fechaConHora.toISOString().slice(0, 19);

      const localString = (() => { const d = new Date(date); const now = new Date(); d.setHours(now.getHours(), now.getMinutes(), now.getSeconds()); return d.toLocaleString('sv-SE').replace(' ', 'T'); })();
      // console.log(localString);

      const invoice = {
        versionCode: "4.0",
        series: "F",
        // date: "2026-05-01T14:56:40Z",
        // date: new Date(date).toISOString().slice(0, 19),
        date: localString,
        // paymentFormCode: "01",
        paymentFormCode: formPaid,
        // paymentMethodCode: "PUE",
        paymentMethodCode: methodPaid,
        currencyCode: "MXN",
        // typeCode: "I",
        typeCode: type,
        // expeditionZipCode: "42501",
        expeditionZipCode: companySatData?.issuer.expeditionZipCode.toString(),
        exchangeRate: 1,
        exportCode: "01",
        issuer: {
          tin: companySatData?.issuer.tin,
          legalName: companySatData?.issuer.legalName,
          taxRegimeCode: companySatData?.issuer.taxRegimeCode?? '',
          taxCredentials: companySatData?.issuer.taxCredentials,
        },
        recipient: {
          tin: satClient?.tin,
          legalName: satClient?.legalName,
          // zipCode: "0"+satClient?.zipCode.toString(),
          zipCode: satClient?.zipCode.toString(),
          taxRegimeCode: satClient?.taxRegimeCode,
          // taxRegimeCode: "621",
          // cfdiUseCode: "G01",
          cfdiUseCode: conditionPayment,
          // email: "someone@somewhere.com"
        },
        items
        // items: [
        //   {
        //     itemCode: "01010101",
        //     quantity: 9.5,
        //     unitOfMeasurementCode: "E48",
        //     description: "Invoicing software as a service",
        //     unitPrice: 3587.75,
        //     taxObjectCode: "02",
        //     itemSku: "7506022301697",
        //     discount: 255.85,
        //     itemTaxes: [
        //       {
        //         taxCode: "002",
        //         taxTypeCode: "Tasa",
        //         // taxRate: 0.16,
        //         "taxRate": "0.160000",
        //         taxFlagCode: "T"
        //       }
        //     ]
        //   }
        // ]
      };

      // console.log('invoice => ', invoice);

      const res: IResponseSatInvoice|string = await createFiscalApiInvoice(invoice);
      if(typeof(res)==='string'){
        showToastMessageError(res);
      }else{
        // console.log('res create invoice => ', res);
        showToastMessage('Factura agregada satisfactoriamente!!');

        const dataConcepts: any[] = [];
        let amount: number = 0;
        conceptsInvoice.map((c: ISatConcept) => {
          dataConcepts.push({
              conceptEstimate:c.conceptEstimate._id,
              priceConcepEstimate:c.priceConcepEstimate,
              area:'sin area',
              section:'sin sección',
              quantity:c.quantity,
              amount:c.amount,
              date:c.date,
              user:c.user
          });
          amount += c.amount;
        });

        const invoiceData = {
          // concepts: dataConcepts,
          folio,
          taxfolio: res.uuid,
          date,
          // useCFDI: type?? '',
          useCFDI: (conditionPayment?? '') + '-' + (labelConditionPayment?? ''),
          paymentMethod: (methodPaid?? '') + '-' + (labelMethodPaid?? ''),
          paymentWay: (formPaid?? '') + '-' + (labeFormPaid?? ''),
          user,
          client,
          project,
          company,
          concepts: dataConcepts,
          cost: {
            subtotal: subtotalInvoice, 
            iva: vatT,
            total: totalInvoice,
          },
          condition: [
            {glossary:"67d20cb359865f640af92638", user}
          ],
          // termsofpayment:conditionPayment,
          termsofpayment:condicionTPayment,
          purchaseorder:odc,
          accountreceivables: [{
            previousbalanceamount: totalInvoice,
            charged: 0,
            unchargedbalanceamount: totalInvoice,
            partialitynumber: 0,
          }],
          sat:res.responses[0],
          typeofreceipts: type?? '',
          typeInvoice: 'Timbrada'
        }
        
        console.log('invoice data => ', invoiceData);
        const resInvoice = await createInvoice(token, invoiceData);
        if(typeof(resInvoice)==='string'){
          showToastMessageError(resInvoice);
        }else{
          showToastMessage('Factura agregada satisfactoriamente!!');
          showForm(false);
          // setTimeout(() => {
          //   window.location.reload();
          // }, 1500);
        }
        // showForm(false);
      }
      // const facturapi = new Facturapi('sk_test_tu_api_key');

      // const invoice = await facturapi.invoices.create({
      //   type: "I",
      //   customer: {
      //     legal_name: "Juan Pérez López",
      //     email: "juan@email.com",
      //     tax_id: "PELJ800101ABC",
      //     tax_system: "605",
      //     address: { zip: "78200" }
      //   },
      //   items: [{
      //     quantity: 1,
      //     product: {
      //       description: "Desarrollo de software",
      //       product_key: "81112100",
      //       price: 1000,
      //       taxes: [{ type: "IVA", rate: 0.16 }]
      //     }
      //   }],
      //   payment_form: "03",
      //   payment_method: "PUE",
      //   use: "G03"
      // });
      
      // El código postal del receptor es obligatorio (CFDI 4.0)
      // El régimen fiscal (tax_system) debe coincidir con el RFC
      // Usa correctamente las claves SAT (producto, uso, forma de pago)
      // Puedes guardar el customer previamente y solo mandar el id después
    }

    // const dataConcepts: any[] = [];
    // let amount: number = 0;
    // conceptsInvoice.map((c: any) => {
    //   dataConcepts.push({
    //       conceptEstimate:c.conceptEstimate._id,
    //       priceConcepEstimate:c.priceConcepEstimate,
    //       area:c.area,
    //       section:c.section,
    //       quantity:c.quantity,
    //       amount:c.amount,
    //       date:c.date,
    //       user:c.user
    //   });
    //   amount += c.amount;
    // });

    // if(val){
    //   const currentDate=new Date(date.substring(0, 10));
    //   const day=currentDate.getDay();
    //   const days = (conditionPayment=="67d20a6a59865f640af92588"? 0: 
    //           (conditionPayment=="67d20a8b59865f640af9258a"? 10: (conditionPayment=="67d20aa159865f640af9258c"? 15: 30)));
    //   const newDay =currentDate.setDate(day+days);
    //   const newDate=new Date(newDay);
    //   const data = {
    //     folio,
    //     taxfolio: taxFolio,
    //     date,
    //     useCFDI: type,
    //     paymentMethod: methodPaid,
    //     paymentWay: formPaid,
    //     user,
    //     client,
    //     project,
    //     company: '65d3813c74045152c0c4377e',
    //     concepts: dataConcepts,
    //     cost: {
    //       subtotal: amount, 
    //       iva: isVat? (amount * 0.16): 0,
    //       total: isVat? (amount * 1.16): amount,
    //     },
    //     condition: [
    //       {glossary:"67d20cb359865f640af92638", user}
    //     ],
    //     termsofpayment:conditionPayment,
    //     purchaseorder:odc,
    //     duedate:newDate.toISOString(),
    //     accountreceivables: [{
    //       previousbalanceamount: isVat? (amount * 1.16): amount,
    //       charged: 0,
    //       unchargedbalanceamount: isVat? (amount * 1.16): amount,
    //       partialitynumber: 0,
    //     }]
    //   }

    //   const resInvoice = await createInvoice(token, data);
    //   if(typeof(resInvoice)==='string'){
    //     showToastMessageError(resInvoice);
    //   }else{
    //     showToastMessage('Factura agregada satisfactoriamente!!');
    //     showForm(false);
    //   }
    // }
  }

  const component = (step===0? <DataBasicSatInvoiceStepper bandDate={bandDate} client={client} date={date}  
                        nextStep={handleStep} setClient={handleClient} setDate={handleDate} folio={folio} 
                        token={token} setBandDate={handleBandDate} project={project} setProject={handleProject} /> : 
                        (step===1? <SatInvoicesConditionsStepper 
                                  conditionPayment={conditionPayment} handleConditionPayment={handleConditionPayment}
                                  handleFormPaid={handleFormPaid} handleMethodPaid={handleMethodPaid} 
                                  handleType={handleType} nextStep={handleStep} token={token} handleCondicionTPayment={handleCondicionTPayment}
                                  bandOdc={bandOdc} odc={odc} setOdc={handleOdc} setBandOdc={handleBandOdc}
                                  handleLabelFormPaid={handleLabelFormPaid} handleLabelMethodPaid={handleLabelMethodPaid}
                                  handleLabelType={handleLabelType} handleLabelConditionPayment={handleLabelConditionPayment}
                                  handleLabelCondicionPayment={handleLabelCondicionPayment} />: 
                                    (step==2? <ConceptsSatInvoiceStepperComponent nextStep={handleStep} handleAddConcept={handleAddNewConcept}
                                      token={token} user={user} conceptsInvoice={conceptsInvoice} 
                                      discount={discount} handleDiscount={handleDiscount} handleVat={handleVat} vat={vat} /> :
                                        <ConfirmSatInvoiceComponent client={satClient} concepts={conceptsInvoice} date={date}
                                              folio={folio} iva={vatT} subtotal={subtotalInvoice} 
                                              total={totalInvoice} token={token} saveInvoice={saveInvoice}
                                              labelConditionPayment={labelConditionPayment} labelFormPaid={labeFormPaid}
                                              labelMethodPaid={labelMethodPaid} labelType={labelType} 
                                              companyParam={company} labelCondicion={labelCondicionPayment} />)))

  return (
    <>
      <form className={`z-10 absolute w-full bg-white space-y-5 p-5 right-0`}
          style={{height: `${heightPage}px`}}>
        <div className="flex justify-between">
          <HeaderForm img="/img/estimates/invoices.svg" subtitle={"Crea factura"} 
            title={"Nueva factura"}
          />
          <TooltipCloseIcon handleClose={showForm} />
        </div>

        <NavInvoiceStepper index={step} setIndex={handleStep} isSat={1} />

        {component}
      </form>
    </>
  )
}
