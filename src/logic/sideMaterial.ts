import { Element, SecretPower, Status } from "."

export type Category =
  | "コイン"
  | "マナストーン"
  | "マナクリスタル"
  | "種"
  | "果実"
  | "肉"
  | "爪牙"
  | "瞳"
  | "羽根"
  | "酒瓶"
  | "小瓶"
  | "壺"
  | "丸薬"
  | "粉末"
  | "袋"
  | "その他"

export type SideMaterial = {
  name: string
  category: Category
  energy: number
  outingEnergy: number
  element?: Element
  secretPower?: SecretPower
  status?: Partial<Record<Status, `${number}up` | number>>
  specRate?: Partial<Record<"sharpness" | "weight" | "strength" | "technique", number>>
}
