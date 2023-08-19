import { test, expect } from 'vitest'
import { baseMaterialData, weaponData, sideMaterialData } from '../data'
import { blackSmith } from '../logic/blackSmith'
import { SideMaterial, Weapon, calcOffense } from '../logic'

const getWeaponType = (name: string) => {
  const weaponType = weaponData.find((w) => w.name === name)
  if (!weaponType) throw new Error(`WeaponType ${name} not found`)
  return weaponType
}
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
  const weapon = {
    ...defaultWeapon,
    type: getWeaponType('片手剣'),
    material: getBaseMaterial('ビエラ隕石'),
    element: { ...defaultWeapon.element, fire: 4 },
  }
  const chart1 = bulkBlackSmith(
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
    ].map(getSideMaterial),
  )
  expect(chart1).toMatchObject({
    ...weapon,
    element: { ...weapon.element, fire: 15 },
    reservedSecretPower: 'サラマンダー',
    secretPowers: ['サラマンダー', '魔法使い', '魔法使い'],
  })
  expect(calcOffense(chart1)).toBe(105)
  const chart2 = bulkBlackSmith(
    chart1,
    [
      'おおきな種',
      'イオウ',
      'イオウ',
      '虫肉',
      '虫肉',
      '虫肉',
      '虫肉',
      '虫肉',
      '虫肉',
      '虫肉',
      '虫肉',
      '虫肉',
      '虫肉',
      '虫肉',
      '火のマナストーン',
    ].map(getSideMaterial),
  )
  expect(chart2).toMatchObject({
    ...weapon,
    element: { ...weapon.element, wood: 15, fire: 15 },
    reservedSecretPower: 'サラマンダー',
    secretPowers: ['魔法使い', '魔法使い', 'ドリアード'],
  })
  expect(calcOffense(chart2)).toBe(155)
  const chart3 = bulkBlackSmith(
    chart2,
    [
      'アウラの銀貨',
      'イオウ',
      'イオウ',
      '虫肉',
      '虫肉',
      '虫肉',
      '虫肉',
      '虫肉',
      '虫肉',
      '虫肉',
      '虫肉',
      '虫肉',
      '虫肉',
      '虫肉',
      '火のマナストーン',
    ].map(getSideMaterial),
  )
  expect(chart3).toMatchObject({
    ...weapon,
    element: { ...weapon.element, wood: 15, metal: 15, fire: 14 },
    reservedSecretPower: 'サラマンダー',
    secretPowers: ['魔法使い', '魔法使い', 'アウラ'],
  })
  expect(calcOffense(chart3)).toBe(203)
  const chart4 = bulkBlackSmith(
    chart3,
    [
      'イオウ',
      '火のマナストーン',
      'ジェイドの銀貨',
      '水銀',
      '虫肉',
      '虫肉',
      '虫肉',
      '虫肉',
      '虫肉',
      '虫肉',
      '虫肉',
      '虫肉',
      '虫肉',
      '虫肉',
      '虫肉',
      '虫肉',
      'ジェイドの銀貨',
      '火のマナストーン',
    ].map(getSideMaterial),
  )
  expect(chart4).toMatchObject({
    ...weapon,
    element: { ...weapon.element, dark: 15, wood: 15, metal: 15, fire: 14 },
    reservedSecretPower: 'サラマンダー',
    secretPowers: ['ジェイド', '魔女', 'ジェイド'],
  })
  expect(calcOffense(chart4)).toBe(254)
  const chart5 = bulkBlackSmith(
    chart4,
    [
      'イオウ',
      'イオウ',
      '火のマナストーン',
      'ウィスプの銀貨',
      'イオウ',
      '虫肉',
      '虫肉',
      '虫肉',
      '虫肉',
      '虫肉',
      '虫肉',
      '虫肉',
      '虫肉',
      '虫肉',
      '虫肉',
      '虫肉',
      '虫肉',
      '虫肉',
    ].map(getSideMaterial),
  )
  expect(chart5).toMatchObject({
    ...weapon,
    element: { ...weapon.element, light: 15, dark: 15, wood: 15, metal: 15, fire: 15 },
    reservedSecretPower: '魔法使い',
    secretPowers: ['ウィスプ', 'サラマンダー', '魔法使い'],
  })
  expect(calcOffense(chart5)).toBe(308)
  const chart6 = bulkBlackSmith(
    chart5,
    [
      '火のマナストーン',
      'ジンの銀貨',
      '水銀',
      '虫肉',
      '虫肉',
      '虫肉',
      '虫肉',
      '虫肉',
      '虫肉',
      '虫肉',
      '虫肉',
      '虫肉',
      '虫肉',
      '虫肉',
      '水銀',
      'ジンの銀貨',
      '火のマナストーン',
      'イオウ',
      'イオウ',
      '火のマナストーン',
    ].map(getSideMaterial),
  )
  expect(chart6).toMatchObject({
    ...weapon,
    element: { ...weapon.element, light: 15, dark: 15, wood: 15, metal: 15, fire: 15, wind: 15 },
    reservedSecretPower: 'サラマンダー',
    secretPowers: ['魔法使い', '魔法使い', 'サラマンダー'],
  })
  expect(calcOffense(chart6)).toBe(359)
})

