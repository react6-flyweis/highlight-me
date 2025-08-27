import { LogOutIcon, SearchIcon, UserIcon } from "lucide-react";
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
    <header className="sticky top-0 z-50 w-full border-b-2 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-14 items-center">
        {/* Logo/Brand */}
        <div className="flex items-center justify-center gap-2"></div>

        <div className="flex flex-1 items-center justify-between space-x-5 md:justify-end">
          {/* Search */}
          <div className="w-full flex-1 md:w-auto md:flex-none">
            <div className="relative ">
              <SearchIcon className="-translate-y-1/2 absolute top-1/2 left-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                className="h-12 w-60 rounded-full border pl-8"
                placeholder="=search"
                type="search"
              />
            </div>
          </div>

          {/* User Profile Section */}
          <nav className="flex items-center space-x-2">
            {/* Profile Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  className="relative h-12 rounded-full border pl-1"
                  variant="ghost"
                >
                  <Avatar className="size-10">
                    <AvatarImage alt="" src="/user.jpg" />
                    <AvatarFallback>AU</AvatarFallback>
                  </Avatar>
                  <div className="ml-2 flex flex-col items-start">
                    <span className="font-medium text-xs">Name</span>
                    <span className="text-muted-foreground text-xs">
                      variar@gmail.com
                    </span>
                    <span className="text-muted-foreground text-xs">
                      24-05-2024
                    </span>
                  </div>
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
