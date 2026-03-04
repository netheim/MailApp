'use client'

import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { loadOrders } from '../../../lib/storage'
import { Order } from '../../../types'
import Link from 'next/link'

export default function OrderDetailsPage() {
  const params = useParams()
  const id = params?.id
  const [order, setOrder] = useState<Order | null>(null)

  useEffect(() => {
    if (!id) return
    const found = loadOrders().find(o => o.id === id) || null
    setOrder(found)
  }, [id])

  if (!order) {
    return (
      <div className="bg-white p-6 rounded shadow">
        <div className="text-gray-500">Заявка не найдена.</div>
        <div className="mt-4">
          <Link href="/orders" className="text-indigo-600">Назад к списку</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white p-6 rounded shadow">
      <h1 className="text-xl font-semibold mb-2">Заявка #{order.id}</h1>
      <div className="text-sm text-gray-500 mb-4">{new Date(order.createdAt).toLocaleString()}</div>

      <div className="grid sm:grid-cols-2 gap-4">
        <section>
          <h2 className="font-medium">Отправитель</h2>
          <div className="text-sm">Имя: {order.sender.name}</div>
          <div className="text-sm">Телефон: {order.sender.phone}</div>
          <div className="text-sm">Город: {order.sender.city}</div>
        </section>

        <section>
          <h2 className="font-medium">Получатель</h2>
          <div className="text-sm">Имя: {order.recipient.name}</div>
          <div className="text-sm">Город: {order.recipient.city}</div>
        </section>

        <section className="sm:col-span-2 mt-2">
          <h2 className="font-medium">Посылка</h2>
          <div className="text-sm">Тип: {order.parcel.type}</div>
          <div className="text-sm">Вес: {order.parcel.weight} кг</div>
        </section>

        <section className="sm:col-span-2 mt-2">
          <h2 className="font-medium">Статус</h2>
          <div className="text-sm">{order.status}</div>
        </section>
      </div>

      <div className="mt-4">
        <Link href="/orders" className="text-indigo-600">Назад</Link>
      </div>
    </div>
  )
}