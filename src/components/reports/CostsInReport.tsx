import ProfileReport from "./ProfileReport"
import UpdateReport from "./UpdateReport"
import { Options } from "@/interfaces/Common"
import { CostsTable, Report } from "@/interfaces/Reports"
import Chip from "../providers/Chip"
import Label from "../Label"
import Table from "../Table"

import { createColumnHelper } from "@tanstack/react-table"
import { Expense } from "@/interfaces/Expenses"
import { CostsDataToTableData } from "@/app/functions/ReportsFunctions"
import DeleteElement from "../DeleteElement"
import { RemoveCost } from "@/app/api/routeCost"

export default function CostsInReport({report}: {report:Report}) {
  
  const costs: Expense[] = getCosts();
  const data = CostsDataToTableData(costs);
  
  return (
    <>
      <div className="flex w-full max-w-5xl px-2 flex-wrap space-x-2" 
          style={{'backgroundColor': '#F8FAFC'}}>
        <div className="grid grid-cols-3 gap-x-3 mt-2">
          <div className="flex gap-x-2 bg-white p-3 rounded-lg shadow-md">
            <div>
              <img src={ report.project.photo? report.project.photo: '/img/projects/default.svg'} alt="logo" 
                className="max-w-28 h-auto" />
            </div>
            <div>
              <p className="text-blue-500">{report.project.title}</p>
              <p className="text-slate-500">{report.project.code}</p>
              <p className="text-slate-500">{report.project.types.name}</p>
              <p className="text-slate-500">{report.project.account}</p>
            </div>
          </div>
          
          <div className=" bg-white p-3 rounded-lg shadow-md py-2">
            <div className="flex gap-x-2 justify-between">
              <div>
                <img src={report.company.logo} alt="logo" className="w-16 h-auto" />
              </div>
              <div>
                <p className="text-slate-700">{report.company.name}</p>
                <p className="text-blue-600">{report.department.name}</p>
              </div>
              <div>
                <Chip label={report.moves[report.moves.length -1]?.condition?.name || 'sin status'} />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-x-2 my-2">
              <div className="">
                <p className="text-slate-500">Total</p>
                <p className="text-green-600 font-semibold">{'$8,934.22'}</p>
              </div>
              <div className="">
                <p className="text-slate-500">Nº gastos</p>
                <p className="text-red-500 font-semibold">{'22'}</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 bg-white p-3 rounded-lg shadow-md py-2 ">
            <div className=" border-r-1 border-slate-700 p-2">
              <Label>Fecha</Label>
              <p className="text-lg text-blue-600 mt-2">{report.date.substring(0, 10)}</p>
            </div>
            <div className="p-2">
              <Label>Comentarios</Label>
              <p className="text-blue-600 mt-2 text-sm">{report.comment}</p>
            </div>
          </div>

        </div>

        <div className="mt-5 bg-white">
          <CostsTableInReport data={data} />
        </div>

      </div>
    </>
  )
}

function CostsTableInReport({data}: {data: CostsTable[]}){
  
  const columnHelper = createColumnHelper<CostsTable>();
  
  const columns = [
    columnHelper.accessor(row => row.id, {
      id: 'seleccion',
      cell: ({row}) => (
        <div className="flex gap-x-2">
          <input type="checkbox" 
            checked={row.getIsSelected()}
            onChange={row.getToggleSelectedHandler()}
          />
        </div>
      ),
      enableSorting:false,
      header: ({table}:any) => (
        <input type="checkbox"
          checked={table.getIsAllRowsSelected()}
          onClick={()=> {
            table.toggleAllRowsSelected(!table.getIsAllRowsSelected())
          }}
        />
      )
    }),
    columnHelper.accessor('Responsable', {
      id: 'Responsable',
      cell: ({row}) => (
        <div className="flex gap-x-1 items-center">
          <img src={row.original.Responsable.photo} className="w-6 h-auto rounded-full" alt="user" />
          <DeleteElement id={row.original.id} name={row.original.Descripcion} remove={RemoveCost} token={''} />
        </div>
      ),
      enableSorting:false,
      header: () => (
        <p>Responsable</p>
      )
    }),
    columnHelper.accessor('Proyecto', {
      id: 'Proyecto',
      cell: ({row}) => (
        <p className="py-2 font-semibold">{row.original.Proyecto}</p>
      ),
      enableSorting:false,
      header: () => (
        <p>Proyecto</p>
      )
    }),
    columnHelper.accessor('Descripcion', {
      header: 'Descripcion',
      id: 'descripcion',
      cell: ({row}) => (
        <p className="">{row.original.Descripcion}</p>
      ),
    }),
    columnHelper.accessor('Proveedor', {
      header: 'Proveedor',
      id: 'proveedor',
      cell: ({row}) => (
        <p className="">{row.original.Proveedor}</p>
      ),
    }),
    columnHelper.accessor('Estatus', {
      header: 'Estatus',
      id: 'estatus',
      cell: ({row}) => (
        <Chip label={row.original.condition} />
      ),
    }),
    columnHelper.accessor('Fecha', {
      header: 'Fecha',
      id: 'fecha',
      cell: ({row}) => (
        <p className="">{row.original.Fecha?.substring(0, 10) || ''}</p>
      ),
    }),
    columnHelper.accessor('Importe', {
      header: 'Importe',
      id: 'importe',
      cell: ({row}) => (
        <p className="">{row.original.Importe}</p>
      ),
    }),
  ]

  return (
    <Table columns={columns} data={data} placeH="buscar costo" />
  )

}

