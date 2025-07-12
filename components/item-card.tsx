"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plus, Minus, ShoppingCart, Sparkles } from "lucide-react"
import Image from "next/image"
import { useShoppingStore } from "@/lib/store"
import type { Item } from "@/lib/types"

interface ItemCardProps {
  item: Item
}

export function ItemCard({ item }: ItemCardProps) {
  const [quantity, setQuantity] = useState(1)
  const { money, inventory, buyItem, removeItem } = useShoppingStore()

  const formatMoney = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const canAfford = money >= item.price * quantity
  const ownedQuantity = inventory[item.id] || 0

  const handleBuy = () => {
    if (canAfford) {
      buyItem(item.id, item.price, quantity)
      setQuantity(1)
    }
  }

  const handleRemove = () => {
    if (ownedQuantity > 0) {
      removeItem(item.id, item.price, 1)
    }
  }

  // Determine card styling based on price tier
  const getPriceCategory = () => {
    if (item.price >= 1000000) return "luxury"
    if (item.price >= 100000) return "premium"
    if (item.price >= 10000) return "high"
    return "standard"
  }

  const priceCategory = getPriceCategory()

  return (
    <Card className="flex flex-col bg-white dark:bg-black border border-gray-200 dark:border-gray-600/40 hover:shadow-lg transition-all duration-300 hover:scale-105" style={{ height: 'auto', minHeight: '420px' }}>
      <CardHeader className="text-center pb-2 flex-shrink-0">
        <div className="relative w-full h-40 sm:h-48 bg-gray-100 dark:bg-gray-900 rounded-lg mb-3 flex items-center justify-center overflow-hidden group">
          <div className="relative w-full h-full">
            <Image
              src={item.image || "/placeholder.svg"}
              alt={item.name}
              fill
              className="object-cover rounded-lg transition-transform duration-300 group-hover:scale-110"
              onError={(e) => {
                e.currentTarget.src = "/placeholder.svg";
              }}
            />
          </div>
          {priceCategory === "luxury" && (
            <div className="absolute top-2 right-2">
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-500" />
            </div>
          )}
        </div>
        <CardTitle className="text-base sm:text-lg font-bold text-gray-900 dark:text-white leading-tight mb-1">
          {item.name}
        </CardTitle>
        <CardDescription className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm">
          {item.description}
        </CardDescription>
      </CardHeader>

      <CardContent className="flex flex-col justify-between pt-0 flex-grow">
        <div className="space-y-3 flex-shrink-0">
          {/* Quantity Controls */}
          <div className="flex items-center justify-center space-x-3 sm:space-x-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              disabled={quantity <= 1}
              className="w-10 h-10 sm:w-12 sm:h-12 p-0 rounded-md hover:scale-110 transition-transform bg-white dark:bg-gray-600/20 border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600/20"
            >
              <Minus className="w-4 h-4 sm:w-5 sm:h-5" />
            </Button>
            <div className="bg-gray-100 dark:bg-gray-600/20 px-4 py-2 sm:px-6 sm:py-3 rounded-lg min-w-[60px] sm:min-w-[80px] flex items-center justify-center">
              <span className="text-base sm:text-lg font-bold text-gray-900 dark:text-white">{quantity}</span>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setQuantity(quantity + 1)}
              disabled={money < item.price * (quantity + 1)}
              className="w-10 h-10 sm:w-12 sm:h-12 p-0 rounded-md hover:scale-110 transition-transform bg-white dark:bg-gray-600/20 border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600/20"
            >
              <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
            </Button>
          </div>
        </div>

        <div className="space-y-3 mt-auto pt-3">
          <Button
            onClick={handleBuy}
            disabled={!canAfford}
            className={`w-full font-bold text-sm sm:text-base py-3 sm:py-4 rounded-md transition-all duration-300 ${
              canAfford
                ? "bg-gray-900 text-white dark:bg-gray-600/20 dark:text-white hover:scale-105"
                : "bg-gray-300 text-gray-500 cursor-not-allowed dark:bg-gray-700 dark:text-gray-500"
            }`}
          >
            <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
            {canAfford ? (
              <>
                Buy {quantity > 1 ? `${quantity}x` : ""} - {formatMoney(item.price * quantity)}
              </>
            ) : (
              "Insufficient Funds"
            )}
          </Button>

          {ownedQuantity > 0 && (
            <div className="flex items-center justify-between bg-gray-50 dark:bg-gray-600/20 p-3 sm:p-4 rounded-lg">
              <Badge className="bg-gray-900 text-white dark:bg-transparent border border-gray-600/20 dark:text-white font-semibold text-xs px-3 py-1">
                Owned: {ownedQuantity}
              </Badge>
              <Button
                variant="outline"
                size="sm"
                onClick={handleRemove}
                className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20 border-red-200 dark:border-red-800 bg-transparent text-xs sm:text-sm px-3 py-2 h-8 sm:h-9"
              >
                <Minus className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                Sell One
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
