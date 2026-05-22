interface SectionWrapperProps {
  id?: string
  title?: string
  description?: string
  background?: 'default' | 'dark' | 'product' | 'white'
  children: React.ReactNode
  className?: string
}

export function SectionWrapper({
  id,
  title,
  description,
  background = 'default',
  children,
  className = '',
}: SectionWrapperProps) {
  const bgClass = {
    default: 'bg-[#F4F6F8]',
    white:   'bg-white',
    dark:    'bg-[#1f3c6e]',
    product: 'bg-[var(--color-product-primary)]',
  }[background]

  const textClass = background === 'dark' || background === 'product'
    ? 'text-white'
    : 'text-[#101e37]'

  const subtextClass = background === 'dark' || background === 'product'
    ? 'text-white/60'
    : 'text-[#3D3D3D]/60'

  return (
    <section id={id} className={`py-20 ${bgClass} ${className}`}>
      <div className="max-w-[1280px] mx-auto px-6">
        {(title || description) && (
          <div className="mb-12">
            {title && (
              <h2 className={`font-headline font-bold text-3xl md:text-4xl mb-3 ${textClass}`}>
                {title}
              </h2>
            )}
            {description && (
              <p className={`font-body text-lg max-w-2xl ${subtextClass}`}>
                {description}
              </p>
            )}
          </div>
        )}
        {children}
      </div>
    </section>
  )
}
