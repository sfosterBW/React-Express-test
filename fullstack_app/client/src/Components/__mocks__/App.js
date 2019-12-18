const testData = {
  falseCase: {
    _id: 1,
    name: "False Case",
    best: false
  },
  trueCase: {
    _id: 2,
    name: "True Case",
    best: true
  }
}

export default function getFruitList() {
  return testData.falseCase
}
