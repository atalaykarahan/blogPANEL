"use client";
import {Button} from "@/components/ui/button";
import {Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger,} from "@/components/ui/dialog";
import {useState} from "react";
import {TagModel} from "@/models/tag";
import TagForm from "@/app/[lang]/(pages)/(tags)/tags/tag-form";


interface CreateTagFormProps {
    tag?: TagModel;
    refreshTable: () => void;

}

const CreateTagForm: React.FC<CreateTagFormProps> = ({tag, refreshTable}) => {
    const [open, setOpen] = useState(false);
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button>Create</Button>
            </DialogTrigger>
            <DialogContent size="2xl">
                <DialogHeader className="p-0">
                    <DialogTitle className="text-base font-medium text-default-700 ">
                        Create a New Tag
                    </DialogTitle>
                </DialogHeader>
                <TagForm tag={tag} refreshTable={refreshTable} setIsOpen={setOpen}/>
            </DialogContent>
        </Dialog>
    );
};

export default CreateTagForm;
