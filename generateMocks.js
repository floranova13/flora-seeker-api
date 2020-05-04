const fs = require('fs')

const getMocks = () => {
  const mocksString = generateGoals()

  fs.appendFile('dummy.txt', mocksString, (err) => {
    if (err) throw err

    console.log('mocks generated')
  })
}

const getRandomInt = (min, max) => {
  min = Math.ceil(min)
  max = Math.floor(max)

  return Math.floor(Math.random() * (max - min)) + min // The maximum is exclusive and the minimum is inclusive
}

const selectRandom = (arr) => arr[Math.floor(Math.random() * arr.length)]

const generateGoals = () => {
  const before = 'INSERT INTO goals (name, description, code) VALUES ('
  let goals = []

  for (let i = 1; i <= 12; i++) {
    const code = String.fromCharCode(65 + Math.floor(Math.random() * 26)) +
      Math.floor(100 + Math.random() * 900).toString()

    goals.push(`${before}'goal${i}', '', '${code}');`)
  }

  return '\r\n' + goals.join('\r\n') + '\r\n'
}

const generateSeekers = () => {
  const before = 'INSERT INTO seekers (name, age, gender, title, lodestar) VALUES ('
  const genderArr = ['female', 'male', 'other']
  const titleArr = ['Explorer', 'Explorer Veteran', 'Botanist', 'Research Liaison']
  let seekers = []

  for (let i = 1; i <= 12; i++) {
    seekers.push(before +
      `'seeker${i}', '${getRandomInt(18, 46)}', '${selectRandom(genderArr)}', '${selectRandom(titleArr)}', '0');`)
  }

  return '\r\n' + seekers.join('\r\n') + '\r\n'
}

getMocks()
