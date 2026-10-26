import { ENV } from '@/lib/constants'

export const dynamic = 'force-static'

export default function robots() {
  return {
    rules: [
      {
        userAgent: '*'
      }
    ],
    sitemap: `${ENV.NEXT_PUBLIC_WEBSITE_URL}/sitemap.xml`,
    host: ENV.NEXT_PUBLIC_WEBSITE_URL
  }
}
