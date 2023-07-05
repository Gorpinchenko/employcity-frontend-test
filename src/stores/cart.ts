import { defineStore, storeToRefs } from 'pinia'
import { computed, ref } from 'vue'
import type { Product } from '@/types/Products'
import { useProductsStore } from '@/stores/products'
import { useCurrencyRateStore } from '@/stores/currencyRate'
import { Price } from '@/utils/Price'

interface CartItem {
  id: number
  number: number
}

interface TotalSum {
  sum: number
  displayedSum: string
}

type CartMap = Record<string, CartItem>

export const useCartStore = defineStore('cart', () => {
  const currencyRateStore = useCurrencyRateStore()
  const { currencyRate } = storeToRefs(currencyRateStore)
  const { productMap } = storeToRefs(useProductsStore())

  const cart = ref<CartItem[]>([])

  const cartMap = computed<CartMap>(() => {
    const map: CartMap = {}
    cart.value.forEach((item) => {
      map[item.id] = item
    })
    return map
  })

  const totalSum = computed<TotalSum>(() => {
    let sum = 0

    cart.value.forEach((item) => {
      sum += productMap.value[item.id].price * item.number
    })

    sum = Price.calculatePrice(sum, currencyRate.value)

    return {
      sum,
      displayedSum: Price.getPriceStr(sum)
    }
  })

  function addProduct(id: Product['id']): void {
    const item = cart.value.find((item) => item.id === id)
    if (item) {
      if (productMap.value[item.id].number > item.number) {
        item.number++
      }
      return
    }
    cart.value.push({
      id,
      number: 1
    })
  }

  function setProductNumber(id: number, number: number): void {
    if (isNaN(number) || number <= 0) {
      cartMap.value[id].number = 1
    } else if (productMap.value[id].number < number) {
      cartMap.value[id].number = productMap.value[id].number
    } else {
      cartMap.value[id].number = number
    }
  }

  function decreaseProductNumber(id: Product['id']): void {
    const item = cart.value.find((item) => item.id === id)
    if (item) {
      item.number--
    }
  }

  function deleteProduct(id: Product['id']): void {
    const index = cart.value.findIndex((item) => item.id === id)
    if (index !== -1) {
      cart.value.splice(index, 1)
    }
  }

  return {
    cart,
    cartMap,
    totalSum,
    addProduct,
    setProductNumber,
    deleteProduct,
    decreaseProductNumber
  }
})
