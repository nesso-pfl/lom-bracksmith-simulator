import { Box, FormControl, FormLabel, Select } from "@chakra-ui/react"
import { baseMaterialData, weaponData } from "../data"
import React from "react"
import { BaseMaterial, WeaponType } from "../logic"

type Props = {
  onChangeWeaponType: (weaponType: WeaponType) => unknown
  onChangeBaseMaterial: (baseMaterial: BaseMaterial) => unknown
}

export const BaseMaterialAndWeaponTypeForm: React.FC<Props> = ({ onChangeWeaponType, onChangeBaseMaterial }) => {
  const onChangeWeaponType_ = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedWeapon = weaponData.find((weapon) => weapon.name === event.target.value)
    if (!selectedWeapon) throw new Error("weapon not found")
    onChangeWeaponType(selectedWeapon)
  }
  const onChangeBaseMaterial_ = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedBaseMaterial = baseMaterialData.find((baseMaterial) => baseMaterial.name === event.target.value)
    if (!selectedBaseMaterial) throw new Error("BaseMaterial not found")
    onChangeBaseMaterial(selectedBaseMaterial)
  }

  return (
    <Box>
      <FormControl mb={2}>
        <FormLabel fontSize="sm">武器種</FormLabel>
        <Select h={8} defaultValue={weaponData[0].name} onChange={onChangeWeaponType_} borderColor="gray.800">
          {weaponData.map((weapon) => (
            <option key={weapon.name}>{weapon.name}</option>
          ))}
        </Select>
      </FormControl>
      <FormControl>
        <FormLabel fontSize="sm">主原料</FormLabel>
        <Select h={8} defaultValue={baseMaterialData[0].name} onChange={onChangeBaseMaterial_} borderColor="gray.800">
          {baseMaterialData.map((material) => (
            <option key={material.name}>{material.name}</option>
          ))}
        </Select>
      </FormControl>
    </Box>
  )
}
