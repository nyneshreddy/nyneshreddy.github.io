'use client'

import { allProjects } from 'contentlayer/generated'
import { useSearchParams } from 'next/navigation'
import { ProjectCard } from '@/../components/molecules/project-card'
import { FadeIn, FadeInStagger, AnimatePresence } from '@/../components/atoms/fade-in'

export default function ProjectPage() {
  const searchParams = useSearchParams()
  const tag = searchParams.get('tag')
  let filteredProjects = tag ? allProjects.filter(project => project.tag?.includes(tag)) : allProjects

  return (
    <FadeInStagger className='grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 p-5' faster>
      <AnimatePresence mode='wait'>
        {filteredProjects.map(project => (
          <FadeIn layout key={project.title} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
            <ProjectCard data={project} />
          </FadeIn>
        ))}
      </AnimatePresence>
    </FadeInStagger>
  )
}
