import { ref } from 'vue'
import { defineStore, storeToRefs } from 'pinia'
import { GoodsService } from '@/services/GoodsService'
import type { Product, ProductCategory } from '@/types/Products'
import { useCurrencyRateStore } from '@/stores/currencyRate'
import { Price } from '@/utils/Price'

type ProductCategoryMap = Record<string, Product[]>
type ProductMap = Record<string, Product>
type ProductPriceMap = Record<string, number>

export const useProductsStore = defineStore('goods', () => {
  const productsCategories = ref<ProductCategory[]>([])
  const productMap = ref<ProductMap>({})
  const prevPriceMap: ProductPriceMap = {}

  const currencyRateStore = useCurrencyRateStore()
  const { currencyRate } = storeToRefs(currencyRateStore)

  function getPrice(price: number): string {
    const localPrice = Price.calculatePrice(price, currencyRate.value)
    return Price.getPriceStr(localPrice)
  }

  async function loadProducts(): Promise<void> {
    try {
      await currencyRateStore.loadRate()
      const rawProducts = await GoodsService.getProducts()
      const rawNames = await GoodsService.getNames()
      const productCategoryMap: ProductCategoryMap = {}

      productsCategories.value = []

      rawProducts.forEach((rawProduct) => {
        const name = rawNames[rawProduct.G].B[rawProduct.T].N
        const id = rawProduct.T
        const price = rawProduct.C
        const displayedPrice = getPrice(price)
        const prevPrice: number | undefined = prevPriceMap[id]
        const productNumber = rawProduct.P
        const categoryId = rawProduct.G
        const categoryName = rawNames[categoryId].G

        const product: Product = {
          id,
          name,
          price,
          prevPrice,
          displayedPrice,
          number: productNumber,
          categoryId
        }

        prevPriceMap[id] = price
        productMap.value[id] = product

        if (productCategoryMap[categoryId] === undefined) {
          productCategoryMap[categoryId] = []

          const productsCategory: ProductCategory = {
            id: categoryId,
            name: categoryName,
            products: productCategoryMap[categoryId]
          }

          productsCategories.value.push(productsCategory)
        }

        productCategoryMap[categoryId].push(product)
      })
    } catch (e) {
      console.error(e)
    }
  }

  return {
    loadProducts,
    productsCategories,
    productMap
  }
})
