'use client'

import { useState, useEffect, useRef } from "react"
import { IInvoiceTable, ITotalAmountInvoicesPending, IInvoiceByDateAndConditionMin } from "@/interfaces/Invoices"
import { getAllInvoicesMINByDateAndCondition, removeInvoice, 
  getAllTotalAmountInvoicePending, insertConditionInInvoice } from "@/app/api/routeInvoices"
import { showToastMessage, showToastMessageError } from "@/components/Alert";
import Table from "@/components/Table";
import { createColumnHelper } from "@tanstack/react-table";
import { CurrencyFormatter } from "@/app/functions/Globals";
import RemoveElement from "@/components/RemoveElement";
import Chip from "@/components/providers/Chip";
import { DocumentArrowDownIcon } from "@heroicons/react/24/solid";
import AddNewCollectionInvoice from "../AddNewCollectionInvoice";
import { Badge } from "@mui/material";
import Link from "next/link";
import Button from "@/components/Button";
import SearchInTable from "@/components/SearchInTable";
import { TbArrowNarrowLeft } from "react-icons/tb";
import AddNewSatInvoiceComponent from "./AddNewSatInvoiceComponent";
import {Tooltip} from "@nextui-org/react";
import TooltipContainerIcon from "@/components/tooltipIcons/TooltipContainerIcon";
import { useTableStates } from "@/app/store/tableStates";

import { DateRangePicker, DateRangePickerValue, } from "@tremor/react";
import { es } from "date-fns/locale"
import { Chip as ChipMui } from "@mui/material";
import ContainerSideNav from "@/components/ContainerSideNav";
import { propsTooltip } from "@/libs/animations";
import { getDate } from "@/libs/dates";

import { PDFDownloadLink } from "@react-pdf/renderer"
import { BsFileEarmarkPdf } from "react-icons/bs";
import DownloadInvoicesReportPDF from "../DownloadInvoicesReportPDF";
import { FaXmark } from "react-icons/fa6";
import {confirmAlert} from 'react-confirm-alert';

import { cancelFiscalApiInvoice } from "@/app/api/routeSatInvoices";
import { Options } from "@/interfaces/Common";
import Input from "@/components/Input";
import SelectReact from "@/components/SelectReact";
import { getCompanyTAXDATAFULL } from "@/app/api/routeSatInvoices";
import { ISatCompany } from "@/interfaces/SatInvoice";

