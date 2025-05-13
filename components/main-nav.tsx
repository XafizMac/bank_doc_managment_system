"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { 
  FileText, Users, Building2, User, BarChart3, Settings, 
  HelpCircle, Bell, Home, LogIn
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { ModeToggle } from "@/components/mode-toggle";

// Mock authentication - in real app would use a proper auth system
const isAuthenticated = true;

export function MainNav() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const mainNavItems = [
    {
      title: "Панель",
      href: "/",
      icon: <Home className="h-4 w-4 mr-2" />,
      requiresAuth: true
    },
    {
      title: "Документы",
      href: "/documents",
      icon: <FileText className="h-4 w-4 mr-2" />,
      requiresAuth: true,
      children: [
        { title: "Inbox", href: "/documents/inbox" },
        { title: "Sent", href: "/documents/sent" },
        { title: "Archive", href: "/documents/archive" },
        { title: "Create New", href: "/documents/create" },
      ]
    },
    {
      title: "Клиенты",
      href: "/clients",
      icon: <Users className="h-4 w-4 mr-2" />,
      requiresAuth: true
    },
    {
      title: "Ветви",
      href: "/branches",
      icon: <Building2 className="h-4 w-4 mr-2" />,
      requiresAuth: true
    },
    {
      title: "Пользователи",
      href: "/users",
      icon: <User className="h-4 w-4 mr-2" />,
      requiresAuth: true
    },
    {
      title: "Жалобы",
      href: "/reports",
      icon: <BarChart3 className="h-4 w-4 mr-2" />,
      requiresAuth: true
    },
    {
      title: "Логин",
      href: "/login",
      icon: <LogIn className="h-4 w-4 mr-2" />,
      requiresAuth: false
    }
  ];

  const filteredNavItems = mainNavItems.filter(item => 
    item.requiresAuth || (item.requiresAuth && isAuthenticated)
  );

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="flex items-center">
      <Link href="/" className="flex items-center mr-6">
        <FileText className="h-6 w-6 text-primary mr-2" />
        <span className="hidden font-bold text-xl sm:inline-block">BankDocs</span>
      </Link>

      {/* Desktop Navigation */}
      <nav className="hidden lg:flex items-center space-x-2">
        {filteredNavItems.map((item) => {
          if (item.children) {
            return (
              <DropdownMenu key={item.href}>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center">
                    {item.icon}
                    {item.title}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                  {item.children.map((child) => (
                    <DropdownMenuItem key={child.href}>
                      <Link href={child.href} className="w-full">
                        {child.title}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            );
          }

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center text-sm font-medium transition-colors px-3 py-2 rounded-md hover:bg-muted",
                pathname === item.href ? "bg-muted" : "text-muted-foreground"
              )}
            >
              {item.icon}
              {item.title}
            </Link>
          );
        })}
      </nav>

      {/* Mobile Navigation Toggle */}
      <Button 
        variant="ghost" 
        size="icon" 
        className="lg:hidden"
        onClick={toggleMobileMenu}
      >
        <span className="sr-only">Toggle menu</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={cn("transition-transform", isMobileMenuOpen ? "rotate-90" : "")}
        >
          <line x1="4" x2="20" y1="12" y2="12" />
          <line x1="4" x2="20" y1="6" y2="6" />
          <line x1="4" x2="20" y1="18" y2="18" />
        </svg>
      </Button>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="absolute top-16 left-0 w-full bg-background border-b border-border z-50 lg:hidden">
          <div className="p-4 space-y-2">
            {filteredNavItems.map((item) => {
              if (item.children) {
                return (
                  <div key={item.href} className="space-y-2">
                    <div className="font-medium flex items-center text-sm">
                      {item.icon}
                      {item.title}
                    </div>
                    <div className="pl-6 space-y-1 border-l-2 border-muted ml-1">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="block py-1 text-sm text-muted-foreground hover:text-foreground"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {child.title}
                        </Link>
                      ))}
                    </div>
                  </div>
                );
              }

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center text-sm font-medium py-2",
                    pathname === item.href ? "text-foreground" : "text-muted-foreground"
                  )}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.icon}
                  {item.title}
                </Link>
              );
            })}
            <div className="pt-2 border-t">
              <ModeToggle />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}