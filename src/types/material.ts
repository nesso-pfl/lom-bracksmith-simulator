export const materialTypes = [
  "metal",
  "wood",
  "stone",
  "leather",
  "scale",
  "bone",
  "cloth",
  "meteorite",
  "etc",
] as const
export type MaterialType = (typeof materialTypes)[number]

export type Material = {
  type: MaterialType
  name: string
}
