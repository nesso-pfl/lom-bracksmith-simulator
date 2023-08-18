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
  // 光闇判定
  const state1 = ["light", "dark"].reduce(
    (cur, acc) => (state.sideMaterial.element === acc ? forge(cur, acc) : cur),
    state,
  )
  // SP チェック
  const state2 = [2, 1, 0].reduce((cur, acc) => applySP(cur, acc), state1)
  // 光闇以外判定
  const state3 = [...state2.weapon.secretPowers.map(spToElement), state2.sideMaterial.element]
    .filter(
      (maybeElement): maybeElement is Element =>
        maybeElement !== undefined && maybeElement !== "dark" && maybeElement !== "light",
    )
    .sort((a, b) => -elementOrder.indexOf(a) + elementOrder.indexOf(b))
    .reduce((cur, acc) => forge(cur, acc), state2)

  return state3.weapon
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
      currentEnergy: extractedSecretPower === "暁の娘" ? sideMaterial.energy + 192 : sideMaterial.energy,
      extractedSecretPower,
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

const canForge = (blackSmith: BlackSmith, element: Element): boolean => {
  const {
    extractedSecretPower,
    weapon: { reservedSecretPower, secretPowers, element: weaponElement },
  } = blackSmith
  const hasAncientMoon = [reservedSecretPower, ...secretPowers, extractedSecretPower].find((sp) => sp === "太古の月")
  if (hasAncientMoon) true

  const hasMirrorWorld = [reservedSecretPower, ...secretPowers, extractedSecretPower].find((sp) => sp === "鏡面世界")
  switch (element) {
    case "light":
      return !(hasMirrorWorld && weaponElement.dark > 0)
    case "dark":
      return !!hasMirrorWorld || weaponElement.light === 0
    case "wood":
      return hasMirrorWorld
        ? weaponElement.dark >= weaponElement.light || weaponElement.metal === 0
        : weaponElement.light >= weaponElement.dark || weaponElement.metal === 0
    case "metal":
      return hasMirrorWorld
        ? weaponElement.light >= weaponElement.dark || weaponElement.wood === 0
        : weaponElement.dark >= weaponElement.light || weaponElement.wood === 0
    case "fire":
      return hasMirrorWorld ? weaponElement.earth === 0 : weaponElement.water === 0
    case "earth":
      return hasMirrorWorld ? weaponElement.wind === 0 : weaponElement.fire === 0
    case "wind":
      return hasMirrorWorld ? weaponElement.water === 0 : weaponElement.earth === 0
    case "water":
      return hasMirrorWorld ? weaponElement.fire === 0 : weaponElement.wind === 0
  }
}

const forge = (blackSmith: BlackSmith, element: Element) => {
  const requiredEnergy = calcRequiredEnergy(blackSmith, element)
  return canForge(blackSmith, element) && blackSmith.currentEnergy >= requiredEnergy
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
    case "ウィスプ":
      return forge(blackSmith, "light")
    case "ジェイド":
      return forge(blackSmith, "dark")
    case "魔法使い":
      return { ...blackSmith, wizard: blackSmith.wizard + 1 }
    case "魔女":
      return { ...blackSmith, witch: blackSmith.witch + 1 }
    case "暁の娘":
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
    case "ウィスプ":
      return "light"
    case "ジェイド":
      return "dark"
    case "ドリアード":
      return "wood"
    case "アウラ":
      return "metal"
    case "サラマンダー":
      return "fire"
    case "ノーム":
      return "earth"
    case "ジン":
      return "wind"
    case "ウンディーネ":
      return "water"
    default:
      return undefined
  }
}

const elementOrder = ["light", "dark", "wood", "metal", "fire", "earth", "wind", "water"] as const
