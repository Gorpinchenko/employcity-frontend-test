<script setup lang="ts">
import { useProductsStore } from '@/stores/products'
import { useCartStore } from '@/stores/cart'
import { storeToRefs } from 'pinia'
import type { Product } from '@/types/Products'
import { ref } from 'vue'

const cartStore = useCartStore()

const { productMap } = storeToRefs(useProductsStore())
const { cart, cartMap, totalSum } = storeToRefs(cartStore)

const currentNumber = ref(0)

function onDeleteClick(id: Product['id']): void {
  cartStore.deleteProduct(id)
}

function onMinusClick(id: Product['id']): void {
  cartStore.decreaseProductNumber(id)
}

function onPlusClick(id: Product['id']): void {
  cartStore.addProduct(id)
}

function onNumberInput(event: Event): void {
  if (event.target instanceof HTMLInputElement) {
    currentNumber.value = parseInt(event.target.value)
  }
}

function onNumberBlur(id: Product['id'], event: Event): void {
  cartStore.setProductNumber(id, currentNumber.value)
  if (event.target instanceof HTMLInputElement) {
    event.target.value = cartMap.value[id].number.toString()
  }
}

function getStatusClass(product: Product): string {
  if (product.prevPrice === undefined || product.prevPrice === product.price) {
    return ''
  } else if (product.prevPrice > product.price) {
    return 'product-category__item-price_color-red'
  }
  return 'product-category__item-price_color-green'
}
</script>

<template>
  <Transition>
    <div v-if="cart.length" class="cart">
      <h2 class="cart__title">Корзина</h2>
      <TransitionGroup name="list" tag="ul">
        <li v-for="{ id, number } in cart" :key="id" class="cart-item">
          <div class="cart-item__title">
            {{ productMap[id].name }}
          </div>
          <div class="cart-item__number">
            <button
              type="button"
              class="cart-item__button"
              :disabled="number === 1"
              @click="onMinusClick(id)"
            >
              -
            </button>
            <input
              :value="number"
              inputmode="numeric"
              pattern="[0-9]*"
              min="1"
              type="number"
              required
              class="cart-item__number-value"
              @input="onNumberInput"
              @blur="onNumberBlur(id, $event)"
            />
            <button
              type="button"
              class="cart-item__button"
              :disabled="number >= productMap[id].number"
              @click="onPlusClick(id)"
            >
              +
            </button>
          </div>
          <div class="cart-item__price" :class="getStatusClass(productMap[id])">
            {{ productMap[id].displayedPrice }}/шт
          </div>
          <div class="cart-item__delete" @click="onDeleteClick(id)">Удалить</div>
        </li>
      </TransitionGroup>
      <div class="cart__sum">Общая стоимость: {{ totalSum.displayedSum }}</div>
    </div>
  </Transition>
</template>
