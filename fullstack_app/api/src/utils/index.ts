import { IFruit, NewFruit } from './types'

/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */

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

const parseName = (name: any): string => {
  if (!name || !isString(name)) {
    throw new Error(`Incorrect or missing name: ${String(name)}`)
  }

  return name
}

const parseDescription = (description: any): string => {
  if (!description || !isString(description)) {
    throw new Error(`Incorrect or missing description: ${String(description)}`)
  }

  return description
}

export const toNewFruit = (object: any): NewFruit => {
  const newFruit: NewFruit = {
    ...object,
    name: parseName(object.name),
    best: parseBest(object.best),
  }

  if (object.description) {
    newFruit.description = parseDescription(object.description)
  }

  return newFruit
}

const parseId = (id: any): string => {
  if (!id || !isString(id)) {
    throw new Error(`Incorrect or missing id: ${String(id)}`)
  }

  return id
}

export const toFruit = (object: any): IFruit => {
  const fruit: IFruit = {
    ...object,
    id: parseId(object.id),
    name: parseName(object.name),
    best: parseBest(object.best)
  }

  if (object.description) {
    fruit.description = parseDescription(object.description)
  }

  return fruit
}
