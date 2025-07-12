"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Home, Gamepad2, UtensilsCrossed, Car, Star, Users, Gift } from "lucide-react"

const navItems = [
  { href: "/", label: "Home", icon: Home },
  { href: "/fun-items", label: "Fun & Memes", icon: Gamepad2 },
  { href: "/food", label: "Food", icon: UtensilsCrossed },
  { href: "/vehicles", label: "Vehicles", icon: Car },
  { href: "/celebs", label: "Celebs", icon: Users },
  { href: "/luxury", label: "Luxury", icon: Star },
  { href: "/mystery", label: "Mystery", icon: Gift },
]

export function Navigation() {
  const pathname = usePathname()

  return (
    <nav className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-600/40 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="text-2xl font-bold text-gray-900 dark:text-white">
            CHAOS SHOP
          </Link>

          <div className="hidden md:flex space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href

              return (
                <Link key={item.href} href={item.href}>
                  <Button
                    variant={isActive ? "default" : "ghost"}
                    className={`flex items-center space-x-2 ${
                      isActive
                        ? "bg-gray-900 text-white dark:bg-white dark:text-gray-900"
                        : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                    }`}
                  >
                    <Icon className="w-4 h-4" /> 
                  </Button>
                </Link>
              )
            })}
          </div>

          {/* Mobile menu */}
          <div className="md:hidden">
            <select
              className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2"
              value={pathname}
              onChange={(e) => (window.location.href = e.target.value)}
            >
              {navItems.map((item) => (
                <option key={item.href} value={item.href}>
                  {item.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </nav>
  )
}
