import { notFound } from 'next/navigation'
import { allProjects } from 'contentlayer/generated'

import { MDXComponent } from '@/../components/molecules/mdx-component'

type ParamsProps = {
  title: string
}

async function getProjectFromParams(params: ParamsProps) {
  const post = allProjects.find(post => post.slug === params.title)
  if (!post) null

  return post
}

export async function generateStaticParams() {
  return allProjects.map(post => ({
    title: post.slug
  }))
}

export default async function ProjectDetail({ params }: { params: ParamsProps }) {
  const about = await getProjectFromParams(params)
  if (!about) return notFound()

  return (
    <MDXComponent
      code={about.body.code}
      className={
        'prose-h2:text-foreground prose-h3:text-foreground prose-p:text-muted-foreground prose-a:text-foreground prose-li:text-muted-foreground prose-img:w-2/3 prose-img:mx-auto prose-strong:text-foreground prose-h4:text-foreground prose-a:no-underline'
      }
    />
  )
}
