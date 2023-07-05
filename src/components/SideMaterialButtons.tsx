import { Box, Flex, Heading } from "@chakra-ui/react"
import { sideMaterialData } from "../data"
import React from "react"
import { SideMaterial } from "../logic"

type Props = {
  onClick: (material: SideMaterial) => unknown
}

export const SideMaterialButtons: React.FC<Props> = ({ onClick }) => {
  return (
    <Box as="section">
      <Heading fontSize="lg" mb={2}>
        副原料リスト
      </Heading>
      <Flex wrap="wrap">
        {sideMaterialData.map((material) => (
          <Box
            key={material.name}
            as="button"
            fontSize="sm"
            borderWidth={1}
            py={2}
            minW="150px"
            onClick={() => onClick(material)}
          >
            {material.name}
          </Box>
        ))}
      </Flex>
    </Box>
  )
}
