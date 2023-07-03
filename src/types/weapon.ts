export const weaponTypes = ["sword"] as const
export type WeaponType = (typeof weaponTypes)[number]

export const showWeaponType = (weaponType: WeaponType) =>
  ({
    sword: "片手剣",
  }[weaponType])
