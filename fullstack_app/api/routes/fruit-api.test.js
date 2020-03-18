const request = require('supertest')
const app = require('../app')


const testcase = {
  add: {
    success: {
      _id: -1,
      name: "Apple",
      best: false,
    },
    typeError: {
      _id: -1,
      name: 1,
      best: "Apple",
    },
    nameTooLong: {
      _id: -1,
      name: "abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyz",
      best: false,
    },
  },
  get: {
    success: {
      _id: 1,
      name: "Apple",
      best: false
    }
  },
  update: {
    success: {
      _id: 1,
      name: "Banana",
      best: true
    },
    typeError: {
      _id: 1,
      name: 1,
      best: "Apple",
    },
    nameTooLong: {
      _id: 1,
      name: "abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyz",
      best: false,
    },
    wrongId: {
      _id: 2,
      name: "Banana",
      best: true
    }
  },
  delete: {
    success: [],
  }
}

describe('add a new fruit', () => {
  it('should return success message', async () => {
    const res = await request(app)
      .post('/fruit-api/new')
      .send({ new: testcase.add.success })
    expect(res.status).toEqual(201)
    expect(res.body).toEqual(testcase.get.success)
  })

  it('should error with the wrong type', async () => {
    const res = await request(app)
      .post('/fruit-api/new')
      .send({ new: testcase.add.typeError })
    expect(res.status).toEqual(400)
    expect(res.text).toEqual("Incorrect format")
  })

  it('should error with the wrong type', async () => {
    const res = await request(app)
      .post('/fruit-api/new')
      .send({ new: testcase.add.nameTooLong })
    expect(res.status).toEqual(400)
    expect(res.text).toEqual("Name too long")
  })
})

describe('get fruit list', () => {
  it('should return a list with the right link', async () => {
    const res = await request(app)
      .get('/fruit-api/list')
    expect(res.status).toEqual(200)
    expect(res.body).toEqual([testcase.get.success])
  })
})

describe('update an existing fruit', () => {
  it('should return a success message with the right data', async () => {
    const res = await request(app)
      .put('/fruit-api/update')
      .send(testcase.update.success)
    expect(res.status).toEqual(201)
    expect(res.body).toEqual(testcase.update.success)
  })

  describe('should return an error if', () => {
    it('the wrong type is used', async () => {
      const res = await request(app)
        .put('/fruit-api/update')
        .send(testcase.update.typeError)
      expect(res.status).toEqual(400)
      expect(res.text).toEqual("Incorrect format")
    })

    it('the name is too long', async () => {
      const res = await request(app)
        .put('/fruit-api/update')
        .send(testcase.update.nameTooLong)
      expect(res.status).toEqual(400)
      expect(res.text).toEqual("Name too long")
    })

    it('the fruit cannot be found', async () => {
      const res = await request(app)
        .put('/fruit-api/update')
        .send(testcase.update.wrongId)
      expect(res.status).toEqual(404)
      expect(res.text).toEqual("Fruit not found")
    })
  })
})

describe('get updated fruit list', () => {
  it('should return a list', async () => {
    const res = await request(app)
      .get('/fruit-api/list')
    expect(res.status).toEqual(200)
    expect(res.body).toEqual([testcase.update.success])
  })
})

describe('delete a fruit from the list', () => {
  it('should return a success message', async () => {
    const res = await request(app)
      .delete(`/fruit-api/delete?id=${testcase.update.success._id}`)
    expect(res.status).toEqual(200)
    expect(res.text).toEqual(String(testcase.update.success._id))
  })

  it('should return an error if fruit not found', async () => {
    const res = await request(app)
      .delete(`/fruit-api/delete?id=${testcase.update.wrongId._id}`)
    expect(res.status).toEqual(404)
    expect(res.text).toEqual("Fruit not found")
  })
})

describe('get empty fruit list', () => {
  it('should return an empty list', async () => {
    const res = await request(app)
      .get('/fruit-api/list')
    expect(res.status).toEqual(200)
    expect(res.body).toEqual(testcase.delete.success)
  })
})
