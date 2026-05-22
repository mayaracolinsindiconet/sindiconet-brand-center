'use client'

import { motion } from 'framer-motion'

interface CorrectIncorrectToggleProps {
  value: 'correct' | 'incorrect'
  onChange: (value: 'correct' | 'incorrect') => void
}

export function CorrectIncorrectToggle({ value, onChange }: CorrectIncorrectToggleProps) {
  return (
    <div
      role="group"
      aria-label="Modo de exibição"
      className="inline-flex rounded-xl border border-black/10 bg-white overflow-hidden"
    >
      <button
        onClick={() => onChange('correct')}
        aria-pressed={value === 'correct'}
        className={`relative px-4 py-2 text-xs font-semibold font-body transition-colors focus-visible:outline-none ${
          value === 'correct' ? 'text-white' : 'text-[#3D3D3D]/50 hover:text-[#3D3D3D]'
        }`}
      >
        {value === 'correct' && (
          <motion.span
            layoutId="toggle-pill"
            className="absolute inset-0 bg-[#318367]"
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
          />
        )}
        <span className="relative">✓ Correto</span>
      </button>

      <button
        onClick={() => onChange('incorrect')}
        aria-pressed={value === 'incorrect'}
        className={`relative px-4 py-2 text-xs font-semibold font-body transition-colors focus-visible:outline-none ${
          value === 'incorrect' ? 'text-white' : 'text-[#3D3D3D]/50 hover:text-[#3D3D3D]'
        }`}
      >
        {value === 'incorrect' && (
          <motion.span
            layoutId="toggle-pill"
            className="absolute inset-0 bg-[#D13D2A]"
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
          />
        )}
        <span className="relative">✗ Incorreto</span>
      </button>
    </div>
  )
}
