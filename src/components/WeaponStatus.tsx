import { Box, HStack, VStack } from "@chakra-ui/react"
import React from "react"
import { Weapon, calcOffense, elements, showElement, showStatus, statuses } from "../types"

type Props = {
  weapon: Weapon
}
export const WeaponStatus: React.FC<Props> = ({ weapon }) => {
  return (
    <Box>
      <Box mb={3}>
        {weapon.material.name}の{weapon.type.name} {calcOffense(weapon)}
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
