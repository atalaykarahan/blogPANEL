"use client";
import {Button} from "@/components/ui/button";
import {Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger,} from "@/components/ui/dialog";
import {CategoryModel} from "@/models/category";
import CategoryForm from "@/app/[lang]/(pages)/(categories)/categories/category-form";


interface EditCategoryDialogProps {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    category?: CategoryModel;
    refreshTable: () => void;

}

const EditCategoryDialog: React.FC<EditCategoryDialogProps> = ({
                                                                   isOpen,
                                                                   setIsOpen, category, refreshTable
                                                               }) => {
    return (
        <Dialog open={isOpen} onOpenChange={() => setIsOpen(false)}>
            <DialogContent size="2xl">
                <DialogHeader className="p-0">
                    <DialogTitle className="text-base font-medium text-default-700 ">
                        Edit a Category
                    </DialogTitle>
                </DialogHeader>
                <CategoryForm category={category} refreshTable={refreshTable} setIsOpen={setIsOpen}/>
            </DialogContent>
        </Dialog>
        // <Dialog open={isOpen} onOpenChange={() => setIsOpen(false)}>
        //     <DialogTrigger asChild>
        //         <Button>Edit</Button>
        //     </DialogTrigger>
        //     <DialogContent size="2xl">
        //         <DialogHeader className="p-0">
        //             <DialogTitle className="text-base font-medium text-default-700 ">
        //                 Edit a New Category
        //             </DialogTitle>
        //         </DialogHeader>
        //         <CategoryForm category={category} refreshTable={refreshTable} setIsOpen={setIsOpen}/>
        //     </DialogContent>
        // </Dialog>
    );
};

export default EditCategoryDialog;
