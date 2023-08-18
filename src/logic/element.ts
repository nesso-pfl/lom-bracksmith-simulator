export const elements = ['light', 'dark', 'wood', 'metal', 'fire', 'earth', 'wind', 'water'] as const
export type Element = (typeof elements)[number]

export const showElement = (element: Element) =>
  ({
    light: '光',
    dark: '闇',
    wood: '木',
    metal: '金',
    fire: '火',
    earth: '土',
    wind: '風',
    water: '水',
  }[element])

export const getElementRelation = (
  element: Element,
  options: {
    hasMirrorWorld: boolean
    weaponElement: { [key in Element]: number }
  },
): { strong: Element | undefined; weak: Element | undefined } => {
  const { hasMirrorWorld, weaponElement } = options
  switch (element) {
    case 'light':
      return hasMirrorWorld ? { strong: undefined, weak: 'dark' } : { strong: 'dark', weak: undefined }
    case 'dark':
      return hasMirrorWorld ? { strong: 'light', weak: undefined } : { strong: undefined, weak: 'light' }
    case 'wood':
      return (hasMirrorWorld && weaponElement.dark > weaponElement.light) || weaponElement.light > weaponElement.dark
        ? { strong: 'metal', weak: undefined }
        : (hasMirrorWorld && weaponElement.light > weaponElement.dark) || weaponElement.dark > weaponElement.light
        ? { strong: undefined, weak: 'metal' }
        : { strong: undefined, weak: undefined }
    case 'metal':
      return (hasMirrorWorld && weaponElement.light > weaponElement.dark) || weaponElement.dark > weaponElement.light
        ? { strong: 'wood', weak: undefined }
        : (hasMirrorWorld && weaponElement.dark > weaponElement.light) || weaponElement.light > weaponElement.dark
        ? { strong: undefined, weak: 'wood' }
        : { strong: undefined, weak: undefined }
    case 'fire':
      return hasMirrorWorld ? { strong: 'water', weak: 'earth' } : { strong: 'earth', weak: 'water' }
    case 'earth':
      return hasMirrorWorld ? { strong: 'fire', weak: 'wind' } : { strong: 'wind', weak: 'fire' }
    case 'wind':
      return hasMirrorWorld ? { strong: 'earth', weak: 'water' } : { strong: 'water', weak: 'earth' }
    case 'water':
      return hasMirrorWorld ? { strong: 'wind', weak: 'fire' } : { strong: 'fire', weak: 'wind' }
  }
}
