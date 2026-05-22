import { redirect } from 'next/navigation'

interface PageProps {
  params: { slug: string }
}

export default function ProductRedirect({ params }: PageProps) {
  redirect(`/identidade/produtos/${params.slug}`)
}
