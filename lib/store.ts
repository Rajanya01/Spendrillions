"use client"

import { create } from "zustand"
import type { ShoppingState } from "./types"

interface ShoppingStore extends ShoppingState {
  buyItem: (itemId: string, price: number, quantity?: number) => void
  removeItem: (itemId: string, price: number, quantity?: number) => void
  resetStore: () => void
}

export const useShoppingStore = create<ShoppingStore>((set, get) => ({
      money: 90000000, 
      inventory: {},
      totalSpent: 0,

      buyItem: (itemId: string, price: number, quantity = 1) => {
        const { money, inventory, totalSpent } = get()
        const totalCost = price * quantity

        if (money >= totalCost) {
          set({
            money: money - totalCost,
            inventory: {
              ...inventory,
              [itemId]: (inventory[itemId] || 0) + quantity,
            },
            totalSpent: totalSpent + totalCost,
          })
        }
      },

      removeItem: (itemId: string, price: number, quantity = 1) => {
        const { money, inventory, totalSpent } = get()
        const currentQuantity = inventory[itemId] || 0

        if (currentQuantity >= quantity) {
          const refund = price * quantity
          const newQuantity = currentQuantity - quantity

          set({
            money: money + refund,
            inventory: {
              ...inventory,
              [itemId]: newQuantity === 0 ? 0 : newQuantity,
            },
            totalSpent: Math.max(0, totalSpent - refund),
          })
        }
      },

      resetStore: () => {
        set({
          money: 90000000, 
          inventory: {},
          totalSpent: 0,
        })
      },
    }));
