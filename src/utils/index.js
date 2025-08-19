export const round = (num, places = 2) => parseFloat(num.toFixed(places))

export const toCurrencyString = (num) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(num)

export function validityError(input) {
  if (input.validity.valid) return null

  for (const key in input.validity) {
    if (input.validity[key]) return key
  }

  return 'unknown'
}
