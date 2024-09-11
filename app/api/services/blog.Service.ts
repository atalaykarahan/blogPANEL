// import {getMyCookie} from "@/lib/get-my-cookie";
import axios from "@/app/api/axios";
import {CategoryModel} from "@/models/category";
import {TagModel} from "@/models/tag";


class BlogService {
    //#region CREATE
    async create(title: string, slug: string, description: string, categories: CategoryModel[], tags?: TagModel[],
                 status?: string) {
        const props = {
            title: title,
            slug: slug,
            description: description,
            categories: categories.map(i => i.category_id),
            tags: tags?.map(i => i.tag_id),
            status: status,
        }
        return await axios.post("/blogs", props);
    };

    //#endregion

    //#region UPDATE
    async update(id: string, title: string, slug: string, description: string, categories: CategoryModel[], tags?: TagModel[],
                 status?: string) {
        const props = {
            id: id,
            title: title,
            slug: slug,
            description: description,
            categories: categories.map(i => i.category_id),
            tags: tags?.map(i => i.tag_id),
            status: status,
        }
        return await axios.put("/blogs", props);
    };

    //#endregion

    //#region GET BY ID
    async getById(id: string) {
        return await axios.get(`/blogs/${id}`,);
    };

    //#endregion

    //#region DELETE
    async deleteById(id: string) {
        return await axios.delete(`/blogs/${id}`,);
    };

    //#endregion

    //#region UPLOAD IMAGE
    async uploadImage(formData: FormData) {
        return await axios.post("/blogs/file", formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    }

    //#endregion

    //#region GET ALL
    async getAll() {
        return await axios.get(`/blogs`,);
    };

    //#endregion


    //#region GET ALL PUBLISHED BLOGS
    async getAllPublishedBlogs() {
        return await axios.get(`/blogs/status/2`,);
    };

    //#endregion

}

export const blogService = new BlogService();