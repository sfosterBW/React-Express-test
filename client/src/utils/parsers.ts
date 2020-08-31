import { Fruit } from './interfaces'

/* eslint-disable  @typescript-eslint/no-explicit-any */
/* eslint-disable  @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */

const isBoolean = (bool: unknown): bool is boolean => {
  return typeof bool === 'boolean'
}

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String
}

const parseBest = (best: unknown): boolean => {
  if (typeof best === 'undefined' || !isBoolean(best)) {
    throw new Error(`Incorrect or missing best: ${String(best)}`)
  }

  return best
}

export const parseId = (id: unknown): string => {
  if (!id || !isString(id)) {
    throw new Error(`Incorrect or missing id: ${String(id)}`)
  }

  return id
}

const parseName = (name: unknown): string => {
  if (!name || !isString(name)) {
    throw new Error(`Incorrect or missing name: ${String(name)}`)
  }

  return name
}

const parseDescription = (description: unknown): string => {
  if (!description || !isString(description)) {
    throw new Error(`Incorrect or missing description: ${String(description)}`)
  }

  return description
}

const parseArray = (array: any): Array<unknown> => {
  if (!array || !Array.isArray(array)) {
    throw new Error(`Incorrect or missing an array ${String(array)}`)
  }

  return array
}

export const toFruit = (object: any): Fruit => {
  const fruit: Fruit = {
    id: parseId(object.id),
    name: parseName(object.name),
    best: parseBest(object.best)
  }

  if (object.description) {
    fruit.description = parseDescription(object.description)
  }

  return fruit
}

export const toFruits = (object: any): Fruit[] => {
  const array = parseArray(object)
  return array.map(fruit => toFruit(fruit))
}

export const toId = (object: any): string => {
  return parseId(object)
}

export default { toFruit, toFruits, toId }
