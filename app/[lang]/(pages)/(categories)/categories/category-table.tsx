"use client";
import * as React from "react";
import {useEffect} from "react";

import {MoreHorizontal} from "lucide-react";
import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    SortingState,
    useReactTable,
} from "@tanstack/react-table";
import {useRouter} from "next/navigation";

import {Button} from "@/components/ui/button";
import {Checkbox} from "@/components/ui/checkbox";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {Input} from "@/components/ui/input";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow,} from "@/components/ui/table";
import {Icon} from "@iconify/react";
import {cn} from "@/lib/utils";
import {blogService} from "@/app/api/services/blog.Service";
import {BlogModel} from "@/models/blog";
import {categoryService} from "@/app/api/services/category.Service";
import {CategoryModel} from "@/models/category";
import CreateCategoryForm from "@/app/[lang]/(pages)/(categories)/categories/create-form";
import DeleteCategoryDialog from "@/app/[lang]/(pages)/(categories)/categories/delete-category";
import ActionsTableCell from "@/app/[lang]/(pages)/(categories)/categories/actions-table-cell";


export function CategoryDataTable() {
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [rowSelection, setRowSelection] = React.useState({});
    const [allData, setAllData] = React.useState([]);
    const router = useRouter();

    useEffect(() => {
        fetchData()
    }, []);


    const fetchData = async () => {
        const response = await categoryService.getAll();
        if (response.status === 200) {
            setAllData(response.data)
        }
    }

    const columns: ColumnDef<CategoryModel>[] = [
        {
            accessorKey: "category_name",
            header: "Name",
            cell: ({row}) => {
                const categoryName = row.original.category_name;
                return (
                    <div className="font-medium text-card-foreground/80">
                        <div className="flex space-x-3 rtl:space-x-reverse items-center">
                        <span className="text-sm text-card-foreground whitespace-nowrap">
              {categoryName ?? "Unknown Name"}
            </span>
                        </div>
                    </div>
                )
            }
        },
        {
            id: "actions",
            enableHiding: false,
            cell: ({row}) => {
                const category = row.original;
                return <ActionsTableCell category={category}/>
            },
        },
    ];


    const table = useReactTable({
        data: allData,
        columns,
        onSortingChange: setSorting,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            rowSelection,
        },
    });

    return (
        <>
            <div className="flex items-center flex-wrap gap-2  px-4">
                <Input
                    placeholder="Search by name..."
                    value={(table.getColumn("category_name")?.getFilterValue() as string) || ""}
                    onChange={(event) =>
                        table.getColumn("category_name")?.setFilterValue(event.target.value)
                    }
                    className="max-w-sm min-w-[200px] h-10"
                />
                <CreateCategoryForm refreshTable={fetchData}/>
            </div>
            <div>
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    );
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center"
                                >
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            <div className="flex items-center flex-wrap gap-4 px-4 py-4">
                <div className="flex gap-2  items-center">
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                        className="h-8 w-8"
                    >
                        <Icon icon="heroicons:chevron-left" className="w-5 h-5 rtl:rotate-180"/>
                    </Button>

                    {table.getPageOptions().map((page, pageIdx) => (
                        <Button
                            key={`basic-data-table-${pageIdx}`}
                            onClick={() => table.setPageIndex(pageIdx)}

                            className={cn("w-8 h-8")}
                        >
                            {page + 1}
                        </Button>

                    ))}
                    <Button
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                    >
                        <Icon icon="heroicons:chevron-right" className="w-5 h-5 rtl:rotate-180"/>
                    </Button>
                </div>
            </div>
        </>
    );
}

export default CategoryDataTable;
