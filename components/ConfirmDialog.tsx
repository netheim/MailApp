'use client'

import React from 'react'

export default function ConfirmDialog({ open, title, description, onCancel, onConfirm }: {
  open: boolean
  title: string
  description?: string
  onCancel: () => void
  onConfirm: () => void
}) {
  if (!open) return null
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/30" onClick={onCancel} />
      <div className="bg-white rounded shadow p-4 z-10 w-11/12 max-w-md">
        <h3 className="font-semibold">{title}</h3>
        {description && <div className="text-sm text-gray-600 mt-2">{description}</div>}
        <div className="mt-4 flex justify-end gap-2">
          <button onClick={onCancel} className="px-3 py-1 border rounded">Отмена</button>
          <button onClick={onConfirm} className="px-3 py-1 bg-red-600 text-white rounded">Удалить</button>
        </div>
      </div>
    </div>
  )
}