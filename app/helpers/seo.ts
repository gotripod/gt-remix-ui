import type { V2_MetaMatches } from "@remix-run/react/dist/routeModules"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const parentTitles = (matches: V2_MetaMatches) =>{

  const meta = matches.map(x => x.meta)
  return meta.flat().reduce(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (prev: string, meta: any) => {
      return (meta?.title ?? '') + prev
    },
    ''
  )
}

import type { V2_HtmlMetaDescriptor, V2_MetaFunction } from "@remix-run/cloudflare";

export const mergeMeta = (
  overrideFn: V2_MetaFunction,
  appendFn?: V2_MetaFunction,
): V2_MetaFunction => {
  return arg => {
    // get meta from parent routes
    let mergedMeta = (arg.matches as V2_MetaMatches).reduce((acc, match) => {
      const meta= match.meta
      return acc.concat(meta || []);
    }, [] as V2_HtmlMetaDescriptor[]);

    console.log('parentMeta', mergedMeta)

    // replace any parent meta with the same name or property with the override
    const overrides = overrideFn(arg);
    for (const override of overrides) {
      const index = mergedMeta.findIndex(
        meta => {
          console.log(meta, override)
          return ("name" in meta &&
            "name" in override &&
            meta.name === override.name) ||
          ("property" in meta &&
            "property" in override &&
            meta.property === override.property) ||
          ("title" in meta && "title" in override)
        }
      );
      if (index !== -1) {
        console.log('override', override)
        mergedMeta.splice(index, 1, override);
      }
    }

    // append any additional meta
    if (appendFn) {
      mergedMeta = mergedMeta.concat(appendFn(arg));
    }

    return mergedMeta;
  };
};