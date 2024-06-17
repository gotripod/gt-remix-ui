import type { MetaDescriptor, MetaFunction } from '@remix-run/cloudflare'
import type { MetaMatches } from '@remix-run/react/dist/routeModules'

export const parentTitles = (matches: MetaMatches<Record<string, unknown>>) => {
  const meta = matches.map((x) => x.meta)
  return meta.flat().reduce((previousValue, currentValue) => previousValue + currentValue, '')
}

export const mergeMeta = <
  LoaderData,
  RouteData extends Record<string, unknown> = Record<string, unknown>
>(
  overrideFn: MetaFunction<LoaderData, RouteData>,
  appendFn?: MetaFunction<LoaderData, RouteData>
): MetaFunction<LoaderData, RouteData> => {
  return (arg: Parameters<MetaFunction<LoaderData, RouteData>>[0]): MetaDescriptor[] => {
    // get meta from parent routes
    let mergedMeta = (arg.matches as MetaMatches).reduce((acc, match) => {
      const meta = match.meta
      return acc.concat(meta || [])
    }, [] as MetaDescriptor[])

    // replace any parent meta with the same name or property with the override
    const overrides = overrideFn(arg)
    for (const override of overrides) {
      const index = mergedMeta.findIndex((meta) => {
        return (
          ('name' in meta && 'name' in override && meta.name === override.name) ||
          ('property' in meta && 'property' in override && meta.property === override.property) ||
          ('title' in meta && 'title' in override)
        )
      })
      if (index !== -1) {
        mergedMeta.splice(index, 1, override)
      }
    }

    // append any additional meta
    if (appendFn) {
      mergedMeta = mergedMeta.concat(appendFn(arg))
    }

    return mergedMeta
  }
}
