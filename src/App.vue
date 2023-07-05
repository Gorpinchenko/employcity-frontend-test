<script setup lang="ts">
import ProductsList from '@/components/ProductsList.vue'
import CartWidget from '@/components/CartWidget.vue'
import { useProductsStore } from '@/stores/products'
import Header from '@/components/AppHeader.vue'

const productsStore = useProductsStore()

async function loadData() {
  await productsStore.loadProducts()
  setTimeout(loadData, 1000 * 15)
}

loadData()
</script>

<template>
  <Header />
  <main>
    <ProductsList />
    <CartWidget />
  </main>
</template>
