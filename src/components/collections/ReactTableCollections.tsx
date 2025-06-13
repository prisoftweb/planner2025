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
import { CurrencyFormatter } from "@/app/functions/Globals";
import { ProjectsTable } from "@/interfaces/Projects";
import { HistoryExpensesTable, ExpensesTableProvider, DetailExpensesTableProvider } from "@/interfaces/Providers";
import { IInvoiceTable } from "@/interfaces/Invoices";
import { ITableCollectionMin } from "@/interfaces/Collections";

type MyData = {
  numRows: string
}

export default function ReactTableCollections({data, columns, 
  initialColumns={}, selectFunction=() => console.log(''), arrStatuses, dateE, dateS, isFiter}: 
  {data: ITableCollectionMin[], columns:any, initialColumns?:any, selectFunction?:Function, dateS:Date, dateE:Date, 
  arrStatuses:Array<string>, isFiter:boolean}) {

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
  
  const [columnVisibility, setColumnVisibility] = useState(initialColumns);

  const {search} = useTableStates();
  
  let parsedData: (MyData | undefined);
    
  useEffect(() => {
    const storedData = localStorage.getItem('myData');
    if(storedData){
      parsedData = JSON.parse(storedData);
    }
    setEndPage(Number(parsedData?.numRows || 25));
    setPagination({
      pageIndex: 0, //initial page index
      pageSize: Number(parsedData?.numRows), //default page size
    })
  }, []);
  
  const ref = useOutsideClick(() => {
    if(showColumns){
      setShowColumns(false);
    }
  });

  useEffect(() => {
    setFiltering(search);
  }, [search]);

  useEffect(() => {
    // console.log(table.getSelectedRowModel().flatRows.map((row) => row.original))
    selectFunction(table.getSelectedRowModel().flatRows.map((row) => row.original));
  }, [rowSelection]);
console.log('data table rec => ', data);
  const table = useReactTable({
    data, 
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getRowId: (row: any) => row.id,
    onRowSelectionChange: setRowSelection,
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
  })

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

  console.log('statuses => ', arrStatuses, ' dateS => ', dateS, ' dateE => ', dateE, ' isFiter => ', isFiter);
  
  return(
    <div className="">
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <div className="flex items-center justify-between bg-blue-600 mt-4  p-1 pr-2">
          <div className="flex justify-end">
            <button type="button" onClick={() => {
                console.log(table.getPreSelectedRowModel());
                setShowColumns(!showColumns);
              }}
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
                        className="px-6 py-4 text-xs text-white uppercase bg-gray-400 border-b border-blue-400 
                        dark:text-white cursor-pointer"
                        onClick={header.column.getToggleSortingHandler()}
                      >
                        {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                        {
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
                <>
                  {isFiter? (
                    <>
                      {arrStatuses.includes(row.original.idStatus) && isValidateDate(row.original.Fecha, dateS, dateE)  ? (
                        (
                          <tr key={row.id}
                            className={`border-b dark:border-gray-700 
                              dark:hover:bg-gray-600`}
                              style={{'backgroundColor': `${row.getIsSelected()? '#e6e6e6': index%2===0? '#fff': '#f5f5f5' }`}} 
                          >
                            {/* <p className="text-black">{JSON.stringify(row.original)}</p> */}
                            {row.getVisibleCells().map((cell) => (
                              <td key={cell.id} className={`px-6 py-4 ${row.getIsSelected()? 'text-slate-900': 'text-slate-900'} `}>
                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                {/* numero de celda {index} */}
                              </td>
                            ))}
                          </tr>
                        )
                      ): (
                        (
                          // <tr key={row.id}
                          //   className={`border-b dark:border-gray-700 
                          //     dark:hover:bg-gray-600`}
                          //     style={{'backgroundColor': `${row.getIsSelected()? '#e6e6e6': index%2===0? '#fff': '#f5f5f5' }`}} 
                          // >
                          //   <p className="text-black">{JSON.stringify(row.original)}</p>
                          //   {row.getVisibleCells().map((cell) => (
                          //     <td key={cell.id} className={`px-6 py-4 ${row.getIsSelected()? 'text-slate-900': 'text-slate-900'} `}>
                          //       {flexRender(cell.column.columnDef.cell, cell.getContext())}
                          //       Error {index} statuses {JSON.stringify(arrStatuses.includes(row.original.idStatus))} dates {JSON.stringify(isValidateDate(row.original.date, dateS, dateE))}
                          //     </td>
                          //   ))}
                          // </tr>
                          <></>
                        )
                      ) }
                    </>
                  ): (
                    <tr key={row.id}
                      className={`border-b dark:border-gray-700 
                        dark:hover:bg-gray-600`}
                        style={{'backgroundColor': `${row.getIsSelected()? '#e6e6e6': index%2===0? '#fff': '#f5f5f5' }`}} 
                    >
                      {/* <p className="text-black">{JSON.stringify(row.original)}</p> */}
                      {row.getVisibleCells().map((cell) => (
                        <td key={cell.id} className={`px-6 py-4 ${row.getIsSelected()? 'text-slate-900': 'text-slate-900'} `}>
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                          {/* numero de celda {index} */}
                        </td>
                      ))}
                    </tr>
                  )}
                </>
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

const isValidateDate = (dateCurrent:string, dateS: Date, dateE: Date) => {
  console.log('date c => ', dateCurrent);
  console.log('date curren => ', new Date(dateCurrent));
  let d = new Date(dateCurrent).getTime();

  console.log('dateS => ', dateS.getTime(), ' dateE => ', dateE.getTime(), ' d => ', d);

  if(d >= dateS.getTime() && d <= dateE.getTime()){
    console.log('val => true');
    return true;
  }
  console.log('val +> false');
  return false;
}