// http://ultimagarden.net/archive/Playtown-Toys_7099/seiken/
test('Mithril 1', () => {
  const weapon = { ...defaultWeapon, material: getBaseMaterial('ミスリル銀') }
  const chart1 = bulkBlackSmith(
    weapon,
    ['輝きのクリスタル', '輝きのクリスタル', 'アウラの銀貨', 'アウラの銀貨', '水銀', '輝きのクリスタル'].map(
      getSideMaterial,
    ),
  )
  expect(chart1).toMatchObject({
    ...weapon,
    element: { ...weapon.element, metal: 7 },
    reservedSecretPower: '暁の娘',
    secretPowers: ['魔女', 'アウラ', 'アウラ'],
  })
  const chart2 = bulkBlackSmith(
    chart1,
    ['輝きのクリスタル', 'ドリアードの銀貨', 'ドリアードの銀貨', 'イオウ', '輝きのクリスタル'].map(getSideMaterial),
  )
  expect(chart2).toMatchObject({
    ...weapon,
    element: { ...weapon.element, wood: 7, metal: 7 },
    reservedSecretPower: '暁の娘',
    secretPowers: ['魔法使い', 'ドリアード', 'ドリアード'],
  })
  const chart3 = bulkBlackSmith(
    chart2,
    ['輝きのクリスタル', 'ジェイドの銀貨', 'ジェイドの銀貨', '輝きのクリスタル', '輝きのクリスタル'].map(
      getSideMaterial,
    ),
  )
  expect(chart3).toMatchObject({
    ...weapon,
    element: { ...weapon.element, dark: 6, wood: 7, metal: 7 },
    reservedSecretPower: '暁の娘',
    secretPowers: ['暁の娘', 'ジェイド', 'ジェイド'],
  })
  const chart4 = bulkBlackSmith(
    chart3,
    ['ウィスプの銀貨', 'ウィスプの銀貨', '輝きのクリスタル', '輝きのクリスタル'].map(getSideMaterial),
  )
  expect(chart4).toMatchObject({
    ...weapon,
    element: { ...weapon.element, light: 6, dark: 6, wood: 7, metal: 7 },
    reservedSecretPower: '暁の娘',
    secretPowers: ['暁の娘', 'ウィスプ', 'ウィスプ'],
  })
  const chart5 = bulkBlackSmith(
    chart4,
    ['サラマンダーの銀貨', 'サラマンダーの銀貨', 'イオウ', '輝きのクリスタル'].map(getSideMaterial),
  )
  expect(chart5).toMatchObject({
    ...weapon,
    element: { ...weapon.element, light: 6, dark: 6, wood: 7, metal: 7, fire: 7 },
    reservedSecretPower: '暁の娘',
    secretPowers: ['魔法使い', 'サラマンダー', 'サラマンダー'],
  })
  const chart6 = bulkBlackSmith(
    chart5,
    ['輝きのクリスタル', 'ジンの銀貨', 'ジンの銀貨', '水銀', '輝きのクリスタル'].map(getSideMaterial),
  )
  expect(chart6).toMatchObject({
    ...weapon,
    element: { ...weapon.element, light: 6, dark: 6, wood: 7, metal: 7, fire: 7, wind: 7 },
    reservedSecretPower: '暁の娘',
    secretPowers: ['魔女', 'ジン', 'ジン'],
  })
  const chart7 = bulkBlackSmith(
    chart6,
    ['カオスのクリスタル', 'ノームの銀貨', 'ノームの銀貨', 'イオウ', '輝きのクリスタル'].map(getSideMaterial),
  )
  expect(chart7).toMatchObject({
    ...weapon,
    element: { ...weapon.element, light: 6, dark: 6, wood: 7, metal: 7, fire: 7, earth: 6, wind: 7 },
    reservedSecretPower: '暁の娘',
    secretPowers: ['魔法使い', 'ノーム', 'ノーム'],
  })
})

test('Commet with max arbitrary element', () => {
  const weapon = {
    ...defaultWeapon,
    material: getBaseMaterial('スウィフト隕石'),
    element: { ...defaultWeapon.element, fire: 4 },
  }
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
