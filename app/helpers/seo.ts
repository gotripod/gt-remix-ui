import type { V2_MetaMatches } from "@remix-run/react/dist/routeModules"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const parentTitles = (matches: V2_MetaMatches) =>{

  const meta = matches.map(x => x.meta)
  console.log(meta.flat())
  return meta.flat().reduce(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (prev: string, meta: any) => {
      console.log(prev, meta)
      return (meta?.title ?? '') + prev
    },
    ''
  )
}