import z from 'zod'

const ACFFieldSchema = z.union([
  z.string(),
  z.number(),
  z.boolean(),
  z.array(z.unknown()),
  z.record(z.unknown())
])

export default ACFFieldSchema
