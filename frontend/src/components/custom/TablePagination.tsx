"use client"

import React from "react"

import {
  Pagination,
  PaginationContent,
  // PaginationEllipsis,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ChevronLeft, ChevronRight } from "lucide-react"

const pageSizes = [5, 10, 20]

type TablePaginationProps = {
  currentPage: number
  pageSize: number
  totalItems: number
  onPageChange: (page: number) => void
  onPageSizeChange: (size: number) => void
}

export default function TablePagination({
  currentPage,
  pageSize,
  totalItems,
  onPageChange,
  onPageSizeChange,
}: TablePaginationProps) {
  const totalPages = totalItems > 0 ? Math.ceil(totalItems / pageSize) : 1

  return (
    <div className="w-full">
      <div className="mt-4 flex w-full flex-col items-center justify-between gap-x-2 gap-y-2 lg:flex-row">
        <p className="hidden whitespace-nowrap text-sm lg:block lg:w-40">
          Page {currentPage} of {totalPages}
        </p>
        <div className="order-first sm:w-full lg:order-none lg:w-96">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <button
                  aria-label="Go to previous page"
                  className={`flex items-center px-2 py-1 text-sm text-gray-700 ${currentPage === 1 ? "cursor-not-allowed opacity-50" : ""}`}
                  disabled={currentPage === 1}
                  onClick={() => onPageChange(currentPage - 1)}
                >
                  <ChevronLeft /> <span className="hidden sm:block">Previous</span>
                </button>
              </PaginationItem>
              {[...Array(totalPages)].map((_, index) => (
                <PaginationItem key={index}>
                  <PaginationLink href="#" isActive={currentPage === index + 1} onClick={() => onPageChange(index + 1)}>
                    {index + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}
              <PaginationItem>
                <button
                  aria-label="Go to next page"
                  disabled={currentPage === totalPages}
                  onClick={() => onPageChange(currentPage + 1)}
                  className={`flex items-center px-2 py-1 text-sm text-gray-700 ${currentPage === totalPages ? "cursor-not-allowed opacity-50" : ""}`}
                >
                  <span className="hidden sm:block">Next</span> <ChevronRight />
                </button>
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
        <div className="flex w-full items-center justify-between gap-2 lg:w-40 lg:justify-end">
          <p className="whitespace-nowrap text-sm lg:hidden">
            Page {currentPage} of {totalPages}
          </p>
          <Select onValueChange={(value) => onPageSizeChange(Number(value))} defaultValue={String(pageSize)}>
            <SelectTrigger className="w-28 border border-[#D4D4D4] bg-white px-4 py-2 text-sm font-medium">
              <SelectValue placeholder={`Show ${pageSize}`} />
            </SelectTrigger>
            <SelectContent>
              {pageSizes.map((size) => (
                <SelectItem key={size} value={String(size)}>
                  {`Show ${size}`}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  )
}
