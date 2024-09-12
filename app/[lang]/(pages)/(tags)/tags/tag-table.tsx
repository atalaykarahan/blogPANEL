"use client";
import * as React from "react";
import {useEffect} from "react";
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
import {Input} from "@/components/ui/input";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow,} from "@/components/ui/table";
import {Icon} from "@iconify/react";
import {cn} from "@/lib/utils";
import CreateTagForm from "@/app/[lang]/(pages)/(tags)/tags/create-form";
import ActionsTableCell from "@/app/[lang]/(pages)/(tags)/tags/actions-table-cell";
import {TagModel} from "@/models/tag";
import {tagService} from "@/app/api/services/tag.Service";


export function TagDataTable() {
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [rowSelection, setRowSelection] = React.useState({});
    const [allData, setAllData] = React.useState([]);
    const router = useRouter();

    useEffect(() => {
        fetchData()
    }, []);


    const fetchData = async () => {
        const response = await tagService.getAll();
        if (response.status === 200) {
            setAllData(response.data)
        }
    }

    const columns: ColumnDef<TagModel>[] = [
        {
            accessorKey: "tag_name",
            header: "Name",
            cell: ({row}) => {
                const tagName = row.original.tag_name;
                return (
                    <div className="font-medium text-card-foreground/80">
                        <div className="flex space-x-3 rtl:space-x-reverse items-center">
                        <span className="text-sm text-card-foreground whitespace-nowrap">
              {tagName ?? "Unknown Name"}
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
                const tag = row.original;
                return <ActionsTableCell tag={tag} refreshTable={fetchData}/>
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
                    value={(table.getColumn("tag_name")?.getFilterValue() as string) || ""}
                    onChange={(event) =>
                        table.getColumn("tag_name")?.setFilterValue(event.target.value)
                    }
                    className="max-w-sm min-w-[200px] h-10"
                />
                <CreateTagForm refreshTable={fetchData}/>
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

export default TagDataTable;
