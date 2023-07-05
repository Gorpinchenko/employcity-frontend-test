const MAX = 80
const MIN = 20

// The class emits works with a remote server
export class CurrencyService {
  public static async getCurrencyRate(): Promise<number> {
    const randomNumber = Math.random() * (MAX - MIN) + MIN
    const currencyRate = randomNumber.toFixed(2)
    return parseFloat(currencyRate)
  }
}
