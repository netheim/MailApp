export type ParcelType = 'documents' | 'fragile' | 'regular'

export type Sender = {
  name: string
  phone: string
  city: string
}

export type Recipient = {
  name: string
  city: string
}

export type Parcel = {
  type: ParcelType
  weight: number
}

export type Order = {
  id: string
  sender: Sender
  recipient: Recipient
  parcel: Parcel
  createdAt: string
  status: string
  consent?: boolean
}