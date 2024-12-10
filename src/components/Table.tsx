'use client'
import { useReactTable, getCoreRowModel, flexRender, 
          getPaginationRowModel, getSortedRowModel,
          getFilteredRowModel, RowSelectionState } 
from "@tanstack/react-table"
import { useState, useEffect} from "react";
import { ChevronDoubleLeftIcon, ChevronDoubleRightIcon, 
  ChevronLeftIcon, ChevronRightIcon, AdjustmentsHorizontalIcon } 
from "@heroicons/react/24/solid";
import { useOutsideClick } from "@/app/functions/useOutsideClick";
import { useTableStates } from "@/app/store/tableStates";
import { ExpensesTable } from "@/interfaces/Expenses";
import { CurrencyFormatter, MoneyFormatterToNumber } from "@/app/functions/Globals";
import { ProjectsTable } from "@/interfaces/Projects";
import { HistoryExpensesTable, ExpensesTableProvider, DetailExpensesTableProvider } from "@/interfaces/Providers";

type MyData = {
  numRows: string
}

export default function Table({data, columns, placeH, typeTable='', 
                            initialColumns={}, selectFunction=() => console.log('')}: 
                              {data: any[], columns:any, placeH:string, 
                                typeTable?:string, initialColumns?:any, selectFunction?:Function}) {

  const [sorting, setSorting] = useState<any>([]);
  const [filtering, setFiltering] = useState('')
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({})
  const [showColumns, setShowColumns] = useState<boolean>(false);
  const [startPage, setStarPage] = useState<number>(1);
  const [endPage, setEndPage] = useState<number>(25);

  const [pagination, setPagination] = useState({
    pageIndex: 0, //initial page index
    pageSize: 25, //default page size
  });
  
  // const aux: any = {
  //   columnId1: true,
  //   importe: false, //hide this column by default
  //   columnId3: true,
  // }
  
  //const [columnVisibility, setColumnVisibility] = useState(aux);
  //console.log(JSON.stringify(initialColumns));
  const [columnVisibility, setColumnVisibility] = useState(initialColumns);

  const {search} = useTableStates();
  //const {numRows, changeCounter} = useRowsCounter();
  
  let parsedData: (MyData | undefined);
    
  useEffect(() => {
    // Retrieving data from local storage
    const storedData = localStorage.getItem('myData');
    if(storedData){
      parsedData = JSON.parse(storedData);
    }
    //console.log('stored => ', storedData);
    //console.log('parsed data => ', parsedData);
    setEndPage(Number(parsedData?.numRows || 25));
    setPagination({
      pageIndex: 0, //initial page index
      pageSize: Number(parsedData?.numRows), //default page size
    })
  }, []);
  // const ref = useOutsideClickButton(() => {
  //   console.log('Clicked outside of MyComponent');
  //   setShowColumns(false);
  // });

  const ref = useOutsideClick(() => {
    //console.log('Clicked outside of MyComponent');
    if(showColumns){
      setShowColumns(false);
    }
  });

  //const [rowsTable, setRowsTable] = useState<number>(parsedData? parseInt(parsedData.numRows): 10);

  useEffect(() => {
    setFiltering(search);
  }, [search]);

  useEffect(() => {
    //do something when the row selection changes...
    //console.info({ rowSelection });
    console.log(table.getSelectedRowModel().flatRows.map((row) => row.original))
    selectFunction(table.getSelectedRowModel().flatRows.map((row) => row.original));
    //table.getSelectedRowModel().flatRows.
  }, [rowSelection]);

  const table = useReactTable({
    data, 
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getRowId: (row: any) => row.id,
    onRowSelectionChange: setRowSelection,
    // defaultColumn: {
    //   size: 200, //starting column size
    //   minSize: 50, //enforced during column resizing
    //   maxSize: 500, //enforced during column resizing
    // },
    enableRowSelection: true,
    state : {
      sorting,
      globalFilter: filtering,
      rowSelection,
      columnVisibility,
      pagination
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setFiltering,
    onColumnVisibilityChange: setColumnVisibility,
    // initialState : {
    //   pagination: {
    //     //pageSize: numRows,
    //    // pageSize: rowsTable,
    //     pageSize: endPage
    //   }
    // },
  })

  let total: number = 0;
  let labelJSX : JSX.Element = <div></div>;
  //const [labelJSX, setLabelJSX] = useState<JSX.Element>(<></>)
  if(typeTable === 'cost'){
    data.map((exp:ExpensesTable) => total += Number(exp.Importe.replace(/[$, M, X, N,]/g, "")));
    const t = CurrencyFormatter({
      currency: 'MXN',
      value: total
    });
    
    if(table.getSelectedRowModel().flatRows.length > 0){
      let totalSeleccionados: number = 0;
      table.getSelectedRowModel().flatRows.map((exp:any) => totalSeleccionados += Number(exp.original.Importe.replace(/[$, M, X, N,]/g, "")));
      //table.getSelectedRowModel().flatRows.map((exp:any) => console.log('exp table => ', exp));
      const tSeleccionados = CurrencyFormatter({
        currency: 'MXN',
        value: totalSeleccionados
      });
      labelJSX = ( <div className="flex justify-between gap-x-5 text-white pl-5">
          <div className="flex gap-x-5 text-white pl-5">
            <p>Cantidad: {data.length}</p>
            <p>Total de gastos: {t}</p>
          </div>
          <div className="flex gap-x-5 text-white pl-5">
            <p>Cantidad: {table.getSelectedRowModel().flatRows.length}</p>
            <p>Total de gastos seleccionados: {tSeleccionados}</p>
          </div>
      </div>)
    }else{
      labelJSX = ( <div className="flex gap-x-5 text-white pl-5">
            <p>Cantidad: {data.length}</p>
            <p>Total de gastos: {t}</p>
          </div>)
    }
  }else{
    if(typeTable === 'projects'){
      data.map((proj:ProjectsTable) => total += MoneyFormatterToNumber(proj.amount));
      // data.map((proj:ProjectsTable) => total += Number(proj.amount.replace(/[$, M, X, N,]/g, "")));
      const t = CurrencyFormatter({
        currency: 'MXN',
        value: total
      });
      
      if(table.getSelectedRowModel().flatRows.length > 0){
        let totalSeleccionados: number = 0;
        // table.getSelectedRowModel().flatRows.map((proj:any) => totalSeleccionados += Number(proj.original.amount.replace(/[$, M, X, N,]/g, "")));
        table.getSelectedRowModel().flatRows.map((proj:any) => totalSeleccionados += MoneyFormatterToNumber(proj.original.amount));
        //table.getSelectedRowModel().flatRows.map((exp:any) => console.log('exp table => ', exp));
        const tSeleccionados = CurrencyFormatter({
          currency: 'MXN',
          value: totalSeleccionados
        });
        labelJSX = ( <div className="flex justify-between gap-x-5 text-white pl-5">
            <div className="flex gap-x-5 text-white pl-5">
              <p>Cantidad: {data.length}</p>
              <p>Total de proyectos: {t}</p>
            </div>
            <div className="flex gap-x-5 text-white pl-5">
              <p>Cantidad: {table.getSelectedRowModel().flatRows.length}</p>
              <p>Total de proyectos seleccionados: {tSeleccionados}</p>
            </div>
        </div>)
      }else{
        labelJSX = ( <div className="flex gap-x-5 text-white pl-5">
              <p>Cantidad: {data.length}</p>
              <p>Total de proyectos: {t}</p>
            </div>)
      }
    }else{
      if(typeTable === 'costProvider'){
        data.map((exp:HistoryExpensesTable) => total += Number(exp.Total.replace(/[$, M, X, N,]/g, "")));
        const t = CurrencyFormatter({
          currency: 'MXN',
          value: total
        });
        
        if(table.getSelectedRowModel().flatRows.length > 0){
          let totalSeleccionados: number = 0;
          table.getSelectedRowModel().flatRows.map((exp:any) => totalSeleccionados += Number(exp.original.Total.replace(/[$, M, X, N,]/g, "")));
          //table.getSelectedRowModel().flatRows.map((exp:any) => console.log('exp table => ', exp));
          const tSeleccionados = CurrencyFormatter({
            currency: 'MXN',
            value: totalSeleccionados
          });
          labelJSX = ( <div className="flex justify-between gap-x-5 text-white pl-5">
              <div className="flex gap-x-5 text-white pl-5">
                <p>Cantidad: {data.length}</p>
                <p>Total de gastos: {t}</p>
              </div>
              <div className="flex gap-x-5 text-white pl-5">
                <p>Cantidad: {table.getSelectedRowModel().flatRows.length}</p>
                <p>Total de gastos seleccionados: {tSeleccionados}</p>
              </div>
          </div>)
        }else{
          labelJSX = ( <div className="flex gap-x-5 text-white pl-5">
                <p>Cantidad: {data.length}</p>
                <p>Total de gastos: {t}</p>
              </div>)
        }
      }else{
        if(typeTable === 'paymentDetails'){
          data.map((exp:DetailExpensesTableProvider) => total += Number(exp.payout.replace(/[$, M, X, N,]/g, "")));
          const t = CurrencyFormatter({
            currency: 'MXN',
            value: total
          });
          
          if(table.getSelectedRowModel().flatRows.length > 0){
            let totalSeleccionados: number = 0;
            table.getSelectedRowModel().flatRows.map((exp:any) => totalSeleccionados += Number(exp.original.payout.replace(/[$, M, X, N,]/g, "")));
            // table.getSelectedRowModel().flatRows.map((exp:any) => console.log('exp table => ', exp.original.payout, ' type ', typeof(exp.original.payout)));
            const tSeleccionados = CurrencyFormatter({
              currency: 'MXN',
              value: totalSeleccionados
            });
            labelJSX = ( <div className="flex justify-between gap-x-5 text-white pl-5">
                <div className="flex gap-x-5 text-white pl-5">
                  <p>Cantidad: {data.length}</p>
                  <p>Total de gastos: {t}</p>
                </div>
                <div className="flex gap-x-5 text-white pl-5">
                  <p>Cantidad: {table.getSelectedRowModel().flatRows.length}</p>
                  <p>Total de gastos seleccionados: {tSeleccionados}</p>
                </div>
            </div>)
          }else{
            labelJSX = ( <div className="flex gap-x-5 text-white pl-5">
                  <p>Cantidad: {data.length}</p>
                  <p>Total de gastos: {t}</p>
                </div>)
          }
        }else{
          if(typeTable === 'payments'){
            data.map((exp:ExpensesTableProvider) => total += Number(exp.paid.replace(/[$, M, X, N,]/g, "")));
            const t = CurrencyFormatter({
              currency: 'MXN',
              value: total
            });
            
            if(table.getSelectedRowModel().flatRows.length > 0){
              let totalSeleccionados: number = 0;
              table.getSelectedRowModel().flatRows.map((exp:any) => totalSeleccionados += Number(exp.original.paid.replace(/[$, M, X, N,]/g, "")));
              //table.getSelectedRowModel().flatRows.map((exp:any) => console.log('exp table => ', exp));
              const tSeleccionados = CurrencyFormatter({
                currency: 'MXN',
                value: totalSeleccionados
              });
              labelJSX = ( <div className="flex justify-between gap-x-5 text-white pl-5">
                  <div className="flex gap-x-5 text-white pl-5">
                    <p>Cantidad: {data.length}</p>
                    <p>Total de pagos: {t}</p>
                  </div>
                  <div className="flex gap-x-5 text-white pl-5">
                    <p>Cantidad: {table.getSelectedRowModel().flatRows.length}</p>
                    <p>Total de pagos seleccionados: {tSeleccionados}</p>
                  </div>
              </div>)
            }else{
              labelJSX = ( <div className="flex gap-x-5 text-white pl-5">
                    <p>Cantidad: {data.length}</p>
                    <p>Total de gastos: {t}</p>
                  </div>)
            }
          }
        }
      }
    }
  }

  const updateLabelRowsPage = () => {
    setTimeout(() => {
      const indexPagination = table.getState().pagination.pageIndex * table.getState().pagination.pageSize;
      setStarPage(indexPagination + 1);
      if((indexPagination + table.getState().pagination.pageSize) > data.length){
        setEndPage(data.length);
      }else{
        setEndPage(indexPagination + table.getState().pagination.pageSize );
      }
      
    }, 100);
  }
  
  return(
    <div className="">

      {/* <div className="relative">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
          </svg>
        </div>
        <input 
          type="search" 
          id="default-search"
          value={filtering}
          onChange={(e) => setFiltering(e.target.value)} 
          className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={placeH} required ></input>
      </div> */}

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <div className="flex items-center justify-between bg-blue-600 mt-4  p-1 pr-2">
          {labelJSX}
          <div className="flex justify-end">
            <button type="button" onClick={() => {
                console.log(table.getPreSelectedRowModel());
                setShowColumns(!showColumns);
              }}
              //onBlur={() => {setShowColumns(false); console.log('on blur')}}
            >
              <AdjustmentsHorizontalIcon className="w-5 h-5 ml-2 mt-1 text-white" />
            </button>
            <div className={`${showColumns? 'relative': 'hidden'}`} ref={ref} >
              <div className="absolute w-56 bg-gray-200 pr-6 pl-2 z-50 right-1 top-8">
                {table.getAllLeafColumns().map(column => {
                  return (
                    <div key={column.id} className="px-1 py-1">
                      <label>
                        <input
                          {...{
                            type: 'checkbox',
                            checked: column.getIsVisible(),
                            onChange: column.getToggleVisibilityHandler(),
                          }}
                          onClick={() => console.log('clic')}
                        />{' '}
                        {column.id}
                      </label>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
        <table className="w-full text-sm text-left rtl:text-right text-blue-100 dark:text-blue-100">
          <thead className="bg-blue-200 border-0 border-slate-700">
            {
              table.getHeaderGroups().map(headerGroup => (
                <tr key={headerGroup.id}>
                  {
                    headerGroup.headers.map(header => (
                      <th key={header.id}
                        //colSpan={typeTable=='projects' && header.id.toLowerCase().includes('avance')? 2: 1}
                        className="px-6 py-4 text-xs text-white uppercase bg-gray-400 border-b border-blue-400 
                        dark:text-white"
                        onClick={header.column.getToggleSortingHandler()}
                        //colSpan={}
                      >
                        {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                        {
                          //{'asc': '⬆️', 'desc': '⬇️'} [header.column.getIsSorted() ?? null]
                          {
                            asc: <span className="pl-2">↑</span>,
                            desc: <span className="pl-2">↓</span>,
                          }[header.column.getIsSorted() as string] ?? null
                        }
                      </th>
                    ))
                  }
                </tr>
              ))
            }
          </thead>
          <tbody>
            {
              table.getRowModel().rows.map((row, index:number) => (
                <tr key={row.id}
                  // className="border-b dark:border-gray-700 
                  // hover:bg-gray-200 dark:hover:bg-gray-600"
                  className={`border-b dark:border-gray-700 
                    dark:hover:bg-gray-600`}
                    style={{'backgroundColor': `${row.getIsSelected()? '#e6e6e6': index%2===0? '#fff': '#f5f5f5' }`}} 
                    //${row.getIsSelected()? '#e6e6e6': ${index%2==0? '#fff': '#F8FAFC'}
                    //${row.getIsSelected()? 'bg-slate-500 opacity-75': index%2===0? 'bg-white': 'bg-gray-200'}`}
                  // className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 
                    // hover:bg-gray-200 dark:hover:bg-gray-600"
                >
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} colSpan={typeTable=='projects' && cell.id.toLowerCase().includes('avance')? 2: 1} className={`px-6 py-4 ${row.getIsSelected()? 'text-slate-900': 'text-slate-900'} `}>
                      {/* {cell.id} */}
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))
            }
          </tbody>
          <tfoot>
            <th colSpan={table.getAllColumns().length} className="m-0 p-0 bg-white">
              <div className="flex items-center mt-6 flex-wrap gap-4 bg-white px-6 justify-end">
                <p className="hidden sm:block text-slate-700 text-md">Numero de filas</p>
                <select
                  value={table.getState().pagination.pageSize}
                  onChange={e => { 
                    table.setPageSize(Number(e.target.value));
                    //changeCounter(Number(e.target.value));
                    setPagination({
                      pageIndex: 0,
                      pageSize: Number(e.target.value),
                    })
                    const dataToStore = { numRows: e.target.value};
                    localStorage.setItem('myData', JSON.stringify(dataToStore));
                    updateLabelRowsPage();
                  }}
                  className="w-16 p-1 text-sm mt-2 text-gray-900 border border-slate-300 rounded-lg 
                  bg-gray-50 focus:border-slate-700 outline-0 my-3"
                >
                  {[10, 25, 50, 100, 250].map(pageSize => (
                    <option key={pageSize} value={pageSize}>{pageSize}</option>
                  ))}
                </select>

                <p className="hidden sm:block text-md text-slate-700">{startPage} - {endPage} de {data.length} </p>

                <button type="button"
                  //onClick={() => {table.setPageIndex(0); updateLabelRowsPage()}} 
                  onClick={() => {
                    updateLabelRowsPage();
                    setPagination({
                      pageIndex: 0, //initial page index
                      pageSize: pagination.pageSize
                    });
                  }}
                  className="border border-slate-300 text-blue-600 bg-white 
                    hover:bg-text-900 hover:bg-slate-200 p-1 rounded-xl"
                >
                  <ChevronDoubleLeftIcon className="w-5 h-5" />
                </button>
                
                <button type="button" 
                  //onClick={() => {table.previousPage(); updateLabelRowsPage()}}
                  onClick={() => {
                    updateLabelRowsPage();
                    if(pagination.pageIndex > 0){
                      setPagination({
                        pageIndex: pagination.pageIndex - 1, //initial page index
                        pageSize: pagination.pageSize
                      });
                    }
                  }}
                  className="border border-slate-300 text-blue-600 bg-white 
                    hover:bg-text-900 hover:bg-slate-200 p-1 rounded-xl"
                >
                  <ChevronLeftIcon className="w-5 h-5" />
                </button>
                
                <button type="button" 
                  //onClick={() => {table.nextPage(); updateLabelRowsPage()}}
                  onClick={() => {
                    updateLabelRowsPage();
                    if(pagination.pageIndex < table.getPageCount()-1){
                      setPagination({
                        pageIndex: pagination.pageIndex + 1, //initial page index
                        pageSize: pagination.pageSize
                      });
                    }
                  }}
                  className="border border-slate-300 text-blue-600 bg-white 
                    hover:bg-text-900 hover:bg-slate-200 p-1 rounded-xl"
                >
                  <ChevronRightIcon className="w-5 h-5" />
                </button>
                
                <button type="button" 
                  //onClick={() => {table.setPageIndex(table.getPageCount()-1); updateLabelRowsPage()}}
                  onClick={() => {
                    updateLabelRowsPage();
                    if(pagination.pageIndex < table.getPageCount()-1){
                      setPagination({
                        pageIndex: table.getPageCount()-1, //initial page index
                        pageSize: pagination.pageSize
                      });
                    }
                  }}
                  className="border border-slate-300 text-blue-600 bg-white 
                    hover:bg-text-900 hover:bg-slate-200 p-1 rounded-xl"
                >
                  <ChevronDoubleRightIcon className="w-5 h-5" />
                </button>
              </div>  
            </th>
          </tfoot>
        </table>
      </div>
      
    </div>
  )
}