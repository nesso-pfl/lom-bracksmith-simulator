import { Element, SecretPower, SideMaterial, Weapon } from "."

type BlackSmith = {
  weapon: Weapon
  sideMaterial: SideMaterial
  currentEnergy: number
  extractedSecretPower: SecretPower | undefined
  wizard: number
  witch: number
}

// ref: https://blackstraycat.nobody.jp/lom/system.html
export const blackSmith = (weapon: Weapon, sideMaterial: SideMaterial) => {
  console.log(sideMaterial)
  // SP暁の娘の効果
  // ・副原料のエネルギーで強化出来る最大Lv
  // ・補助SPを含めた場合の最大Lv
  // ・光闇という例外
  // ・属性の吸収を含めた場合の最大Lv
  // 優先順位は【光闇木金火土風水】の順にエネルギーが消費される。

  // SP 押し出し(暁チェック)
  const state = injectSP(weapon, sideMaterial)
  // 光闇判定
  const state1 = ["light", "dark"].reduce(
    (cur, acc) => (state.sideMaterial.element === acc ? forge(cur, acc) : cur),
    state,
  )
  // SP チェック
  const state2 = [2, 1, 0].reduce((cur, acc) => applySP(cur, acc), state1)
  // 光闇以外判定
  const state3 = [...state2.weapon.secretPowers.map(spToElement), state2.sideMaterial.element]
    .filter((maybeElement): maybeElement is Element => maybeElement !== undefined)
    .sort((a, b) => -elementOrder.indexOf(a) + elementOrder.indexOf(b))
    .reduce((cur, acc) => forge(cur, acc), state2)

  return state3.weapon
}

const injectSP = (weapon: Weapon, sideMaterial: SideMaterial): BlackSmith => {
  if (sideMaterial.secretPower === undefined) {
    return {
      weapon,
      sideMaterial,
      currentEnergy: sideMaterial.energy,
      witch: 0,
      wizard: 0,
      extractedSecretPower: undefined,
    }
  } else {
    const secretPowers = [weapon.reservedSecretPower, ...weapon.secretPowers].filter(
      (secretPower): secretPower is SecretPower => secretPower !== undefined,
    )
    const extractedSecretPower = secretPowers[3]
    return {
      weapon: {
        ...weapon,
        secretPowers: secretPowers.slice(0, 3),
        reservedSecretPower: sideMaterial.secretPower,
      },
      sideMaterial,
      currentEnergy: extractedSecretPower === "dawnGirl" ? sideMaterial.energy + 192 : sideMaterial.energy,
      extractedSecretPower,
      witch: 0,
      wizard: 0,
    }
  }
}

const calcRequiredEnergy = (blackSmith: BlackSmith, element: Element) => {
  const level = blackSmith.weapon.element[element]
  const resistance = blackSmith.weapon.material.resistance[element]
  const support = (() => {
    switch (element) {
      case "light":
      case "wood":
      case "fire":
      case "earth":
        return "wizard"
      case "dark":
      case "metal":
      case "water":
      case "wind":
        return "witch"
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

const forge = (blackSmith: BlackSmith, element: Element) => {
  const requiredEnergy = calcRequiredEnergy(blackSmith, element)
  return blackSmith.currentEnergy >= requiredEnergy
    ? {
        ...blackSmith,
        weapon: {
          ...blackSmith.weapon,
          element: {
            ...blackSmith.weapon.element,
            [element]: blackSmith.weapon.element[element] + 1,
          },
        },
        currentEnergy: blackSmith.currentEnergy - requiredEnergy,
      }
    : blackSmith
}

const applySP = (blackSmith: BlackSmith, index: number) => {
  const secretPower = blackSmith.weapon.secretPowers[index]
  switch (secretPower) {
    case "wisp":
      return forge(blackSmith, "light")
    case "jade":
      return forge(blackSmith, "dark")
    case "wizard":
      return { ...blackSmith, wizard: blackSmith.wizard + 1 }
    case "witch":
      return { ...blackSmith, witch: blackSmith.witch + 1 }
    case "dawnGirl":
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

const spToElement = (secretPower: SecretPower): Element | undefined => {
  switch (secretPower) {
    case "wisp":
      return "light"
    case "jade":
      return "dark"
    case "dryad":
      return "wood"
    case "aura":
      return "metal"
    case "salamander":
      return "fire"
    case "norm":
      return "earth"
    case "jinn":
      return "wind"
    case "undine":
      return "water"
    default:
      return undefined
  }
}

const elementOrder = ["light", "dark", "wood", "metal", "fire", "earth", "wind", "water"] as const
