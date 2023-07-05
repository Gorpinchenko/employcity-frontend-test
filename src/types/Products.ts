export interface ProductCategory {
  id: number
  name: string
  products: Product[]
}

export interface Product {
  id: number
  name: string
  number: number
  price: number
  displayedPrice: string
  categoryId: number
  prevPrice?: number
}
