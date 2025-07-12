"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useShoppingStore } from "@/lib/store"
import { allItems } from "@/lib/items"
import { Package, Star, TrendingUp, Award } from "lucide-react"
import Image from "next/image"

export function Inventory() {
  const { inventory } = useShoppingStore()

  const ownedItems = allItems.filter((item) => inventory[item.id] > 0)
  const totalItems = Object.values(inventory).reduce((sum, count) => sum + count, 0)

  const formatMoney = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  // Calculate inventory value
  const inventoryValue = ownedItems.reduce((total, item) => {
    return total + item.price * inventory[item.id]
  }, 0)

  if (ownedItems.length === 0) {
    return (
      <Card className="bg-white dark:bg-black border border-gray-200 dark:border-gray-600/40 shadow-lg">
        <CardHeader className="text-center py-8">
          <div className="mx-auto w-16 h-16 bg-gray-900 dark:bg-gray-600/20 border dark:border-gray-600/40 rounded-full flex items-center justify-center mb-4">
            <Package className="w-8 h-8 text-white dark:text-white" />
          </div>
          <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Your Collection</CardTitle>
          <p className="text-gray-500 dark:text-gray-400">Start building your extraordinary collection!</p>
        </CardHeader>
      </Card>
    )
  }

  return (
    <Card className="bg-white dark:bg-black border border-gray-200 dark:border-gray-600/40 shadow-lg">
      <CardHeader className="border-b border-gray-200 dark:border-gray-800">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <CardTitle className="flex items-center space-x-3 text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
            <div className="p-2 bg-gray-900 dark:bg-gray-600/20 border dark:border-gray-600/40 rounded-full">
              <Package className="w-5 h-5 sm:w-6 sm:h-6 text-white dark:text-white" />
            </div>
            <span>Your Premium Collection</span>
          </CardTitle>

          <div className="flex flex-wrap gap-2 sm:gap-4 overflow-y-hidden">
            <div className="flex items-center space-x-2 bg-gray-100 dark:bg-gray-600/20 px-3 sm:px-4 py-2 rounded-full">
              <div className="p-1 rounded-full">
                <Star className="w-3 h-3 sm:w-4 sm:h-4 text-white dark:text-white" />
              </div>
              <span className="text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300">
                {ownedItems.length} Unique
              </span>
            </div>
            <div className="flex items-center space-x-2 bg-gray-100 dark:bg-gray-600/20 px-3 sm:px-4 py-2 rounded-full">
              <div className="p-1 rounded-full">
                <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4 text-white dark:text-white" />
              </div>
              <span className="text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300">
                {totalItems} Total
              </span>
            </div>
            <div className="flex items-center space-x-2 bg-gray-100 dark:bg-gray-600/20 px-3 sm:px-4 py-2 rounded-full">
              <div className="p-1 rounded-full">
                <Award className="w-3 h-3 sm:w-4 sm:h-4 text-white dark:text-white" />
              </div>
              <span className="text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300">
                {formatMoney(inventoryValue)}
              </span>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-4 sm:p-6 max-h-96 overflow-y-hidden">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 overflow-x-hidden">
          {ownedItems.map((item) => (
            <div
              key={item.id}
              className="group bg-gray-50 dark:bg-gray-600/20 rounded-lg p-3 sm:p-4 border border-gray-200 dark:border-gray-600/40 hover:shadow-md transition-all duration-300 hover:scale-[1.02] transform-gpu"
            >
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 relative">
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      fill
                      className="object-cover rounded-lg shadow-sm"
                      onError={(e) => {
                        e.currentTarget.src = "/placeholder.svg";
                      }}
                    />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-gray-900 dark:text-white text-sm sm:text-base mb-1 truncate">
                    {item.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-2 line-clamp-2">
                    {item.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Badge className="bg-gray-900 text-white dark:bg-white dark:text-black font-semibold text-xs">
                        {inventory[item.id]}x
                      </Badge>
                      <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
                        {formatMoney(item.price)}
                      </span>
                    </div>
                    <div className="text-right">
                      <p className="text-xs sm:text-sm font-bold text-gray-900 dark:text-white">
                        {formatMoney(item.price * inventory[item.id])}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
