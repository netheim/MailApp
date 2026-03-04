'use client'

import React, { useState } from 'react'
import { Sender } from '../../types'
import { senderSchema } from '../../utils/validators'

export default function Step1({ value, onChange, onNext }: {
  value: Sender
  onChange: (s: Sender) => void
  onNext: () => void
}) {
  const [errors, setErrors] = useState<Record<string, string>>({})

  function validateAndNext() {
    const parsed = senderSchema.safeParse(value)
    if (!parsed.success) {
      const e: Record<string, string> = {}
      parsed.error.errors.forEach(err => {
        if (err.path[0]) e[err.path[0] as string] = err.message
      })
      setErrors(e)
      return
    }
    setErrors({})
    onNext()
  }

  return (
    <div>
      <div className="grid gap-3">
        <label className="block">
          <div className="text-sm font-medium">Имя отправителя</div>
          <input className="mt-1 px-3 py-2 border rounded w-full" value={value.name} onChange={(e) => onChange({ ...value, name: e.target.value })} />
          {errors.name && <div className="text-xs text-red-600 mt-1">{errors.name}</div>}
        </label>

        <label className="block">
          <div className="text-sm font-medium">Телефон</div>
          <input className="mt-1 px-3 py-2 border rounded w-full" value={value.phone} onChange={(e) => onChange({ ...value, phone: e.target.value })} placeholder="+71234567890" />
          {errors.phone && <div className="text-xs text-red-600 mt-1">{errors.phone}</div>}
        </label>

        <label className="block">
          <div className="text-sm font-medium">Город отправления</div>
          <input className="mt-1 px-3 py-2 border rounded w-full" value={value.city} onChange={(e) => onChange({ ...value, city: e.target.value })} />
          {errors.city && <div className="text-xs text-red-600 mt-1">{errors.city}</div>}
        </label>
      </div>

      <div className="mt-6 flex justify-end gap-2">
        <button onClick={validateAndNext} className="px-4 py-2 bg-indigo-600 text-white rounded">Далее</button>
      </div>
    </div>
  )
}