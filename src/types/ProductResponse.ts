export interface ProductResponse {
  Error: string
  Id: number
  Success: boolean
  Value: GoodsValue
}

export interface GoodsValue {
  Goods: RawProduct[]
}

export interface RawProduct {
  B: boolean
  C: number
  CV: null
  G: number
  P: number
  Pl: null
  T: number
}
