export const elements = ["light", "dark", "wood", "metal", "fire", "earth", "wind", "water"] as const
export type Element = (typeof elements)[number]

export const showElement = (element: Element) =>
  ({
    light: "光",
    dark: "闇",
    wood: "木",
    metal: "金",
    fire: "火",
    earth: "土",
    wind: "風",
    water: "水",
  }[element])
