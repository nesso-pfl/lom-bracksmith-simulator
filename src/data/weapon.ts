import { WeaponType } from '../logic'

export const weaponData: WeaponType[] = [
  {
    id: 'dagger',
    name: '短剣',
    spec: { sharpness: 44, weight: 16, strength: 12, technique: 48 },
  },
  {
    id: 'sword',
    name: '片手剣',
    spec: { sharpness: 32, weight: 32, strength: 32, technique: 32 },
  },
  {
    id: 'hatchet',
    name: '片手斧',
    spec: { sharpness: 28, weight: 36, strength: 48, technique: 16 },
  },
  {
    id: 'blade',
    name: '両手剣',
    spec: { sharpness: 40, weight: 40, strength: 40, technique: 40 },
  },
  {
    id: 'axe',
    name: '両手斧',
    spec: { sharpness: 40, weight: 40, strength: 64, technique: 16 },
  },
  {
    id: 'hammer',
    name: 'ハンマー',
    spec: { sharpness: 8, weight: 72, strength: 64, technique: 16 },
  },
  {
    id: 'lance',
    name: '槍',
    spec: { sharpness: 52, weight: 20, strength: 24, technique: 48 },
  },
  {
    id: 'stick',
    name: '杖',
    spec: { sharpness: 4, weight: 44, strength: 16, technique: 32 },
  },
  {
    id: 'knuckle',
    name: 'ナックル',
    spec: { sharpness: 0, weight: 32, strength: 24, technique: 56 },
  },
  {
    id: 'nunchaku',
    name: 'ヌンチャク',
    spec: { sharpness: 0, weight: 40, strength: 28, technique: 44 },
  },
  {
    id: 'bow',
    name: '弓矢',
    spec: { sharpness: 40, weight: 4, strength: 20, technique: 40 },
  },
]
