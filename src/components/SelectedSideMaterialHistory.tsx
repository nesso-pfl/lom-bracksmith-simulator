import { Box, VStack } from "@chakra-ui/react"
import React from "react"
import { SideMaterial } from "../logic"

type Props = {
  sideMaterials: SideMaterial[]
}

export const SelectedSideMaterialHistory: React.FC<Props> = ({ sideMaterials }) => {
  return (
    <VStack gap={1}>
      {sideMaterials.map((material, index) => (
        <Box key={index}>{material.name}</Box>
      ))}
    </VStack>
  )
}
