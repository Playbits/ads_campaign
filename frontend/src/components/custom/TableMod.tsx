"use client"

import React, { useState } from "react"
import uniqid from "uniqid"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import TablePagination from "./TablePagination"
import Status from "./Status"
import { getTimeAgo } from "@/utils/time"
import { Roles } from "@/lib/constants"
import { TableDataTypes } from "@/types/table"

const classes = "min-w-fit whitespace-nowrap"

export type TableColumnProps = {
  id: string
  type: TableDataTypes
  disablePadding?: boolean
  label: string
  align?: "center" | "char" | "justify" | "left" | "right"
  numeric?: boolean
  value?: string
  url?: string
  paramKeys?: string[]
}

type Props = {
  columns: TableColumnProps[]
  dataset?: any
  actions?: (row: any) => React.ReactNode
}

export default function TableMod({ columns, dataset, actions }: Props) {
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(5)

  const totalItems = dataset.length
  const paginatedData = dataset.slice((currentPage - 1) * pageSize, currentPage * pageSize)

  const handlePageChange = (page: number) => setCurrentPage(page)
  const handlePageSizeChange = (size: number) => {
    setPageSize(size)
    setCurrentPage(1) // Reset to first page when page size changes
  }

  return (
    <div className="w-full">
      <div className="w-full rounded-2xl border-b bg-white p-2">
        <Table>
          <TableHeader>
            <TableRow>
              {/* Note: Extra TableHead for aesthethics  */}
              <TableHead className="h-12" />
              {columns.map((column) => (
                <TableHead className="min-w-fit whitespace-nowrap" align="right" key={column.label}>
                  {column.label}
                </TableHead>
              ))}
              {/* Note: Extra TableHead for aesthethics  */}
              <TableHead />
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedData?.map((row: any) => (
              <TableRow key={uniqid()}>
                {/* Note: Extra TableCell for aesthethics  */}
                <TableCell className="h-[72px] w-1" />
                {columns.map((column) => {
                  const colValue = row[column.id]
                  return {
                    name_and_email: (
                      <TableCell className={classes} key={uniqid()}>
                        <div className="flex flex-col gap-0.5">
                          <p className="capitalize">{row["name"]}</p>
                          <p className="lowercase text-gray-500">{row["email"]}</p>
                        </div>
                      </TableCell>
                    ),
                    string: (
                      <TableCell className={classes} key={uniqid()}>
                        {colValue}
                      </TableCell>
                    ),
                    role: (
                      <TableCell className={classes} key={uniqid()}>
                        <p className="capitalize text-[#171717]">{Roles.find((r) => r.id === colValue)?.name}</p>
                      </TableCell>
                    ),
                    date: (
                      <TableCell className={classes} key={uniqid()}>
                        {colValue}
                      </TableCell>
                    ),
                    timelapse: (
                      <TableCell className={classes} key={uniqid()}>
                        {getTimeAgo(colValue)}
                      </TableCell>
                    ),
                    status: (
                      <TableCell key={uniqid()}>
                        <Status value={colValue} />
                      </TableCell>
                    ),
                    action: (
                      <TableCell key={uniqid()} className="w-10" align={column.align}>
                        {actions?.(row)}
                      </TableCell>
                    ),
                  }[column.type]
                })}
                {/* Note: Extra TableCell for aesthethics  */}
                <TableCell className="w-1" />
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <TablePagination
        currentPage={currentPage}
        pageSize={pageSize}
        totalItems={totalItems}
        onPageChange={handlePageChange}
        onPageSizeChange={handlePageSizeChange}
      />
    </div>
  )
}
