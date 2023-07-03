import { Element } from "."

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
  spec: {
    sharpness: number
    weight: number
    strength: number
    technique: number
  }
  suppression: number
  resistance: Record<Element, number>
}
