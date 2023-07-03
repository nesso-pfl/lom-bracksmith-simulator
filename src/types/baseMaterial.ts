import { Element } from "."

export const baseMaterialTypes = [
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
export type BaseMaterialType = (typeof baseMaterialTypes)[number]

export type BaseMaterial = {
  type: BaseMaterialType
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
