<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useCartStore } from '@/stores/cart'
import { useCurrencyRateStore } from '@/stores/currencyRate'

const cartStore = useCartStore()
const currencyRateStore = useCurrencyRateStore()

const { currencyRate } = storeToRefs(currencyRateStore)
const { cart } = storeToRefs(cartStore)

function onCartClick() {
  if (cart.value.length === 0) {
    return
  }

  window.scrollTo({
    behavior: 'smooth',
    top: document.body.scrollHeight
  })
}
</script>

<template>
  <header class="header">
    <h1 class="header__title">Курс USD: {{ currencyRate }} ₽</h1>
    <Transition>
      <button v-if="cart.length" class="header__cart" @click="onCartClick">
        Корзина
        <span class="header__cart-number">
          {{ cart.length }}
        </span>
      </button>
    </Transition>
  </header>
</template>