export default function TableSatInvoicesComponent({token, user, company, optionsCancel}: 
  {token:string, user:string, company:string, optionsCancel:Options[]}) {

  const [invoices, setInvoices] = useState<IInvoiceByDateAndConditionMin[]>([]);
  const [selInvoice, setSelInvoice]=useState<IInvoiceTable>();
  const [showNewCollection, setShowNewCollection]=useState<boolean>(false);

  const [showNewInvoice, setShowNewinvoice]=useState<boolean>(false);
  const refEstimate = useRef('');
  const [totalInvoices, setTotalInvoices]=useState<ITotalAmountInvoicesPending>();

  const [widthPage, setWidthPage] = useState<number>(900);
  const [statuses, setStatuses]=useState<string[]>([]);

  const [step, setStep]=useState<number>(0);
  
  const handleStep = (value: number) => {
    setStep(value);
  }

  const [rangeDate, setRangeDate] = useState<DateRangePickerValue>({
    from: new Date(new Date().getFullYear(), 0, 1),
    to: new Date(),
  });

  const handleShowForm = (value:boolean) => {
    setShowNewCollection(value);
  }

  const handleResize = () => {
    setWidthPage(Math.max(
      document.body.scrollWidth, document.documentElement.scrollWidth,
      document.body.offsetWidth, document.documentElement.offsetWidth,
      document.body.clientWidth, document.documentElement.clientWidth
    ));
  }

  useEffect(() => {
    window.addEventListener("resize", handleResize, false);
    setWidthPage(Math.max(
      document.body.scrollWidth, document.documentElement.scrollWidth,
      document.body.offsetWidth, document.documentElement.offsetWidth,
      document.body.clientWidth, document.documentElement.clientWidth
    ));
    return () => window.removeEventListener('scroll', handleResize);
  }, []);

  useEffect(() => {
    const fetch = async() => {
      const dataInvoices = {
        condition: ["678ed05cc5f08e8a0f36d5e1", "67d20e2959865f640af92682", "67d20cb359865f640af92638"]
      }

      const data = {
        conditionPayment: [],
        conditionIssued: [
            "67d20cb359865f640af92638"
        ],
        conditionOverdue: [
            "67d20cb359865f640af92638","67d20e2959865f640af92682"
        ]
      }
      
      const [res, rest] = await Promise.all([
        getAllInvoicesMINByDateAndCondition(token, (rangeDate?.from?.toISOString().substring(0, 10) || ''), (rangeDate?.to?.toISOString().substring(0, 10) || ''), dataInvoices),
        getAllTotalAmountInvoicePending(token, '2025-01-01', '2025-12-31', data)
      ]);
      
      if(typeof(res)==='string'){
        showToastMessageError(res);
      }else{
        setInvoices(res);
      }

      if(typeof(rest)==='string'){
        showToastMessageError(rest);
      }else{
        setTotalInvoices(rest);
      }
    }

    fetch();
  }, []);

  const delInvoice = (id:string) => {
    window.location.reload();
  }

  const addStatus = (status:string) => {
    const newStatus = [...statuses, status];
    setStatuses(newStatus);
    if(rangeDate.from && rangeDate.to){
      handleFilter(rangeDate.from, rangeDate.to, newStatus);
    }else{
      showToastMessageError('Seleccione un rango de fechas para filtrar');
    }
  }

  const deleteStatus = (status:string) => {
    const newStatus = statuses.filter((s) => s !== status);
    setStatuses(newStatus);
    if(rangeDate.from && rangeDate.to){
      handleFilter(rangeDate.from, rangeDate.to, newStatus);
    }else{
      showToastMessageError('Seleccione un rango de fechas para filtrar');
    }
  }

  const handleFilter = (dateS:Date, dateE:Date, arrStatuses:Array<string>) => {
    updateTotal(getDate(dateS), getDate(dateE), arrStatuses);
  }

  const updateView = () => {
    updateTotal(getDate(rangeDate.from ?? new Date()), getDate(rangeDate.to ?? new Date()), statuses);
  }

  const columnHelper = createColumnHelper<IInvoiceTable>();
 
  // const sendDataInvoice = async() => {
  //   const data={
  //       "versionCode": "4.0",
  //       "series": "F",
  //       "date": "2026-05-06",
  //       "paymentFormCode": "99",
  //       "paymentMethodCode": "PPD",
  //       "currencyCode": "MXN",
  //       "typeCode": "I",
  //       "expeditionZipCode": "20000",
  //       "paymentConditions": "CondicionesDePago",
  //       "exchangeRate": 1,
  //       "exportCode": "01",
  //       "issuer": {
  //           "tin": "EKU9003173C9",
  //           "legalName": "ESCUELA KEMPER URGATE",
  //           "taxRegimeCode": "601",
  //           "taxCredentials": [
  //               {
  //                   "base64File": "MIIFsDCCA5igAwIBAgIUMzAwMDEwMDAwMDA1MDAwMDM0MTYwDQYJKoZIhvcNAQELBQAwggErMQ8wDQYDVQQDDAZBQyBVQVQxLjAsBgNVBAoMJVNFUlZJQ0lPIERFIEFETUlOSVNUUkFDSU9OIFRSSUJVVEFSSUExGjAYBgNVBAsMEVNBVC1JRVMgQXV0aG9yaXR5MSgwJgYJKoZIhvcNAQkBFhlvc2Nhci5tYXJ0aW5lekBzYXQuZ29iLm14MR0wGwYDVQQJDBQzcmEgY2VycmFkYSBkZSBjYWxpejEOMAwGA1UEEQwFMDYzNzAxCzAJBgNVBAYTAk1YMRkwFwYDVQQIDBBDSVVEQUQgREUgTUVYSUNPMREwDwYDVQQHDAhDT1lPQUNBTjERMA8GA1UELRMIMi41LjQuNDUxJTAjBgkqhkiG9w0BCQITFnJlc3BvbnNhYmxlOiBBQ0RNQS1TQVQwHhcNMjMwNTE4MTE0MzUxWhcNMjcwNTE4MTE0MzUxWjCB1zEnMCUGA1UEAxMeRVNDVUVMQSBLRU1QRVIgVVJHQVRFIFNBIERFIENWMScwJQYDVQQpEx5FU0NVRUxBIEtFTVBFUiBVUkdBVEUgU0EgREUgQ1YxJzAlBgNVBAoTHkVTQ1VFTEEgS0VNUEVSIFVSR0FURSBTQSBERSBDVjElMCMGA1UELRMcRUtVOTAwMzE3M0M5IC8gVkFEQTgwMDkyN0RKMzEeMBwGA1UEBRMVIC8gVkFEQTgwMDkyN0hTUlNSTDA1MRMwEQYDVQQLEwpTdWN1cnNhbCAxMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAtmecO6n2GS0zL025gbHGQVxznPDICoXzR2uUngz4DqxVUC/w9cE6FxSiXm2ap8Gcjg7wmcZfm85EBaxCx/0J2u5CqnhzIoGCdhBPuhWQnIh5TLgj/X6uNquwZkKChbNe9aeFirU/JbyN7Egia9oKH9KZUsodiM/pWAH00PCtoKJ9OBcSHMq8Rqa3KKoBcfkg1ZrgueffwRLws9yOcRWLb02sDOPzGIm/jEFicVYt2Hw1qdRE5xmTZ7AGG0UHs+unkGjpCVeJ+BEBn0JPLWVvDKHZAQMj6s5Bku35+d/MyATkpOPsGT/VTnsouxekDfikJD1f7A1ZpJbqDpkJnss3vQIDAQABox0wGzAMBgNVHRMBAf8EAjAAMAsGA1UdDwQEAwIGwDANBgkqhkiG9w0BAQsFAAOCAgEAFaUgj5PqgvJigNMgtrdXZnbPfVBbukAbW4OGnUhNrA7SRAAfv2BSGk16PI0nBOr7qF2mItmBnjgEwk+DTv8Zr7w5qp7vleC6dIsZFNJoa6ZndrE/f7KO1CYruLXr5gwEkIyGfJ9NwyIagvHHMszzyHiSZIA850fWtbqtythpAliJ2jF35M5pNS+YTkRB+T6L/c6m00ymN3q9lT1rB03YywxrLreRSFZOSrbwWfg34EJbHfbFXpCSVYdJRfiVdvHnewN0r5fUlPtR9stQHyuqewzdkyb5jTTw02D2cUfL57vlPStBj7SEi3uOWvLrsiDnnCIxRMYJ2UA2ktDKHk+zWnsDmaeleSzonv2CHW42yXYPCvWi88oE1DJNYLNkIjua7MxAnkNZbScNw01A6zbLsZ3y8G6eEYnxSTRfwjd8EP4kdiHNJftm7Z4iRU7HOVh79/lRWB+gd171s3d/mI9kte3MRy6V8MMEMCAnMboGpaooYwgAmwclI2XZCczNWXfhaWe0ZS5PmytD/GDpXzkX0oEgY9K/uYo5V77NdZbGAjmyi8cE2B2ogvyaN2XfIInrZPgEffJ4AB7kFA2mwesdLOCh0BLD9itmCve3A1FGR4+stO2ANUoiI3w3Tv2yQSg4bjeDlJ08lXaaFCLW2peEXMXjQUk7fmpb5MNuOUTW6BE=",
  //                   "fileType": 0,
  //                   "password": "12345678a"
  //               },
  //               {
  //                   "base64File": "MIIFDjBABgkqhkiG9w0BBQ0wMzAbBgkqhkiG9w0BBQwwDgQIAgEAAoIBAQACAggAMBQGCCqGSIb3DQMHBAgwggS/AgEAMASCBMh4EHl7aNSCaMDA1VlRoXCZ5UUmqErAbucoZQObOaLUEm+I+QZ7Y8Giupo+F1XWkLvAsdk/uZlJcTfKLJyJbJwsQYbSpLOCLataZ4O5MVnnmMbfG//NKJn9kSMvJQZhSwAwoGLYDm1ESGezrvZabgFJnoQv8Si1nAhVGTk9FkFBesxRzq07dmZYwFCnFSX4xt2fDHs1PMpQbeq83aL/PzLCce3kxbYSB5kQlzGtUYayiYXcu0cVRu228VwBLCD+2wTDDoCmRXtPesgrLKUR4WWWb5N2AqAU1mNDC+UEYsENAerOFXWnmwrcTAu5qyZ7GsBMTpipW4Dbou2yqQ0lpA/aB06n1kz1aL6mNqGPaJ+OqoFuc8Ugdhadd+MmjHfFzoI20SZ3b2geCsUMNCsAd6oXMsZdWm8lzjqCGWHFeol0ik/xHMQvuQkkeCsQ28PBxdnUgf7ZGer+TN+2ZLd2kvTBOk6pIVgy5yC6cZ+o1Tloql9hYGa6rT3xcMbXlW+9e5jM2MWXZliVW3ZhaPjptJFDbIfWxJPjz4QvKyJk0zok4muv13Iiwj2bCyefUTRz6psqI4cGaYm9JpscKO2RCJN8UluYGbbWmYQU+Int6LtZj/lv8p6xnVjWxYI+rBPdtkpfFYRp+MJiXjgPw5B6UGuoruv7+vHjOLHOotRo+RdjZt7NqL9dAJnl1Qb2jfW6+d7NYQSI/bAwxO0sk4taQIT6Gsu/8kfZOPC2xk9rphGqCSS/4q3Os0MMjA1bcJLyoWLp13pqhK6bmiiHw0BBXH4fbEp4xjSbpPx4tHXzbdn8oDsHKZkWh3pPC2J/nVl0k/yF1KDVowVtMDXE47k6TGVcBoqe8PDXCG9+vjRpzIidqNo5qebaUZu6riWMWzldz8x3Z/jLWXuDiM7/Yscn0Z2GIlfoeyz+GwP2eTdOw9EUedHjEQuJY32bq8LICimJ4Ht+zMJKUyhwVQyAER8byzQBwTYmYP5U0wdsyIFitphw+/IH8+v08Ia1iBLPQAeAvRfTTIFLCs8foyUrj5Zv2B/wTYIZy6ioUM+qADeXyo45uBLLqkN90Rf6kiTqDld78NxwsfyR5MxtJLVDFkmf2IMMJHTqSfhbi+7QJaC11OOUJTD0v9wo0X/oO5GvZhe0ZaGHnm9zqTopALuFEAxcaQlc4R81wjC4wrIrqWnbcl2dxiBtD73KW+wcC9ymsLf4I8BEmiN25lx/OUc1IHNyXZJYSFkEfaxCEZWKcnbiyf5sqFSSlEqZLc4lUPJFAoP6s1FHVcyO0odWqdadhRZLZC9RCzQgPlMRtji/OXy5phh7diOBZv5UYp5nb+MZ2NAB/eFXm2JLguxjvEstuvTDmZDUb6Uqv++RdhO5gvKf/AcwU38ifaHQ9uvRuDocYwVxZS2nr9rOwZ8nAh+P2o4e0tEXjxFKQGhxXYkn75H3hhfnFYjik/2qunHBBZfcdG148MaNP6DjX33M238T9Zw/GyGx00JMogr2pdP4JAErv9a5yt4YR41KGf8guSOUbOXVARw6+ybh7+meb7w4BeTlj3aZkv8tVGdfIt3lrwVnlbzhLjeQY6PplKp3/a5Kr5yM0T4wJoKQQ6v3vSNmrhpbuAtKxpMILe8CQoo=",
  //                   "fileType": 1,
  //                   "password": "12345678a"
  //               }
  //           ]
  //       },
  //       "recipient": {
  //           "tin": "URE180429TM6",
  //           "legalName": "UNIVERSIDAD ROBOTICA ESPAÑOLA",
  //           "zipCode": "86991",
  //           "taxRegimeCode": "601",
  //           "cfdiUseCode": "G03",
  //           "email": "mail@domain.com"
  //       },
  //       "items": [
  //           {
  //               "itemCode": "50211503",
  //               "ItemSku": "123abc",
  //               "quantity": 1,
  //               "unitOfMeasurementCode": "H87",
  //               "description": "Cigarros",
  //               "unitPrice": 100000.00,
  //               "taxObjectCode": "02",
  //               "itemTaxes": [
  //                   {
  //                       "taxCode": "002",
  //                       "taxTypeCode": "Tasa",
  //                       "taxRate": 0.160000,
  //                       "taxFlagCode": "T"
  //                   },
  //                   {
  //                       "taxCode": "001",
  //                       "taxTypeCode": "Tasa",
  //                       "taxRate": 0.100000,
  //                       "taxFlagCode": "R"
  //                   },
  //                   {
  //                       "taxCode": "002",
  //                       "taxTypeCode": "Tasa",
  //                       "taxRate": 0.106666,
  //                       "taxFlagCode": "R"
  //                   }
  //               ]
  //           }
  //       ]
  //   }

  //   // console.log(data);
  //   // console.log('json data', JSON.stringify(data));
  //   const res = await createFiscalApiInvoice(data);
  //   if(typeof(res)==='string'){
  //     showToastMessageError(res);
  //   }else{
  //     showToastMessage('Factura creada correctamente');
  //   }
  // }
  
  const columns = [
    columnHelper.accessor(row => row.id, {
      id: 'Accion',
      cell: ({row}) => (
        <div className="flex gap-x-2">
          <input type="checkbox" 
            checked={row.getIsSelected()}
            onChange={row.getToggleSelectedHandler()}
          />
          < RemoveElement id={ row.original.idEstimates? `${row.original.id}/${row.original.idEstimates}`: `${row.original.id}`} 
                      name={row.original.estimate ?? row.original.folio} remove={removeInvoice} 
                      removeElement={delInvoice} token={token} />

          {row.original.accountreceivablesCount==0 && row.original.condition.name.toLowerCase()!='cancelada' && (
            <Tooltip closeDelay={0} delay={100} motionProps={propsTooltip} content='Cancelar' 
              placement="right" className="text-black bg-white rounded-md border border-slate-400">
                <FaXmark className="h-6 w-6 text-red-500 hover:bg-blue-100 cursor-pointer hover:text-red-300"
                  onClick={() => abrirDialogo(token, row.original.id, user, updateView, optionsCancel, company, row.original.uuid) }
                />
            </Tooltip> 
          )}      
          
          {row.original.ischargedfull? (
            <Tooltip closeDelay={0} delay={100} motionProps={propsTooltip} content='Cobrada' 
              placement="right" className="text-black bg-white rounded-md border border-slate-400">
                {row.original.accountreceivablesCount > 0? (
                  <Badge color="secondary" badgeContent={row.original.accountreceivablesCount}>
                    <DocumentArrowDownIcon className="h-6 w-6 hover:bg-blue-100 text-green-500 hover:text-green-300" />
                  </Badge> 
                ): (
                  <DocumentArrowDownIcon className="h-6 w-6 hover:bg-blue-100 text-green-500 hover:text-green-300" />
                )}
          </Tooltip>
          ): (
            <Tooltip closeDelay={0} delay={100} motionProps={propsTooltip} content='Cobrar' 
                placement="right" className="text-black bg-white rounded-md border border-slate-400">
              {row.original.accountreceivablesCount > 0? (
                <Badge color="secondary" badgeContent={row.original.accountreceivablesCount}>
                  <DocumentArrowDownIcon className="h-6 w-6 text-red-500 hover:bg-blue-100 cursor-pointer hover:text-red-300" onClick={() => {
                    refEstimate.current = row.original.id;
                    setSelInvoice(row.original);
                    setShowNewCollection(true);
                  }}/>
                </Badge>
              ): (
                <DocumentArrowDownIcon className="h-6 w-6 text-red-500 hover:bg-blue-100 cursor-pointer hover:text-red-300" onClick={() => {
                  refEstimate.current = row.original.id;
                  setSelInvoice(row.original);
                  setShowNewCollection(true);
                }}/>
              )}
            </Tooltip>
          )}
        </div>
      ),
      size: 300,
      enableSorting:false,
      header: ({table}:any) => (
        <div className="flex gap-x-2 items-center">
          <input type="checkbox"
            checked={table.getIsAllRowsSelected()}
            onClick={()=> {
              table.toggleAllRowsSelected(!table.getIsAllRowsSelected())
            }}
          />
          <p>Accion</p>
        </div>
      )
    }),
    columnHelper.accessor('folio', {
      header: 'Folio',
      id: 'folio',
      cell: ({row}) => (
        <p className="cursor-pointer"
        onClick={() => window.location.replace(`/projects/estimates/${row.original.project}/invoice/${row.original.id}?page=invoices`)}
        >{row.original.folio}</p>
      ),
    }),
    columnHelper.accessor('nameProject', {
      header: 'Proyecto',
      id: 'proyecto',
      cell: ({row}) => (
        <p className="cursor-pointer"
        onClick={() => window.location.replace(`/projects/estimates/${row.original.project}/invoice/${row.original.id}?page=invoices`)}
        >{row.original.nameProject}</p>
      ),
    }),
    columnHelper.accessor('client', {
      header: 'Cliente',
      id: 'cliente',
      cell: ({row}) => (
        <p className="cursor-pointer"
        onClick={() => window.location.replace(`/projects/estimates/${row.original.project}/invoice/${row.original.id}?page=invoices`)}
        >{row.original.client}</p>
      ),
    }),
    columnHelper.accessor('usecfdi', {
      header: 'Uso CFDI',
      id: 'cdfi',
      cell: ({row}) => (
        <p className="cursor-pointer"
        onClick={() => window.location.replace(`/projects/estimates/${row.original.project}/invoice/${row.original.id}?page=invoices`)}
        >{row.original.usecfdi}</p>
      ),
    }),
    columnHelper.accessor('estimate', {
      header: 'Estimacion',
      id: 'estimacion',
      cell: ({row}) => (
        <p className="py-2 font-semibold cursor-pointer"
        onClick={() => window.location.replace(`/projects/estimates/${row.original.project}/invoice/${row.original.id}?page=invoices`)}
        >{row.original.estimate}</p>
      )
    }),
    columnHelper.accessor('condition', {
      header: 'Condicion',
      id: 'condicion',
      cell: ({row}) => (
        <Chip label={row.original.condition.name} color={row.original.condition.color} darktext={row.original?.condition?.darktext?? false} />
      ),
    }),
    columnHelper.accessor('fecha', {
      header: 'Fecha',
      id: 'fecha',
      cell: ({row}) => (
        <p className="cursor-pointer"
        onClick={() => window.location.replace(`/projects/estimates/${row.original.project}/invoice/${row.original.id}?page=invoices`)}
        >{row.original.fecha.substring(0, 10)}</p>
      ),
    }),
    columnHelper.accessor('amount', {
      header: 'Monto',
      id: 'monto',
      cell: ({row}) => (
        <p className="cursor-pointer"
        onClick={() => window.location.replace(`/projects/estimates/${row.original.project}/invoice/${row.original.id}?page=invoices`)}
        >{CurrencyFormatter({
          currency: 'MXN',
          value: row.original.amount
        })}</p>
      ),
    }),
    columnHelper.accessor('charged', {
      header: 'Cobrado',
      id: 'cobrado',
      cell: ({row}) => (
        <p className="cursor-pointer"
        onClick={() => window.location.replace(`/projects/estimates/${row.original.project}/invoice/${row.original.id}?page=invoices`)}
        >{CurrencyFormatter({
          currency: 'MXN',
          value: row.original.charged
        })}</p>
      ),
    }),
    columnHelper.accessor('unchargedbalanceamount', {
      header: 'Pendiente',
      id: 'pendiente',
      cell: ({row}) => (
        <p className="cursor-pointer"
        onClick={() => window.location.replace(`/projects/estimates/${row.original.project}/invoice/${row.original.id}?page=invoices`)}
        >{CurrencyFormatter({
          currency: 'MXN',
          value: row.original.unchargedbalanceamount
        })}</p>
      ),
    }),
  ]

  const updateTotal = async (dateI:string, dateF:string, statuses:string[]) => {
    const data = {
      conditionPayment: statuses,
      conditionIssued: [
          "67d20cb359865f640af92638"
      ],
      conditionOverdue: [
          "67d20cb359865f640af92638","67d20e2959865f640af92682"
      ]
    }

    const dataInvoices = {
      condition: statuses
    }

    const [res, rest] = await Promise.all([
      getAllInvoicesMINByDateAndCondition(token, dateI, dateF, dataInvoices),
      getAllTotalAmountInvoicePending(token, dateI, dateF, data)
    ]);
    
    if(typeof(rest)==='string'){
      showToastMessageError(rest);
    }else{
      setTotalInvoices(rest);
    }

    if(typeof(res)==='string'){
      showToastMessageError(res);
    }else{
      setInvoices(res);
    }
  }

  const handleDate = (dateI: Date, dateF: Date) => {
    handleFilter(dateI, dateF, statuses);
    
    //actualizar total con el rango de fechas
    updateTotal(getDate(dateI), getDate(dateF), statuses);
  }

  const data = InvoiceDataToTableData(invoices);
      //xl:order-1 en el primer div
  let filterElemnts =<div className="lg:flex gap-x-4 justify-end items-center mt-3 md:mt-0 flex-wrap 2xl:flex-nowrap">
                        <div className="flex gap-x-4 gap-y-2 justify-end items-center flex-wrap sm:flex-nowrap">
                          <ChipStatus id="67d20cb359865f640af92638" addStatus={addStatus} removeStatus={deleteStatus} title="Emitida" />
                          <ChipStatus id="67be2eb9b2df60407a559542" addStatus={addStatus} removeStatus={deleteStatus} title="Vencida" />
                          <ChipStatus id="678ed05cc5f08e8a0f36d5e1" addStatus={addStatus} removeStatus={deleteStatus} title="Pagada" />
                          <ChipStatus id="67d20e2959865f640af92682" addStatus={addStatus} removeStatus={deleteStatus} title="Pagada parcial" />
                          <ChipStatus id="678ecf6ec5f08e8a0f36d5dd" addStatus={addStatus} removeStatus={deleteStatus} title="Cancelada" />
                        </div>
                        <div className="flex gap-x-4 justify-end items-center">
                          <DateRangePicker 
                            className='mt-2'
                            placeholder='Seleccione un rango de fechas'
                            onValueChange={(e) => {
                              setRangeDate(e);
                              if(e.from && e.to){
                                handleDate(e.from, e.to);
                              }
                            }}
                            value={rangeDate}
                            locale={es}
                          />
                        </div>
                      </div>

  return(
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-3 gap-y-3">
        <Card amount={totalInvoices?.totalInvoicesPayment?.total || 0} title="Pagadas" footer={(totalInvoices?.totalInvoicesPayment?.quantity || 0)+" facturas"}></Card>
        <Card amount={totalInvoices?.totalInvoiceIssued?.total || 0} title="Emitidas" footer={(totalInvoices?.totalInvoiceIssued?.quantity || 0)+" facturas"}></Card>
        <Card amount={totalInvoices?.totalInvoiceOverdue?.total || 0} title="Vencidas" footer={(totalInvoices?.totalInvoiceOverdue?.quantity || 0)+" facturas"}></Card>
        <Card amount={0} title="Total" footer="0 facturas"></Card>
      </div>

      <div className="2xl:hidden mt-5 justify-between gap-x-2">
        <div className="flex items-center w-full">
          <Link href={'/'}>
            <TooltipContainerIcon label="Regresar">
              <div className="p-1 border border-slate-400 bg-white rounded-md hover:bg-blue-100">
                <TbArrowNarrowLeft className="w-10 h-10 text-slate-600" />
              </div>
            </TooltipContainerIcon>
          </Link>
          <p className="text-xl ml-4 font-medium">Facturas</p>
          <div className="flex-1 flex justify-end sm:hidden">
            <Button onClick={() => setShowNewinvoice(true)}>Nueva</Button>
          </div>
        </div>
        <div className="xl:flex lg:gap-x-3 items-center">
          {/* <div className={`flex gap-x-3 gap-y-3 w-full justify-end mt-3 xl:order-2`}> */}
          <div className={`flex gap-x-3 gap-y-3 w-full justify-end mt-3`}>
            <div className="flex-1 flex justify-end">
              <SearchInTable placeH={"Buscar factura.."} />
            </div>
            <PDFDownloadLink document={<DownloadInvoicesReportPDF fechaFin={rangeDate?.to} fechaIni={rangeDate?.from} invoices={invoices} />} fileName={'Facturacion'} >
              {({loading, url, error, blob}) => 
                loading? (
                  <Tooltip closeDelay={0} delay={100} motionProps={propsTooltip} content='Informe' 
                      placement="right" className="text-blue-500 bg-white rounded-md border border-slate-400">
                    <BsFileEarmarkPdf className="w-8 h-8 text-slate-500" />
                  </Tooltip>
                ) : (
                  <Tooltip closeDelay={0} delay={100} motionProps={propsTooltip} content='Informe' 
                      placement="right" className="text-blue-500 bg-white rounded-md border border-slate-400">
                    <BsFileEarmarkPdf className="w-8 h-8 text-green-500" />
                  </Tooltip>
                ) }
            </PDFDownloadLink>
            <div className="hidden sm:flex justify-end">
              <Button onClick={() => setShowNewinvoice(true)}>Nueva</Button>
            </div>
          </div>
          {filterElemnts}
        </div>
      </div>

      {/* <Button onClick={sendDataInvoice}>Prueba Factura</Button> */}

      <div className="hidden 2xl:flex justify-between flex-wrap sm:flex-nowrap gap-x-5 gap-y-2 items-center mt-5">
        <div className="flex items-center w-full max-w-96">
          <Link href={'/'}>
            <TooltipContainerIcon label="Regresar">
              <div className="p-1 border border-slate-400 bg-white rounded-md hover:bg-blue-100">
                <TbArrowNarrowLeft className="w-10 h-10 text-slate-600" />
              </div>
            </TooltipContainerIcon>
          </Link>
          <p className="text-xl ml-4 font-medium">Facturas</p>
        </div>
        <div className={`flex gap-x-3 gap-y-3 w-full justify-end`}>
          <div className="">
            <SearchInTable placeH={"Buscar factura.."} />
          </div>
          <div className={''}>
            <div className="flex gap-x-4 gap-y-4 justify-end items-center">
              {filterElemnts}
              <PDFDownloadLink document={<DownloadInvoicesReportPDF fechaFin={rangeDate?.to} fechaIni={rangeDate?.from} invoices={invoices} />} fileName={'Facturacion'} >
                {({loading, url, error, blob}) => 
                  loading? (
                    <Tooltip closeDelay={0} delay={100} motionProps={propsTooltip} content='Informe' 
                        placement="right" className="text-blue-500 bg-white rounded-md border border-slate-400">
                      <BsFileEarmarkPdf className="w-8 h-8 text-slate-500" />
                    </Tooltip>
                  ) : (
                    <Tooltip closeDelay={0} delay={100} motionProps={propsTooltip} content='Informe' 
                        placement="right" className="text-blue-500 bg-white rounded-md border border-slate-400">
                      <BsFileEarmarkPdf className="w-8 h-8 text-green-500" />
                    </Tooltip>
                  ) }
              </PDFDownloadLink>
              <Button onClick={() => setShowNewinvoice(true)}>Nueva</Button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="hidden md:block w-full">
        <Table columns={columns} data={data} placeH="buscar factura" typeTable="invoices" />
      </div>
      <div className="block md:hidden w-full mt-3">
        <ListData data={data} token={token} delInvoice={delInvoice} updateView={updateView} user={user} 
          optionsCancel={optionsCancel} company={company} />
      </div>
      
      {showNewCollection && selInvoice && (
        <ContainerSideNav width="w-full max-w-xl">
          <AddNewCollectionInvoice showForm={handleShowForm} user={user}
               token={token} invoiceTable={selInvoice} company={company} />
        </ContainerSideNav>
      )}
{/* el index stepper se debe manejar desde aqui para poder manipular responsivo de los compoentnes */}
      <ContainerSideNav width={`w-full ${step > 1? 'max-w-3xl xl:max-w-[75%]': 'max-w-3xl'}`} open={showNewInvoice}>
        <AddNewSatInvoiceComponent showForm={setShowNewinvoice} isNew={showNewInvoice} token={token} 
          user={user} handleStep={handleStep} step={step} company={company} />
      </ContainerSideNav>
    </>
  )
}

