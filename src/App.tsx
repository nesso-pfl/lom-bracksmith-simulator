import { Box, ChakraProvider } from "@chakra-ui/react"
import { SideMaterialButtons, WeaponStatus } from "./components"
import { materialData, weaponData } from "./data"

function App() {
  return (
    <ChakraProvider>
      <Box>
        <WeaponStatus
          weapon={{
            material: materialData[0],
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
        <SideMaterialButtons onClick={(material) => console.log(material)} />
      </Box>
    </ChakraProvider>
  )
}

export default App
