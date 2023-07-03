import { Material } from "../types"

export const materialData: Material[] = [
  {
    type: "metal",
    name: "メノス銅",
    spec: {
      sharpness: 10,
      weight: 10,
      strength: 10,
      technique: 10,
      suppression: 18,
      resistance: {
        light: 8,
        dark: 8,
        wood: 8,
        metal: 8,
        fire: 8,
        earth: 8,
        wind: 8,
        water: 8,
      },
    },
  },
]
