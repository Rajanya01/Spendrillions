export interface Item {
    id: string
    name: string
    description: string
    price: number
    category: string
    image?: string
  }
  
  export interface ShoppingState {
    money: number
    inventory: { [key: string]: number }
    totalSpent: number
  }
  