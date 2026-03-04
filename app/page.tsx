'use client'

import React from 'react'
import CreateOrderForm from '../components/CreateOrderForm'

export default function Page() {
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Оформление заявки на доставку</h1>
      <div className="bg-white rounded-lg shadow p-6">
        <CreateOrderForm />
      </div>
    </div>
  )
}