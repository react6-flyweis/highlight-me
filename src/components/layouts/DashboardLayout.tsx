import { Outlet } from "react-router";

import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

// import { Toaster } from '@/components/ui/sonner';
// import { useIsMobile, useScreenSize } from '@/hooks/use-screen-size';

import { useIsMobile } from "@/hooks/use-mobile";
// import { AlertToast } from "./AlertToast";
import { AppSidebar } from "./AppSidebar";
import { Header } from "./Header";

export default function DashboardLayout() {
  const isMobile = useIsMobile();
  //   const screenSize = useScreenSize();

  // Determine sidebar behavior based on screen size
  const getSidebarProps = () => {
    if (isMobile) {
      // Mobile: Use offcanvas (sheet), no collapsible icon
      return {
        collapsible: "offcanvas" as const,
        defaultOpen: false,
      };
    }
    // if (screenSize === 'tablet') {
    //   // Tablet: Default collapsed with icon
    //   return {
    //     collapsible: 'icon' as const,
    //     defaultOpen: false,
    //   };
    // }
    // Desktop: Default expanded with icon capability
    return {
      collapsible: "icon" as const,
      defaultOpen: true,
    };
  };

  const sidebarProps = getSidebarProps();

  return (
    <SidebarProvider defaultOpen={sidebarProps.defaultOpen}>
      <AppSidebar collapsible={sidebarProps.collapsible} />
      <SidebarInset className="@container relative flex flex-1 flex-col bg-[#F6F6F7]">
        <Header />
        <div className="flex-1 p-5 md:px-8">
          {
            // Show sidebar trigger only on mobile devices
            isMobile && (
              <SidebarTrigger
                className="fixed top-0 left-0 size-7 rounded-t-none rounded-l-none rounded-br-xl md:hidden [&>svg]:size-5!"
                variant="default"
              />
            )
          }
          <Outlet />
        </div>
      </SidebarInset>
      {/* <Toaster /> */}
      {/* <AlertToast /> */}
    </SidebarProvider>
  );
}
