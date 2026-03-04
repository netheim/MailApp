'use client'
import React from 'react'

export default function Stepper({ step }: { step: number }) {
  const steps = ['Отправитель', 'Получатель и посылка', 'Подтверждение']
  return (
    <div className="mb-6">
      <div className="flex items-center gap-4">
        {steps.map((label, i) => {
          const idx = i + 1
          const active = idx === step
          const done = idx < step
          return (
            <div key={label} className="flex items-center gap-3">
              <div className={`w-9 h-9 rounded-full flex items-center justify-center ${done ? 'bg-indigo-600 text-white' : active ? 'border-2 border-indigo-600 text-indigo-600' : 'bg-gray-100 text-gray-600'}`}>
                {idx}
              </div>
              <div className={`text-sm ${active ? 'text-indigo-600 font-medium' : 'text-gray-600'}`}>{label}</div>
              {i < steps.length - 1 && <div className="w-10 h-px bg-gray-200 ml-3" />}
            </div>
          )
        })}
      </div>
      <div className="mt-3 h-2 bg-gray-100 rounded">
        <div
          className="h-2 bg-indigo-600 rounded"
          style={{ width: `${((step - 1) / (steps.length - 1)) * 100}%` }}
        />
      </div>
    </div>
  )
}