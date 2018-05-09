import calculatePercentage from '../calculatePercentage'

const studentEvals = {
  studentEvaluations:
    [
      {
        color: "yellow",
        date: "2018-05-07",
        id: 1,
        remarks: "testtesttest"
      },
      {
        color: "green",
        date: "2018-05-07",
        id: 1,
        remarks: "testtesttest"
      },
      {
        color: "red",
        date: "2018-05-07",
        id: 1,
        remarks: "testtesttest"
      },
      {
        color: "green",
        date: "2018-05-07",
        id: 1,
        remarks: "testtesttest"
      },
      {
        color: "red",
        date: "2018-05-07",
        id: 1,
        remarks: "testtesttest"
      }
    ]
}

describe('calculatePercentage', () => {
  it('exists', () => {
    expect(calculatePercentage(studentEvals)).toBeDefined()

  })
  it('returns an object', () => {
    expect(typeof calculatePercentage(studentEvals)).toEqual('object')
  })
  it('returns the correct percentage', () => {

    expect(calculatePercentage(studentEvals)).toEqual({ "green": "40%", "red": "40%", "yellow": "20%" })
  })
})