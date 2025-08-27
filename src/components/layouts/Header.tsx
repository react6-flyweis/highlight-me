import {
  LogOutIcon,
  SearchIcon,
  UserIcon,
  ChevronDownIcon,
  BellIcon,
} from "lucide-react";
import { Link } from "react-router";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b-2 bg-white">
      <div className="flex h-14 items-center">
        {/* Logo/Brand */}
        <div className="flex items-center justify-center gap-2"></div>

        <div className="flex flex-1 items-center justify-between space-x-5 md:justify-end">
          {/* Search */}
          <div className="w-full flex-1 md:w-auto md:flex-none">
            <div className="relative ">
              <SearchIcon className="-translate-y-1/2 absolute top-1/2 left-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                className="w-60 border pl-8"
                placeholder="Search"
                type="search"
              />
            </div>
          </div>

          <Button variant="ghost" size="icon">
            <BellIcon className="h-4 w-4 text-muted-foreground" />
          </Button>

          {/* User Profile Section */}
          <nav className="flex items-center space-x-2">
            {/* Profile Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  className="relative pl-1 flex items-center hover:bg-transparent"
                  variant="ghost"
                >
                  <Avatar className="size-10">
                    <AvatarImage alt="" src="/user.jpg" />
                    <AvatarFallback>AU</AvatarFallback>
                  </Avatar>
                  <div className="ml-1 flex flex-col items-start">
                    <span className="font-medium text-xs">Admin</span>
                  </div>
                  <ChevronDownIcon className="h-4 w-4 text-muted-foreground" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56" forceMount>
                <DropdownMenuItem asChild>
                  <Link className="flex w-full items-center" to="/profile">
                    <UserIcon className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="text-red-500"
                  //   onClick={() => navigate("/login")}
                >
                  <LogOutIcon className="mr-2 h-4 w-4 text-red-500" />
                  <span>Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>
        </div>
      </div>
    </header>
  );
}
