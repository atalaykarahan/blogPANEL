import {getMyCookie} from "@/lib/get-my-cookie";
import axios from "@/app/api/axios";
import {CategoryModel} from "@/models/category";
import {TagModel} from "@/models/tag";


class CategoryService {
    //#region CREATE
    async create(name: string) {
        const props = {
            name: name
        }
        return await axios.post("/categories", props);
    };

    //#endregion

    //#region UPDATE
    async update(id: string, name: string) {
        const props = {
            id: id,
            name: name
        }
        return await axios.put("/categories", props);
    };

    //#endregion

    //#region GET BY ID
    async getById(id: string) {
        return await axios.get(`/categories/${id}`,);
    };

    //#endregion

    //#region DELETE
    async deleteById(id: string) {
        return await axios.delete(`/categories/${id}`,);
    };

    //#endregion

    //#region GET ALL
    async getALL() {
        return await axios.get(`/categories`,);
    };

    //#endregion

}

export const categoryService = new CategoryService();