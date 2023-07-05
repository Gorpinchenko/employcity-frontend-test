export type NamesMap = Record<string, ProductCategory>

export interface ProductCategory {
  G: string
  B: { [key: string]: Product }
  C?: number
}

export interface Product {
  N: string
  T: number | string
}
