'use client'

import { Suspense, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

function PasswordGate() {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [shake, setShake] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    const res = await fetch('/api/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    })

    if (res.ok) {
      const from = searchParams.get('from') ?? '/'
      router.push(from)
    } else {
      setShake(true)
      setError('Senha incorreta. Tente novamente.')
      setPassword('')
      setTimeout(() => setShake(false), 500)
    }

    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-[#F4F6F8] flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="w-full max-w-sm"
      >
        <div className="flex flex-col items-center mb-10">
          <div className="w-48 h-12 relative mb-6">
            <Image
              src="/assets/logos/sindiconet-mista-colorida.svg"
              alt="Síndiconet"
              fill
              className="object-contain"
              priority
            />
          </div>
          <p className="text-sm text-[#3D3D3D]/60 font-body text-center">
            Brand Center — acesso restrito
          </p>
        </div>

        <motion.form
          onSubmit={handleSubmit}
          animate={shake ? { x: [0, -8, 8, -6, 6, -4, 4, 0] } : { x: 0 }}
          transition={{ duration: 0.45 }}
          className="bg-white rounded-2xl shadow-sm border border-black/5 p-8 flex flex-col gap-5"
        >
          <div className="flex flex-col gap-2">
            <label
              htmlFor="password"
              className="text-xs font-semibold uppercase tracking-widest text-[#3D3D3D]/50 font-body"
            >
              Senha de acesso
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••"
              autoComplete="current-password"
              className="w-full px-4 py-3 rounded-xl border border-black/10 bg-[#F4F6F8] text-[#3D3D3D] font-body text-sm focus:outline-none focus:ring-2 focus:ring-[#3e77db] transition placeholder:text-[#3D3D3D]/30"
              required
            />
          </div>

          <AnimatePresence>
            {error && (
              <motion.p
                key="error"
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.2 }}
                className="text-[#D13D2A] text-xs font-body text-center"
              >
                {error}
              </motion.p>
            )}
          </AnimatePresence>

          <button
            type="submit"
            disabled={loading || !password}
            className="w-full py-3 rounded-xl bg-[#3e77db] text-white font-headline font-semibold text-sm tracking-wide transition hover:bg-[#3e77db] active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {loading ? 'Verificando...' : 'Entrar'}
          </button>
        </motion.form>
      </motion.div>
    </div>
  )
}

export default function AuthPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#F4F6F8]" />}>
      <PasswordGate />
    </Suspense>
  )
}
