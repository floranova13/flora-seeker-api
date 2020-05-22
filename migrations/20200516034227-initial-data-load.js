/* eslint-disable max-len */
module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('goals', [
      {
        name: 'Assign Provisonary Titles',
        description: 'The Seeker Division has been established, but many citizens working here have yet to recieve their official duties. We can\'t keep operating in such a disorganized manner.',
        code: 'A100'
      },
      {
        name: 'Submit Earnings Report',
        description: '1',
        code: 'A300'
      },
      {
        name: 'Arboretum Second Expansion',
        description: 'We have outgrown our existing facilities. The Engineering Division will be working on a joint project to build a new Arboretum offshoot. Engineering staff need advisors to ensure that this project goes more smoothly than the last attempt.',
        code: 'E200'
      },
      {
        name: 'Reinforce Arboretum',
        description: '1',
        code: 'E250'
      },
      {
        name: 'Network With Research Division',
        description: '1',
        code: 'R150'
      },
    ])

    await queryInterface.bulkInsert('guidelines', [
      { description: 'Follow all settlement laws at all times. Remember: we are a Seeker Branch in service to the Seras dream.' },
      { description: 'Obey Guardian Commander Chell. It doesn\'t matter if she leads a seperate Division. If she gives you an order, it is a matter of safety, not Division pride.' },
      { description: '1' },
    ])

    await queryInterface.bulkInsert('seekers', [
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
    ])

    await queryInterface.bulkInsert('titles', [
      { name: 'Seeker Ardent' },
      { name: 'Explorer' },
      { name: 'Botanist' },
    ])

    await queryInterface.bulkInsert('seekersTitles', [
      {
        seekerId: 1,
        titleId: 1
      },
      {
        seekerId: 2,
        titleId: 2
      },
      {
        seekerId: 3,
        titleId: 3
      },
    ])

    await queryInterface.bulkInsert('samples', [
      {
        name: 'Reeker Redcap',
        description: 'Reeker falshrooms are common to many areas of the wilderness and even human-settled areas. Evolutionary development of the Redcap and Whitecap varieties of Reeker shroom appear to have been linked. Redcaps are harmless.',
        rarity: 'common',
        slug: 'reeker-redcap'
      },
      {
        name: 'Reeker Whitecap',
        description: 'Reeker falshrooms are common to many areas of the wilderness and even human-settled areas. Evolutionary development of the Redcap and Whitecap varieties of Reeker shroom appear to have been linked. Whitecaps are toxic to most mammals, including humans.',
        rarity: 'common',
        slug: 'reeker-whitecap'
      },
      {
        name: 'Breybarb',
        description: 'Breybarbs are mushrooms with rough, brownish caps. They aren\'t comfortable to sleep on in the wild, but once dried, they develop a springy texture perfect for luxury bedding. Processing Breybarbs in this way is expensive, however.',
        rarity: 'common',
        slug: 'breybarb'
      },
      {
        name: 'Glarevia',
        description: 'This flesherfungus has a deep purple, appearance, with flesh like knotted wood.',
        rarity: 'uncommon',
        slug: 'glarevia'
      },
      {
        name: 'Grallvine',
        description: 'A carnivorous fungus that waits for prey to brush against its vines, which are coated with an adhesive. It digests live prey over the course of about a day, depending on the age and size of the fungus.',
        rarity: 'uncommon',
        slug: 'grallvine'
      },
      {
        name: 'Raveweed',
        description: 'An extremely rare carnivorous fungus, about which little is known.',
        rarity: 'legendary',
        slug: 'raveweed'
      },
      {
        name: 'Mellowend',
        description: 'Also called the "Sanctuary Flourishflora", they have gained special recognition for being the first Flourishflora ever grown in human-settled, artificial conditions. It is otherwise a humble plant with no special properties, harvested only for its Vira worth.',
        rarity: 'common',
        slug: 'mellowend'
      },
      {
        name: 'Echor Blossom',
        description: 'This flourishflora uses acoustic chambers along uniformly-developed stems to guide growth pattern and scale. This allows the organism to find locations that are less crowded by other plants and animals.',
        rarity: 'common',
        slug: 'echor-blossom'
      },
      {
        name: 'Bogbind',
        description: 'Often mislabelled by inexperienced Seekers as a creeping plant or even an aquatic tangle, Bogbind grow in bogs and swamps.',
        rarity: 'common',
        slug: 'bogbind'
      },
      {
        name: 'Frutebane',
        description: 'Despite the name, Frutebane favors many varieties of fruits and vegtables, as well as other organic matter.',
        rarity: 'common',
        slug: 'frutebane'
      },
      {
        name: 'Mux Mold',
        description: 'Mux Mold thrives in damp climates, devouring organic and inorganic matter alike.',
        rarity: 'uncommon',
        slug: 'mux-mold'
      },
      {
        name: 'Moreph',
        description: 'Set apart from its genetic relatives by a high rate of mutation, Moreph is more of an overwhelming nuisance than it is a catastrophe in and of itself. However, experts in the field have voiced concerns that this may not always be the case. Left alone, it may be the Moreph that contributes to this century\'s colonization disaster.',
        rarity: 'uncommon',
        slug: 'moreph'
      },
      {
        name: 'Vitanark Veilas',
        description: 'Tower trees with thick trunks covered in jagged blue bark. The oldest discovered trees are members of the Vitanark genus.',
        rarity: 'legendary',
        slug: 'vitanark-veilas'
      },
      {
        name: 'Vitanark Rushe',
        description: 'Towering trees with thick trunks encased in reddish bark. The oldest discovered trees are members of the Vitanark genus.',
        rarity: 'rare',
        slug: 'vitanark-rushe'
      },
      {
        name: 'Arvorloc Evergreen',
        description: 'A tree with voluminous purple branches and with cascading green stems.',
        rarity: 'uncommon',
        slug: 'arvorloc-evergreen'
      },
      {
        name: 'Beamstrand',
        description: 'The most common variety of freshwater waveskell in the greater region.',
        rarity: 'common',
        slug: 'beamstrand'
      },
      {
        name: 'Stinging Gripweed',
        description: 'This waveskell Ddisguises itself as the harmless beamstrand.',
        rarity: 'uncommon',
        slug: 'stinging-gripweed'
      },
      {
        name: 'Radiant Murkweed',
        description: 'A bioluminescent waveskell that pulses to gently illuminate the dark depths where it grows.',
        rarity: 'rare',
        slug: 'radiant-murkweed'
      },
    ])

    await queryInterface.bulkInsert('falshrooms', [
      {
        sampleId: 1,
        viraburstAbsorption: 0
      },
      {
        sampleId: 2,
        viraburstAbsorption: 0
      },
      {
        sampleId: 3,
        viraburstAbsorption: 0
      },
    ])

    await queryInterface.bulkInsert('flesherfungi', [
      {
        sampleId: 4,
        threat: 0
      },
      {
        sampleId: 5,
        threat: 0
      },
      {
        sampleId: 6,
        threat: 0
      },
    ])

    await queryInterface.bulkInsert('flourishflora', [
      {
        sampleId: 7,
        producerCoefficient: 0
      },
      {
        sampleId: 8,
        producerCoefficient: 0
      },
      {
        sampleId: 9,
        producerCoefficient: 0
      },
    ])

    await queryInterface.bulkInsert('maremolds', [
      {
        sampleId: 10,
        mutationRate: 0
      },
      {
        sampleId: 11,
        mutationRate: 0
      },
      {
        sampleId: 12,
        mutationRate: 0
      },
    ])

    await queryInterface.bulkInsert('trees', [
      {
        sampleId: 13,
        height: 0
      },
      {
        sampleId: 14,
        height: 0
      },
      {
        sampleId: 15,
        height: 0
      },
    ])

    await queryInterface.bulkInsert('waveskellen', [
      {
        sampleId: 16,
        cascades: 'clarion'
      },
      {
        sampleId: 17,
        cascades: 'clarion'
      },
      {
        sampleId: 18,
        cascades: 'clarion'
      },
    ])

    await queryInterface.bulkInsert('locations', [
      {
        name: 'Seras',
        description: 'A fledgling settlement in the wilderness. Those living here are far from the sanctuary cities to the West, both geographically and politically.',
        slug: 'seras'
      },
      {
        name: 'Ilunite Forest',
        description: 'This bioluminescent forest is known even amonst the Seekers of the Sanctuary cities to the far East. Seras Guardians consider it to be relatively safe territory, but only so far as the wilderness is concerned. Wisdom passed down from veteran Seekers and Guardians is to not let oneself become distracted by the variety of lights generated by the organisms that dwell in the darkness.',
        slug: 'ilunite-forest'
      },
      {
        name: 'Twisted Tangles',
        description: 'The Founders passed through this region on their way to assess the viability of there chosen settlement location. The did not expect to become lost for over a day, with some aspects of the curved outer borders of the arms distorting sensor readings just enough to lead the group in cyclical twists and turns before they eventually found their way out.',
        slug: 'twisted-tangles'
      },
      {
        name: 'Fole Expanse',
        description: 'A dense forested region that stretches all the way from the Northeast by Southern border of the Falecord Rift, across a stretch of intermediary woodland that leads into the Ilunite Forest region, all the way deep into Sanctuary territory to the East.',
        slug: 'fole-expanse'
      },
      {
        name: 'Swiff Forest',
        description: 'The Swiff Forest is large stretch of land that has not been explored to any great extent. This is not because it is home to dangerous creatures or because it is treacherous terrain, but because it is large and does not contain many resources that are in high demand.',
        slug: 'swiff-forest'
      },
      {
        name: 'The Tunnels',
        description: 'Unknown.',
        slug: 'the-tunnels'
      },
      {
        name: 'Hule Grasslands',
        description: 'The Northern cliffs of Seras travel far, but Seekers can travel through the the Northern passage at an incline and wind around the surrounding forest to reach a large, flat grassland beyond. After much investigation, Seras Seekers have reported that the Hule Grasslands is divided into six parts by the local fauna. Each section is different in the amount of land it contains and the qualities of the fauna that control it.',
        slug: 'hule-grasslands'
      },
      {
        name: 'Messhe Pond',
        description: 'This pond formed beside Seras\'s river to the North of the settlement. It is to have happened centuries before to the founding of the settlement. Exploration of the pond’s ecosystem led to the discovery of a unique symbiotic relationship between two organisms: the Viselite Creep and the Formite Crab. Both seem to have influenced the river\'s flow to sustain their communities along the course of their evolution.',
        slug: 'messhe-pond'
      },
      {
        name: 'Seras Riverline',
        description: 'A long, winding river that splits the settlement in two. Its source has yet to be discovered. It is one of the reasons the location was chosen for the founding of the settlement.',
        slug: 'seras-riverline'
      },
      {
        name: 'Boreal Borderlands',
        description: 'Far to the North of Seras lies a frigid Taiga, only a small portion of which has been mapped by Seekers. There are no plans to map further any time soon, with the cold conditions only intensifying the farther North one travels.',
        slug: 'boreal-borderlands'
      },
      {
        name: 'Lake Magnae',
        description: 'Lake Magnae is an enormous freshwater lake to the Northeast of the settlement. It lies closer to the Sanctuary city of Velanor than it does to Seras. It is one of the two major natural boundaries between Velanor and Seras, though Seekers and Guardians who explore the lake maintain strict security protocols to protect the settlement. Such exploration efforts do not taking explorers far enough East as to risk encountering other humans.',
        slug: 'lake-magnae'
      },
      {
        name: 'Denor-Woodlands',
        description: 'A low-density forest with high visibility the covers a large area to the Southwest of the settlement. The Denor Woodlands contains the Mossy Pockets and the Uresal Hills.',
        slug: 'denor-woodlands'
      },
      {
        name: 'Uresal Hills',
        description: 'A surprisingly expansive stretch of small to medium-sized hills, peaking over the treeline of the Denor Woodlands, which surrounds the large cluster of hills on all sides. Though many of the organisms in the hills are also found in the outlying woodlands, there were also those that resided exclusively within the hilly terrain. Some creatures used the hills for protection or as a means of hunting their prey. Flying creatures nested atop the hills, usually upon rocky outcrops, and fought over prime nesting territory, both with members of their species and with competing species.',
        slug: 'uresal-hills'
      },
      {
        name: 'Mossy Pockets',
        description: 'A mossy, rocky region of caves that, as of Seras\'s founding, has yet to be assessed for its mineral worth. Unlike the Dry Pockets, life flourishes in the Mossy Pockets.',
        slug: 'mossy-pockets'
      },
      {
        name: 'Shroudrust Swamp',
        description: 'A coniferous swamp in the Southern region of Seras, nestled around a stretch of the same river flowing through Seras. It is very difficult to navigate, and Seekers and Guardians unequipped with expensive aquatic gear are restricted to labyrinthine paths that offer solid footing.',
        slug: 'shroudrust-swamp'
      },
      {
        name: 'Bel Wetlands',
        description: 'Encompassing the whole of the Shroudrust Swamp, the Bel Wetlands spread far across the deep Southern territory. It is home to many aquatic plants, valued for study and other purposes. Seekers and Guardians traveling through the region must bring water-resistant gear.',
        slug: 'bel-wetlands'
      },
      {
        name: 'Dry Pockets',
        description: 'A sandy, rocky region of caves that, as of Seras\'s founding, has yet to be assessed for its mineral worth.',
        slug: 'dry-pockets'
      },
      {
        name: 'Kosplinter Range',
        description: 'A mountain range with clear pathways between each mountain or cluster of mountains. The brave or foolhardy Seekers who scale the mountains to higher elevations can harvest unique plants adapted to the unique climate.',
        slug: 'kosplinter-range'
      },
      {
        name: 'Reye Desert',
        description: 'A moderately large desert region that only a small number of Seekers are eager to explore. Seekers who actually enjoy travelling through this territory tend to be considered "odd" by their comrades, but the Branch recognizes the need for all sorts to continue exploring and collecting specimens. Few plants are found in the desert, but they are often species that are exclusive to such climates, and these are valued by the Research Division and even some merchants.',
        slug: 'reye-desert'
      },
      {
        name: 'Ashlocus',
        description: 'A hazard-class region. An enourmous volcanic region to the southwest, location within the Reye Desert. It is far from the settlement, and to traverse deeper within the territory it takes longer still to reach. Caim claims that it could be included in longterm plans for sustainable energy aquisition, but it would require the resources of a small Sanctuary to make it happen and to compound the difficulties, the region is home to some of the most dangerous creatures around. Breachworm Devourer Hatchlings have been sighted in the distant central area, a considerable risk to be anywhere near.',
        slug: 'ashlocus'
      },
      {
        name: 'Tantalese Rainforest',
        description: 'To the Western North-West, stretching farther than any maps could reach. A vast rainforest of unknown size, it was named because Seekers who travel far enough to reach it often become enamored by the sheer biodiversity. Some are unable to resist travelling deeper than is safe. For obvious reasons, only experienced Seekers are sent into the Tantalese, and only with Guardian escorts. The Guardians are much less susceptible to the self-destructive "curiosity trances", and they can pull passionate Seekers out when the contract is up. They then force them back to their senses, the settlement, and safety.',
        slug: 'tantalese-rainforest'
      },
    ])

    return queryInterface.bulkInsert('territories', [
      {
        name: 'Eastern Border',
        slug: 'eastern-border',
        locationId: 1
      },
      {
        name: 'Northern Border',
        slug: 'northern-border',
        locationId: 1
      },
      {
        name: 'Southern Border',
        slug: 'southern-border',
        locationId: 1
      },
      {
        name: 'Western Border',
        slug: 'western-border',
        locationId: 1
      },
      {
        name: 'Eastern Path',
        slug: 'eastern-path',
        locationId: 1
      },
      {
        name: 'Northern Path',
        slug: 'northern-path',
        locationId: 1
      },
      {
        name: 'Southern Path',
        slug: 'southern-path',
        locationId: 1
      },
      {
        name: 'Western Path',
        slug: 'western-path',
        locationId: 1
      },
    ])
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('territories')

    await queryInterface.bulkDelete('locations')

    await queryInterface.bulkDelete('waveskellen')

    await queryInterface.bulkDelete('trees')

    await queryInterface.bulkDelete('maremolds')

    await queryInterface.bulkDelete('flourishflora')

    await queryInterface.bulkDelete('flesherfungi')

    await queryInterface.bulkDelete('falshrooms')

    await queryInterface.bulkDelete('samples')

    await queryInterface.bulkDelete('seekersTitles')

    await queryInterface.bulkDelete('titles')

    await queryInterface.bulkDelete('seekers')

    await queryInterface.bulkDelete('guidelines')

    return queryInterface.bulkDelete('goals')
  }
}
