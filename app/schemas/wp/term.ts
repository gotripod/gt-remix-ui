import { z } from 'zod'
const TermSchema = z.object({
  id: z.number(),
  link: z.string().url(),
  name: z.string(),
  slug: z.string(),
  taxonomy: z.string(),
  _links: z.record(z.unknown())
})

export default TermSchema
