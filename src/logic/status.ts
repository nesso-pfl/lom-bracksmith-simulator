export const statuses = ['power', 'technique', 'defence', 'magic', 'physical', 'spirit', 'charm', 'luck'] as const
export type Status = (typeof statuses)[number]

export const showStatus = (status: Status) =>
  ({
    power: 'ちから',
    technique: 'わざ',
    defence: 'ぼうぎょ',
    magic: 'まほう',
    physical: 'たいりょく',
    spirit: 'せいしん',
    charm: 'みりょく',
    luck: 'うん',
  }[status])
