import {
    DashBoard,

} from "@/components/svg";


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
                icon: DashBoard,
                child: [
                    {
                        title: "blog list",
                        icon: DashBoard,
                        href: "/blogs",
                    },
                    {
                        title: "add blog",
                        icon: DashBoard,
                        href: "/addblog",
                    },
                    {
                        title: "pending",
                        icon: DashBoard,
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