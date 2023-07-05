<script setup lang="ts">
import type { Product } from '@/types/Products'
import { computed } from 'vue'

const props = defineProps<{
  product: Product
  disabled: boolean
}>()

const classes = computed(() => {
  const { prevPrice, price } = props.product
  return {
    'product-category__item_disabled': props.disabled,
    'product-category__item_color-red': prevPrice !== undefined && prevPrice < price,
    'product-category__item_color-green': prevPrice !== undefined && prevPrice > price
  }
})
</script>

<template>
  <button class="product-category__item" :disabled="disabled" :class="classes">
    {{ product.name }} ({{ product.number }})
    <div class="product-category__item-price">{{ product.displayedPrice }}</div>
  </button>
</template>
