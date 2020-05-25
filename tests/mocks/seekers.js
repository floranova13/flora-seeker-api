const singleSeekerLodestar =
{
  id: 1,
  name: 'Lillium',
  age: 19,
  gender: 'other',
  lodestar: true
}

const singleSeeker =
{
  id: 2,
  name: 'Nina',
  age: 32,
  gender: 'female',
  lodestar: false
}

const seekerList = [
  {
    id: 1,
    name: 'Lillium',
    age: 19,
    gender: 'other',
    lodestar: true
  },
  {
    id: 2,
    name: 'Nina',
    age: 32,
    gender: 'female',
    lodestar: false
  },
  {
    id: 3,
    name: 'Adrian',
    age: 29,
    gender: 'male',
    lodestar: false
  },
]

const postedSeeker =
 {
   name: 'Nay',
   age: 50,
   gender: 'male',
   lodestar: false
 }

const patchedSeeker =
{
  id: 2,
  name: 'Nina',
  age: 90,
  gender: 'female',
  lodestar: false
}

module.exports = {
  singleSeeker, singleSeekerLodestar, seekerList, postedSeeker, patchedSeeker
}
