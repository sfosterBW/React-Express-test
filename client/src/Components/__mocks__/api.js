'use strict'
module.exports = {
  fetchFruit: () => {
    return Promise.resolve({
      status: 200,
      data: [
        {
          id: 1,
          name: "False Case",
          best: false
        },
        {
          id: 2,
          name: "True Case",
          best: true
        }
      ]
    })
  }
}
