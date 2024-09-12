"use client";
import {Button} from "@/components/ui/button";
import {Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle,} from "@/components/ui/dialog";
import {CategoryModel} from "@/models/category";

interface DeleteCategoryDialogProps {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    category: CategoryModel;
}

const DeleteCategoryDialog: React.FC<DeleteCategoryDialogProps> = ({
                                                                       isOpen,
                                                                       setIsOpen,
                                                                       category,
                                                                   }) => {

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
