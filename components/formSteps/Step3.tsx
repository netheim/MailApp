'use client'

import React, { useState } from 'react'
import { Sender, Recipient, Parcel } from '../../types'

export default function Step3({ value, onBack, onSubmit, onChange }: {
  value: { sender: Sender; recipient: Recipient; parcel: Parcel; consent: boolean }
  onBack: () => void
  onSubmit: () => void
  onChange: (partial: Partial<{ consent: boolean }>) => void
}) {
  const [err, setErr] = useState<string | null>(null)

  function handleSubmit() {
    if (!value.consent) {
      setErr('Необходимо согласие с условиями')
      return
    }
    setErr(null)
    onSubmit()
  }

  return (
    <div>
      <h3 className="text-lg font-medium mb-3">Подтверждение</h3>
      <div className="grid gap-2 bg-gray-50 p-4 rounded">
        <div><strong>Отправитель:</strong> {value.sender.name} — {value.sender.phone} ({value.sender.city})</div>
        <div><strong>Получатель:</strong> {value.recipient.name} — {value.recipient.city}</div>
        <div><strong>Тип:</strong> {value.parcel.type}</div>
        <div><strong>Вес:</strong> {value.parcel.weight} кг</div>
      </div>

      <label className="flex items-center gap-2 mt-4">
        <input type="checkbox" checked={value.consent} onChange={(e) => onChange({ consent: e.target.checked })} />
        <span>Согласен с условиями доставки</span>
      </label>
      {err && <div className="text-xs text-red-600 mt-1">{err}</div>}

      <div className="mt-6 flex justify-between">
        <button onClick={onBack} className="px-4 py-2 border rounded">Назад</button>
        <button onClick={handleSubmit} className="px-4 py-2 bg-indigo-600 text-white rounded">Отправить</button>
      </div>
    </div>
  )
}