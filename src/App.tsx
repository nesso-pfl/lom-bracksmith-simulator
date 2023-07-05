import { Box, ChakraProvider } from "@chakra-ui/react"
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
      <Box>
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
        <SideMaterialButtons onClick={(material) => setSelectedSideMaterials((current) => [...current, material])} />
        <SelectedSideMaterialHistory sideMaterials={selectedSideMaterials} />
      </Box>
    </ChakraProvider>
  )
}

export default App
