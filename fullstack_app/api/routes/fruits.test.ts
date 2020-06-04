import request from 'supertest'
import app from '../app'
import fruitService from '../services/fruitService'
import helper from '../utils/test-helper'

beforeEach(async () => {
  fruitService.resetFruit()
  const fruitPromiseArray = helper.initialFruits
    .map(fruit => fruitService.addFruit(fruit))
  await Promise.all(fruitPromiseArray)
})

describe('add a new fruit', () => {
  it('initiates properly', async () => {
    const res = await request(app).get('/fruit-api/')

    expect(res.body).toHaveLength(helper.initialFruits.length)
  })

  it('should add a new fruit to the list', async () => {
    const newFruit = { name: "banana", best: false }
    const newRes = await request(app)
      .post('/fruit-api/')
      .send(newFruit)

    expect(newRes.status).toEqual(201)
    expect(newRes.body.name).toEqual(newFruit.name)
    expect(newRes.body.best).toEqual(newFruit.best)
    expect(newRes.body.id).toBeDefined()

    const listRes = await request(app).get('/fruit-api/')

    expect(listRes.body).toHaveLength(helper.initialFruits.length + 1)
  })

  it('should error with the wrong type', async () => {
    const newFruit = { name: "ananas", best: null }
    const res = await request(app)
      .post('/fruit-api/')
      .send(newFruit)

    expect(res.status).toEqual(400)
    expect(res.text).toEqual("Incorrect format")
  })

  it('should error with the wrong type', async () => {
    const newFruit = {
      name: "abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyz",
      best: true
    }
    const res = await request(app)
      .post('/fruit-api/')
      .send(newFruit)

    expect(res.status).toEqual(400)
    expect(res.text).toEqual("Name too long")
  })
})

describe('update an existing fruit', () => {
  it('should return a success message with the right data', async () => {
    const { body } = await request(app).get('/fruit-api/')
    const id = body[0].id
    const updatedFruit = { id, name: "Apples", best: false }
    const res = await request(app)
      .put(`/fruit-api/${id}`)
      .send(updatedFruit)

    expect(res.status).toEqual(201)
    expect(res.body).toEqual(updatedFruit)
  })

  describe('should return an error if', () => {
    it('the wrong type is used', async () => {
      const updatedFruit = { id: "1", name: "Apples", best: null }
      const res = await request(app)
        .put(`/fruit-api/${updatedFruit.id}`)
        .send(updatedFruit)

      expect(res.status).toEqual(400)
      expect(res.text).toEqual("Incorrect format")
    })

    it('the name is too long', async () => {
      const updatedFruit = {
        id: "1",
        name: "abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyz",
        best: true
      }
      const res = await request(app)
        .put(`/fruit-api/${updatedFruit.id}`)
        .send(updatedFruit)

      expect(res.status).toEqual(400)
      expect(res.text).toEqual("Name too long")
    })

    it('the fruit cannot be found', async () => {
      const updatedFruit = { id: "12", name: "Apples", best: false }
      const res = await request(app)
        .put(`/fruit-api/${updatedFruit.id}`)
        .send(updatedFruit)

      expect(res.status).toEqual(400)
      expect(res.text).toEqual("Fruit not found")
    })
  })
})

describe('delete a fruit from the list', () => {
  it('should return a success and remove an item from the list', async () => {
    const { body }  = await request(app).get('/fruit-api/')
    const delRes = await request(app)
      .delete(`/fruit-api/${body[0].id}`)

    expect(delRes.status).toEqual(200)
    expect(delRes.text).toEqual(body[0].id)

    const listRes = await request(app).get('/fruit-api/')
    expect(listRes.body).toHaveLength(helper.initialFruits.length - 1)
  })

  it('should return an error if fruit not found', async () => {
    const id = "12"
    const res = await request(app)
      .delete(`/fruit-api/${id}`)
    expect(res.status).toEqual(400)
    expect(res.text).toEqual("Fruit not found")
  })
})
