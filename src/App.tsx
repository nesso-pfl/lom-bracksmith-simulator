import { Box, ChakraProvider } from "@chakra-ui/react"
import { WeaponStatus } from "./components/WeaponStatus"

function App() {
  return (
    <ChakraProvider>
      <Box>
        <WeaponStatus
          weapon={{
            material: { type: "metal", name: "ロリマー聖鉄" },
            type: "sword",
            bigTrick: [],
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
            secretPower: [],
          }}
        />
      </Box>
    </ChakraProvider>
  )
}

export default App
