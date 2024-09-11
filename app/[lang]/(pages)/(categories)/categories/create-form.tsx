"use client";
import {Button} from "@/components/ui/button";
import {Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger,} from "@/components/ui/dialog";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {ScrollArea} from "@/components/ui/scroll-area";
import {useState} from "react";
import {categoryService} from "@/app/api/services/category.Service";
import {toast as reToast} from "react-hot-toast";

const CreateCategoryForm = ({refreshTable}: { refreshTable: () => void }) => {
    const [categoryName, setCategoryName] = useState("");
    const [open, setOpen] = useState(false);

    const handleCreateNewCategory = async () => {

        if (categoryName) {
            const response = await categoryService.create(categoryName);
            if (response.status === 201) {
                reToast.success("Successfully created!")
                setOpen(false);
                setCategoryName("")
                refreshTable();
            } else {
                reToast.error("Something went wrong!")
                setOpen(false);
            }
        }
    }

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
                        <Button type="button" onClick={handleCreateNewCategory}>Create </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default CreateCategoryForm;
