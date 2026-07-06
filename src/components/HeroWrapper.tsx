import { client } from '@/sanity/client'
import { prochaineCourseQuery } from '@/sanity/queries'
import type { Course } from '@/sanity/types'
import Hero from './Hero'

export default async function HeroWrapper() {
  const course: Course | null = await client.fetch(
    prochaineCourseQuery,
    {},
    { next: { revalidate: 60 } }
  )
  return <Hero course={course} />
}
