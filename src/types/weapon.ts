import { BigTrick, Material, SecretPower, Status, Element } from "."

export const weaponTypes = [
  "dagger",
  "sword",
  "hatchet",
  "blade",
  "axe",
  "hammer",
  "lance",
  "stick",
  "knuckle",
  "nunchaku",
  "bow",
] as const
export type WeaponType = {
  id: (typeof weaponTypes)[number]
  name: string
  spec: Record<"sharpness" | "weight" | "strength" | "technique", number>
}

export type Weapon = {
  material: Material
  type: WeaponType
  bigTricks: BigTrick[]
  status: Record<Status, number>
  element: Record<Element, number>
  secretPowers: SecretPower[]
}
