"use client";
import {CategoryModel} from "@/models/category";
import {useState} from "react";
import {ScrollArea} from "@/components/ui/scroll-area";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {DialogClose} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import {categoryService} from "@/app/api/services/category.Service";
import {toast as reToast} from "react-hot-toast";

interface CategoryFormProps {
    category?: CategoryModel;
    refreshTable?: () => void;
    setIsOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}

const CategoryForm: React.FC<CategoryFormProps> = ({category, refreshTable, setIsOpen}) => {
    const [categoryName, setCategoryName] = useState(category?.category_name || "");


    const handleClick = async () => {
        //update
        if (category?.category_id) {
            console.log("burd aupdate yaaaaa")
        } else {
            if (categoryName) {
                const response = await categoryService.create(categoryName);
                if (response.status === 201) {
                    reToast.success("Successfully created!")
                    if (setIsOpen) setIsOpen(false);
                    setCategoryName("")
                    if (refreshTable)
                        refreshTable();
                } else {
                    reToast.error("Something went wrong!")
                    if (setIsOpen) setIsOpen(false);
                }
            }
        }
    }

    return (
        <div>
            <div className="h-[60px]">
                <ScrollArea className="h-full">
                    <div className="sm:grid  sm:gap-5 space-y-4 sm:space-y-0">
                        <div className="flex flex-col gap-2">
                            <Label>Category Name</Label>
                            <Input type="text" placeholder="Enter category name" value={categoryName}
                                   onChange={(e) => setCategoryName(e.target.value)}/>
                        </div>
                    </div>
                </ScrollArea>
            </div>
            <div className=" flex justify-center gap-3 mt-4">
                <DialogClose asChild>
                    <Button type="button" variant="outline">
                        Cancel
                    </Button>
                </DialogClose>
                <Button type="button" onClick={handleClick}>Save </Button>
            </div>
        </div>
    )
}

export default CategoryForm