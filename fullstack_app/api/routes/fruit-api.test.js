const request = require('supertest')
const app = require('../app')

const addFruit = {
  _id: -1,
  name: "Apple",
  best: false
}

const getFruit = {
  _id: 1,
  name: "Apple",
  best: false
}

const updateFruit = {
  _id: 1,
  name: "Banana",
  best: true
}

describe('post a new fruit', () => {
  it('should return success message', async () => {
    const res = await request(app)
      .post('/fruit-api/new')
      .send({ new: addFruit })
    expect(res.status).toEqual(200)
    expect(res.body).toEqual([getFruit])
  })
})

describe('get fruit list', () => {
  it('should return a list', async () => {
    const res = await request(app)
      .get('/fruit-api/list')
    expect(res.status).toEqual(200)
    expect(res.body).toEqual([getFruit])
  })
})

describe('update an existing fruit', () => {
  it('should return a success message', async () => {
    const res = await request(app)
      .put('/fruit-api/update')
      .send(updateFruit)
    expect(res.status).toEqual(200)
    expect(res.body).toEqual([updateFruit])
  })
})

describe('get updated fruit list', () => {
  it('should return a list', async () => {
    const res = await request(app)
      .get('/fruit-api/list')
    expect(res.status).toEqual(200)
    expect(res.body).toEqual([updateFruit])
  })
})

describe('delete a fruit from the list', () => {
  it('should return a success message', async () => {
    const res = await request(app)
      .delete('/fruit-api/delete')
      .send("id=1")
    expect(res.status).toEqual(200)
    expect(res.body).toEqual([])
  })
})

describe('get empty fruit list', () => {
  it('should return an empty list', async () => {
    const res = await request(app)
      .get('/fruit-api/list')
    expect(res.status).toEqual(200)
    expect(res.body).toEqual([])
  })
})
