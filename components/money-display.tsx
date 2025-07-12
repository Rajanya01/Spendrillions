"use client"

import { useShoppingStore } from "@/lib/store"
import { ShoppingCart, TrendingDown } from "lucide-react"

export function MoneyDisplay() {
  const { money, inventory, totalSpent } = useShoppingStore()

  const formatMoney = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const totalItems = Object.values(inventory).reduce((sum, count) => sum + count, 0)

  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-6 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="flex items-center space-x-3">
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Money Left</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{formatMoney(money)}</p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
            <ShoppingCart className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Items Owned</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{totalItems}</p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <div className="p-2 bg-red-100 dark:bg-red-900 rounded-lg">
            <TrendingDown className="w-6 h-6 text-red-600 dark:text-red-400" />
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Total Spent</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{formatMoney(totalSpent)}</p>
          </div>
        </div>
      </div>

      {/* Progress bar */}
      <div className="mt-4">
        <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400 mb-1">
          <span>Budget Used</span>
          <span>{((totalSpent / 1000000) * 100).toFixed(1)}%</span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
          <div
            className="bg-gray-900 dark:bg-white h-2 rounded-full transition-all duration-500"
            style={{ width: `${Math.min((totalSpent / 1000000) * 100, 100)}%` }}
          />
        </div>
      </div>
    </div>
  )
}
