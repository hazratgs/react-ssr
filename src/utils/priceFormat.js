const priceFormat = price => price.toString().split('')
  .reverse()
  .reduce((price, item, i) => {
    if (!price) return item
    if ((i % 3) === 0) return `${item} ${price}`
    return `${item}${price}`
  }, '')

export default priceFormat
