import { allAbouts } from 'contentlayer/generated'
import { notFound } from 'next/navigation'

import { MDXComponent } from '@/components/molecules/mdx-component'

type ParamsProps = {
  title: string
}

async function getContent(params: ParamsProps) {
  const post = allAbouts.find((post) => post.slug === params.title)
  if (!post) return null
  return post
}

export async function generateStaticParams() {
  console.log(
    'Generating params for About:',
    allAbouts.map((post) => ({ title: post.slug }))
  )
  return allAbouts.map((post) => ({
    title: post.slug
  }))
}

export default async function Page({ params }: { params: Promise<ParamsProps> }) {
  const resolvedParams = await params
  const content = await getContent(resolvedParams)
  if (!content) return notFound()

  return <MDXComponent code={content.body.code} />
}
