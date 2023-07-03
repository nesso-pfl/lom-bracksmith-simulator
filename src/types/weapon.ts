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
