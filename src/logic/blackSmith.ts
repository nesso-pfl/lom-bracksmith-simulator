import { Element, SecretPower, SideMaterial, Weapon, getElementRelation, spToElement } from '.'

export type BlackSmith = {
  weapon: Weapon
  sideMaterial: SideMaterial
  currentEnergy: number
  extractedSecretPower: SecretPower | undefined
  wizard: number
  witch: number
}

// ref: https://blackstraycat.nobody.jp/lom/system.html
export const blackSmith = (weapon: Weapon, sideMaterial: SideMaterial) => {
  // SP暁の娘の効果
  // ・副原料のエネルギーで強化出来る最大Lv
  // ・補助SPを含めた場合の最大Lv
  // ・光闇という例外
  // ・属性の吸収を含めた場合の最大Lv
  // 優先順位は【光闇木金火土風水】の順にエネルギーが消費される。

  const state0 = {
    weapon,
    sideMaterial,
    currentEnergy: sideMaterial.energy,
    witch: 0,
    wizard: 0,
    extractedSecretPower: undefined,
  }
  // SP 押し出し(暁チェック)
  const state = reserveSP(state0)
  // 隕石処理
  const state1 = applyCommet(state)
  // 光闇判定
  const state2 = ['light', 'dark'].reduce(
    (cur, acc) => (state1.sideMaterial.element === acc ? forge(cur, acc) : cur),
    state1,
  )
  // SP チェック
  const state3 = [2, 1, 0].reduce((cur, acc) => applySP(cur, acc), state2)
  // 光闇以外判定
  const state4 = [...state3.weapon.secretPowers.map(spToElement), state3.sideMaterial.element]
    .filter(
      (maybeElement): maybeElement is Element =>
        maybeElement !== undefined && maybeElement !== 'dark' && maybeElement !== 'light',
    )
    .sort((a, b) => elementOrder.indexOf(a) - elementOrder.indexOf(b))
    .reduce((cur, acc) => forge(cur, acc), state3)

  return state4.weapon
}

const reserveSP = (blackSmith: BlackSmith): BlackSmith => {
  const { sideMaterial, weapon } = blackSmith
  if (sideMaterial.secretPower === undefined) {
    return blackSmith
  } else {
    const secretPowers = [weapon.reservedSecretPower, ...weapon.secretPowers].filter(
      (secretPower): secretPower is SecretPower => secretPower !== undefined,
    )
    const extractedSecretPower = secretPowers[3]
    return {
      ...blackSmith,
      weapon: {
        ...weapon,
        secretPowers: secretPowers.slice(0, 3),
        reservedSecretPower: sideMaterial.secretPower,
      },
      currentEnergy: extractedSecretPower === '暁の娘' ? sideMaterial.energy + 192 : sideMaterial.energy,
      extractedSecretPower,
    }
  }
}

const applyCommet = (blackSmith: BlackSmith): BlackSmith => {
  const { weapon } = blackSmith
  if (weapon.material.type !== '隕石' || weapon.element.fire === 0) return blackSmith
  return {
    ...blackSmith,
    weapon: {
      ...weapon,
      element: {
        ...weapon.element,
        fire: weapon.element.fire - 1,
      },
    },
    currentEnergy: blackSmith.currentEnergy + weapon.material.resistance.fire * Math.pow(2, weapon.element.fire - 1),
  }
}

const calcRequiredEnergy = (blackSmith: BlackSmith, element: Element) => {
  const level = blackSmith.weapon.element[element]
  const resistance = blackSmith.weapon.material.resistance[element]
  const support = (() => {
    switch (element) {
      case 'light':
      case 'wood':
      case 'fire':
      case 'earth':
        return 'wizard'
      case 'dark':
      case 'metal':
      case 'water':
      case 'wind':
        return 'witch'
    }
  })()
  return resistance === 32 && blackSmith[support] === 3
    ? 12 * Math.pow(2, level)
    : resistance === 32 && blackSmith[support] === 2
    ? 18 * Math.pow(2, level)
    : resistance === 32 && blackSmith[support] === 1
    ? 24 * Math.pow(2, level)
    : resistance >= 8 && blackSmith[support] === 3
    ? Math.pow(2, level)
    : resistance >= 8 && blackSmith[support] === 2
    ? 3 * Math.pow(2, level)
    : resistance >= 8 && blackSmith[support] === 1
    ? 6 * Math.pow(2, level)
    : resistance < 8 && blackSmith[support] === 3
    ? Math.pow(2, level)
    : resistance < 8 && blackSmith[support] === 2
    ? Math.pow(2, level)
    : resistance < 8 && blackSmith[support] === 1
    ? 3 * Math.pow(2, level)
    : resistance * Math.pow(2, level)
}

