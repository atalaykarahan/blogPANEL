"use client";
import {Dialog, DialogContent, DialogHeader, DialogTitle,} from "@/components/ui/dialog";
import {TagModel} from "@/models/tag";
import TagForm from "@/app/[lang]/(pages)/(tags)/tags/tag-form";


interface EditTagDialogProps {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    tag?: TagModel;
    refreshTable: () => void;

}

const EditTagDialog: React.FC<EditTagDialogProps> = ({
                                                         isOpen,
                                                         setIsOpen, tag, refreshTable
                                                     }) => {
    return (
        <Dialog open={isOpen} onOpenChange={() => setIsOpen(false)}>
            <DialogContent size="2xl">
                <DialogHeader className="p-0">
                    <DialogTitle className="text-base font-medium text-default-700 ">
                        Edit a Tag
                    </DialogTitle>
                </DialogHeader>
                <TagForm tag={tag} refreshTable={refreshTable} setIsOpen={setIsOpen}/>
            </DialogContent>
        </Dialog>
    );
};

export default EditTagDialog;
