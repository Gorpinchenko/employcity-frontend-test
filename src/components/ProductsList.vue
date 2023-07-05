<script setup lang="ts">
import ProductItem from '@/components/ProductItem.vue'
import { useProductsStore } from '@/stores/products'
import { storeToRefs } from 'pinia'
import { useCartStore } from '@/stores/cart'
import type { Product } from '@/types/Products'

const productsStore = useProductsStore()
const cartStore = useCartStore()

const { productsCategories } = storeToRefs(productsStore)
const { cartMap } = storeToRefs(cartStore)

function onItemClick(id: Product['id']): void {
  cartStore.addProduct(id)
}
</script>

<template>
  <div class="products">
    <section
      v-for="productsCategory in productsCategories"
      :key="productsCategory.id"
      class="product-category"
    >
      <h2 class="product-category__title">
        {{ productsCategory.name }}
      </h2>
      <ProductItem
        v-for="product in productsCategory.products"
        :key="product.id"
        :product="product"
        :disabled="product.number === cartMap[product.id]?.number"
        @click="onItemClick(product.id)"
      >
        {{ product.name }} ({{ product.number }})
        <div class="product-category__item-price">{{ product.displayedPrice }}</div>
      </ProductItem>
    </section>
  </div>
</template>
