import Link from 'next/link'
import { Home, BookOpen, Utensils, Calendar, ShoppingBag } from 'lucide-react'

const DashboardFooter = () => {
  const footerItems = [
    { icon: Home, label: 'Dashboard', href: '/dashboard' },
    { icon: BookOpen, label: 'Resources', href: '/resources' },
    { icon: Utensils, label: 'Nutrition', href: '/nutrition' },
    { icon: Calendar, label: 'Appointments', href: '/appointments' },
    { icon: ShoppingBag, label: 'Shop', href: '/shop' }
  ]

  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 md:hidden">
      <div className="flex items-center justify-around py-2">
        {footerItems.map((item, index) => (
          <Link
            key={index}
            href={item.href}
            className="flex flex-col items-center p-2 text-gray-600 dark:text-gray-400 hover:text-[#F59297] transition-colors duration-200"
          >
            <item.icon className="w-5 h-5 mb-1" />
            <span className="text-xs">{item.label}</span>
          </Link>
        ))}
      </div>
    </footer>
  )
}

export default DashboardFooter
