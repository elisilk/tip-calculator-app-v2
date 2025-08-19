export const round = (num, places = 2) => parseFloat(num.toFixed(places))

export const toCurrencyString = (num) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(num)

export function validityError(input) {
  if (input.validity.valid) return null

  // special case where can be both 'badInput' and 'valueMissing', so choosing to return 'badInput' first
  if (input.validity.badInput) return 'badInput'

  for (const key in input.validity) if (input.validity[key]) return key

  return 'unknown'
}
