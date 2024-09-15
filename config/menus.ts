import {
    Book,
    DashBoard, Stacks2,

} from "@/components/svg";
import {NotebookText} from "lucide-react";


export interface MenuItemProps {
    title: string;
    icon: any;
    href?: string;
    child?: MenuItemProps[];
    megaMenu?: MenuItemProps[];
    multi_menu?: MenuItemProps[]
    nested?: MenuItemProps[]
    onClick: () => void;


}

export const menusConfig = {
    mainNav: [
        //   {
        //   title: "blank",
        //   icon: DashBoard,
        //   href: "/blank",
        // },
    ],
    sidebarNav: {
        modern: [
            {
                title: "home",
                icon: DashBoard,
                href: "/en",
            },
            {
                title: "blogs",
                icon: Book,
                child: [
                    {
                        title: "blog list",
                        icon: Stacks2,
                        href: "/blogs",
                    },
                    {
                        title: "add blog",
                        icon: NotebookPen,
                        href: "/addblog",
                    },
                    {
                        title: "pending",
                        icon: Stacks2,
                        href: "/draft",
                    },
                ]
            },
        ],
        classic: [
            //  {
            //   isHeader: true,
            //   title: "menu",
            // },
            // {
            //   title: "blank",
            //   icon: DashBoard,
            //   href: "/blank",
            // },
        ],
    },
};


export type ModernNavType = (typeof menusConfig.sidebarNav.modern)[number]
export type ClassicNavType = (typeof menusConfig.sidebarNav.classic)[number]
export type MainNavType = (typeof menusConfig.mainNav)[number]