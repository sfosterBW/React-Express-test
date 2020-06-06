import { Fruit } from './interfaces'

const isBoolean = (bool: any): bool is boolean => {
  return typeof bool === 'boolean'
}

const isString = (text: any): text is string => {
  return typeof text === 'string' || text instanceof String;
}

const parseBest = (best: any): boolean => {
  if (typeof best === 'undefined' || !isBoolean(best)) {
    throw new Error(`Incorrect or missing best: ${String(best)}`);
  }

  return best
}

export const parseId = (id: any): string => {
  if (!id || !isString(id)) {
    throw new Error(`Incorrect or missing id: ${String(id)}`)
  }

  return id
}

const parseName = (name: any): string => {
  if (!name || !isString(name)) {
    throw new Error(`Incorrect or missing name: ${String(name)}`)
  }

  return name
}

const parseArray = (array: any): any[] => {
  if(array && !Array.isArray(array)) {
    throw new Error(`Incorrect or missing an array ${array}`);
  }

  return array
}

export const toFruit = (object: any): Fruit => {
  return {
    id: parseId(object.id),
    name: parseName(object.name),
    best: parseBest(object.best)
  }
}

export const toFruits = (object: any): Fruit[] => {
  const array = parseArray(object)
  return array.map(fruit => toFruit(fruit))
}

export const toId = (object: any): string => {
  return parseId(object)
}

export default { toFruit, toFruits, toId }
