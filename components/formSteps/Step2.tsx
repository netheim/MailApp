'use client'

import React, { useState } from 'react'
import { recipientSchema, parcelSchema } from '../../utils/validators'
import { Recipient, Parcel, ParcelType } from '../../types'

export default function Step2({ value, onChange, onNext, onBack }: {
  value: { recipient: Recipient; parcel: Parcel; senderCity: string }
  onChange: (data: { recipient: Recipient; parcel: Parcel }) => void
  onNext: () => void
  onBack: () => void
}) {
  const [errors, setErrors] = useState<Record<string, string>>({})

  function validateAndNext() {
    const r = recipientSchema.safeParse(value.recipient)
    const p = parcelSchema.safeParse(value.parcel)
    const e: Record<string, string> = {}
    if (!r.success) {
      r.error.errors.forEach(err => {
        if (err.path[0]) e['recipient.' + (err.path[0] as string)] = err.message
      })
    }
    if (!p.success) {
      p.error.errors.forEach(err => {
        if (err.path[0]) e['parcel.' + (err.path[0] as string)] = err.message
      })
    }
    if (value.recipient.city.trim() && value.senderCity.trim() && value.recipient.city.trim().toLowerCase() === value.senderCity.trim().toLowerCase()) {
      e['recipient.city'] = 'Город назначения не может совпадать с городом отправления'
    }

    setErrors(e)
    if (Object.keys(e).length === 0) {
      onNext()
    }
  }

  function setRecipientField<K extends keyof Recipient>(k: K, v: Recipient[K]) {
    onChange({ recipient: { ...value.recipient, [k]: v }, parcel: value.parcel })
  }

  function setParcelField<K extends keyof Parcel>(k: K, v: Parcel[K]) {
    onChange({ recipient: value.recipient, parcel: { ...value.parcel, [k]: v } })
  }

  return (
    <div>
      <div className="grid gap-3">
        <label>
          <div className="text-sm font-medium">Имя получателя</div>
          <input className="mt-1 px-3 py-2 border rounded w-full" value={value.recipient.name} onChange={(e) => setRecipientField('name', e.target.value)} />
          {errors['recipient.name'] && <div className="text-xs text-red-600 mt-1">{errors['recipient.name']}</div>}
        </label>

        <label>
          <div className="text-sm font-medium">Город назначения</div>
          <input className="mt-1 px-3 py-2 border rounded w-full" value={value.recipient.city} onChange={(e) => setRecipientField('city', e.target.value)} />
          {errors['recipient.city'] && <div className="text-xs text-red-600 mt-1">{errors['recipient.city']}</div>}
        </label>

        <div>
          <div className="text-sm font-medium">Тип груза</div>
          <div className="mt-2 flex gap-2">
            {(['documents', 'fragile', 'regular'] as ParcelType[]).map(t => (
              <button
                key={t}
                onClick={() => setParcelField('type', t)}
                type="button"
                className={`px-3 py-1 border rounded ${value.parcel.type === t ? 'bg-indigo-600 text-white' : ''}`}
              >
                {t === 'documents' ? 'Документы' : t === 'fragile' ? 'Хрупкое' : 'Обычное'}
              </button>
            ))}
          </div>
        </div>

        <label>
          <div className="text-sm font-medium">Вес, кг (0.1 - 30)</div>
          <input type="number" step="0.1" min="0.1" max="30" className="mt-1 px-3 py-2 border rounded w-48" value={String(value.parcel.weight)} onChange={(e) => setParcelField('weight', Number(e.target.value))} />
          {errors['parcel.weight'] && <div className="text-xs text-red-600 mt-1">{errors['parcel.weight']}</div>}
        </label>
      </div>

      <div className="mt-6 flex justify-between">
        <button onClick={onBack} className="px-4 py-2 border rounded">Назад</button>
        <button onClick={validateAndNext} className="px-4 py-2 bg-indigo-600 text-white rounded">Далее</button>
      </div>
    </div>
  )
}