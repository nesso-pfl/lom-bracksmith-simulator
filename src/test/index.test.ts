import { test, expect } from 'vitest'
import { baseMaterialData, weaponData, sideMaterialData } from '../data'
import { blackSmith } from '../logic/blackSmith'
import { SideMaterial, Weapon } from '../logic'

const getSideMaterial = (name: string) => {
  const sideMaterial = sideMaterialData.find((material) => material.name === name)
  if (!sideMaterial) throw new Error(`SideMaterial ${name} not found`)
  return sideMaterial
}

const bulkBlackSmith = (weapon: Weapon, sideMaterials: SideMaterial[]): Weapon => {
  if (sideMaterials.length === 0) return weapon
  return bulkBlackSmith(blackSmith(weapon, sideMaterials[0]), sideMaterials.slice(1))
}

const defaultWeapon = {
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
}

test('Simple blackSmith', () => {
  expect(bulkBlackSmith(defaultWeapon, ['火のマナストーン'].map(getSideMaterial))).toMatchObject({
    ...defaultWeapon,
    element: { ...defaultWeapon.element, fire: 1 },
    reservedSecretPower: 'サラマンダー',
  })
})
