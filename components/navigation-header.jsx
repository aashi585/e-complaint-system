"use client"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { FileText, User, Users, Shield, ChevronDown, Home, LogOut } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

export function NavigationHeader({ currentRole = null, userName = "User" }) {
  const pathname = usePathname()

  const roles = [
    {
      id: "student",
      title: "Student Portal",
      icon: User,
      href: "/student",
      badge: "Student",
    },
    {
      id: "coordinator",
      title: "Class Coordinator",
      icon: Users,
      href: "/coordinator",
      badge: "Coordinator",
    },
    {
      id: "hod",
      title: "Head of Department",
      icon: Shield,
      href: "/hod",
      badge: "HOD",
    },
  ]

  const getCurrentRole = () => {
    if (pathname.includes("/student")) return roles[0]
    if (pathname.includes("/coordinator")) return roles[1]
    if (pathname.includes("/hod")) return roles[2]
    return null
  }

  const activeRole = getCurrentRole()

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-4">
            <Link href="/" className="flex items-center space-x-2">
              <FileText className="h-8 w-8 text-indigo-600" />
              <span className="text-xl font-semibold text-gray-900">E-Complaint System</span>
            </Link>

            {activeRole && (
              <div className="flex items-center space-x-2">
                <span className="text-gray-400">|</span>
                <Badge variant="secondary" className="flex items-center space-x-1">
                  <activeRole.icon className="h-3 w-3" />
                  <span>{activeRole.badge}</span>
                </Badge>
              </div>
            )}
          </div>

          <div className="flex items-center space-x-4">
            {/* Role Switcher */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  Switch Role
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>Available Portals</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {roles.map((role) => {
                  const IconComponent = role.icon
                  const isActive = pathname.includes(role.href)
                  return (
                    <DropdownMenuItem key={role.id} asChild>
                      <Link href={role.href} className={`flex items-center space-x-2 ${isActive ? "bg-gray-100" : ""}`}>
                        <IconComponent className="h-4 w-4" />
                        <span>{role.title}</span>
                        {isActive && (
                          <Badge variant="secondary" className="ml-auto">
                            Active
                          </Badge>
                        )}
                      </Link>
                    </DropdownMenuItem>
                  )
                })}
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/" className="flex items-center space-x-2">
                    <Home className="h-4 w-4" />
                    <span>Home</span>
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm">
                  <User className="h-4 w-4 mr-2" />
                  {userName}
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile Settings</DropdownMenuItem>
                <DropdownMenuItem>Preferences</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-red-600">
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  )
}
