"use client";
import {Button} from "@/components/ui/button";
import {Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle,} from "@/components/ui/dialog";
import {TagModel} from "@/models/tag";
import {tagService} from "@/app/api/services/tag.Service";
import {toast as reToast} from "react-hot-toast";

interface DeleteTagDialogProps {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    tag: TagModel;
    refreshTable: () => void;
}

const DeleteTagDialog: React.FC<DeleteTagDialogProps> = ({
                                                                       isOpen,
                                                                       setIsOpen,
                                                                       tag,
                                                                       refreshTable
                                                                   }) => {

    const deleteTag = async () => {
        if (tag.tag_id) {
            const response = await tagService.deleteById(tag.tag_id);
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
                        <span className="text-destructive font-medium">{tag.tag_name}</span>{" "}
                        If you delete this tag content it will be permenent delete.
                    </p>
                </div>
                <DialogFooter className="mt-8">
                    <DialogClose asChild>
                        <Button variant="outline" color="warning">
                            Close
                        </Button>
                    </DialogClose>
                    <Button color="destructive" onClick={deleteTag}>
                        Delete
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default DeleteTagDialog;
