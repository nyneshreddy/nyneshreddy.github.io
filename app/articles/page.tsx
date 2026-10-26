'use client'

import { allArticles } from 'contentlayer/generated'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { Badge } from '@/components/atoms/badge'
import { Button } from '@/components/atoms/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/atoms/card'
import { AnimatePresence, FadeIn, FadeInStagger } from '@/components/atoms/fade-in'

export default function Articles() {
  const searchParams = useSearchParams()
  const tag = searchParams.get('tag')
  const filteredArticles = tag
    ? allArticles.filter((articles) => articles.tag?.includes(tag))
    : allArticles

  return (
    <FadeInStagger className='grid md:grid-cols-2 gap-5 p-5' faster>
      <AnimatePresence mode='wait'>
        {filteredArticles.map((articles) => (
          <FadeIn
            layout
            key={articles.title}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card className='h-max hover:shadow-lg hover:shadow-secondary'>
              <CardHeader className='p-5'>
                <CardTitle>
                  <Link
                    href={`/articles/${articles.slug.toLowerCase()}`}
                    className='leading-normal'
                  >
                    {articles.title}
                  </Link>
                </CardTitle>
              </CardHeader>
              <CardContent className='py-0 px-5 text-sm text-muted-foreground line-clamp-4'>
                {articles.summary}
              </CardContent>
              <CardFooter className='p-5'>
                <div className='space-y-1'>
                  <p className='text-xs text-muted-foreground hidden md:block'>
                    {articles.publishedDate}
                  </p>
                  <div className='flex items-center gap-x-1'>
                    <p className='text-sm text-muted-foreground'>Tags: </p>
                    <Badge>{articles.tag}</Badge>
                  </div>
                </div>
                <Button variant='outline' className='ml-auto' asChild>
                  <Link
                    href={`/articles/${articles.slug.toLowerCase()}`}
                    className='leading-normal'
                  >
                    Read More
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          </FadeIn>
        ))}
      </AnimatePresence>
    </FadeInStagger>
  )
}
