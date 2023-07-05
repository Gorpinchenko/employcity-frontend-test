import productResponse from '@/data/data.json'
import names from '@/data/names.json'
import type { RawProduct } from '@/types/ProductResponse'
import type { NamesMap } from '@/types/NamesMap'

// The class emits works with a remote server
export class GoodsService {
  public static async getProducts(): Promise<RawProduct[]> {
    if (!productResponse.Success) {
      throw new Error('Something went wrong')
    }

    // I emit a price change. It would just return productResponse.Value.Goods
    return productResponse.Value.Goods.map((good) => {
      const price = (good.C * Math.random()).toFixed(2)
      return {
        ...good,
        C: parseFloat(price)
      }
    })
  }

  public static async getNames(): Promise<NamesMap> {
    return names
  }
}
