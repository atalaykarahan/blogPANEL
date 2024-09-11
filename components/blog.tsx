"use client";
import {Input} from "@/components/ui/input";
import Select from "react-select";
import {Label} from "@/components/ui/label";
import {Button} from '@/components/ui/button'
import makeAnimated from "react-select/animated";
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import MarkdownIt from 'markdown-it';
import {useState} from "react";

interface OptionType {
    value: string;
    label: string;
    isFixed?: boolean;
    icon?: string;
}
const mdParser = new MarkdownIt();
mdParser.use(require('markdown-it-ins')); // for underline settings
const BlogComponent = () => {
    const animatedComponents = makeAnimated();
    const [blogDescription, setBlogDescription] = useState(  '');

    const fruits: OptionType[] = [
        {value: "chocolate", label: "Chocolate"},
        {value: "strawberry", label: "Strawberry"},
        {value: "vanilla", label: "Vanilla"},
        {value: "orange", label: "Orange"},
        {value: "apple", label: "Apple"},
    ];
    const styles = {
        multiValue: (base: any, state: any) => {
            return state.data.isFixed ? {...base, opacity: "0.5"} : base;
        },
        multiValueLabel: (base: any, state: any) => {
            return state.data.isFixed
                ? {...base, color: "#626262", paddingRight: 6}
                : base;
        },
        multiValueRemove: (base: any, state: any) => {
            return state.data.isFixed ? {...base, display: "none"} : base;
        },
        option: (provided: any, state: any) => ({
            ...provided,
            fontSize: "14px",
        }),
    };

    function handleEditorChange({html, text}: any) {
        // console.log('handleEditorChange', html, text);
        setBlogDescription(text)
    }
    return (
        <form>
            <div className="grid grid-cols-2 gap-4">

                <div className="col-span-2  flex flex-col gap-2">
                    <Label htmlFor="title">Title</Label>
                    <Input type="text" placeholder="Enter small title" id="title"/>
                </div>
                <div className="col-span-2  flex flex-col gap-2">
                    <Label htmlFor="slug">Slug</Label>
                    <Input type="email" placeholder="Enter slug url" id="slug"/>
                </div>
                <div className="col-span-2  flex flex-col gap-2">
                    <Label>Category</Label>
                    <Select
                        isClearable={true}
                        closeMenuOnSelect={false}
                        components={animatedComponents}
                        isMulti
                        options={fruits}
                        styles={styles}
                        className="react-select"
                        classNamePrefix="select"
                    />
                </div>

                <div className="col-span-2  flex flex-col gap-2">
                    <Label>Blog Content</Label>
                   {/*buraya koyucaksın*/}
                    <MdEditor style={{width: '100%', height: '400px'}} renderHTML={text => mdParser.render(text)}
                              onChange={handleEditorChange} value={blogDescription}/>
                </div>


                <div className="col-span-2  flex flex-col gap-2">
                    <Label>Tags</Label>
                    <Select
                        isClearable={true}
                        closeMenuOnSelect={false}
                        components={animatedComponents}
                        isMulti
                        options={fruits}
                        styles={styles}
                        className="react-select"
                        classNamePrefix="select"
                    />
                </div>
                <div className="col-span-2  flex flex-col gap-2">
                    <Label>Status</Label>
                    <Select
                        isClearable={true}
                        closeMenuOnSelect={false}
                        components={animatedComponents}
                        options={fruits}
                        styles={styles}
                        className="react-select"
                        classNamePrefix="select"
                    />
                </div>
                <div className="col-span-2">
                    <Button type="submit">SAVE BLOG</Button>
                </div>
            </div>
        </form>
    )
}


export default BlogComponent;