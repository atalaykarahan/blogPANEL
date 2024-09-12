"use client";
import {Button} from "@/components/ui/button";
import {Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle,} from "@/components/ui/dialog";
import {CategoryModel} from "@/models/category";
import {categoryService} from "@/app/api/services/category.Service";
import {toast as reToast} from "react-hot-toast";

interface DeleteCategoryDialogProps {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    category: CategoryModel;
    refreshTable: () => void;
}

const DeleteCategoryDialog: React.FC<DeleteCategoryDialogProps> = ({
                                                                       isOpen,
                                                                       setIsOpen,
                                                                       category,
                                                                       refreshTable
                                                                   }) => {

    const deleteCategory = async () => {
        if (category.category_id) {
            const response = await categoryService.deleteById(category.category_id);
            if (response.status === 204) {
                reToast.success("Successfully deleted!")
                setIsOpen(false);
                refreshTable();
            } else {
                reToast.error("Something went wrong!")
                setIsOpen(false);
            }
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={() => setIsOpen(false)}>
            <DialogContent size="md">
                <DialogHeader>
                    <DialogTitle className="text-base font-medium text-default-700 ">
                        Are you sure?
                    </DialogTitle>
                </DialogHeader>
                <div className="text-sm text-default-500  space-y-4">
                    <p>
                        <span className="text-destructive font-medium">{category.category_name}</span>{" "}
                        If you delete this category content it will be permenent delete.
                    </p>
                </div>
                <DialogFooter className="mt-8">
                    <DialogClose asChild>
                        <Button variant="outline" color="warning">
                            Close
                        </Button>
                    </DialogClose>
                    <Button color="destructive" onClick={deleteCategory}>
                        Delete
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default DeleteCategoryDialog;
