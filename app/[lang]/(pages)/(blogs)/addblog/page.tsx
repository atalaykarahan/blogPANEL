"use client"
import {Breadcrumbs, BreadcrumbItem} from "@/components/ui/breadcrumbs";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import BasicDataTable from "@/app/[lang]/(pages)/(blogs)/blogs/basic-table";
import BlogComponent from "@/components/blog";

const AddBlog = () => {
    return (
        <div>
            {/*<Breadcrumbs>*/}
            {/*    /!*<BreadcrumbItem>Utility</BreadcrumbItem>*!/*/}
            {/*    <BreadcrumbItem className="text-primary">Blogs Page</BreadcrumbItem>*/}
            {/*</Breadcrumbs>*/}
            {/*<div className="mt-5 text-2xl font-medium text-default-900">All Published Blogs</div>*/}

            <Card>
                <CardHeader>
                    <CardTitle>Add Blog</CardTitle>
                </CardHeader>
                <CardContent>
                    <BlogComponent/>
                    {/*<BasicDataTable/>*/}
                </CardContent>
            </Card>

        </div>
    );
};

export default AddBlog;