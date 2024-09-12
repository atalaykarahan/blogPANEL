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
import {TagModel} from "@/models/tag";
import {useState} from "react";
import DeleteTagDialog from "@/app/[lang]/(pages)/(tags)/tags/delete-tag";
import EditTagDialog from "@/app/[lang]/(pages)/(tags)/tags/edit-tag";

interface ActionsTableCellProps {
    tag: TagModel;
    refreshTable: () => void;
}

const ActionsTableCell: React.FC<ActionsTableCellProps> = ({tag, refreshTable}) => {
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
                <DeleteTagDialog
                    isOpen={deleteDialog}
                    setIsOpen={setDeleteDialog}
                    tag={tag}
                    refreshTable={refreshTable}/>)}

            {editDialog && (
                <EditTagDialog
                    isOpen={editDialog}
                    setIsOpen={setEditDialog}
                    tag={tag}
                    refreshTable={refreshTable}/>)}
        </>
    )
}

export default ActionsTableCell