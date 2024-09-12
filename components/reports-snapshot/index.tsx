"use client";

import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import ReportsChart from "./reports-chart";
import {useThemeStore} from "@/store";
import {useTheme} from "next-themes";
import {themes} from "@/config/thems";
import {Card, CardContent, CardHeader} from "@/components/ui/card";
import DashboardSelect from "@/components/dasboard-select";
import {cn} from "@/lib/utils";
import {useEffect, useState} from "react";
import {blogService} from "@/app/api/services/blog.Service";
import Blog from "@/components/blog";
import {BlogModel} from "@/models/blog";

const allUsersSeries = [
    {
        data: [90, 70, 85, 60, 80, 70, 90, 75, 60, 80, 10],
    },
];
const conversationSeries = [
    {
        data: [80, 70, 65, 40, 40, 100, 100, 75, 60, 80],
    },
];
const eventCountSeries = [
    {
        data: [20, 70, 65, 60, 40, 60, 90, 75, 60, 40],
    },
];
const newUserSeries = [
    {
        data: [20, 70, 65, 40, 100, 60, 100, 75, 60, 80],
    },
];

interface DashboardData {
    data: number[]; // Eğer her ay için sayı dizisi tutuyorsanız
}

const ReportsSnapshot = () => {
    const {theme: config, setTheme: setConfig} = useThemeStore();
    const {theme: mode} = useTheme();
    const theme = themes.find((theme) => theme.name === config);
    const [blogResults, setBlogResults] = useState<BlogModel[]>([]);
    const [blogsData, setBlogsData] = useState<DashboardData[]>([{data: []}])
    const [draftsData, setDraftsData] = useState<DashboardData[]>([{data: []}])

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        await blogResponseHandler();
    }


    const blogResponseHandler = async () => {
        const monthlyBlogCounts = new Array(12).fill(0);
        const monthlyDraftCounts = new Array(12).fill(0);

        const blogResponse = await blogService.getAll();
        if (blogResponse.status === 200) {
            setBlogResults(blogResponse.data)
            const publishedBlogs = blogResponse.data.filter((i: any) => i.status_id == 2)
            const draftBlogs = blogResponse.data.filter((i: any) => i.status_id == 1)

            publishedBlogs.forEach((blog: any) => {
                const createdAt = new Date(blog.createdAt);
                const month = createdAt.getMonth(); // Ayları 0'dan başlatır (0: Ocak, 11: Aralık)
                monthlyBlogCounts[month]++;
            });

            draftBlogs.forEach((blog: any) => {
                const createdAt = new Date(blog.createdAt);
                const month = createdAt.getMonth(); // Ayları 0'dan başlatır (0: Ocak, 11: Aralık)
                monthlyDraftCounts[month]++;
            });

        }
        setBlogsData([{data: monthlyBlogCounts}]);
        setDraftsData([{data: monthlyDraftCounts}]);


    }

    const primary = `hsl(${theme?.cssVars[mode === "dark" ? "dark" : "light"].primary})`;
    const warning = `hsl(${theme?.cssVars[mode === "dark" ? "dark" : "light"].warning})`;
    const success = `hsl(${theme?.cssVars[mode === "dark" ? "dark" : "light"].success})`;
    const info = `hsl(${theme?.cssVars[mode === "dark" ? "dark" : "light"].info})`;

    const tabsTrigger = [
        {
            value: "all",
            text: "total blogs",
            total: blogResults.filter((i: any) => i.status_id == 2).length,
            color: "primary",
        },
        {
            value: "event",
            text: "draft blogs",
            total: blogResults.filter((i: any) => i.status_id == 1).length,
            color: "warning",
        },
        {
            value: "conversation",
            text: "total tags",
            total: "21",
            color: "success",
        },
        {
            value: "newuser",
            text: "total categories",
            total: "3321",
            color: "info",
        },
    ];
    const tabsContentData = [
        {
            value: "all",
            series: blogsData,
            color: primary,
        },
        {
            value: "event",
            series: draftsData,
            color: warning,
        },
        {
            value: "conversation",
            series: conversationSeries,
            color: success,
        },
        {
            value: "newuser",
            series: newUserSeries,
            color: info,
        },
    ];


    return (
        <Card>
            <CardHeader className="border-none pb-0">
                <div className="flex items-center gap-2 flex-wrap ">
                    <div className="flex-1">
                        <div className="text-xl font-semibold text-default-900 whitespace-nowrap">
                            Year Overview
                        </div>
                        {/*<span className="text-xs text-default-600">*/}
                        {/*  Demographic properties of your customer*/}
                        {/*</span>*/}
                    </div>
                    {/*<div className="flex-none">*/}
                    {/*  <DashboardSelect />*/}
                    {/*</div>*/}
                </div>
            </CardHeader>
            <CardContent className="p-1 md:p-5">
                <Tabs defaultValue="all">
                    <TabsList
                        className="grid grid-cols-2 lg:grid-cols-4 gap-2 md:gap-6 justify-start w-full bg-transparent h-full">
                        {tabsTrigger.map((item, index) => (
                            <TabsTrigger
                                key={`report-trigger-${index}`}
                                value={item.value}
                                className={cn(
                                    "flex flex-col gap-1.5 p-4 overflow-hidden   items-start  relative before:absolute before:left-1/2 before:-translate-x-1/2 before:bottom-1 before:h-[2px] before:w-9 before:bg-primary/50 dark:before:bg-primary-foreground before:hidden data-[state=active]:shadow-none data-[state=active]:before:block",
                                    {
                                        "bg-primary/30 data-[state=active]:bg-primary/30 dark:bg-primary/70": item.color === "primary",
                                        "bg-orange-50 data-[state=active]:bg-orange-50 dark:bg-orange-500": item.color === "warning",
                                        "bg-green-50 data-[state=active]:bg-green-50 dark:bg-green-500": item.color === "success",
                                        "bg-cyan-50 data-[state=active]:bg-cyan-50 dark:bg-cyan-500 ": item.color === "info",
                                    }
                                )}
                            >
                <span
                    className={cn(
                        "h-10 w-10 rounded-full bg-primary/40 absolute -top-3 -right-3 ring-8 ring-primary/30",
                        {
                            "bg-primary/50  ring-primary/20 dark:bg-primary dark:ring-primary/40": item.color === "primary",
                            "bg-orange-200 ring-orange-100 dark:bg-orange-300 dark:ring-orange-400": item.color === "warning",
                            "bg-green-200 ring-green-100 dark:bg-green-300 dark:ring-green-400": item.color === "success",
                            "bg-cyan-200 ring-cyan-100 dark:bg-cyan-300 dark:ring-cyan-400": item.color === "info",
                        }
                    )}
                ></span>
                                <span
                                    className="text-sm text-default-800 dark:text-primary-foreground font-semibold capitalize relative z-10">
                  {" "}
                                    {item.text}
                </span>
                                <span
                                    className={`text-lg font-semibold text-${item.color}/80 dark:text-primary-foreground`}>
                  {item.total}
                </span>
                            </TabsTrigger>
                        ))}
                    </TabsList>
                    {/* charts data */}
                    {tabsContentData.map((item, index) => (
                        <TabsContent key={`report-tab-${index}`} value={item.value}>
                            <ReportsChart series={item.series} chartColor={item.color}/>
                        </TabsContent>
                    ))}
                </Tabs>
            </CardContent>
        </Card>
    );
};

export default ReportsSnapshot;
