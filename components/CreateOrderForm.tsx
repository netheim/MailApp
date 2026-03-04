'use client'

import React, { useEffect, useState } from 'react'
import Stepper from './Stepper'
import Step1 from './formSteps/Step1'
import Step2 from './formSteps/Step2'
import Step3 from './formSteps/Step3'
import { Sender, Recipient, Parcel, Order } from '../types'
import { addOrder } from '../lib/storage'
import { v4 as uuidv4 } from 'uuid'
import { useRouter } from 'next/navigation'

type FormState = {
  sender: Sender
  recipient: Recipient
  parcel: Parcel
  consent: boolean
}

const initialState: FormState = {
  sender: { name: '', phone: '', city: '' },
  recipient: { name: '', city: '' },
  parcel: { type: 'documents', weight: 0.5 },
  consent: false
}

export default function CreateOrderForm() {
  const [step, setStep] = useState<number>(1)
  const [form, setForm] = useState<FormState>(initialState)
  const router = useRouter()

  useEffect(() => {
    // try to load draft
    try {
      const raw = localStorage.getItem('parcel_form_draft_v1')
      if (raw) {
        setForm(JSON.parse(raw))
      }
    } catch (e) {
      // ignore
    }
  }, [])

  useEffect(() => {
    // save draft on changes
    try {
      localStorage.setItem('parcel_form_draft_v1', JSON.stringify(form))
    } catch (e) {}
  }, [form])

  function next() {
    setStep(prev => Math.min(3, prev + 1))
  }

  function back() {
    setStep(prev => Math.max(1, prev - 1))
  }

  function submit() {
    const order: Order = {
      id: uuidv4(),
      sender: form.sender,
      recipient: form.recipient,
      parcel: form.parcel,
      createdAt: new Date().toISOString(),
      status: 'Создано',
      consent: form.consent
    }
    addOrder(order)
    // clear draft
    localStorage.removeItem('parcel_form_draft_v1')
    // redirect to orders
    router.push('/orders')
  }

  return (
    <div>
      <Stepper step={step} />

      <div>
        {step === 1 && <Step1 value={form.sender} onChange={(s) => setForm(f => ({ ...f, sender: s }))} onNext={next} />}
        {step === 2 && <Step2
          value={{ recipient: form.recipient, parcel: form.parcel, senderCity: form.sender.city }}
          onChange={(data) => setForm(f => ({ ...f, recipient: data.recipient, parcel: data.parcel }))}
          onNext={next}
          onBack={back}
        />}
        {step === 3 && <Step3 value={form} onBack={back} onSubmit={submit} onChange={(partial) => setForm(f => ({ ...f, ...partial }))} />}
      </div>
    </div>
  )
}