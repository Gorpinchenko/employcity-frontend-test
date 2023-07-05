export class Price {
  public static format(value: number): string {
    return Intl.NumberFormat('ru-RU').format(value)
  }

  public static calculatePrice(price: number, currencyRate: number): number {
    const localPrice = (price * currencyRate).toFixed(2)
    return parseFloat(localPrice)
  }

  public static getPriceStr(price: number): string {
    const localPrice = this.format(price)
    return `${localPrice} ₽`
  }
}
