"use client";
import {TagModel} from "@/models/tag";
import {useState} from "react";
import {ScrollArea} from "@/components/ui/scroll-area";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {DialogClose} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import {tagService} from "@/app/api/services/tag.Service";
import {toast as reToast} from "react-hot-toast";

interface TagFormProps {
    tag?: TagModel;
    refreshTable?: () => void;
    setIsOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}

const TagForm: React.FC<TagFormProps> = ({tag, refreshTable, setIsOpen}) => {
    const [tagName, setTagName] = useState(tag?.tag_name || "");


    const handleClick = async () => {
        //update
        if (tag?.tag_id && tag?.tag_name) {
            console.log("burd aupdate yaaaaa")
            const response = await tagService.update(tag.tag_id, tagName);
            if (response.status === 201) {
                reToast.success("Successfully updated!")
                if (setIsOpen) setIsOpen(false);
                setTagName("")
                if (refreshTable)
                    refreshTable();
            } else {
                reToast.error("Something went wrong!")
                if (setIsOpen) setIsOpen(false);
            }
        } else {
            if (tagName) {
                const response = await tagService.create(tagName);
                if (response.status === 201) {
                    reToast.success("Successfully created!")
                    if (setIsOpen) setIsOpen(false);
                    setTagName("")
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
                            <Label>Tag Name</Label>
                            <Input type="text" placeholder="Enter tag name" value={tagName}
                                   onChange={(e) => setTagName(e.target.value)}/>
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

export default TagForm