function getCosts(){
  const costs: any[] = [
    {
        "_id": "6654e717238ea760fe52453a",
        "subtotal": 2343242,
        "description": "no deducible con cambio de imagen",
        "date": "2024-05-27T00:00:00.000Z",
        "taxapply": false,
        "ispaid": false,
        "files": [
            {
                "file": "https://docs-planner.s3.amazonaws.com/cost-file-0-1716840215040.jpeg",
                "types": "i",
                "_id": "6654e717238ea760fe52453b",
                "id": "6654e717238ea760fe52453b"
            }
        ],
        "user": {
            "_id": "65d3836974045152c0c4378c",
            "name": "Priciliano Palacios Hernandez",
            "photo": "https://docs-teltan.s3.amazonaws.com/user-1708360552272.jpeg",
            "department": {
                "_id": "65d3818774045152c0c43784",
                "name": "Mejora Continua",
                "company": {
                    "_id": "65d3813c74045152c0c4377e",
                    "name": "Palacios Construcciones",
                    "logo": "https://docs-teltan.s3.amazonaws.com/company-logo-1708359995145.jpeg",
                    "status": true,
                    "id": "65d3813c74045152c0c4377e"
                },
                "status": true,
                "id": "65d3818774045152c0c43784"
            },
            "status": true,
            "createAt": "2024-02-19T16:26:23.247Z"
        },
        "costcenter": {
            "_id": "6643967a1d9d759d3ba6b190",
            "name": "Materiales",
            "isnormal": true,
            "code": 801,
            "categorys": [
                {
                    "name": "Materiales directos",
                    "status": true,
                    "_id": "6643967a1d9d759d3ba6b191",
                    "id": "6643967a1d9d759d3ba6b191"
                },
                {
                    "name": "Materiales indirectos",
                    "status": true,
                    "_id": "6643967a1d9d759d3ba6b192",
                    "id": "6643967a1d9d759d3ba6b192"
                },
                {
                    "name": "Tablaroca",
                    "status": true,
                    "_id": "6643967a1d9d759d3ba6b193",
                    "id": "6643967a1d9d759d3ba6b193"
                },
                {
                    "name": "Durock",
                    "status": true,
                    "_id": "6643967a1d9d759d3ba6b195",
                    "id": "6643967a1d9d759d3ba6b195"
                },
                {
                    "name": "Aislantes",
                    "status": true,
                    "_id": "6643983d1d9d759d3ba6b220",
                    "id": "6643983d1d9d759d3ba6b220"
                }
            ],
            "status": true,
            "id": "6643967a1d9d759d3ba6b190"
        },
        "status": true,
        "condition": [],
        "__v": 0,
        "id": "6654e717238ea760fe52453a"
    },
    {
        "_id": "665538bf238ea760fe525508",
        "folio": "AGW 23123",
        "taxfolio": "966BF29F-992D-4E41-BFE8-4861E5E6CC11",
        "subtotal": 215.22,
        "discount": 4.84,
        "description": "K.S. 500 ML BOTELLA DE AGUA | CHICKEN BAKE 1 PZA KIRKLAND SIGNATURE | REFRESCO Y HOT DOG COMBO SALCHICHA RES | CON POLLO ENSALADA CESAR",
        "date": "2024-05-21T00:00:00.000Z",
        "taxapply": false,
        "ispaid": false,
        "category": {
            "_id": "661eae12f642112488c85fb1",
            "name": "FONDO FIJO",
            "description": "Categoria de fondo fijo",
            "color": "#1b726f",
            "status": true,
            "id": "661eae12f642112488c85fb1"
        },
        "typeCFDI": {
            "_id": "661eae6cf642112488c85fb7",
            "name": "INGRESO",
            "description": "De Ingreso (I): Se emiten por los ingresos que obtienen los contribuyentes \nPrestación de servicios, arrendamiento, honorarios, donativos recibidos, Nota de cargo",
            "color": "#c6efc8",
            "status": true,
            "id": "661eae6cf642112488c85fb7"
        },
        "files": [
            {
                "file": "https://docs-planner.s3.amazonaws.com/cost-file-0-1716861119177.pdf",
                "types": "a",
                "_id": "665538bf238ea760fe525509",
                "id": "665538bf238ea760fe525509"
            }
        ],
        "user": {
            "_id": "65d3836974045152c0c4378c",
            "name": "Priciliano Palacios Hernandez",
            "photo": "https://docs-teltan.s3.amazonaws.com/user-1708360552272.jpeg",
            "department": {
                "_id": "65d3818774045152c0c43784",
                "name": "Mejora Continua",
                "company": {
                    "_id": "65d3813c74045152c0c4377e",
                    "name": "Palacios Construcciones",
                    "logo": "https://docs-teltan.s3.amazonaws.com/company-logo-1708359995145.jpeg",
                    "status": true,
                    "id": "65d3813c74045152c0c4377e"
                },
                "status": true,
                "id": "65d3818774045152c0c43784"
            },
            "status": true,
            "createAt": "2024-02-19T16:26:23.247Z"
        },
        "provider": {
            "_id": "664e7332277711ed05dc0440",
            "name": "COSTCO DE MEXICO",
            "tradename": "COSTCO",
            "rfc": "CME910715UB9",
            "contact": [],
            "status": true,
            "id": "664e7332277711ed05dc0440"
        },
        "costcenter": {
            "_id": "6643a3411d9d759d3ba6b4ad",
            "name": "Gastos de administración",
            "isnormal": true,
            "code": 602,
            "categorys": [
                {
                    "name": "Tiempos extras",
                    "account": "602.1",
                    "status": true,
                    "_id": "6643a3411d9d759d3ba6b4ae",
                    "id": "6643a3411d9d759d3ba6b4ae"
                }
            ],
            "status": true,
            "id": "6643a3411d9d759d3ba6b4ad"
        },
        "project": {
            "_id": "663a6c6f1d1c43ae98d75ccf",
            "title": "BMW TKB 24",
            "code": "BMW TKB 2024",
            "date": "2024-05-03T00:00:00.000Z",
            "categorys": {
                "_id": "661d59d0ca3bfa35200c168e",
                "name": "INDUSTRIAL",
                "status": true,
                "id": "661d59d0ca3bfa35200c168e"
            },
            "types": {
                "_id": "661d6980d534a9615d2c13dd",
                "name": "CHICO",
                "status": true,
                "id": "661d6980d534a9615d2c13dd"
            },
            "user": {
                "_id": "65d3836974045152c0c4378c",
                "name": "Priciliano Palacios Hernandez",
                "photo": "https://docs-teltan.s3.amazonaws.com/user-1708360552272.jpeg",
                "department": {
                    "_id": "65d3818774045152c0c43784",
                    "name": "Mejora Continua",
                    "company": {
                        "_id": "65d3813c74045152c0c4377e",
                        "name": "Palacios Construcciones",
                        "logo": "https://docs-teltan.s3.amazonaws.com/company-logo-1708359995145.jpeg",
                        "status": true,
                        "id": "65d3813c74045152c0c4377e"
                    },
                    "status": true,
                    "id": "65d3818774045152c0c43784"
                },
                "status": true,
                "createAt": "2024-02-19T16:26:23.247Z"
            },
            "company": {
                "_id": "65d3813c74045152c0c4377e",
                "name": "Palacios Construcciones",
                "email": "palaciostablaroca@hotmail.com",
                "logo": "https://docs-teltan.s3.amazonaws.com/company-logo-1708359995145.jpeg",
                "status": true,
                "id": "65d3813c74045152c0c4377e"
            },
            "client": {
                "_id": "65f9e6e51ee347eb4204a45b",
                "name": "Grupo Constructor Peasa",
                "logo": "https://docs-teltan.s3.amazonaws.com/client-logo-1713909716708.png",
                "contact": [
                    {
                        "_id": "65f9e6e21ee347eb4204a456",
                        "name": "Ubaldo Muñoz",
                        "phoneNumber": [
                            {
                                "type": "Movil",
                                "phone": "3234435354",
                                "phoneformat": "(+52) 323 443 5354",
                                "_id": "65f9e6e21ee347eb4204a457"
                            }
                        ],
                        "status": true,
                        "createAt": "2024-03-19T14:34:40.107Z"
                    }
                ],
                "user": {
                    "_id": "65d3836974045152c0c4378c",
                    "name": "Priciliano Palacios Hernandez",
                    "photo": "https://docs-teltan.s3.amazonaws.com/user-1708360552272.jpeg",
                    "department": {
                        "_id": "65d3818774045152c0c43784",
                        "name": "Mejora Continua",
                        "company": {
                            "_id": "65d3813c74045152c0c4377e",
                            "name": "Palacios Construcciones",
                            "logo": "https://docs-teltan.s3.amazonaws.com/company-logo-1708359995145.jpeg",
                            "status": true,
                            "id": "65d3813c74045152c0c4377e"
                        },
                        "status": true,
                        "id": "65d3818774045152c0c43784"
                    },
                    "status": true,
                    "createAt": "2024-02-19T16:26:23.247Z"
                },
                "status": true,
                "datets": "2024-03-19T14:34:39.655Z",
                "id": "65f9e6e51ee347eb4204a45b"
            },
            "status": true,
            "datets": "2024-05-03T18:30:25.668Z",
            "condition": [
                {
                    "glossary": {
                        "_id": "66196435ca3bfa35200c1622",
                        "name": "CANCELADO",
                        "color": "#ee1c00",
                        "status": true,
                        "id": "66196435ca3bfa35200c1622"
                    },
                    "date": "2024-05-03T18:30:25.668Z",
                    "status": true,
                    "id": null
                }
            ],
            "progress": [],
            "account": "901.01.0007",
            "id": "663a6c6f1d1c43ae98d75ccf"
        },
        "status": true,
        "condition": [],
        "total": 244.04,
        "iva": 33.66,
        "__v": 0,
        "id": "665538bf238ea760fe525508"
    },
    {
        "_id": "665539d8238ea760fe5255a8",
        "folio": "ABG 5182202",
        "taxfolio": "15496B96-9341-4C17-975D-327D00791523",
        "subtotal": 1800.25,
        "discount": 0,
        "description": "Gasolina 40 lts",
        "date": "2024-05-26T00:00:00.000Z",
        "taxapply": false,
        "ispaid": false,
        "category": {
            "_id": "661eae12f642112488c85fb1",
            "name": "FONDO FIJO",
            "description": "Categoria de fondo fijo",
            "color": "#1b726f",
            "status": true,
            "id": "661eae12f642112488c85fb1"
        },
        "typeCFDI": {
            "_id": "661eae6cf642112488c85fb7",
            "name": "INGRESO",
            "description": "De Ingreso (I): Se emiten por los ingresos que obtienen los contribuyentes \nPrestación de servicios, arrendamiento, honorarios, donativos recibidos, Nota de cargo",
            "color": "#c6efc8",
            "status": true,
            "id": "661eae6cf642112488c85fb7"
        },
        "user": {
            "_id": "65d3836974045152c0c4378c",
            "name": "Priciliano Palacios Hernandez",
            "photo": "https://docs-teltan.s3.amazonaws.com/user-1708360552272.jpeg",
            "department": {
                "_id": "65d3818774045152c0c43784",
                "name": "Mejora Continua",
                "company": {
                    "_id": "65d3813c74045152c0c4377e",
                    "name": "Palacios Construcciones",
                    "logo": "https://docs-teltan.s3.amazonaws.com/company-logo-1708359995145.jpeg",
                    "status": true,
                    "id": "65d3813c74045152c0c4377e"
                },
                "status": true,
                "id": "65d3818774045152c0c43784"
            },
            "status": true,
            "createAt": "2024-02-19T16:26:23.247Z"
        },
        "provider": {
            "_id": "664e7332277711ed05dc045e",
            "name": "COSTCO GAS",
            "tradename": "COSTCO GAS",
            "rfc": "CGA160215952",
            "contact": [],
            "status": true,
            "id": "664e7332277711ed05dc045e"
        },
        "costcenter": {
            "_id": "6643967a1d9d759d3ba6b190",
            "name": "Materiales",
            "isnormal": true,
            "code": 801,
            "categorys": [
                {
                    "name": "Materiales directos",
                    "status": true,
                    "_id": "6643967a1d9d759d3ba6b191",
                    "id": "6643967a1d9d759d3ba6b191"
                },
                {
                    "name": "Materiales indirectos",
                    "status": true,
                    "_id": "6643967a1d9d759d3ba6b192",
                    "id": "6643967a1d9d759d3ba6b192"
                },
                {
                    "name": "Tablaroca",
                    "status": true,
                    "_id": "6643967a1d9d759d3ba6b193",
                    "id": "6643967a1d9d759d3ba6b193"
                },
                {
                    "name": "Durock",
                    "status": true,
                    "_id": "6643967a1d9d759d3ba6b195",
                    "id": "6643967a1d9d759d3ba6b195"
                },
                {
                    "name": "Aislantes",
                    "status": true,
                    "_id": "6643983d1d9d759d3ba6b220",
                    "id": "6643983d1d9d759d3ba6b220"
                }
            ],
            "status": true,
            "id": "6643967a1d9d759d3ba6b190"
        },
        "project": {
            "_id": "663a6c6f1d1c43ae98d75ccf",
            "title": "BMW TKB 24",
            "code": "BMW TKB 2024",
            "date": "2024-05-03T00:00:00.000Z",
            "categorys": {
                "_id": "661d59d0ca3bfa35200c168e",
                "name": "INDUSTRIAL",
                "status": true,
                "id": "661d59d0ca3bfa35200c168e"
            },
            "types": {
                "_id": "661d6980d534a9615d2c13dd",
                "name": "CHICO",
                "status": true,
                "id": "661d6980d534a9615d2c13dd"
            },
            "user": {
                "_id": "65d3836974045152c0c4378c",
                "name": "Priciliano Palacios Hernandez",
                "photo": "https://docs-teltan.s3.amazonaws.com/user-1708360552272.jpeg",
                "department": {
                    "_id": "65d3818774045152c0c43784",
                    "name": "Mejora Continua",
                    "company": {
                        "_id": "65d3813c74045152c0c4377e",
                        "name": "Palacios Construcciones",
                        "logo": "https://docs-teltan.s3.amazonaws.com/company-logo-1708359995145.jpeg",
                        "status": true,
                        "id": "65d3813c74045152c0c4377e"
                    },
                    "status": true,
                    "id": "65d3818774045152c0c43784"
                },
                "status": true,
                "createAt": "2024-02-19T16:26:23.247Z"
            },
            "company": {
                "_id": "65d3813c74045152c0c4377e",
                "name": "Palacios Construcciones",
                "email": "palaciostablaroca@hotmail.com",
                "logo": "https://docs-teltan.s3.amazonaws.com/company-logo-1708359995145.jpeg",
                "status": true,
                "id": "65d3813c74045152c0c4377e"
            },
            "client": {
                "_id": "65f9e6e51ee347eb4204a45b",
                "name": "Grupo Constructor Peasa",
                "logo": "https://docs-teltan.s3.amazonaws.com/client-logo-1713909716708.png",
                "contact": [
                    {
                        "_id": "65f9e6e21ee347eb4204a456",
                        "name": "Ubaldo Muñoz",
                        "phoneNumber": [
                            {
                                "type": "Movil",
                                "phone": "3234435354",
                                "phoneformat": "(+52) 323 443 5354",
                                "_id": "65f9e6e21ee347eb4204a457"
                            }
                        ],
                        "status": true,
                        "createAt": "2024-03-19T14:34:40.107Z"
                    }
                ],
                "user": {
                    "_id": "65d3836974045152c0c4378c",
                    "name": "Priciliano Palacios Hernandez",
                    "photo": "https://docs-teltan.s3.amazonaws.com/user-1708360552272.jpeg",
                    "department": {
                        "_id": "65d3818774045152c0c43784",
                        "name": "Mejora Continua",
                        "company": {
                            "_id": "65d3813c74045152c0c4377e",
                            "name": "Palacios Construcciones",
                            "logo": "https://docs-teltan.s3.amazonaws.com/company-logo-1708359995145.jpeg",
                            "status": true,
                            "id": "65d3813c74045152c0c4377e"
                        },
                        "status": true,
                        "id": "65d3818774045152c0c43784"
                    },
                    "status": true,
                    "createAt": "2024-02-19T16:26:23.247Z"
                },
                "status": true,
                "datets": "2024-03-19T14:34:39.655Z",
                "id": "65f9e6e51ee347eb4204a45b"
            },
            "status": true,
            "datets": "2024-05-03T18:30:25.668Z",
            "condition": [
                {
                    "glossary": {
                        "_id": "66196435ca3bfa35200c1622",
                        "name": "CANCELADO",
                        "color": "#ee1c00",
                        "status": true,
                        "id": "66196435ca3bfa35200c1622"
                    },
                    "date": "2024-05-03T18:30:25.668Z",
                    "status": true,
                    "id": null
                }
            ],
            "progress": [],
            "account": "901.01.0007",
            "id": "663a6c6f1d1c43ae98d75ccf"
        },
        "status": true,
        "condition": [],
        "files": [],
        "total": 2088.29,
        "iva": 288.04,
        "__v": 0,
        "id": "665539d8238ea760fe5255a8"
    },
    {
        "_id": "664ff1c6a957fe1fdd07f05d",
        "folio": "FF 0000273099",
        "subtotal": 6000,
        "discount": 0,
        "description": "RENTA RENTA No. 2 DE 12, CONTRATO: 12321000002",
        "date": "2024-05-01T00:00:00.000Z",
        "taxapply": false,
        "ispaid": false,
        "category": {
            "_id": "661eae4ef642112488c85fb4",
            "name": "PROVEEDOR",
            "description": "Categoria de proveedores de gastos",
            "color": "#7ddc7a",
            "status": true,
            "id": "661eae4ef642112488c85fb4"
        },
        "typeCFDI": {
            "_id": "661eae6cf642112488c85fb7",
            "name": "INGRESO",
            "description": "De Ingreso (I): Se emiten por los ingresos que obtienen los contribuyentes \nPrestación de servicios, arrendamiento, honorarios, donativos recibidos, Nota de cargo",
            "color": "#c6efc8",
            "status": true,
            "id": "661eae6cf642112488c85fb7"
        },
        "files": [
            {
                "file": "https://docs-planner.s3.amazonaws.com/cost-file-0-1716515270891.pdf",
                "types": "application/pdf",
                "_id": "664ff1c6a957fe1fdd07f05e",
                "id": "664ff1c6a957fe1fdd07f05e"
            },
            {
                "file": "https://docs-planner.s3.amazonaws.com/cost-file-1-1716515270896.xml",
                "types": "text/xml",
                "_id": "664ff1c6a957fe1fdd07f05f",
                "id": "664ff1c6a957fe1fdd07f05f"
            }
        ],
        "user": {
            "_id": "65d3836974045152c0c4378c",
            "name": "Priciliano Palacios Hernandez",
            "photo": "https://docs-teltan.s3.amazonaws.com/user-1708360552272.jpeg",
            "department": {
                "_id": "65d3818774045152c0c43784",
                "name": "Mejora Continua",
                "company": {
                    "_id": "65d3813c74045152c0c4377e",
                    "name": "Palacios Construcciones",
                    "logo": "https://docs-teltan.s3.amazonaws.com/company-logo-1708359995145.jpeg",
                    "status": true,
                    "id": "65d3813c74045152c0c4377e"
                },
                "status": true,
                "id": "65d3818774045152c0c43784"
            },
            "status": true,
            "createAt": "2024-02-19T16:26:23.247Z"
        },
        "provider": {
            "_id": "664e7332277711ed05dc0481",
            "name": "DALTON EFECTIVO SEGURO GDL",
            "tradename": "DALTON",
            "rfc": "DES051005PM6",
            "contact": [],
            "status": true,
            "id": "664e7332277711ed05dc0481"
        },
        "costcenter": {
            "_id": "6643a3411d9d759d3ba6b4ad",
            "name": "Gastos de administración",
            "isnormal": true,
            "code": 602,
            "categorys": [
                {
                    "name": "Tiempos extras",
                    "account": "602.1",
                    "status": true,
                    "_id": "6643a3411d9d759d3ba6b4ae",
                    "id": "6643a3411d9d759d3ba6b4ae"
                }
            ],
            "status": true,
            "id": "6643a3411d9d759d3ba6b4ad"
        },
        "project": {
            "_id": "6628118dad51c39004cad07d",
            "title": "KIO2 QRO",
            "code": "KIO2",
            "date": "2024-04-23T00:00:00.000Z",
            "categorys": {
                "_id": "661d59d0ca3bfa35200c168e",
                "name": "INDUSTRIAL",
                "status": true,
                "id": "661d59d0ca3bfa35200c168e"
            },
            "types": {
                "_id": "661d69dcd534a9615d2c13e1",
                "name": "GRANDE",
                "status": true,
                "id": "661d69dcd534a9615d2c13e1"
            },
            "user": {
                "_id": "65d3836974045152c0c4378c",
                "name": "Priciliano Palacios Hernandez",
                "photo": "https://docs-teltan.s3.amazonaws.com/user-1708360552272.jpeg",
                "department": {
                    "_id": "65d3818774045152c0c43784",
                    "name": "Mejora Continua",
                    "company": {
                        "_id": "65d3813c74045152c0c4377e",
                        "name": "Palacios Construcciones",
                        "logo": "https://docs-teltan.s3.amazonaws.com/company-logo-1708359995145.jpeg",
                        "status": true,
                        "id": "65d3813c74045152c0c4377e"
                    },
                    "status": true,
                    "id": "65d3818774045152c0c43784"
                },
                "status": true,
                "createAt": "2024-02-19T16:26:23.247Z"
            },
            "company": {
                "_id": "65d3813c74045152c0c4377e",
                "name": "Palacios Construcciones",
                "email": "palaciostablaroca@hotmail.com",
                "logo": "https://docs-teltan.s3.amazonaws.com/company-logo-1708359995145.jpeg",
                "status": true,
                "id": "65d3813c74045152c0c4377e"
            },
            "client": {
                "_id": "65e20985dc819eb7740e9244",
                "name": "Crocsa Corporativo SA de CV",
                "logo": "https://docs-teltan.s3.amazonaws.com/client-logo-1713909346201.png",
                "contact": [],
                "user": null,
                "status": true,
                "datets": "2024-03-01T16:59:42.647Z",
                "id": "65e20985dc819eb7740e9244"
            },
            "status": true,
            "datets": "2024-04-23T19:43:30.314Z",
            "condition": [
                {
                    "glossary": {
                        "_id": "661964a1ca3bfa35200c1628",
                        "name": "INICIADO",
                        "color": "#00da7e",
                        "status": true,
                        "id": "661964a1ca3bfa35200c1628"
                    },
                    "date": "2024-05-03T18:30:25.668Z",
                    "status": true,
                    "id": null
                }
            ],
            "progress": [
                {
                    "progress": 24,
                    "date": "2024-04-18T18:07:06.516Z",
                    "notes": "Primer avance de proyecto",
                    "_id": "66314aa3e6f6e3606433949f",
                    "id": "66314aa3e6f6e3606433949f"
                }
            ],
            "account": "901.01.0004",
            "id": "6628118dad51c39004cad07d"
        },
        "status": true,
        "condition": [],
        "total": 6960,
        "iva": 960,
        "__v": 0,
        "taxfolio": "41B79EFF-E609-4243-BCC3-1A5D1BAB2697",
        "id": "664ff1c6a957fe1fdd07f05d"
    },
    {
        "_id": "66523044a957fe1fdd082b91",
        "folio": "POSM6175340",
        "subtotal": 236.12,
        "discount": 0,
        "description": "Compra de regla, tijeras, lapiz adhesivo, cutter y cintas transparentes",
        "date": "2024-05-23T00:00:00.000Z",
        "taxapply": false,
        "ispaid": false,
        "category": {
            "_id": "661eae12f642112488c85fb1",
            "name": "FONDO FIJO",
            "description": "Categoria de fondo fijo",
            "color": "#1b726f",
            "status": true,
            "id": "661eae12f642112488c85fb1"
        },
        "typeCFDI": {
            "_id": "661eae6cf642112488c85fb7",
            "name": "INGRESO",
            "description": "De Ingreso (I): Se emiten por los ingresos que obtienen los contribuyentes \nPrestación de servicios, arrendamiento, honorarios, donativos recibidos, Nota de cargo",
            "color": "#c6efc8",
            "status": true,
            "id": "661eae6cf642112488c85fb7"
        },
        "files": [
            {
                "file": "https://docs-planner.s3.amazonaws.com/cost-file-0-1716662340175.pdf",
                "types": "application/pdf",
                "_id": "66523044a957fe1fdd082b92",
                "id": "66523044a957fe1fdd082b92"
            },
            {
                "file": "https://docs-planner.s3.amazonaws.com/cost-file-1-1716662340184.xml",
                "types": "text/xml",
                "_id": "66523044a957fe1fdd082b93",
                "id": "66523044a957fe1fdd082b93"
            }
        ],
        "user": {
            "_id": "65d3836974045152c0c4378c",
            "name": "Priciliano Palacios Hernandez",
            "photo": "https://docs-teltan.s3.amazonaws.com/user-1708360552272.jpeg",
            "department": {
                "_id": "65d3818774045152c0c43784",
                "name": "Mejora Continua",
                "company": {
                    "_id": "65d3813c74045152c0c4377e",
                    "name": "Palacios Construcciones",
                    "logo": "https://docs-teltan.s3.amazonaws.com/company-logo-1708359995145.jpeg",
                    "status": true,
                    "id": "65d3813c74045152c0c4377e"
                },
                "status": true,
                "id": "65d3818774045152c0c43784"
            },
            "status": true,
            "createAt": "2024-02-19T16:26:23.247Z"
        },
        "provider": {
            "_id": "664e7332277711ed05dc0413",
            "name": "OFFICE DEPOT DE MEXICO A.S. DE C.V.",
            "tradename": "OFFICE DEPPOT",
            "rfc": "ODM950324V2A",
            "contact": [],
            "status": true,
            "id": "664e7332277711ed05dc0413"
        },
        "costcenter": {
            "_id": "6643a3411d9d759d3ba6b4ad",
            "name": "Gastos de administración",
            "isnormal": true,
            "code": 602,
            "categorys": [
                {
                    "name": "Tiempos extras",
                    "account": "602.1",
                    "status": true,
                    "_id": "6643a3411d9d759d3ba6b4ae",
                    "id": "6643a3411d9d759d3ba6b4ae"
                }
            ],
            "status": true,
            "id": "6643a3411d9d759d3ba6b4ad"
        },
        "project": {
            "_id": "6628118dad51c39004cad07d",
            "title": "KIO2 QRO",
            "code": "KIO2",
            "date": "2024-04-23T00:00:00.000Z",
            "categorys": {
                "_id": "661d59d0ca3bfa35200c168e",
                "name": "INDUSTRIAL",
                "status": true,
                "id": "661d59d0ca3bfa35200c168e"
            },
            "types": {
                "_id": "661d69dcd534a9615d2c13e1",
                "name": "GRANDE",
                "status": true,
                "id": "661d69dcd534a9615d2c13e1"
            },
            "user": {
                "_id": "65d3836974045152c0c4378c",
                "name": "Priciliano Palacios Hernandez",
                "photo": "https://docs-teltan.s3.amazonaws.com/user-1708360552272.jpeg",
                "department": {
                    "_id": "65d3818774045152c0c43784",
                    "name": "Mejora Continua",
                    "company": {
                        "_id": "65d3813c74045152c0c4377e",
                        "name": "Palacios Construcciones",
                        "logo": "https://docs-teltan.s3.amazonaws.com/company-logo-1708359995145.jpeg",
                        "status": true,
                        "id": "65d3813c74045152c0c4377e"
                    },
                    "status": true,
                    "id": "65d3818774045152c0c43784"
                },
                "status": true,
                "createAt": "2024-02-19T16:26:23.247Z"
            },
            "company": {
                "_id": "65d3813c74045152c0c4377e",
                "name": "Palacios Construcciones",
                "email": "palaciostablaroca@hotmail.com",
                "logo": "https://docs-teltan.s3.amazonaws.com/company-logo-1708359995145.jpeg",
                "status": true,
                "id": "65d3813c74045152c0c4377e"
            },
            "client": {
                "_id": "65e20985dc819eb7740e9244",
                "name": "Crocsa Corporativo SA de CV",
                "logo": "https://docs-teltan.s3.amazonaws.com/client-logo-1713909346201.png",
                "contact": [],
                "user": null,
                "status": true,
                "datets": "2024-03-01T16:59:42.647Z",
                "id": "65e20985dc819eb7740e9244"
            },
            "status": true,
            "datets": "2024-04-23T19:43:30.314Z",
            "condition": [
                {
                    "glossary": {
                        "_id": "661964a1ca3bfa35200c1628",
                        "name": "INICIADO",
                        "color": "#00da7e",
                        "status": true,
                        "id": "661964a1ca3bfa35200c1628"
                    },
                    "date": "2024-05-03T18:30:25.668Z",
                    "status": true,
                    "id": null
                }
            ],
            "progress": [
                {
                    "progress": 24,
                    "date": "2024-04-18T18:07:06.516Z",
                    "notes": "Primer avance de proyecto",
                    "_id": "66314aa3e6f6e3606433949f",
                    "id": "66314aa3e6f6e3606433949f"
                }
            ],
            "account": "901.01.0004",
            "id": "6628118dad51c39004cad07d"
        },
        "status": true,
        "condition": [],
        "total": 273.9,
        "iva": 37.78,
        "__v": 0,
        "id": "66523044a957fe1fdd082b91"
    },
    {
        "_id": "66523117a957fe1fdd082c18",
        "subtotal": 700,
        "description": "Formateo de Laptop y instalacion de software NEODATA, Sketchup y Autocad",
        "date": "2024-05-10T00:00:00.000Z",
        "taxapply": false,
        "ispaid": false,
        "files": [
            {
                "file": "https://docs-planner.s3.amazonaws.com/cost-file-0-1716662551954.pdf",
                "types": "a",
                "_id": "66523117a957fe1fdd082c19",
                "id": "66523117a957fe1fdd082c19"
            }
        ],
        "user": {
            "_id": "65d3836974045152c0c4378c",
            "name": "Priciliano Palacios Hernandez",
            "photo": "https://docs-teltan.s3.amazonaws.com/user-1708360552272.jpeg",
            "department": {
                "_id": "65d3818774045152c0c43784",
                "name": "Mejora Continua",
                "company": {
                    "_id": "65d3813c74045152c0c4377e",
                    "name": "Palacios Construcciones",
                    "logo": "https://docs-teltan.s3.amazonaws.com/company-logo-1708359995145.jpeg",
                    "status": true,
                    "id": "65d3813c74045152c0c4377e"
                },
                "status": true,
                "id": "65d3818774045152c0c43784"
            },
            "status": true,
            "createAt": "2024-02-19T16:26:23.247Z"
        },
        "costcenter": {
            "_id": "6643a3411d9d759d3ba6b4ad",
            "name": "Gastos de administración",
            "isnormal": true,
            "code": 602,
            "categorys": [
                {
                    "name": "Tiempos extras",
                    "account": "602.1",
                    "status": true,
                    "_id": "6643a3411d9d759d3ba6b4ae",
                    "id": "6643a3411d9d759d3ba6b4ae"
                }
            ],
            "status": true,
            "id": "6643a3411d9d759d3ba6b4ad"
        },
        "status": true,
        "condition": [],
        "__v": 0,
        "id": "66523117a957fe1fdd082c18"
    }
]
  return costs;
}