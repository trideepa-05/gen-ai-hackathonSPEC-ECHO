import { useNavigate, useLocation } from "react-router";
import { Shield, LayoutDashboard, FileText, BarChart3, Network, User, Bell, Search } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

export function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
    { name: "Claims", path: "/claim-form", icon: FileText },
    { name: "Analytics", path: "/dashboard", icon: BarChart3 },
    { name: "Graph", path: "/network-graph", icon: Network },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-[#0F172A] border-b border-[#1E293B] sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center cursor-pointer" onClick={() => navigate("/dashboard")}>
            <Shield className="w-8 h-8 text-[#3B82F6] mr-2" />
            <span className="text-xl font-bold text-white">ShadowTrace</span>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.path}
                  onClick={() => navigate(item.path)}
                  className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
                    isActive(item.path)
                      ? "bg-[#3B82F6] text-white"
                      : "text-gray-300 hover:bg-[#1E293B] hover:text-white"
                  }`}
                >
                  <Icon className="w-5 h-5 mr-2" />
                  {item.name}
                </button>
              );
            })}
          </div>

          {/* Right side */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <div className="hidden lg:block">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Search..."
                  className="pl-10 bg-[#1E293B] border-[#1E293B] text-white placeholder:text-gray-400 w-64"
                />
              </div>
            </div>

            {/* Notifications */}
            <Button variant="ghost" size="icon" className="text-gray-300 hover:text-white hover:bg-[#1E293B]">
              <Bell className="w-5 h-5" />
            </Button>

            {/* Profile */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="text-gray-300 hover:text-white hover:bg-[#1E293B]">
                  <User className="w-5 h-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 bg-[#1E293B] border-[#1E3A8A] text-white">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-[#1E3A8A]" />
                <DropdownMenuItem className="focus:bg-[#1E3A8A] focus:text-white">Profile</DropdownMenuItem>
                <DropdownMenuItem className="focus:bg-[#1E3A8A] focus:text-white">Settings</DropdownMenuItem>
                <DropdownMenuSeparator className="bg-[#1E3A8A]" />
                <DropdownMenuItem onClick={() => navigate("/login")} className="focus:bg-[#1E3A8A] focus:text-white">
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </nav>
  );
}