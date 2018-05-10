const colorPicker = () => {
  let num = Math.floor(Math.random() * 100) + 1
  if (num > 0 && num < 20) return 'green'
  if (num > 20 && num < 29) return 'yellow'
  if (num > 29 && num < 101) return 'red'
}

export default colorPicker