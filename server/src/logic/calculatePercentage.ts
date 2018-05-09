// const studentEvals = {
//   studentEvaluations:
//     [
//       {
//         color: "yellow",
//         date: "2018-05-07",
//         id: 1,
//         remarks: "testtesttest"
//       },
//       {
//         color: "green",
//         date: "2018-05-07",
//         id: 1,
//         remarks: "testtesttest"
//       },
//       {
//         color: "red",
//         date: "2018-05-07",
//         id: 1,
//         remarks: "testtesttest"
//       },
//       {
//         color: "green",
//         date: "2018-05-07",
//         id: 1,
//         remarks: "testtesttest"
//       },
//       {
//         color: "red",
//         date: "2018-05-07",
//         id: 1,
//         remarks: "testtesttest"
//       }
//     ]
// }


const calculatePercentage = (obj) => {
  let yellow = 0
  let green = 0
  let red = 0
  obj.studentEvaluations.map(e => {
    if (e.color === "yellow") yellow++
    if (e.color === "green") green++
    if (e.color === "red") red++
  })
  // 100 / length of array * num colors?
  yellow = (100 / obj.studentEvaluations.length) * yellow
  red = (100 / obj.studentEvaluations.length) * red
  green = (100 / obj.studentEvaluations.length) * green
  // let total = yellow + red + green 

  return { yellow: `${String(yellow).slice(0, 4)}%`, green: `${String(green).slice(0, 4)}%`, red: `${String(red).slice(0, 4)}%`}

}
export default calculatePercentage