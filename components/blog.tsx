"use client";
import {Input} from "@/components/ui/input";
import Select from "react-select";
import {Label} from "@/components/ui/label";
import {Button} from '@/components/ui/button'
import makeAnimated from "react-select/animated";
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import MarkdownIt from 'markdown-it';
import {useEffect, useState} from "react";
import {BlogModel} from "@/models/blog";
import {categoryService} from "@/app/api/services/category.Service";

interface OptionType {
    value: string;
    label: string;
    isFixed?: boolean;
    icon?: string;
}

const mdParser = new MarkdownIt();
mdParser.use(require('markdown-it-ins')); // for underline settings
const BlogComponent: React.FC<BlogModel> = ({
                                                blog_id,
                                                blog_title,
                                                blog_slug,
                                                blog_description,
                                                status_id,
                                                categories,
                                                tags
                                            }) => {
    //#region SETTINGS & OPTIONS
    const animatedComponents = makeAnimated();
    const tagsData: OptionType[] = [
        {value: "1", label: "Seyehat"},
        {value: "2", label: "Ekonomi"},
        {value: "3", label: "Kariyer"}
    ];
    const statusData: OptionType[] = [
        {value: "1", label: "Draft"},
        {value: "2", label: "Publish"}
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
    //#endregion

    const [blogTitle, setBlogTitle] = useState(blog_title || '');
    const [blogSlug, setBlogSlug] = useState(blog_slug || '');
    const [blogCategory, setBlogCategory] = useState(categories || []);
    const [blogDescription, setBlogDescription] = useState(blog_description || '');
    const [blogTags, setBlogTags] = useState(tags || []);
    const [blogStatus, setBlogStatus] = useState(status_id || '');
    const [categoriesData, setCategoriesData] = useState([]);


    //#region FUNCTIONS
    const handleSlugChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = ev.target.value;
        // Türkçe karakterleri İngilizce karşılıklarına çevir
        const turkishMap: { [key: string]: string } = {
            'ç': 'c', 'Ç': 'C',
            'ğ': 'g', 'Ğ': 'G',
            'ı': 'i', 'I': 'I',
            'İ': 'i', 'ş': 's', 'Ş': 'S',
            'ü': 'u', 'Ü': 'U',
            'ö': 'o', 'Ö': 'O',
        };
        const normalizedInput = inputValue
            .replace(/[çÇğĞıİşŞüÜöÖ]/g, (match) => turkishMap[match]) // Türkçe karakterleri değiştir
            .toLowerCase() // Tüm harfleri küçük yap
            .replace(/[^a-z0-9\s-]/g, '') // Özel karakterleri kaldır (sadece harf, rakam ve tire bırak)
            .trim() // Başı ve sonundaki boşlukları temizle
            .replace(/\s+/g, '-') // Boşlukları "-" ile değiştir
            .replace(/-+/g, '-'); // Birden fazla "-" varsa tek "-" yap

        setBlogSlug(normalizedInput); // Yeni slugu state'e kaydet
    };

    function handleEditorChange({html, text}: any) {
        setBlogDescription(text)
    }

    //#endregion

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const response = await categoryService.getAll();
        if (response.status === 200) {
            const formattedCategories = response.data.map((category: any) => ({
                label: category.category_name,
                value: category.category_id
            }));
            setCategoriesData(formattedCategories);
        }
    }

    return (
        <form>
            <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2  flex flex-col gap-2">
                    <Label htmlFor="title">Title</Label>
                    <Input type="text" placeholder="Enter small title" id="title" value={blogTitle}
                           onChange={(e) => setBlogTitle(e.target.value)}/>
                </div>
                <div className="col-span-2  flex flex-col gap-2">
                    <Label htmlFor="slug">Slug</Label>
                    <Input type="email" placeholder="Enter slug url" id="slug" value={blogSlug}
                           onChange={handleSlugChange}/>
                </div>
                <div className="col-span-2  flex flex-col gap-2">
                    <Label>Category</Label>
                    <Select
                        isClearable={true}
                        closeMenuOnSelect={false}
                        components={animatedComponents}
                        isMulti
                        options={categoriesData}
                        styles={styles}
                        className="react-select"
                        classNamePrefix="select"
                        value={blogCategory?.map(category => ({
                            label: category.category_name,
                            value: category.category_id
                        }))}
                        onChange={(selectedCategories) => {
                            const formattedCategories = selectedCategories.map((category) => ({
                                category_id: category.value,
                                category_name: category.label,
                            }));
                            setBlogCategory(formattedCategories);
                        }}
                    />
                </div>

                <div className="col-span-2  flex flex-col gap-2">
                    <Label>Blog Content</Label>
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
                        options={tagsData}
                        styles={styles}
                        className="react-select"
                        classNamePrefix="select"
                        value={blogTags?.map(tag => ({label: tag.tag_name, value: tag.tag_id}))}
                        onChange={(selectedTags) => {
                            const formattedTags = selectedTags.map((tag) => ({
                                tag_id: tag.value,
                                tag_name: tag.label,
                            }));
                            setBlogTags(formattedTags);
                        }}
                    />
                </div>
                <div className="col-span-2  flex flex-col gap-2">
                    <Label>Status</Label>
                    <Select
                        isClearable={true}
                        closeMenuOnSelect={true}
                        components={animatedComponents}
                        options={statusData}
                        styles={styles}
                        className="react-select"
                        classNamePrefix="select"
                        value={statusData.find(status => status.value === blogStatus) ? {
                            value: blogStatus,
                            label: statusData.find(status => status.value === blogStatus)?.label
                        } : null}
                        onChange={(status: any) => setBlogStatus(status?.value || "")}
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