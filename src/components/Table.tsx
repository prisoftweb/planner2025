'use client'
import { useReactTable, getCoreRowModel, flexRender, 
          getPaginationRowModel, getSortedRowModel,
          getFilteredRowModel, RowSelectionState } 
from "@tanstack/react-table"
import { useState, useEffect, useContext } from "react";
import { ChevronDoubleLeftIcon, ChevronDoubleRightIcon, 
  ChevronLeftIcon, ChevronRightIcon, AdjustmentsHorizontalIcon } 
from "@heroicons/react/24/solid";
import { setCookie } from "cookies-next";

export default function Table({data, columns, numRows}: {data: any, columns:any, numRows:number}) {

  const [sorting, setSorting] = useState<any>([]);
  const [filtering, setFiltering] = useState('')
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({})
  const [showColumns, setShowColumns] = useState<boolean>(false);

  useEffect(() => {
    //do something when the row selection changes...
    //console.info({ rowSelection });
    console.log(table.getSelectedRowModel().flatRows.map((row) => row.original))
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
    enableRowSelection: true,
    state : {
      sorting,
      globalFilter: filtering,
      rowSelection,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setFiltering,
    initialState : {
      pagination: {
        pageSize: numRows,
      }
    },
  })
  
  return(
    <div className="">

      <div className="relative">
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
          className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Mockups, Logos..." required ></input>
      </div>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <div className="bg-blue-600 mt-4">
          <button type="button" onClick={() => {
            console.log(table.getPreSelectedRowModel());
            setShowColumns(!showColumns);
          }}>
            <AdjustmentsHorizontalIcon className="w-8 h-8 ml-2 mt-1 text-white" />
          </button>
          <div className={`${showColumns? 'relative': 'hidden'}`}>
            <div className="absolute bg-gray-200 pr-6 pl-2 z-50">
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
                      />{' '}
                      {column.id}
                    </label>
                  </div>
                )
              })}
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
                        className="px-6 py-4 text-xs text-white uppercase bg-blue-600 border-b border-blue-400 
                        dark:text-white"
                        onClick={header.column.getToggleSortingHandler()}
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
              table.getRowModel().rows.map((row) => (
                <tr key={row.id}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 
                    hover:bg-gray-200 dark:hover:bg-gray-600"
                >
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="px-6 py-4 text-slate-900">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>

      <div className="flex items-center mt-6 flex-wrap gap-4 bg-white px-6 justify-end">
        <p>Numero de filas</p>
        <select
          value={table.getState().pagination.pageSize}
          onChange={e => { 
            table.setPageSize(Number(e.target.value));
            setCookie('config', {numRows: e.target.value})
          }}
          className="w-16 p-2 text-lg mt-2 text-gray-900 border border-slate-300 rounded-lg 
          bg-gray-50 focus:border-slate-700 outline-0 my-2"
        >
          {[3, 10, 20, 30, 40, 50].map(pageSize => (
            <option key={pageSize} value={pageSize}>{pageSize}</option>
          ))}
        </select>

        <button type="button"
          onClick={() => table.setPageIndex(0)} 
          className="border border-slate-300 text-blue-600 bg-white 
            hover:bg-text-900 hover:bg-slate-200 p-1 rounded-xl"
        >
          <ChevronDoubleLeftIcon className="w-8 h-8" />
        </button>
        
        <button type="button" 
          onClick={() => table.previousPage()}
          className="border border-slate-300 text-blue-600 bg-white 
            hover:bg-text-900 hover:bg-slate-200 p-1 rounded-xl"
        >
          <ChevronLeftIcon className="w-8 h-8" />
        </button>
        
        <button type="button" 
          onClick={() => table.nextPage()}
          className="border border-slate-300 text-blue-600 bg-white 
            hover:bg-text-900 hover:bg-slate-200 p-1 rounded-xl"
        >
          <ChevronRightIcon className="w-8 h-8" />
        </button>
        
        <button type="button" 
          onClick={() => table.setPageIndex(table.getPageCount()-1)}
          className="border border-slate-300 text-blue-600 bg-white 
            hover:bg-text-900 hover:bg-slate-200 p-1 rounded-xl"
        >
          <ChevronDoubleRightIcon className="w-8 h-8" />
        </button>
      </div>
    </div>
  )
}