import { NavLink, type To } from "react-router";

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
// import logoColor from "@/assets/icons/logo-color.svg";
import { ChevronRight } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";

export type SidebarItem = {
  title: string;
  icon: string;
  url: To;
  items?: { title: string; url: To; icon?: string }[];
};

export type AppSidebarProps = React.ComponentProps<typeof Sidebar>;

const navigationItems: SidebarItem[] = [
  { title: "Home", icon: "category.svg", url: "/" },
  {
    title: "User Management",
    icon: "users.svg",
    url: "/users",
    items: [
      { title: "View Users", icon: "eye.svg", url: "/users/view" },
      {
        title: "Reported Users",
        icon: "message-report.svg",
        url: "/users/reported",
      },
    ],
  },
];

export function AppSidebar({ ...props }: AppSidebarProps) {
  const { state } = useSidebar();

  return (
    <Sidebar {...props} className="font-kumbh">
      <SidebarHeader>
        <div className="flex items-center justify-center">
          {state === "collapsed" ? (
            <SidebarTrigger className="size-8 text-white" />
          ) : (
            // <img
            //   alt="logo"
            //   className="my-2 max-h-20 max-w-20"
            //   src={logoColor}
            // />
            <div className="p-2 bg-white text-primary text-xl text-center font-bold rounded-xl w-full">
              Weekend Highlights
            </div>
          )}
        </div>
      </SidebarHeader>
      <SidebarContent className="gap-0 pt-10">
        <SidebarMenu className="px-2">
          {navigationItems.map((item) => (
            <SidebarMenuItem key={item.title}>
              {item.items && item.items.length > 0 ? (
                <Collapsible key={item.title} asChild defaultOpen={false}>
                  <SidebarMenuItem>
                    <CollapsibleTrigger asChild>
                      {state === "collapsed" ? (
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <SidebarMenuButton
                              className={cn(
                                "m-0! transition-all duration-300 ease-in-out",
                                "justify-center rounded-md text-white"
                              )}
                              isActive={false}
                              size="lg"
                            >
                              <img
                                alt={item.title}
                                className="max-h-5 max-w-5 flex-shrink-0 transition-all duration-300"
                                src={`/icons/${item.icon}`}
                              />
                            </SidebarMenuButton>
                          </TooltipTrigger>
                          <TooltipContent side="right">
                            {item.title}
                          </TooltipContent>
                        </Tooltip>
                      ) : (
                        <SidebarMenuButton
                          className={cn("pl-5 flex-1 text-left")}
                          isActive={false}
                          size="lg"
                        >
                          <img
                            alt={item.title}
                            className="max-h-5 max-w-5 flex-shrink-0 transition-all duration-300"
                            src={`/icons/${item.icon}`}
                          />
                          <span>{item.title}</span>
                          <ChevronRight className=" ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                        </SidebarMenuButton>
                      )}
                    </CollapsibleTrigger>

                    <CollapsibleContent>
                      <SidebarMenuSub className="border-l-0">
                        {item.items.map((sub) => (
                          <SidebarMenuSubItem key={sub.title}>
                            <NavLink to={sub.url} end className="block w-full">
                              {({ isActive }) => (
                                <SidebarMenuSubButton isActive={isActive}>
                                  <img
                                    alt={item.title}
                                    className="max-h-5 max-w-5 flex-shrink-0 transition-all duration-300"
                                    src={`/icons/${sub.icon}`}
                                  />
                                  <span>{sub.title}</span>
                                </SidebarMenuSubButton>
                              )}
                            </NavLink>
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  </SidebarMenuItem>
                </Collapsible>
              ) : (
                <NavLink className="flex" to={item.url}>
                  {({ isActive }) => (
                    <>
                      {state === "collapsed" ? (
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <SidebarMenuButton
                              className={cn(
                                "m-0! transition-all duration-300 ease-in-out",
                                "justify-center rounded-md"
                              )}
                              isActive={isActive}
                              size="lg"
                            >
                              <img
                                alt={item.title}
                                className="max-h-5 max-w-5 flex-shrink-0 transition-all duration-300"
                                src={`/icons/${item.icon}`}
                              />
                            </SidebarMenuButton>
                          </TooltipTrigger>
                          <TooltipContent side="right">
                            {item.title}
                          </TooltipContent>
                        </Tooltip>
                      ) : (
                        <SidebarMenuButton isActive={isActive} size="lg">
                          <img
                            alt={item.title}
                            className="max-h-5 max-w-5 flex-shrink-0 transition-all duration-300"
                            src={`/icons/${item.icon}`}
                          />
                          <span>{item.title}</span>
                        </SidebarMenuButton>
                      )}
                    </>
                  )}
                </NavLink>
              )}
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
