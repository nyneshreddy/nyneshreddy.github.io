import { notFound } from 'next/navigation'
import { allAbouts } from 'contentlayer/generated'

import { MDXComponent } from '@/../components/molecules/mdx-component'

type ParamsProps = {
  title: string
}

async function getContent(params: ParamsProps) {
  const post = allAbouts.find(post => post.title === params.title)
  if (!post) null
  return post
}

export async function generateStaticParams() {
  return allAbouts.map(post => ({
    title: post.title.toLowerCase()
  }))
}

export default async function Page({ params }: { params: ParamsProps }) {
  const content = await getContent(params)
  if (!content) return notFound()

  return <MDXComponent code={content.body.code} />
}
