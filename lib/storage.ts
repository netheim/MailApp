import { Order } from '../types'

const KEY = 'parcel_orders_v1'

export function loadOrders(): Order[] {
  try {
    if (typeof window === 'undefined') return []
    const raw = localStorage.getItem(KEY)
    if (!raw) return []
    return JSON.parse(raw) as Order[]
  } catch (e) {
    console.error(e)
    return []
  }
}

export function saveOrders(orders: Order[]) {
  try {
    localStorage.setItem(KEY, JSON.stringify(orders))
  } catch (e) {
    console.error(e)
  }
}

export function addOrder(order: Order) {
  const list = loadOrders()
  list.unshift(order)
  saveOrders(list)
}