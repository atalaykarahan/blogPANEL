import {getDictionary} from "@/app/dictionaries";
import DashboardPageView from "@/app/[lang]/(pages)/page-view";

const BlankPage = async () => {
    const trans = await getDictionary('en');
    return (
        <DashboardPageView trans={trans}/>
    );
};

export default BlankPage;