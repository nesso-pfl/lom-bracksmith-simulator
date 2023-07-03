import { Box, HStack, VStack } from "@chakra-ui/react"
import React from "react"
import {
  BigTrick,
  Element,
  Material,
  SecretPower,
  Status,
  WeaponType,
  elements,
  showElement,
  showStatus,
  showWeaponType,
  statuses,
} from "../types"

export type Weapon = {
  material: Material
  type: WeaponType
  bigTricks: BigTrick[]
  status: Record<Status, number>
  element: Record<Element, number>
  secretPowers: SecretPower[]
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
      <HStack wrap={"wrap"}>
        <Box>
          <HStack>
            {statuses.map((status) => (
              <Box key={status}>
                <Box>{showStatus(status)}</Box>
                <Box>{weapon.status[status]}</Box>
              </Box>
            ))}
          </HStack>
          <HStack>
            {elements.map((element) => (
              <Box key={element}>
                <Box>{showElement(element)}</Box>
                <Box>{weapon.element[element]}</Box>
              </Box>
            ))}
          </HStack>
        </Box>
        <Box>
          <VStack>
            {weapon.bigTricks.map((bigTrick) => (
              <Box key={bigTrick.name}>{bigTrick.name}</Box>
            ))}
          </VStack>
          <VStack>
            {weapon.secretPowers.map((secretPower) => (
              <Box key={secretPower}>{secretPower}</Box>
            ))}
          </VStack>
        </Box>
      </HStack>
    </Box>
  )
}
