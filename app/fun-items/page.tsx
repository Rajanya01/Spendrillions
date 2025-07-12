import { Navigation } from "@/components/navigation"
import { MoneyDisplay } from "@/components/money-display"
import { ItemCard } from "@/components/item-card"
import { funItems } from "@/lib/items"

export default function FunItemsPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">Fun & Meme Items</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">Digital chaos and internet culture at its finest</p>
        </div>

        <MoneyDisplay />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {funItems.map((item) => (
            <ItemCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </div>
  )
}
