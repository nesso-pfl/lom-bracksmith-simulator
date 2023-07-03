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

export const calcOffense = (weapon: Weapon) => {
  return Math.ceil(
    (((weapon.type.spec.sharpness * weapon.material.spec.sharpness +
      weapon.type.spec.weight * weapon.material.spec.weight +
      weapon.type.spec.strength * weapon.material.spec.strength +
      weapon.type.spec.technique * weapon.material.spec.technique) /
      128) *
      (weapon.material.suppression + Object.values(weapon.element).reduce((cur, acc) => cur + acc))) /
      weapon.material.suppression,
  )
}
