"use client";
import {Button} from "@/components/ui/button";
import {Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger,} from "@/components/ui/dialog";
import {useState} from "react";
import {CategoryModel} from "@/models/category";
import CategoryForm from "@/app/[lang]/(pages)/(categories)/categories/category-form";


interface CreateCategoryFormProps {
    category?: CategoryModel;
    refreshTable: () => void;

}

const CreateCategoryForm: React.FC<CreateCategoryFormProps> = ({category, refreshTable}) => {
    const [open, setOpen] = useState(false);
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button>Create</Button>
            </DialogTrigger>
            <DialogContent size="2xl">
                <DialogHeader className="p-0">
                    <DialogTitle className="text-base font-medium text-default-700 ">
                        Create a New Category
                    </DialogTitle>
                </DialogHeader>
                <CategoryForm category={category} refreshTable={refreshTable} setIsOpen={setOpen}/>
            </DialogContent>
        </Dialog>
    );
};

export default CreateCategoryForm;
