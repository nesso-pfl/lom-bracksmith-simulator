import { Box, ChakraProvider, Flex, Heading } from "@chakra-ui/react"
import {
  BaseMaterialAndWeaponTypeForm,
  SelectedSideMaterialHistory,
  SideMaterialButtons,
  WeaponStatus,
} from "./components"
import { baseMaterialData, weaponData } from "./data"
import { useState } from "react"
import { SideMaterial } from "./logic"

function App() {
  const [selectedSideMaterials, setSelectedSideMaterials] = useState<SideMaterial[]>([])

  return (
    <ChakraProvider>
      <Box p={4} bg="orange.100" minH={"100vh"}>
        <Heading as="h1" fontSize="xl" mb={5}>
          聖剣伝説 Legend of Mana 武器鍛冶シミュレータ
        </Heading>
        <Flex mb={5} gap={8}>
          <BaseMaterialAndWeaponTypeForm
            onChangeBaseMaterial={(e) => console.log(e)}
            onChangeWeaponType={(e) => console.log(e)}
          />
          <WeaponStatus
            weapon={{
              material: baseMaterialData[0],
              type: weaponData[0],
              bigTricks: [],
              status: {
                power: 2,
                technique: 2,
                defence: 2,
                magic: 2,
                physical: 2,
                spirit: 2,
                charm: 2,
                luck: 2,
              },
              element: {
                light: 2,
                dark: 2,
                wood: 2,
                metal: 2,
                fire: 2,
                earth: 2,
                wind: 2,
                water: 2,
              },
              secretPowers: [],
            }}
          />
        </Flex>
        <Flex>
          <Box>
            <SideMaterialButtons
              onClick={(material) => setSelectedSideMaterials((current) => [...current, material])}
            />
          </Box>
          <Box minW="150px" minH={0}>
            <SelectedSideMaterialHistory sideMaterials={selectedSideMaterials} />
          </Box>
        </Flex>
      </Box>
    </ChakraProvider>
  )
}

export default App
