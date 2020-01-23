'use strict'
module.exports = {
  fetchFruit: () => {
    return Promise.resolve({
      data: [
        {
          _id: 1,
          name: "False Case",
          best: false
        },
        {
          _id: 2,
          name: "True Case",
          best: true
        }
      ]
    })
  }
}
