import { Element } from '.'

export const baseMaterialTypes = ['金属', '木材', '石', '革', '鱗', '骨', '布', '隕石', '他'] as const
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
