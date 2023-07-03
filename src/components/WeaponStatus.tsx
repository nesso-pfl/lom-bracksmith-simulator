import { Box } from "@chakra-ui/react"
import React from "react"
import { BigTrick, Element, Material, SecretPower, Status, WeaponType, showWeaponType } from "../types"

export type Weapon = {
  material: Material
  type: WeaponType
  bigTrick: BigTrick[]
  status: Record<Status, number>
  element: Record<Element, number>
  secretPower: SecretPower[]
}

type Props = {
  weapon: Weapon
}
export const WeaponStatus: React.FC<Props> = ({ weapon }) => {
  const offense = 0

  return (
    <Box>
      <Box mb={3}>
        {weapon.material.name}の{showWeaponType(weapon.type)} {offense}
      </Box>
    </Box>
  )
}
