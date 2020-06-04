import request from 'supertest'
import app from '../app'
import fruitService from '../services/fruitService'
import helper from '../utils/test-helper'
import { Fruit, NewFruit } from '../utils/types'

/* eslint-disable @typescript-eslint/no-unsafe-member-access */

const url = '/fruit-api/'

beforeEach(async () => {
  fruitService.resetFruit()
  const fruitPromiseArray = helper.initialFruits
    .map(fruit => fruitService.addFruit(fruit))
  await Promise.all(fruitPromiseArray)
})

describe('add a new fruit', () => {
  it('initiates properly', async () => {
    const res = await request(app).get(url)

    expect(res.body).toHaveLength(helper.initialFruits.length)
  })

  it('should add a new fruit to the list', async () => {
    const newFruit: NewFruit = { name: "banana", best: false }
    const newRes = await request(app)
      .post(url)
      .send(newFruit)
      .expect(201)

    expect(newRes.body.id).toBeDefined()
    expect(newRes.body.name).toEqual(newFruit.name)
    expect(newRes.body.best).toEqual(newFruit.best)


    const listRes = await request(app).get(url)
    console.log('list', listRes.body)
    expect(listRes.body).toHaveLength(helper.initialFruits.length + 1)
  })

  it('should error with the wrong type', async () => {
    const newFruit = { name: "ananas", best: null }
    const res = await request(app)
      .post(url)
      .send(newFruit)
      .expect(400)

    expect(res.text).toEqual(`Incorrect or missing best: ${String(newFruit.best)}`)
  })

  it('should error with the wrong type', async () => {
    const newFruit: NewFruit = {
      name: "abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyz",
      best: true
    }
    const res = await request(app)
      .post(url)
      .send(newFruit)
      .expect(400)

    expect(res.text).toEqual("Name too long")
  })
})

describe('update an existing fruit', () => {
  it('should return a success message with the right data', async () => {
    const fruit: Fruit[] = fruitService.getFruits()
    const id = fruit[0].id
    const updatedFruit: Fruit = { id, name: "Apples", best: false }
    const res = await request(app)
      .put(`${url}${id}`)
      .send(updatedFruit)
      .expect(201)

    expect(res.body).toEqual(updatedFruit)
  })

  describe('should return an error if', () => {
    it('the wrong type is used', async () => {
      const updatedFruit = { id: "1", name: "Apples", best: null }
      const res = await request(app)
        .put(`${url}${updatedFruit.id}`)
        .send(updatedFruit)
        .expect(400)

      expect(res.text).toEqual(`Incorrect or missing best: ${String(updatedFruit.best)}`)
    })

    it('the name is too long', async () => {
      const updatedFruit: Fruit = {
        id: "1",
        name: "abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyz",
        best: true
      }
      const res = await request(app)
        .put(`${url}${updatedFruit.id}`)
        .send(updatedFruit)
        .expect(400)

      expect(res.text).toEqual("Name too long")
    })

    it('the fruit cannot be found', async () => {
      const updatedFruit: Fruit = { id: "12", name: "Apples", best: false }
      const res = await request(app)
        .put(`${url}${updatedFruit.id}`)
        .send(updatedFruit)
        .expect(400)

      expect(res.text).toEqual("Fruit not found")
    })
  })
})

describe('delete a fruit from the list', () => {
  it('should return a success and remove an item from the list', async () => {
    const fruits: Fruit[] = fruitService.getFruits()
    const { id } = fruits[0]
    const delRes = await request(app)
      .delete(`${url}${id}`)
      .expect(200)

    expect(delRes.text).toEqual(id)

    const listRes = await request(app).get(url)
    expect(listRes.body).toHaveLength(helper.initialFruits.length - 1)
  })

  it('should return an error if fruit not found', async () => {
    const id = "12"
    const res = await request(app)
      .delete(`${url}${id}`)
      .expect(400)

    expect(res.text).toEqual("Fruit not found")
  })
})
