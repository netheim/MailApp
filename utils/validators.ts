import { z } from 'zod'

export const senderSchema = z.object({
  name: z.string().min(2, 'Имя должно быть минимум 2 символа'),
  phone: z.string().regex(/^\+?\d{7,15}$/, 'Неверный формат телефона. Пример: +71234567890'),
  city: z.string().min(1, 'Город обязателен')
})

export const recipientSchema = z.object({
  name: z.string().min(1, 'Имя получателя обязательно'),
  city: z.string().min(1, 'Город назначения обязателен')
})

export const parcelSchema = z.object({
  type: z.enum(['documents', 'fragile', 'regular']),
  weight: z.number().min(0.1, 'Минимальный вес 0.1 кг').max(30, 'Максимальный вес 30 кг')
})