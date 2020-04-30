/* eslint-disable max-len */
const seekerData = {
  branchName: 'Seras Seekers',
  root: {
    description: 'We, the Seras Seekers, are a fledgling Flora Seeker Branch. Out here in Seras, we have unparalleled opportunity to thrive. Seras\'s Research Division has committed itself to supporting us while we get established. This API is one example of that. In turn, the Research Advocate and the Seras Council as a whole expect great things. Use the Flora Seeker Database to manage activities efficiently, and stay true to the Division guidelines!',
    guidelines: [
      'Follow all settlement laws at all times. Remember: we are a Seeker Branch in service to the Seras dream.',
      'Obey Guardian Commander Chell. It doesn\'t matter if she leads a seperate Division. If she gives you an order, it is a matter of safety, not Division pride.'
    ],
    goals: [
      {
        name: 'Assign Provisonary Titles',
        description: 'The Seeker Division has been established, but many citizens working here have yet to recieve their official duties. We can\'t keep operating in such a disorganized manner.',
        code: 'A100'
      },
      {
        name: 'Arboretum Second Expansion',
        description: 'We have outgrown our existing facilities. The Engineering Division will be working on a joint project to build a new Arboretum offshoot. Engineering staff need advisors to ensure that this project goes more smoothly than the last attempt.',
        code: 'E200'
      }
    ]
  },
  seekers: {
    description: 'The Flora Seeker is a storied profession that has both shaped and been shaped by history. Our roots are in Flourishflora, but what was one a field research specialty has become a diverse role with duties including the maintenance of Branch Arboreta, conducting field research, and even assisting the Guardian Division in settlement defense when needed. You are free to look up your current title as well as that of your peers. Questions about your title or transfer requests are always welcome.',
    seekers: [
      {
        id: 1,
        name: 'Lillium',
        age: 19,
        gender: 'other',
        title: 'Seeker Ardent',
        lodestar: true
      },
      {
        id: 2,
        name: 'Nina',
        age: 32,
        gender: 'female',
        title: 'Explorer',
        lodestar: false
      },
      {
        id: 3,
        name: 'Adrian',
        age: 29,
        gender: '',
        title: 'Botanist',
        lodestar: false
      },
    ]
  },
  collection: {
    description: 'Seeker Branches dominating The Sanctuary Cities we left behind prided themselves on many things. While what it means to be a Seeker has changed with time, we never stopped studying the wilderness. Curiosity about the world beyond is our constant. Seras is fresh terrain, and our cartographers have only recently finished detailing the nearby biomes we can expect to find. Here, it is up to you to make sure we properly catalogue everything we find. Study the descriptions of the samples in this database well.',
    falshrooms: {
      description: 'Falshrooms are visually identified by their stems and their caps. They typically grow very quickly. They share a characteristic of having evolved to efficiently process the viraburst of recently dead organisms. They also typically thrive in humid environments, requiring no sunlight. They can also enter periods of hibernation where their outer surface will crystallize. In this state, they are much more resilient, but their intake of nutrients is severely diminished.',
      species: [
        {
          name: 'Reeker Redcap',
          description: 'Reeker falshrooms are common to many areas of the wilderness and even human-settled areas. Evolutionary development of the Redcap and Whitecap varieties of Reeker shroom appear to have been linked. Redcaps are harmless.',
          rarity: 'common',
          viraburstAbsorption: 3,
          slug: 'reeker-redcap'
        },
        {
          name: 'Reeker Whitecap',
          description: 'Reeker falshrooms are common to many areas of the wilderness and even human-settled areas. Evolutionary development of the Redcap and Whitecap varieties of Reeker shroom appear to have been linked. Whitecaps are toxic to most mammals, including humans.',
          rarity: 'common',
          viraburstAbsorption: 6,
          slug: ''
        }
      ]
    },
    flesherFungi: {
      description: 'Flesherfungi are a category of fungus that use a parasitic reproduction mechanism on plants and/or animals. Normally, the parasite provides some benefit to the fungi spawning font.',
      species: [
        {
          name: 'Glarevia',
          description: 'This flesherfungus has a deep purple, appearance, with flesh like knotted wood.',
          rarity: 'uncommon',
          threat: 6,
          slug: 'glarevia'
        }
      ]
    },
    flourishflora: {
      description: 'A miraculous plant capable of generating more energy than it takes in. Creation myths revolve around this "producer species".',
      species: [
        {
          name: 'Mellowend',
          description: 'Also called the "Sanctuary Flourishflora", they have gained special recognition for being the first Flourishflora ever grown in human-settled, artificial conditions. It is otherwise a humble plant with no special properties, harvested only for its Vira worth.',
          rarity: 'common',
          producerCoefficient: 1,
          slug: 'mellowend'
        },
        {
          name: '',
          description: '',
          rarity: '',
          producerCoefficient: 1,
          slug: ''
        },
        {
          name: '',
          description: '',
          rarity: '',
          producerCoefficient: 1,
          slug: ''
        },
      ]
    },
    maremolds: {
      description: 'Maremolds are a category of fungi that were first discovered during the most recent push to expand human presence on the continent. This happened over 100 years before Seras was founded, and the gap between this expansion attempt and the most recent attempt before that is over 200 years. Human technology was unprepared for the danger Maremold posed to the resources they depended on for survival. It corroded affected materials more rapidly than was believed possible. It was not as if these materials were not designed to resist other corrosive factors. It was the fact that, once awakened, the Maremold mutates until it finds a compatible food source.',
      species: [
        {
          name: 'Frutebane',
          description: 'Despite the name, Frutebane favors many varieties of fruits and vegtables, as well as other organic matter.',
          rarity: 'common',
          mutationRate: 30,
          slug: 'frutebane'
        },
        {
          name: 'Mux Mold',
          description: 'Mux Mold thrives in damp climates, devouring organic and inorganic matter alike. ',
          rarity: 'uncommon',
          mutationRate: 36,
          slug: ''
        },
        {
          name: 'Moreph',
          description: 'Set apart from its genetic relatives by a high rate of mutation, Moreph is more of an overwhelming nuisance than it is a catastrophe in and of itself. However, experts in the field have voiced concerns that this may not always be the case. Left alone, it may be the Moreph that contributes to this century\'s colonization disaster.',
          rarity: 'uncommon',
          mutationRate: 330,
          slug: 'moreph'
        }
      ]
    },
    trees: {
      description: 'Trees are unique in that our Division does not necessarily need possession of the organism for it to be listed here. They need only be documented, with samples marked on excursion maps for later study. For detailed specifications, please direct your inquiry to the Research Division. Serious quesions only, and do not bother Research Advocate Varia. She has many other responsibilities.',
      species: [
        {
          name: 'Vitanark Veilas',
          description: 'Tower trees with thick trunks covered in jagged blue bark. The oldest discovered trees are members of the Vitanark genus.',
          rarity: 'legendary',
          height: 325.3,
          slug: 'vitanark-veilas'
        },
        {
          name: 'Vitanark Rushe',
          description: 'Towering trees with thick trunks encased in reddish bark. The oldest discovered trees are members of the Vitanark genus.',
          rarity: 'rare',
          height: 126.5,
          slug: 'vitanark-rushe'
        },
        {
          name: 'Arvorloc Evergreen',
          description: 'A tree with voluminous purple branches and with cascading green stems.',
          rarity: 'uncommon',
          height: 53,
          slug: 'arvorloc-evergreen'
        },
        {
          name: 'Sparefruit Preventglade',
          description: 'The Preventglade genus of tree grows medium height and prevents lower-layer plants from receiving most sunlight. The Sparefruit Preventglade grows thin, reflective strands from which Sparefruit grow. Sparefruit are large green globes, prized for their succulence and scarcity.',
          rarity: 'uncommon',
          height: 63,
          slug: 'sparefruit-preventglade'
        },
        {
          name: 'Spire Preventglade',
          description: 'The Preventglade genus of tree grows medium height and prevents lower-layer plants from receiving most sunlight. Spire Preventglades are taller than other Preventglade varieties, and they bear no fruit.',
          rarity: 'common',
          height: 125.5,
          slug: 'spire-preventglade'
        }
      ]
    },
    waveskellen: {
      description: '',
      species: [
        {
          name: '',
          description: '',
          rarity: '',
          cascade: '',
          slug: ''
        }
      ]
    }
  },
  map: {
    description: 'Location boundaries are outlined in the Branch handbook to conform to Seras\'s master database. We may have names for these regions, but that doesn\'t mean we know what we will find. Be wary and document everything. The lists of territories specific to each distinct location is growing, and some are left empty until the Guardian Division Commander permits us to explore. Do not violate the trust the settlement places in us. Failure to do so not only puts yourself and the Division at risk, it can compromise the security of the settlement itself.',
    locations: [
      {
        id: 1,
        name: 'Seras',
        description: '',
        territories: [
          'Northern Border',
          'Eastern Border',
          'Southern Border',
          'Western Border',
          'Northern Path',
          'Eastern Path',
          'Southern Path',
          'Western Path'
        ],
        threat: 0,
        slug: 'seras'
      },
      {
        id: 2,
        name: 'Ilunite Forest',
        description: '',
        territories: [
          ''
        ],
        threat: 2,
        slug: 'ilunite-forest'
      },
      {
        id: 3,
        name: 'Twisted Tangles',
        description: '',
        territories: [
          ''
        ],
        threat: 4,
        slug: 'twisted-tangles'
      },
      {
        id: 4,
        name: 'Fole Expanse',
        description: '',
        territories: [
          ''
        ],
        threat: 1,
        slug: 'fole-expanse'
      },
      {
        id: 5,
        name: 'Swiff Forest',
        description: '',
        territories: [
          ''
        ],
        threat: 2,
        slug: 'swiff-forest'
      },
      {
        id: 6,
        name: 'Hidden Tunnels',
        description: '',
        territories: [
          ''
        ],
        threat: 9,
        slug: 'hidden-tunnels'
      },
      {
        id: 7,
        name: 'Hule Grasslands',
        description: '',
        territories: [
          ''
        ],
        threat: 1,
        slug: 'hule-grasslands'
      },
      {
        id: 8,
        name: 'Messhe Pond',
        description: '',
        territories: [
          ''
        ],
        threat: 3,
        slug: 'messhe-pond'
      },
      {
        id: 9,
        name: 'Seras Riverline',
        description: '',
        territories: [
          ''
        ],
        threat: 2,
        slug: 'seras-riverline'
      },
      {
        id: 10,
        name: 'Boreal Borderlands',
        description: '',
        territories: [
          ''
        ],
        threat: 7,
        slug: 'boreal-borderlands'
      },
      {
        id: 11,
        name: 'Lake Magnae',
        description: '',
        territories: [
          ''
        ],
        threat: 5,
        slug: 'lake-magnae'
      },
      {
        id: 12,
        name: 'Mossy Pockets',
        description: '',
        territories: [
          ''
        ],
        threat: 5,
        slug: 'mossy-pockets'
      },
      {
        id: 13,
        name: 'Denor Woodlands',
        description: '',
        territories: [
          ''
        ],
        threat: 4,
        slug: 'denor-woodlands'
      },
      {
        id: 14,
        name: 'Uresal Hills',
        description: '',
        territories: [
          ''
        ],
        threat: 6,
        slug: 'uresal-hills'
      },
      {
        id: 15,
        name: 'Shroudrust Swamp',
        description: '',
        territories: [
          ''
        ],
        threat: 8,
        slug: 'shroudrust-swamp'
      },
      {
        id: 16,
        name: 'Bel Wetlands',
        description: '',
        territories: [
          ''
        ],
        threat: 6,
        slug: 'bel-wetlands'
      },
      {
        id: 17,
        name: 'Dry Pockets',
        description: '',
        territories: [
          ''
        ],
        threat: 6,
        slug: 'dry-pockets'
      },
      {
        id: 18,
        name: 'Kosplinter Range',
        description: '',
        territories: [
          ''
        ],
        threat: 7,
        slug: 'kosplinter-range'
      },
      {
        id: 19,
        name: 'Reye Desert',
        description: '',
        territories: [
          ''
        ],
        threat: 8,
        slug: 'reye-desert'
      },
      {
        id: 20,
        name: 'Ashlocus',
        description: '',
        territories: [
          ''
        ],
        threat: 10,
        slug: 'ashlocus'
      },
      {
        id: 21,
        name: 'Tantalese Rainforest',
        description: '',
        territories: [
          ''
        ],
        threat: 2,
        slug: 'tantalese-rainforest'
      },
    ]
  },
  corruption: {
    description: 'PathOs',
    ripples: 0
  }
}

module.exports = seekerData