function InvoiceDataToTableData(invoicess:IInvoiceByDateAndConditionMin[]){
  const table: IInvoiceTable[] = [];

  invoicess.map((inv) => {
    const aux = inv.useCFDI + '/' + inv.paymentMethod + '/' + inv.paymentWay;
    
    table.push({
      amount: inv.cost.total,
      condition: inv.condition,
      estimate: inv.estimate.name,
      fecha: inv.date,
      folio: inv.folio,
      formpaid: inv.paymentWay,
      id: inv._id,
      methodpaid: inv.paymentMethod,
      usecfdi: aux,
      idEstimates:inv.estimate._id, 
      // charged: inv.accountreceivables?.length > 0? inv.accountreceivables[inv.accountreceivables.length-1].charged: 0,
      charged: inv.fullyCharged?? 0,
      unchargedbalanceamount: inv.accountreceivables?.length > 0 ? inv.accountreceivables[inv.accountreceivables.length-1].unchargedbalanceamount: 0,
      previousBalance: inv.accountreceivables?.length > 0? inv.accountreceivables[inv.accountreceivables.length-1].previousbalanceamount: 0,
      accountreceivablesCount: inv.accountreceivables[inv.accountreceivables.length - 1].partialitynumber,
      ischargedfull: inv.ischargedfull,
      project: inv.project._id,
      nameProject: inv.project.title,
      client: inv.client.name,
      subtotal:inv.cost.subtotal?? 0,
      vat:inv.cost.iva?? 0,
      uuid: inv.taxfolio
    })
  });

  return table;
}

