import { defineStore } from 'pinia'
import { ref } from 'vue'
import { CurrencyService } from '@/services/CurrencyService'

export const useCurrencyRateStore = defineStore('currencyRate', () => {
  const currencyRate = ref(0)

  async function loadRate(): Promise<void> {
    currencyRate.value = await CurrencyService.getCurrencyRate()
  }

  return {
    currencyRate,
    loadRate
  }
})
