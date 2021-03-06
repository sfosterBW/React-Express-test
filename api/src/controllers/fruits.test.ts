import request from 'supertest'
import mongoose from 'mongoose'
import app from '../app'
import Fruit from '../models/fruit'
import helper from '../utils/test-helper'

/* eslint-disable @typescript-eslint/no-unsafe-member-access */

const url = '/fruit-api/'

beforeEach(async () => {
  await Fruit.deleteMany({})

  const fruitObjects = helper.initialFruits.map(fruit => new Fruit(fruit))
  const fruitPromiseArray = fruitObjects.map(fruit => fruit.save())
  await Promise.all(fruitPromiseArray)
})

afterAll(done => {
  mongoose.disconnect(done)
})

describe('add a new fruit', () => {
  it('initiates properly', async () => {
    const res = await request(app).get(url)

    expect(res.body).toHaveLength(helper.initialFruits.length)
  })

  it('should add a new fruit to the list', async () => {
    const newFruit = {
      name: "banana",
      best: false,
      description: "They are bendy"
    }
    const newRes = await request(app)
      .post(url)
      .send(newFruit)
      .expect(201)

    expect(newRes.body.id).toBeDefined()
    expect(newRes.body.name).toEqual(newFruit.name)
    expect(newRes.body.best).toEqual(newFruit.best)
    expect(newRes.body.description).toEqual(newFruit.description)

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

  it('should error with a long name', async () => {
    const newFruit = {
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
    const fruits = await helper.fruitsInDb()
    const { id, description, best } = fruits[0]
    const updatedFruit = {
      id,
      name: "Apples",
      best,
      description
    }

    const res = await request(app)
      .put(`${url}${id}`)
      .send(updatedFruit)
      .expect(201)

    expect(res.body).toEqual(updatedFruit)
  })

  describe('should return an error if', () => {
    it('the wrong type is used', async () => {
      const fruits = await helper.fruitsInDb()
      const { id, name, description } = fruits[0]
      const updatedFruit = { id, name, description, best: null }

      const res = await request(app)
        .put(`${url}${updatedFruit.id}`)
        .send(updatedFruit)
        .expect(400)

      expect(res.text).toEqual(`Incorrect or missing best: ${String(updatedFruit.best)}`)
    })

    it('the name is too long', async () => {
      const fruits = await helper.fruitsInDb()
      const { id, best, description } = fruits[0]
      const updatedFruit = {
        id,
        name: "abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyz",
        best,
        description
      }

      const res = await request(app)
        .put(`${url}${updatedFruit.id}`)
        .send(updatedFruit)
        .expect(400)

      expect(res.text).toEqual("Name too long")
    })

    it('the fruit cannot be found', async () => {
      const fruits = await helper.fruitsInDb()
      const { name, best, description } = fruits[0]
      const updatedFruit = { id: "12", name, best, description }

      const res = await request(app)
        .put(`${url}${updatedFruit.id}`)
        .send(updatedFruit)
        .expect(400)

      expect(res.text).toEqual("malformed field")
    })
  })
})

describe('delete a fruit from the list', () => {
  it('should return a success and remove an item from the list', async () => {
    const fruits = await helper.fruitsInDb()
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

    expect(res.text).toEqual("malformed field")
  })
})
