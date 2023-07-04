import { Element, SecretPower, Status } from "."

export type Category =
  | "coin"
  | "manaStone"
  | "manaCristal"
  | "seed"
  | "fruit"
  | "meat"
  | "clawFang"
  | "pupil"
  | "feather"
  | "liquorBottle"
  | "bottle"
  | "pot"
  | "pill"
  | "powder"
  | "bag"
  | "etc"

export type SideMaterial = {
  name: string
  category: Category
  energy: number
  outingEnergy: number
  element?: Element
  secretPower?: SecretPower
  status?: Partial<Record<Status, `${number}up` | number>>
  specRate?: Partial<Record<"sharpness" | "weight" | "strength" | "technique", number>>
}
