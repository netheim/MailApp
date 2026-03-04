'use client'

import React from 'react'
import { Order } from '../types'
import Link from 'next/link'

export default function OrderCard({ order, onDelete }: { order: Order, onDelete: () => void }) {
  return (
    <div className="border rounded p-3 flex items-center justify-between">
      <div>
        <div className="text-sm">
          <strong>{order.sender.city}</strong> → <strong>{order.recipient.city}</strong>
        </div>
        <div className="text-xs text-gray-600">
          {order.sender.name} • {order.parcel.type} • {new Date(order.createdAt).toLocaleString()}
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Link href={`/orders/${order.id}`} className="text-indigo-600 text-sm">Открыть</Link>
        <button onClick={onDelete} className="text-sm text-red-600">Удалить</button>
      </div>
    </div>
  )
}