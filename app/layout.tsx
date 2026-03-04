import './globals.css'
import Link from 'next/link'

export const metadata = {
  title: 'Parcel Delivery',
  description: '3-step parcel order demo'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body>
        <div className="min-h-screen flex flex-col">
          <header className="bg-white border-b">
            <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
              <Link href="/" className="text-xl font-semibold">Оформить посылку</Link>
              <nav className="flex gap-4">
                <Link href="/orders" className="text-sm text-gray-600 hover:text-gray-900">История заявок</Link>
              </nav>
            </div>
          </header>

          <main className="flex-1 max-w-4xl mx-auto w-full p-4">
            {children}
          </main>

          <footer className="border-t bg-white">
            <div className="max-w-4xl mx-auto px-4 py-4 text-xs text-gray-500">
              Demo — формы заказа доставки. Данные сохраняются в localStorage.
            </div>
          </footer>
        </div>
      </body>
    </html>
  )
}