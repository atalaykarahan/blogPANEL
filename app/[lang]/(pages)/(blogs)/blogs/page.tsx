"use client"
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import BasicDataTable from "@/app/[lang]/(pages)/(blogs)/blogs/basic-table";

const BlogsPage = () => {
    return (
        <div>
            <Card>
                <CardHeader>
                    <CardTitle>All Published Blogs</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                    <BasicDataTable/>
                </CardContent>
            </Card>

        </div>
    );
};

export default BlogsPage;