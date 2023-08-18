import { Box, ChakraProvider, Flex, Heading } from '@chakra-ui/react'
import {
  BaseMaterialAndWeaponTypeForm,
  SelectedSideMaterialHistory,
  SideMaterialButtons,
  WeaponStatus,
} from './components'
import { baseMaterialData, weaponData } from './data'
import { useState } from 'react'
import { SideMaterial, Weapon, blackSmith } from './logic'

function App() {
  const [weapon, setWeapon] = useState<Weapon>({
    material: baseMaterialData[0],
    type: weaponData[0],
    bigTricks: [],
    status: {
      power: 0,
      technique: 0,
      defence: 0,
      magic: 0,
      physical: 0,
      spirit: 0,
      charm: 0,
      luck: 0,
    },
    element: {
      light: 0,
      dark: 0,
      wood: 0,
      metal: 0,
      fire: 0,
      earth: 0,
      wind: 0,
      water: 0,
    },
    secretPowers: [],
    reservedSecretPower: undefined,
  })
  const [selectedSideMaterials, setSelectedSideMaterials] = useState<SideMaterial[]>([])

  return (
    <ChakraProvider>
      <Box p={4} bg="orange.100" minH={'100vh'}>
        <Heading as="h1" fontSize="xl" mb={5}>
          聖剣伝説 Legend of Mana 武器鍛冶シミュレータ
        </Heading>
        <Flex mb={5} gap={8}>
          <BaseMaterialAndWeaponTypeForm
            onChangeBaseMaterial={(material) => {
              setWeapon((current) => ({ ...current, material }))
            }}
            onChangeWeaponType={(weaponType) => {
              setWeapon((current) => ({ ...current, type: weaponType }))
            }}
          />
          <WeaponStatus weapon={weapon} />
        </Flex>
        <Flex>
          <Box>
            <SideMaterialButtons
              onClick={(material) => {
                setSelectedSideMaterials((current) => [...current, material])
                setWeapon(blackSmith(weapon, material))
              }}
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
