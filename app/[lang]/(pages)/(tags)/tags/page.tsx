import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import TagDataTable from "@/app/[lang]/(pages)/(tags)/tags/tag-table";

const TagsPage = () => {
    return (
        <div>
            <Card>
                <CardHeader>
                    <CardTitle>All Tags</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                    <TagDataTable/>
                </CardContent>
            </Card>

        </div>
    );
};

export default TagsPage;