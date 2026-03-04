'use client'

import React, { useEffect, useMemo, useState } from 'react'
import { Order, ParcelType } from '../../types'
import { loadOrders, saveOrders } from '../../lib/storage'
import OrderCard from '../../components/OrderCard'
import ConfirmDialog from '../../components/ConfirmDialog'
import Link from 'next/link'

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [query, setQuery] = useState('')
  const [typeFilter, setTypeFilter] = useState<ParcelType | 'all'>('all')
  const [toDelete, setToDelete] = useState<Order | null>(null)

  useEffect(() => {
    setOrders(loadOrders())
  }, [])

  const filtered = useMemo(() => {
    return orders.filter(o => {
      if (typeFilter !== 'all' && o.parcel.type !== typeFilter) return false
      const q = query.trim().toLowerCase()
      if (!q) return true
      return (
        o.recipient.name.toLowerCase().includes(q) ||
        o.recipient.city.toLowerCase().includes(q)
      )
    })
  }, [orders, query, typeFilter])

  function removeOrder(id: string) {
    const updated = orders.filter(o => o.id !== id)
    saveOrders(updated)
    setOrders(updated)
    setToDelete(null)
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-semibold">История заявок</h1>
        <Link href="/" className="text-sm text-indigo-600">Новая заявка</Link>
      </div>

      <div className="bg-white p-4 rounded-md shadow">
        <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between mb-4">
          <div className="flex gap-2">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Поиск: имя получателя или город"
              className="px-3 py-2 border rounded w-72"
            />
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value as any)}
              className="px-3 py-2 border rounded"
            >
              <option value="all">Все типы</option>
              <option value="documents">Документы</option>
              <option value="fragile">Хрупкое</option>
              <option value="regular">Обычное</option>
            </select>
          </div>
          <div className="text-sm text-gray-500">Найдено: {filtered.length}</div>
        </div>

        <div className="space-y-3">
          {filtered.length === 0 && <div className="text-sm text-gray-500">Заявок нет</div>}
          {filtered.map(order => (
            <OrderCard
              key={order.id}
              order={order}
              onDelete={() => setToDelete(order)}
            />
          ))}
        </div>
      </div>

      <ConfirmDialog
        open={!!toDelete}
        title="Удалить заявку?"
        description="Вы уверены, что хотите удалить эту заявку? Это действие нельзя отменить."
        onCancel={() => setToDelete(null)}
        onConfirm={() => toDelete && removeOrder(toDelete.id)}
      />
    </div>
  )
}