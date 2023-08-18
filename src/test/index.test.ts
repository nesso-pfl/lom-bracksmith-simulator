import { test, expect } from 'vitest'
import { baseMaterialData, weaponData, sideMaterialData } from '../data'
import { blackSmith } from '../logic/blackSmith'
import { SideMaterial, Weapon } from '../logic'

const getBaseMaterial = (name: string) => {
  const baseMaterial = baseMaterialData.find((w) => w.name === name)
  if (!baseMaterial) throw new Error(`BaseMaterial ${name} not found`)
  return baseMaterial
}
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
  material: getBaseMaterial('メノス銅'),
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

test('Simple', () => {
  expect(bulkBlackSmith(defaultWeapon, ['火のマナストーン'].map(getSideMaterial))).toMatchObject({
    ...defaultWeapon,
    element: { ...defaultWeapon.element, fire: 1 },
    reservedSecretPower: 'サラマンダー',
  })
})

test('Simple commet', () => {
  const weapon = { ...defaultWeapon, material: getBaseMaterial('スウィフト隕石') }
  expect(
    bulkBlackSmith(
      weapon,
      [
        '火のマナストーン',
        '火のマナストーン',
        'イオウ',
        'イオウ',
        '火のマナストーン',
        '火のマナストーン',
        'イオウ',
        'イオウ',
        '火のマナストーン',
        '火のマナストーン',
        'イオウ',
        'イオウ',
        '火のマナストーン',
        '火のマナストーン',
        'イオウ',
        'イオウ',
        '火のマナストーン',
        '火のマナストーン',
        'イオウ',
        'イオウ',
        '火のマナストーン',
        '火のマナストーン',
        'イオウ',
        'イオウ',
        '火のマナストーン',
        '火のマナストーン',
        'イオウ',
        'イオウ',
      ].map(getSideMaterial),
    ),
  ).toMatchObject({
    ...weapon,
    element: { ...weapon.element, fire: 15 },
    reservedSecretPower: '魔法使い',
    secretPowers: ['魔法使い', 'サラマンダー', 'サラマンダー'],
  })
})

test('Commet with max arbitrary element', () => {
  const weapon = { ...defaultWeapon, material: getBaseMaterial('スウィフト隕石') }
  expect(
    bulkBlackSmith(
      weapon,
      [
        '火のマナストーン',
        '火のマナストーン',
        'イオウ',
        'イオウ',
        '火のマナストーン',
        '火のマナストーン',
        'イオウ',
        'イオウ',
        '火のマナストーン',
        '火のマナストーン',
        'イオウ',
        'イオウ',
        '火のマナストーン',
        '火のマナストーン',
        'イオウ',
        'イオウ',
        '火のマナストーン',
        '火のマナストーン',
        'イオウ',
        'イオウ',
        '火のマナストーン',
        '火のマナストーン',
        'イオウ',
        'イオウ',
        '火のマナストーン',
        '火のマナストーン',
        'イオウ',
        'イオウ',
        '火のマナストーン',
        'イオウ',
        'まるい種',
        'イオウ',
        '獣肉',
        '獣肉',
        '獣肉',
        '獣肉',
        '獣肉',
        '獣肉',
        '獣肉',
        '獣肉',
        '獣肉',
        '獣肉',
        '獣肉',
        '獣肉',
        '獣肉',
      ].map(getSideMaterial),
    ),
  ).toMatchObject({
    ...weapon,
    element: { ...weapon.element, fire: 14, wood: 15 },
    reservedSecretPower: '魔法使い',
    secretPowers: ['ドリアード', '魔法使い', 'サラマンダー'],
  })
})
