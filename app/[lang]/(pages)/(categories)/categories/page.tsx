import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import CategoryDataTable from "@/app/[lang]/(pages)/(categories)/categories/category-table";

const CategoriesPage = () => {
    return (
        <div>
            <Card>
                <CardHeader>
                    <CardTitle>All Categories</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                    <CategoryDataTable/>
                </CardContent>
            </Card>

        </div>
    );
};

export default CategoriesPage;