"use client";
import {Button} from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {DropdownMenuItem} from "@/components/ui/dropdown-menu";
import {useState} from "react";

interface DeleteCategoryDialogProps {
    categoryName: string;
    categoryId: string;
}

const DeleteCategoryDialog: React.FC<DeleteCategoryDialogProps> = ({categoryName, categoryId}) => {
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    return (
        <Dialog open={openDeleteDialog} onOpenChange={setOpenDeleteDialog}>
            <DropdownMenuItem onClick={() => setOpenDeleteDialog(true)}>delete</DropdownMenuItem>
            <DialogContent size="md">
                <DialogHeader>
                    <DialogTitle className="text-base font-medium text-default-700 ">
                        Are you sure?
                    </DialogTitle>
                </DialogHeader>
                <div className="text-sm text-default-500  space-y-4">
                    <p>
                        <span className="text-destructive font-medium">Bangkok.</span>{" "}
                        If you delete this category content it will be permenent delete.
                    </p>
                </div>
                <DialogFooter className="mt-8">
                    <DialogClose asChild>
                        <Button variant="outline" color="warning">
                            close
                        </Button>
                    </DialogClose>
                    <Button color="destructive">
                        Save
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default DeleteCategoryDialog;
