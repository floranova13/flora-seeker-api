const singleLocation = {
  name: 'Seras',
  description: 'A fledgling settlement in the wilderness. Those living here are far from the sanctuary cities to the West, both geographically and politically.',
  threat: 0,
  slug: 'seras'
}

const locationList = [
  {
    name: 'Seras',
    description: 'A fledgling settlement in the wilderness. Those living here are far from the sanctuary cities to the West, both geographically and politically.',
    threat: 0,
    slug: 'seras'
  },
  {
    name: 'Ilunite Forest',
    description: 'This bioluminescent forest is known even amonst the Seekers of the Sanctuary cities to the far East. Seras Guardians consider it to be relatively safe territory, but only so far as the wilderness is concerned. Wisdom passed down from veteran Seekers and Guardians is to not let oneself become distracted by the variety of lights generated by the organisms that dwell in the darkness.',
    threat: 0,
    slug: 'ilunite-forest'
  },
  {
    name: 'Twisted Tangles',
    description: 'The Founders passed through this region on their way to assess the viability of there chosen settlement location. The did not expect to become lost for over a day, with some aspects of the curved outer borders of the arms distorting sensor readings just enough to lead the group in cyclical twists and turns before they eventually found their way out.',
    threat: 0,
    slug: 'twisted-tangles'
  },
]

const patchedLocation = {
  name: 'Seras',
  description: 'A fledgling settlement in the wilderness. Those living here are far from the sanctuary cities to the West, both geographically and politically.',
  threat: 90,
  slug: 'seras'
}

module.exports = { singleLocation, locationList, patchedLocation }
