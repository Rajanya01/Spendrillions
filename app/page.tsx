"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ItemCard } from "@/components/item-card"
import { Inventory } from "@/components/inventory"
import { useShoppingStore } from "@/lib/store"
import { useThemeStore } from "@/lib/theme"
import { categories } from "@/lib/items"
import { Sun, Moon } from "lucide-react"
import { Orbitron } from "next/font/google"

const orbitron = Orbitron({ subsets: ["latin"] })

export default function HomePage() {
  const [activeCategory, setActiveCategory] = useState("fun")
  const { money } = useShoppingStore()
  const { isDark, toggleTheme } = useThemeStore()

  const formatMoney = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const activeItems = categories.find((cat) => cat.id === activeCategory)?.items || []

  // Calculate progress bar values
  const initialMoney = 90000000 // $90 million to match store
  const remainingPercentage = Math.max(0, Math.min(100, (money / initialMoney) * 100))

  // Determine progress bar color and style based on remaining money
  const getProgressBarClass = () => {
    if (remainingPercentage > 75) return "bg-green-500"
    if (remainingPercentage > 25) return "bg-yellow-500"
    return "bg-red-500"
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black transition-colors duration-300">
      {/* Compact Navbar */}
      <div className="sticky top-0 z-50 bg-white dark:bg-black border-b border-gray-200 dark:border-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex-shrink-0">
              <div className={`dark:text-white text-black font-extrabold text-3xl ${orbitron.className}`}>
                Spendrillions
              </div>
            </div>

            {/* Money Display - Centered with background bar */}
            <div className="flex-1 flex justify-center px-4">
              <div className="relative w-full max-w-md">
                {/* Background progress bar */}
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-12 sm:h-14">
                  <div
                    className={`h-full transition-all duration-700 ease-out rounded-full ${getProgressBarClass()}`}
                    style={{ 
                      width: `${remainingPercentage}%`,
                      minWidth: remainingPercentage > 0 ? '8px' : '0px' // Only show minimum width if there's money
                    }}
                  />
                </div>
                {/* Money text overlay - Always centered */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-lg sm:text-xl lg:text-2xl font-bold text-white drop-shadow-lg text-center">
                    {formatMoney(money)}
                  </span>
                </div>
              </div>
            </div>

            {/* Theme Toggle */}
            <div className="flex-shrink-0">
              <Button
                onClick={toggleTheme}
                variant="outline"
                size="sm"
                className="p-2 bg-white dark:bg-black border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors"
              >
                {isDark ? <Sun className="w-4 h-4 text-yellow-500" /> : <Moon className="w-4 h-4 text-gray-700" />}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Category Tabs - Fixed theming */}
      <div className="bg-white dark:bg-black border-b border-gray-200 dark:border-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex space-x-1 overflow-x-auto scrollbar-hide">
            {categories.map((category) => (
              <Button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                variant={activeCategory === category.id ? "default" : "ghost"}
                className={`whitespace-nowrap px-3 sm:px-4 lg:px-6 py-2 sm:py-3 rounded-lg font-semibold text-xs sm:text-sm transition-all duration-300 flex-shrink-0 ${
                  activeCategory === category.id
                    ? "bg-gray-900 text-white dark:bg-white dark:text-black shadow-md hover:bg-gray-800 dark:hover:bg-gray-100"
                    : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-900 bg-transparent"
                }`}
              >
                {category.name}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-6 sm:py-8">
        <div className="text-center mb-6 sm:mb-8">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-2">
            {categories.find((cat) => cat.id === activeCategory)?.name}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">
            Discover extraordinary experiences and premium items
          </p>
        </div>

        {/* Items Grid - Responsive */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 mb-8 sm:mb-12">
          {activeItems.map((item) => (
            <ItemCard key={item.id} item={item} />
          ))}
        </div>
      </div>

      {/* Bottom Inventory */}
      <div className="bg-gray-100 dark:bg-black border-t border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:py-8">
          <Inventory />
        </div>
      </div>
    </div>
  )
}
