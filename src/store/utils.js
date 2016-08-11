import store from './index'

export function fromArray(array) {
  return array.reduce((acc, item) => {
    return {...acc, [item.id]: item}
  }, {})
}

export function toArray(object) {
  return Object.keys(object).map(id => object[id])
}