const canForge = (blackSmith: BlackSmith, element: Element): boolean => {
  const {
    extractedSecretPower,
    weapon: { reservedSecretPower, secretPowers, element: weaponElement },
  } = blackSmith
  if (weaponElement[element] === 15) return false
  const hasAncientMoon = !![reservedSecretPower, ...secretPowers, extractedSecretPower].find((sp) => sp === '太古の月')
  if (hasAncientMoon) return true

  const hasMirrorWorld = !![reservedSecretPower, ...secretPowers, extractedSecretPower].find((sp) => sp === '鏡面世界')
  const weakElement = getElementRelation(element, { hasMirrorWorld, weaponElement }).weak
  return weakElement === undefined || weaponElement[weakElement] === 0
}

const levelDownElement = (blackSmith: BlackSmith, element: Element) => {
  const {
    extractedSecretPower,
    weapon: { reservedSecretPower, secretPowers, element: weaponElement, material },
  } = blackSmith
  const hasAncientMoon = !![reservedSecretPower, ...secretPowers, extractedSecretPower].find((sp) => sp === '太古の月')
  const hasMirrorWorld = !![reservedSecretPower, ...secretPowers, extractedSecretPower].find((sp) => sp === '鏡面世界')
  const strongElement = getElementRelation(element, { hasMirrorWorld, weaponElement }).strong
  if (
    hasAncientMoon ||
    strongElement === undefined ||
    weaponElement[strongElement] === 0 ||
    (strongElement === 'light' && weaponElement.dark <= weaponElement.light) ||
    (strongElement === 'dark' && weaponElement.light <= weaponElement.dark)
  )
    return blackSmith

  return {
    ...blackSmith,
    currentEnergy:
      blackSmith.currentEnergy + material.resistance[strongElement] * Math.pow(2, weaponElement[strongElement] - 1),
    weapon: {
      ...blackSmith.weapon,
      element: {
        ...weaponElement,
        [strongElement]: strongElement === 'light' || strongElement === 'dark' ? 0 : weaponElement[strongElement] - 1,
      },
    },
  }
}

const forge = (blackSmith: BlackSmith, element: Element) => {
  const levelDownedBs = levelDownElement(blackSmith, element)
  const requiredEnergy = calcRequiredEnergy(levelDownedBs, element)
  console.log({ ce: levelDownedBs.currentEnergy, re: requiredEnergy, element })
  return canForge(levelDownedBs, element) && levelDownedBs.currentEnergy >= requiredEnergy
    ? {
        ...levelDownedBs,
        weapon: {
          ...levelDownedBs.weapon,
          element: {
            ...levelDownedBs.weapon.element,
            [element]: levelDownedBs.weapon.element[element] + 1,
          },
        },
        currentEnergy: levelDownedBs.currentEnergy - requiredEnergy,
      }
    : levelDownedBs
}

const applySP = (blackSmith: BlackSmith, index: number) => {
  const secretPower = blackSmith.weapon.secretPowers[index]
  switch (secretPower) {
    case 'ウィスプ':
      return forge(blackSmith, 'light')
    case 'ジェイド':
      return forge(blackSmith, 'dark')
    case '魔法使い':
      return { ...blackSmith, wizard: blackSmith.wizard + 1 }
    case '魔女':
      return { ...blackSmith, witch: blackSmith.witch + 1 }
    case '暁の娘':
      return blackSmith.currentEnergy <= 24
        ? {
            ...blackSmith,
            weapon: {
              ...blackSmith.weapon,
              secretPowers: blackSmith.weapon.secretPowers.filter((_, i) => i !== index),
            },
            currentEnergy: blackSmith.currentEnergy + 192,
          }
        : blackSmith
    default:
      return blackSmith
  }
}

const elementOrder = ['light', 'dark', 'wood', 'metal', 'fire', 'earth', 'wind', 'water'] as const