const ListData = ({data, token, delInvoice, updateView, user, optionsCancel, company }: 
  {data: IInvoiceTable[], token:string, delInvoice: (id: string) => void, user:string, 
    updateView: () => void, optionsCancel:Options[], company:string }) => {

  const {search} = useTableStates();

  let filterData = [];
  if(search.trim() === ''){
    filterData=data;
  }else{
    const d = data.filter(item => item.folio.toLowerCase().includes(search.toLowerCase()));
    filterData=d;
  }

  return(
    <div>
      <div className="relative flex flex-col text-gray-700 bg-white shadow-md w-full rounded-xl bg-clip-border] h-[calc(100vh-249px)]">
        <nav className="flex w-full flex-col gap-1 p-2 font-sans text-base font-normal text-blue-gray-700
          overflow-scroll overflow-y-auto overflow-x-hidden" style={{scrollbarColor: '#ada8a8 white', scrollbarWidth: 'thin'}}>

          {filterData.map((i) => (
            <CardInvoice invoice={i} key={i.id} token={token} delInvoice={delInvoice} updateView={updateView} user={user} 
              optionsCancel={optionsCancel} company={company} />
          ))}

        </nav>
      </div>
    </div>
  )
}

const CardInvoice = ({invoice, token, delInvoice, updateView, user, optionsCancel, company }: 
  {invoice:IInvoiceTable, token:string, delInvoice: (id: string) => void, user:string, updateView: () => void, 
    optionsCancel:Options[], company:string}) => {
  
  return(
    <div role="button"
      key={invoice.id}
      className={`flex items-center justify-between w-full p-3 leading-tight transition-all rounded-lg 
        outline-none text-start hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 
        focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 
        active:bg-opacity-80 active:text-blue-gray-900 border-b border-slate-300 
        bg-white`}
      // onClick={() => window.location.replace(`/projects/estimates/${invoice.project}/invoice/${invoice.id}?page=invoices`)}
    >
      <div className="flex items-center w-full ">
        <div className="grid mr-4 place-items-center">
          <RemoveElement id={ invoice.idEstimates? `${invoice.id}/${invoice.idEstimates}`: `${invoice.id}`} 
                    name={invoice.estimate ?? invoice.folio} remove={removeInvoice} 
                    removeElement={delInvoice} token={token} />
          
          {invoice.accountreceivablesCount == 0 && (
            <Tooltip closeDelay={0} delay={100} motionProps={propsTooltip} content='Cancelar' 
              placement="right" className="text-black bg-white rounded-md border border-slate-400">
                <FaXmark className="h-6 w-6 text-red-500 hover:bg-blue-100 cursor-pointer hover:text-red-300"
                  onClick={() => abrirDialogo(token, invoice.id, user, updateView, optionsCancel, company, invoice.uuid) }
                />
            </Tooltip> 
          )}

          {invoice.ischargedfull? (
            <Tooltip closeDelay={0} delay={100} motionProps={propsTooltip} content='Cobrada' 
              placement="right" className="text-black bg-white rounded-md border border-slate-400">
                {invoice.accountreceivablesCount > 0? (
                  <Badge color="secondary" badgeContent={invoice.accountreceivablesCount}>
                    <DocumentArrowDownIcon className="h-6 w-6 hover:bg-blue-100 text-green-500 hover:text-green-300" />
                  </Badge> 
                ): (
                  <DocumentArrowDownIcon className="h-6 w-6 hover:bg-blue-100 text-green-500 hover:text-green-300" />
                )}
          </Tooltip>
          ): (
            <Tooltip closeDelay={0} delay={100} motionProps={propsTooltip} content='Cobrar' 
                placement="right" className="text-black bg-white rounded-md border border-slate-400">
              {invoice.accountreceivablesCount > 0? (
                <Badge color="secondary" badgeContent={invoice.accountreceivablesCount}>
                  <DocumentArrowDownIcon className="h-6 w-6 text-red-500 hover:bg-blue-100 cursor-pointer hover:text-red-300" onClick={() => {
                    // refEstimate.current = invoice.id;
                    // setSelInvoice(invoice);
                    // setShowNewCollection(true);
                  }}/>
                </Badge>
              ): (
                <DocumentArrowDownIcon className="h-6 w-6 text-red-500 hover:bg-blue-100 cursor-pointer hover:text-red-300" onClick={() => {
                  // refEstimate.current = invoice.id;
                  // setSelInvoice(row.original);
                  // setShowNewCollection(true);
                }}/>
              )}
            </Tooltip>
          )}
        </div>
        <div className="w-full"
          onClick={() => window.location.replace(`/projects/estimates/${invoice.project}/invoice/${invoice.id}?page=invoices`)}
        >
          <div className="flex gap-x-3 w-full justify-between items-center p-3">
            <div>
              <h6
                className="block font-sans text-sm antialiased font-semibold leading-relaxed tracking-normal text-gray-600 ">
                {invoice.nameProject}
              </h6>
              <p className="block font-sans text-sm antialiased font-normal leading-normal text-gray-600">
                {invoice.folio}
              </p>
            </div>
            <div className="text-right">
              <p className="block font-sans text-2xl antialiased font-normal leading-normal text-blue-600">
                {CurrencyFormatter({
                  currency: 'MXN',
                  value: invoice.amount
                })}
              </p>
              <p className="block font-sans text-xs antialiased font-normal leading-normal text-gray-600">
                {CurrencyFormatter({
                  currency: 'MXN',
                  value: invoice.charged
                })}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export const Card = ({amount, title, footer}: {title:string, amount:number, footer:string}) => {
  return(
    <div className="p-3 flex gap-x-3 items-center bg-white shadow-md shadow-slate-300 rounded-md">
      <div>
        <p className="text-slate-600">{title}</p>
        <p className="text-xl font-bold">{CurrencyFormatter({
          currency: 'MXN',
          value: amount
        })}</p>
        <p className="text-xs text-slate-400">{footer}</p>
      </div>
    </div>
  )
}

const ChipStatus = ({ addStatus, id, removeStatus, title}: 
  {title:string, id:string, addStatus:Function, removeStatus:Function}) => {
  const [active, setActive] = useState<boolean>(false);

  const view = active? 
                  <ChipMui label={title} className="p-3" color="success" onClick={() => {removeStatus(id); setActive(false)}}>
                  </ChipMui>: 
                  <ChipMui label={title} color="default" onClick={() => {addStatus(id); setActive(true)}}></ChipMui>

  return(
    <>
      {view }
    </>
  )
}

// const abrirDialogo = async (token:string, id:string, user:string, updateView: () => void) => {

//   const DeleteModal = ({ onClose }: { onClose: () => void }) => {
//     const [comentario, setComentario] = useState("");
//     const [error, setError] = useState(false);
//     const [flash, setFlash] = useState(false);

//     const handleEliminar = async () => {
//       if (!comentario.trim()) {
//         // Efecto parpadeante
//         setError(true);
//         setFlash(true);
//         let flashes = 0;
//         const interval = setInterval(() => {
//           setFlash(f => !f);
//           flashes++;
//           if (flashes >= 4) clearInterval(interval);
//         }, 200);
//         return;
//       }

//       const data={
//         condition: [{
//           glossary:"678ecf6ec5f08e8a0f36d5dd", 
//           user
//         }],
//         notes: comentario
//       }

//       // Tu lógica de eliminación
//       const res = await insertConditionInInvoice(token, id, data);
//       // console.log('respuesta => ', res);
//       if(typeof(res)==='string'){
//         showToastMessageError(res);
//       }else{
//         showToastMessage("Factura cancelada exitosamente!!!");
//         updateView();
//         onClose();
//       }
//     };

//     return (
//       <div className="custom-ui">
//         <h2 style={{ color: flash ? "red" : "#111827", transition: "color 0.2s" }}>
//           {error ? "¡Debe escribir una razon!" : "Confirmación para cancelar"}
//         </h2>

//         <p>¿Desea cancelar la factura?</p>

//         <textarea
//           placeholder="Agregar una razon obligatoria..."
//           value={comentario}
//           onChange={(e) => { setComentario(e.target.value); setError(false); }}
//         />

//         {error && !comentario.trim() && (
//           <p style={{ color: "red", fontSize: "0.9rem", marginTop: "5px" }}>
//             Por favor escriba una razon antes de continuar
//           </p>
//         )}

//         <div>
//           <button className="yes" onClick={handleEliminar}>Sí</button>
//           <button className="no" onClick={onClose}>No</button>
//         </div>
//       </div>
//     );
//   };

//   confirmAlert({
//     customUI: ({ onClose }) => <DeleteModal onClose={onClose} />,
//   });
// };

const abrirDialogo = async (token:string, id:string, user:string, 
  updateView: () => void, cancelOptions:Options[], company:string, uuid:string) => {

  const DeleteModal = ({ onClose, company }: { onClose: () => void, company:string }) => {
    const [comentario, setComentario] = useState("");
    const [error, setError] = useState(false);
    const [flash, setFlash] = useState(false);
    const [cfdireplace, setCfdireplace]=useState<string>();
    const [cancelmotive, setCancelMotive]=useState<string>(cancelOptions[0].value);
    // const [uuid, setUuid]=useState<string>();
    // const [company, setCompany] = useState<ISatCompany>();

    const handleEliminar = async () => {
      if (!comentario.trim()) {
        // Efecto parpadeante
        setError(true);
        setFlash(true);
        let flashes = 0;
        const interval = setInterval(() => {
          setFlash(f => !f);
          flashes++;
          if (flashes >= 4) clearInterval(interval);
        }, 200);
        return;
      }

      const rescompany=await Promise.all([
        getCompanyTAXDATAFULL(company, token)
      ]);

      if(typeof(rescompany)==='string'){
        showToastMessageError(rescompany);
      }else{
        // console.log('Company rescompany => ', res[0][0]);
        // setCompany(rescompany[0][0]);
        const taxcompany:ISatCompany=rescompany[0][0];

        const requestModel= {
          // versionCode: "4.0",
          // series: "F",
          // date: new Date().toISOString().slice(0, 19),
          // invoiceUuid: "60c52802-c369-411f-b679-5317a28a544a", // UUID de la factura
          // invoiceUuid:"1c7de47d-9224-4dc2-a1fb-4109537bf913",
          invoiceUuid:uuid,
          // tin: "FUNK671228PH6", // RFC del emisor
          tin: taxcompany.issuer.tin,
          cancellationReasonCode: cancelmotive, // Comprobante emitido con errores con relación
          replacementUuid: cfdireplace, // UUID de la factura que sustituye
          taxCredentials: taxcompany.issuer.taxCredentials
        };

        // const rescancel: IResponseSatInvoice|string = await cancelFiscalApiInvoice(requestModel);
        const rescancel = await cancelFiscalApiInvoice(requestModel);
        if(typeof(rescancel)==='string'){
          showToastMessageError(rescancel);
        }else{
          showToastMessage('Factura cancelada exitosamente...');
        }

        const data={
          condition: [{
            glossary:"678ecf6ec5f08e8a0f36d5dd", 
            user
          }],
          notes: comentario
        }

        // Tu lógica de eliminación
        const res = await insertConditionInInvoice(token, id, data);
        // console.log('respuesta => ', res);
        if(typeof(res)==='string'){
          showToastMessageError(res);
        }else{
          showToastMessage("Factura cancelada exitosamente!!!");
          updateView();
          onClose();
        }
      }
    };

    const handleMotive=(value:string) => {
      setCancelMotive(value);
    }

    return (
      <div className="custom-ui">
        <h2 style={{ color: flash ? "red" : "#111827", transition: "color 0.2s" }}>
          {error ? "¡Debe escribir una razon!" : "Confirmación para cancelar"}
        </h2>

        <p className="text-left">Agregar razon</p>

        <textarea
          placeholder="Agregar una razon obligatoria..."
          value={comentario}
          autoFocus
          onChange={(e) => { setComentario(e.target.value); setError(false); }}
        />

        {error && !comentario.trim() && (
          <p style={{ color: "red", fontSize: "0.9rem", marginTop: "5px" }}>
            Por favor escriba una razon antes de continuar
          </p>
        )}

        {/*<p className="text-left mt-4">UUID</p>
        <Input value={uuid} onChange={(e) => setUuid(e.target.value)} /> */}

        <p className="text-left">Motivo de cancelacion</p>
        <SelectReact index={0} opts={cancelOptions} setValue={handleMotive} />

        <p className="text-left mt-4">CFDI de reemplazo</p>
        <Input value={cfdireplace} onChange={(e) => setCfdireplace(e.target.value)} />

        <div>
          <button className="yes" onClick={handleEliminar}>Sí</button>
          <button className="no" onClick={onClose}>No</button>
        </div>
      </div>
    );
  };

  confirmAlert({
    customUI: ({ onClose }) => <DeleteModal onClose={onClose} company={company} />,
  });
};