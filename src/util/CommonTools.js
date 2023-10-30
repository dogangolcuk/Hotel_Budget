const currencyFormat = (money) => {
  return money
    ? Intl.NumberFormat('tr-TR', {
        style: 'currency',
        currency: 'TRY',
        //currencySign: 'accounting',
        //signDisplay: 'always',
        //currencyDisplay: 'name',
      }).format(money)
    : //.replace('₺', '')
      '0.00'
}

const birimFormat = (birimcinsi, miktar) => {
  let birim = birimcinsi
  switch (birimcinsi.toLowerCase()) {
    case 'kg':
      birim = miktar + ' kg= ' + miktar * 1000 + ' gr'
      break
    case 'kilogram':
      birim = miktar + ' kg= ' + miktar * 1000 + ' gr'
      break
    case 'litre':
      birim = miktar + ' litre= ' + miktar * 1000 + ' ml'
      break
    case 'l':
      birim = miktar + ' litre= ' + miktar * 1000 + ' ml'
      break
    case 'lt':
      birim = miktar + ' litre= ' + miktar * 1000 + ' ml'
      break
    default:
      birim = birimcinsi
      break
  }
  return birim
}

const safeTypeBoolean = (data) => {
  return data !== undefined && data !== null ? true : false
}

const safeType = (data) => {
  return data !== undefined && data !== null ? data : 'undef'
}

const percentFormat = (percent) => {
  return percent
    ? Intl.NumberFormat('tr-TR', {
        style: 'percent',
      }).format(percent)
    : '%0.00'
}

const justNumbers = (string) => {
  let numStr = string.replace(/[^0-9]/g, '')
  let num = parseInt(numStr)
  if (isNaN(num)) {
    num = parseInt(-1)
  }
  return num
}

const onlyNumberInput = (e, regex) => {
  if (!regex.test(e.target.value)) {
    e.target.value = e.target.value.replace(/[^0-9]/gi, '')
  } else {
  }
}

export {
  onlyNumberInput,
  currencyFormat,
  percentFormat,
  justNumbers,
  safeType,
  safeTypeBoolean,
  birimFormat,
}
