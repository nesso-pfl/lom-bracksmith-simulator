import { Box, Heading, VStack } from '@chakra-ui/react'
import React from 'react'
import { SideMaterial } from '../logic'

type Props = {
  sideMaterials: SideMaterial[]
}

export const SelectedSideMaterialHistory: React.FC<Props> = ({ sideMaterials }) => {
  return (
    <Box as="section">
      <Heading fontSize="lg" mb={2}>
        使用副原料
      </Heading>
      <VStack gap={1}>
        {sideMaterials.map((material, index) => (
          <Box key={index} fontSize="sm">
            {material.name}
          </Box>
        ))}
      </VStack>
    </Box>
  )
}
