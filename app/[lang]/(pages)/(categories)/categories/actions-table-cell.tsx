"use client";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {Button} from "@/components/ui/button";
import {MoreHorizontal} from "lucide-react";
import DeleteCategoryDialog from "@/app/[lang]/(pages)/(categories)/categories/delete-category";
import {CategoryModel} from "@/models/category";
import {useState} from "react";

interface ActionsTableCellProps {
    category: CategoryModel;
    refreshTable: () => void;
}

const ActionsTableCell: React.FC<ActionsTableCellProps> = ({category, refreshTable}) => {
    const [deleteDialog, setDeleteDialog] = useState(false);
    const [editDialog, setEditDialog] = useState(false);
    return (
        <>
            <div className=" text-end">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4"/>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator/>
                        <DropdownMenuItem
                            onClick={() => setEditDialog(true)}>Edit</DropdownMenuItem>
                        <DropdownMenuItem
                            onClick={() => setDeleteDialog(true)}>Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            {deleteDialog && (
                <DeleteCategoryDialog
                    isOpen={deleteDialog}
                    setIsOpen={setDeleteDialog}
                    category={category}
                    refreshTable={refreshTable}/>)}
        </>
    )
}

export default ActionsTableCell